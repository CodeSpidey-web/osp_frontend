'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { fetchApi } from '@/lib/medusa'
import ShopHeader from '@/components/ShopHeader'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false })
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false })
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false })

function LoginFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenParam = searchParams.get('token')

  const { customer, login, register, loading, error, clearError } = useAuth()
  const [isLoginTab, setIsLoginTab] = useState(true)

  // Forgot Password / Reset Password States
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetSuccess, setResetSuccess] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // If token param is present in URL, set the resetToken and switch to reset mode
  useEffect(() => {
    if (tokenParam) {
      setResetToken(tokenParam)
      setIsForgotPassword(true)
    }
  }, [tokenParam])

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register Form States
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    // If already logged in, redirect to profile
    if (customer) {
      router.push('/profile')
    }
  }, [customer, router])

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) return
    setIsSubmitting(true)
    const success = await login(loginEmail, loginPassword)
    setIsSubmitting(false)
    if (success) {
      router.push('/profile')
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!regEmail || !regPassword || !firstName || !lastName) return
    setIsSubmitting(true)
    const success = await register(regEmail, regPassword, firstName, lastName)
    setIsSubmitting(false)
    if (success) {
      router.push('/profile')
    }
  }

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) return
    setForgotLoading(true)
    clearError()
    setLocalError(null)
    try {
      await fetchApi('/auth/customer/emailpass/reset-password', {
        method: 'POST',
        body: JSON.stringify({ identifier: resetEmail })
      })
      setForgotSent(true)
    } catch (err: any) {
      console.error(err)
      setLocalError("Failed to initiate password reset. Please verify your email address.")
    } finally {
      setForgotLoading(false)
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)
    if (!resetToken || !newPassword || !confirmPassword) return
    if (newPassword !== confirmPassword) {
      setLocalError("Passwords do not match.")
      return
    }
    if (newPassword.length < 6) {
      setLocalError("Password must be at least 6 characters.")
      return
    }
    setForgotLoading(true)
    clearError()
    try {
      const res = await fetchApi<{ success: boolean }>('/auth/customer/emailpass/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resetToken}`
        },
        body: JSON.stringify({ password: newPassword })
      })
      if (res.success) {
        setResetSuccess(true)
        setTimeout(() => {
          setIsForgotPassword(false)
          setResetSuccess(false)
          setResetToken('')
          setIsLoginTab(true)
          // Clean URL parameters
          router.push('/login')
        }, 3000)
      }
    } catch (err: any) {
      console.error(err)
      setLocalError("Reset token has expired or is invalid. Please request a new password reset link.")
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <main className="rbt-main-wrapper" style={{ backgroundColor: '#09090b', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(15, 15, 20, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '40px 30px',
        boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
        color: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* Render Forgot/Reset password view */}
        {isForgotPassword ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#f4f4f5', margin: 0 }}>
                {resetToken ? 'Reset Password' : 'Forgot Password'}
              </h2>
              <p style={{ color: '#71717a', fontSize: '13px', marginTop: '6px' }}>
                {resetToken ? 'Set a strong password for your account' : 'Enter your email to receive password reset instructions'}
              </p>
            </div>

            {(error || localError) && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#f87171',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '20px',
                lineHeight: '1.4'
              }}>
                {error || localError}
              </div>
            )}

            {resetToken ? (
              /* Set New Password Form */
              resetSuccess ? (
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#34d399', padding: '16px', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
                  Password has been reset successfully! Redirecting you to login...
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        backgroundColor: '#18181b',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        backgroundColor: '#18181b',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    style={{
                      backgroundColor: '#10b981',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      marginTop: '10px'
                    }}
                  >
                    {forgotLoading ? 'Updating Password...' : 'Reset Password'}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); setResetToken(''); clearError(); setLocalError(null); }}
                    style={{ background: 'none', border: 'none', color: '#a1a1aa', fontSize: '13px', cursor: 'pointer', textAlign: 'center', marginTop: '10px' }}
                  >
                    Back to login
                  </button>
                </form>
              )
            ) : (
              /* Request Reset Email Form */
              forgotSent ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#34d399', padding: '16px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
                    Password reset link generated! In development, check the file <strong>password_resets.log</strong> in the project artifacts folder to retrieve your token.
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); setForgotSent(false); }}
                    style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="name@example.com"
                      style={{
                        backgroundColor: '#18181b',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    style={{
                      backgroundColor: '#10b981',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      marginTop: '10px'
                    }}
                  >
                    {forgotLoading ? 'Sending Link...' : 'Send Reset Link'}
                  </button>

                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); clearError(); setLocalError(null); }}
                    style={{ background: 'none', border: 'none', color: '#a1a1aa', fontSize: '13px', cursor: 'pointer', textAlign: 'center', marginTop: '10px' }}
                  >
                    Back to login
                  </button>
                </form>
              )
            )}
          </div>
        ) : (
          /* Normal Login/Register views */
          <>
            {/* Header tabs */}
            <div style={{ display: 'flex', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => { setIsLoginTab(true); clearError(); setLocalError(null); }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'none',
                  border: 'none',
                  color: isLoginTab ? '#10b981' : '#a1a1aa',
                  fontWeight: isLoginTab ? '700' : '500',
                  borderBottom: isLoginTab ? '2px solid #10b981' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '16px'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => { setIsLoginTab(false); clearError(); setLocalError(null); }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'none',
                  border: 'none',
                  color: !isLoginTab ? '#10b981' : '#a1a1aa',
                  fontWeight: !isLoginTab ? '700' : '500',
                  borderBottom: !isLoginTab ? '2px solid #10b981' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '16px'
                }}
              >
                Create Account
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#f4f4f5', margin: 0 }}>
                {isLoginTab ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p style={{ color: '#71717a', fontSize: '13px', marginTop: '6px' }}>
                {isLoginTab ? 'Sign in to access your projects and orders' : 'Join India\'s trusted electronics student store'}
              </p>
            </div>

            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#f87171',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '20px',
                lineHeight: '1.4'
              }}>
                {error}
              </div>
            )}

            {isLoginTab ? (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    style={{
                      backgroundColor: '#18181b',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>Password</label>
                    <button
                      type="button"
                      onClick={() => { setIsForgotPassword(true); clearError(); setLocalError(null); }}
                      style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '12px', fontWeight: '600', cursor: 'pointer', padding: 0 }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      backgroundColor: '#18181b',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      style={{
                        backgroundColor: '#18181b',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      style={{
                        backgroundColor: '#18181b',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    style={{
                      backgroundColor: '#18181b',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    minLength={6}
                    style={{
                      backgroundColor: '#18181b',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Register & Create Account'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <Suspense fallback={
        <div style={{ backgroundColor: '#09090b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
          <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        </div>
      }>
        <LoginFormInner />
      </Suspense>
      <Modals />
      <Footer />
    </>
  )
}
