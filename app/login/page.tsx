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

  // Show/Hide Password States
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (customer) {
      router.push('/')
    }
  }, [customer, router])

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) return
    setIsSubmitting(true)
    const success = await login(loginEmail, loginPassword)
    setIsSubmitting(false)
    if (success) {
      router.push('/')
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!regEmail || !regPassword || !firstName || !lastName) return
    setIsSubmitting(true)
    const success = await register(regEmail, regPassword, firstName, lastName)
    setIsSubmitting(false)
    if (success) {
      router.push('/')
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
    <main className="rbt-main-wrapper" style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #0b2545 100%)'
    }}>
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(254, 208, 0, 0.18) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(19, 108, 57, 0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '20%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(235, 127, 35, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '15%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(254, 208, 0, 0.10) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '20px',
        padding: '40px 30px',
        boxShadow: '0 25px 60px rgba(11, 37, 69, 0.35), 0 0 0 1px rgba(254, 208, 0, 0.1)',
        color: '#18181b',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Render Forgot/Reset password view */}
        {isForgotPassword ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '26px',
                fontWeight: '800',
                margin: 0,
                background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #eb7f23 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {resetToken ? 'Reset Password' : 'Forgot Password'}
              </h2>
              <p style={{ color: '#71717a', fontSize: '13px', marginTop: '8px' }}>
                {resetToken ? 'Set a strong password for your account' : 'Enter your email to receive password reset instructions'}
              </p>
            </div>

            {(error || localError) && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
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
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '16px', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
                  Password has been reset successfully! Redirecting you to login...
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>New Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          padding: '12px 40px 12px 14px',
                          color: '#1f2937',
                          fontSize: '14px',
                          outline: 'none',
                          width: '100%'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#71717a',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px'
                        }}
                      >
                        <i className={`fa-regular ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Confirm New Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          padding: '12px 40px 12px 14px',
                          color: '#1f2937',
                          fontSize: '14px',
                          outline: 'none',
                          width: '100%'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#71717a',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px'
                        }}
                      >
                        <i className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    style={{
                      backgroundColor: '#136c39',
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
                    style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '13px', cursor: 'pointer', textAlign: 'center', marginTop: '10px' }}
                  >
                    Back to login
                  </button>
                </form>
              )
            ) : (
              /* Request Reset Email Form */
              forgotSent ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '16px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
                    Password reset link generated! In development, check the file <strong>password_resets.log</strong> in the project artifacts folder to retrieve your token.
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsForgotPassword(false); setForgotSent(false); }}
                    style={{ background: 'none', border: 'none', color: '#136c39', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Email Address</label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="name@example.com"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        color: '#1f2937',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    style={{
                      backgroundColor: '#136c39',
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
                    style={{ background: 'none', border: 'none', color: '#71717a', fontSize: '13px', cursor: 'pointer', textAlign: 'center', marginTop: '10px' }}
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
            <div style={{ display: 'flex', marginBottom: '30px', borderBottom: '1px solid #e4e4e7' }}>
              <button
                onClick={() => { setIsLoginTab(true); clearError(); setLocalError(null); }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'none',
                  border: 'none',
                  color: isLoginTab ? '#136c39' : '#71717a',
                  fontWeight: isLoginTab ? '700' : '500',
                  borderBottom: isLoginTab ? '2px solid #136c39' : 'none',
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
                  color: !isLoginTab ? '#136c39' : '#71717a',
                  fontWeight: !isLoginTab ? '700' : '500',
                  borderBottom: !isLoginTab ? '2px solid #136c39' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '16px'
                }}
              >
                Create Account
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '26px',
                fontWeight: '800',
                margin: 0,
                background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #eb7f23 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {isLoginTab ? 'Welcome Back' : 'Get Started'}
              </h2>
              <p style={{ color: '#71717a', fontSize: '13px', marginTop: '8px' }}>
                {isLoginTab ? 'Sign in to access your projects and orders' : 'Join India\'s trusted electronics student store'}
              </p>
            </div>

            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.15)',
                color: '#ef4444',
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
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#1f2937',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#136c39'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '12px 40px 12px 14px',
                        color: '#1f2937',
                        fontSize: '14px',
                        outline: 'none',
                        width: '100%',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#136c39'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#71717a',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}
                    >
                      <i className={`fa-regular ${showLoginPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#136c39',
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
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        color: '#1f2937',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#136c39'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        color: '#1f2937',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#136c39'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="john.doe@example.com"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#1f2937',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#136c39'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      minLength={6}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        padding: '10px 40px 10px 12px',
                        color: '#1f2937',
                        fontSize: '14px',
                        outline: 'none',
                        width: '100%',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#136c39'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#71717a',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}
                    >
                      <i className={`fa-regular ${showRegPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#136c39',
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
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#18181b',
          fontFamily: 'Inter, sans-serif',
          background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #0b2545 100%)'
        }}>
          <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}></div>
        </div>
      }>
        <LoginFormInner />
      </Suspense>
      <Modals />
      <Footer />
    </>
  )
}
