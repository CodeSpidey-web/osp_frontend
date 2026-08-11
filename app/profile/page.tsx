'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { fetchApi } from '@/lib/medusa'
import ShopHeader from '@/components/ShopHeader'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const MobileMenu = dynamic(() => import("@/components/MobileMenu"), { ssr: false })
const SideNavs = dynamic(() => import("@/components/SideNavs"), { ssr: false })
const Modals = dynamic(() => import("@/components/Modals"), { ssr: false })

function formatPrice(amount: number, currencyCode: string = 'inr') {
  if (!amount) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

export default function ProfilePage() {
  const router = useRouter()
  const { customer, loading: authLoading, logout, updateProfile, error: authError, refreshCustomer } = useAuth()
  
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'password'>('profile')
  const [orders, setOrders] = useState<any[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [trackingMap, setTrackingMap] = useState<Record<string, { courier_name: string | null; tracking_number: string | null; tracking_url: string | null }>>({})

  // Profile Form States
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [updating, setUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  // Saved Addresses States
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [addrFirstName, setAddrFirstName] = useState('')
  const [addrLastName, setAddrLastName] = useState('')
  const [addrCompany, setAddrCompany] = useState('')
  const [addr1, setAddr1] = useState('')
  const [addr2, setAddr2] = useState('')
  const [addrCity, setAddrCity] = useState('')
  const [addrProvince, setAddrProvince] = useState('')
  const [addrPostalCode, setAddrPostalCode] = useState('')
  const [addrCountryCode, setAddrCountryCode] = useState('in')
  const [addrPhone, setAddrPhone] = useState('')
  const [addressError, setAddressError] = useState<string | null>(null)
  const [addressLoading, setAddressLoading] = useState(false)
  const [addressSuccess, setAddressSuccess] = useState(false)

  // Change Password States
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passError, setPassError] = useState<string | null>(null)
  const [passSuccess, setPassSuccess] = useState(false)
  const [passLoading, setPassLoading] = useState(false)

  useEffect(() => {
    // If auth load finished and no customer exists, redirect to login
    if (!authLoading && !customer) {
      router.push('/login')
    }
  }, [customer, authLoading, router])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const tab = params.get('tab')
      if (tab === 'orders' || tab === 'addresses' || tab === 'password' || tab === 'profile') {
        setActiveTab(tab as any)
      }
    }
  }, [])

  useEffect(() => {
    if (customer) {
      setFirstName(customer.first_name || '')
      setLastName(customer.last_name || '')
      setPhone(customer.phone || '')
    }
  }, [customer])

  useEffect(() => {
    if (customer && activeTab === 'orders') {
      const fetchOrders = async () => {
        setOrdersLoading(true)
        try {
          const res = await fetchApi<{ orders: any[] }>('/store/orders')
          const orderList = res.orders || []
          setOrders(orderList)

          const shippedIds = orderList
            .filter((o: any) => o.fulfillment_status === 'fulfilled' || o.fulfillment_status === 'shipped')
            .map((o: any) => o.id)
            .filter(Boolean)

          if (shippedIds.length > 0) {
            const results = await Promise.allSettled(
              shippedIds.map(async (orderId: string) => {
                const endpoint = '/store/orders/' + orderId + '/tracking'
                const data = await fetchApi<{ tracking: any }>(endpoint)
                return { orderId, tracking: data.tracking }
              })
            )

            const nextMap: Record<string, any> = {}
            for (const result of results) {
              if (result.status === 'fulfilled' && result.value.tracking) {
                nextMap[result.value.orderId] = result.value.tracking
              }
            }
            setTrackingMap(nextMap)
          } else {
            setTrackingMap({})
          }
        } catch (err) {
          console.error("Failed to fetch customer orders:", err)
        } finally {
          setOrdersLoading(false)
        }
      }
      fetchOrders()
    }
  }, [customer, activeTab])

  const handleProfileUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setUpdateSuccess(false)
    const success = await updateProfile({
      first_name: firstName,
      last_name: lastName,
      phone: phone || null
    })
    setUpdating(false)
    if (success) {
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)
    }
  }

  const handleSaveAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddressLoading(true)
    setAddressError(null)
    setAddressSuccess(false)

    const payload = {
      first_name: addrFirstName,
      last_name: addrLastName,
      company: addrCompany || null,
      address_1: addr1,
      address_2: addr2 || null,
      city: addrCity,
      province: addrProvince || null,
      postal_code: addrPostalCode,
      country_code: addrCountryCode.toLowerCase(),
      phone: addrPhone || null
    }

    try {
      const url = editingAddressId 
        ? `/store/customers/me/addresses/${editingAddressId}` 
        : `/store/customers/me/addresses`
      
      await fetchApi(url, {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      await refreshCustomer()
      setAddressSuccess(true)
      setTimeout(() => {
        setIsAddressFormOpen(false)
        setEditingAddressId(null)
        setAddressSuccess(false)
      }, 1500)
    } catch (err: any) {
      console.error(err)
      setAddressError("Failed to save address details. Please verify your inputs.")
    } finally {
      setAddressLoading(false)
    }
  }

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return
    try {
      await fetchApi(`/store/customers/me/addresses/${id}`, { method: 'DELETE' })
      await refreshCustomer()
    } catch (err) {
      console.error("Delete address failed:", err)
    }
  }

  const openAddAddress = () => {
    setEditingAddressId(null)
    setAddrFirstName(customer?.first_name || '')
    setAddrLastName(customer?.last_name || '')
    setAddrCompany('')
    setAddr1('')
    setAddr2('')
    setAddrCity('')
    setAddrProvince('')
    setAddrPostalCode('')
    setAddrCountryCode('in')
    setAddrPhone(customer?.phone || '')
    setAddressError(null)
    setAddressSuccess(false)
    setIsAddressFormOpen(true)
  }

  const openEditAddress = (addr: any) => {
    setEditingAddressId(addr.id)
    setAddrFirstName(addr.first_name || '')
    setAddrLastName(addr.last_name || '')
    setAddrCompany(addr.company || '')
    setAddr1(addr.address_1 || '')
    setAddr2(addr.address_2 || '')
    setAddrCity(addr.city || '')
    setAddrProvince(addr.province || '')
    setAddrPostalCode(addr.postal_code || '')
    setAddrCountryCode(addr.country_code || 'in')
    setAddrPhone(addr.phone || '')
    setAddressError(null)
    setAddressSuccess(false)
    setIsAddressFormOpen(true)
  }

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPassLoading(true)
    setPassError(null)
    setPassSuccess(false)

    if (newPassword !== confirmPassword) {
      setPassError("New passwords do not match.")
      setPassLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setPassError("New password must be at least 6 characters.")
      setPassLoading(false)
      return
    }

    try {
      // Validate current credentials first
      const verifyRes = await fetch('http://localhost:9000/auth/customer/emailpass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: customer?.email, password: currentPassword })
      })

      if (!verifyRes.ok) {
        setPassError("Incorrect current password.")
        setPassLoading(false)
        return
      }

      // Complete update
      const storedToken = localStorage.getItem('medusa_auth_token')
      await fetchApi('/auth/customer/emailpass/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({ password: newPassword })
      })

      setPassSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPassSuccess(false), 3000)
    } catch (err: any) {
      console.error(err)
      setPassError("Failed to change password. Please try again.")
    } finally {
      setPassLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (authLoading || (!customer && authLoading)) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#18181b',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #0b2545 100%)'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(254, 208, 0, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(19, 108, 57, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem', marginBottom: '15px' }}></div>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!customer) return null;
  const addresses = (customer as any).addresses || [];

  return (
    <>
      <style>{`
        .profile-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-tabs-container {
            display: flex !important;
            overflow-x: auto;
            white-space: nowrap;
            background: rgba(255, 255, 255, 0.92) !important;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.4) !important;
            border-radius: 14px !important;
            padding: 6px 6px 10px 6px;
            margin-bottom: 20px;
            gap: 6px;
            box-shadow: 0 12px 35px rgba(11, 37, 69, 0.15);
            scrollbar-width: thin;
            scrollbar-color: rgba(19, 108, 57, 0.5) rgba(255,255,255,0.2);
          }
          .mobile-tabs-container::-webkit-scrollbar {
            display: block !important;
            height: 3px !important;
          }
          .mobile-tabs-container::-webkit-scrollbar-track {
            background: rgba(244, 244, 245, 0.5) !important;
            border-radius: 10px !important;
          }
          .mobile-tabs-container::-webkit-scrollbar-thumb {
            background: rgba(19, 108, 57, 0.5) !important;
            border-radius: 10px !important;
          }
          .mobile-tab-btn {
            display: inline-flex !important;
            align-items: center;
            padding: 10px 16px;
            border-radius: 8px;
            border: none;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            background: transparent;
          }
          .profile-form-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-tabs-container {
            display: none !important;
          }
        }
      `}</style>
      <ShopHeader />
      <MobileMenu />
      <SideNavs />
      <main className="rbt-main-wrapper" style={{
        minHeight: '85vh',
        padding: '60px 0',
        color: '#18181b',
        fontFamily: 'Inter, sans-serif',
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
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          {/* Mobile User Header (Avatar + Name) */}
          <div className="d-block d-md-none" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '16px',
            boxShadow: '0 12px 35px rgba(11, 37, 69, 0.18)',
            color: '#18181b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #eb7f23 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '19px',
                fontWeight: '700',
                boxShadow: '0 6px 16px rgba(19, 108, 57, 0.3)',
                border: '2px solid rgba(254, 208, 0, 0.3)'
              }}>
                {customer.first_name?.[0]?.toUpperCase() || customer.email[0].toUpperCase()}
              </div>
              <div>
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: '800',
                  margin: 0,
                  background: 'linear-gradient(135deg, #0b2545 0%, #136c39 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {customer.first_name} {customer.last_name}
                </h4>
                <p style={{ color: '#71717a', fontSize: '11px', margin: 0 }}>{customer.email}</p>
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="mobile-tabs-container">
            <button
              onClick={() => setActiveTab('profile')}
              className="mobile-tab-btn"
              style={{
                background: activeTab === 'profile' ? 'rgba(19, 108, 57, 0.08)' : 'transparent',
                color: activeTab === 'profile' ? '#136c39' : '#71717a'
              }}
            >
              <i className="fa-regular fa-user" style={{ marginRight: '6px' }}></i> Profile
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className="mobile-tab-btn"
              style={{
                background: activeTab === 'addresses' ? 'rgba(19, 108, 57, 0.08)' : 'transparent',
                color: activeTab === 'addresses' ? '#136c39' : '#71717a'
              }}
            >
              <i className="fa-regular fa-location-dot" style={{ marginRight: '6px' }}></i> Addresses
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className="mobile-tab-btn"
              style={{
                background: activeTab === 'password' ? 'rgba(19, 108, 57, 0.08)' : 'transparent',
                color: activeTab === 'password' ? '#136c39' : '#71717a'
              }}
            >
              <i className="fa-regular fa-lock" style={{ marginRight: '6px' }}></i> Password
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className="mobile-tab-btn"
              style={{
                background: activeTab === 'orders' ? 'rgba(19, 108, 57, 0.08)' : 'transparent',
                color: activeTab === 'orders' ? '#136c39' : '#71717a'
              }}
            >
              <i className="fa-regular fa-bag-shopping" style={{ marginRight: '6px' }}></i> Orders
            </button>
            <button
              onClick={handleLogout}
              className="mobile-tab-btn"
              style={{
                color: '#ef4444'
              }}
            >
              <i className="fa-regular fa-arrow-right-from-bracket" style={{ marginRight: '6px' }}></i> Logout
            </button>
          </div>

          <div className="row">
            {/* Sidebar Navigation */}
            <div className="col-lg-3 col-md-4 mb--30 desktop-sidebar">
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 20px 50px rgba(11, 37, 69, 0.2), 0 0 0 1px rgba(254, 208, 0, 0.08)',
                color: '#18181b'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #eb7f23 100%)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    fontWeight: '700',
                    margin: '0 auto 14px auto',
                    boxShadow: '0 8px 20px rgba(19, 108, 57, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
                    border: '2px solid rgba(254, 208, 0, 0.3)'
                  }}>
                    {customer.first_name?.[0]?.toUpperCase() || customer.email[0].toUpperCase()}
                  </div>
                  <h4 style={{
                    fontSize: '17px',
                    fontWeight: '800',
                    margin: '0 0 4px 0',
                    background: 'linear-gradient(135deg, #0b2545 0%, #136c39 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {customer.first_name} {customer.last_name}
                  </h4>
                  <p style={{ color: '#71717a', fontSize: '12px', margin: 0 }}>{customer.email}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => setActiveTab('profile')}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: activeTab === 'profile' ? 'rgba(19, 108, 57, 0.08)' : 'transparent',
                      border: 'none',
                      color: activeTab === 'profile' ? '#136c39' : '#71717a',
                      fontWeight: activeTab === 'profile' ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '14px'
                    }}
                  >
                    <i className="fa-regular fa-user" style={{ marginRight: '10px' }}></i> Profile Details
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: activeTab === 'addresses' ? 'rgba(19, 108, 57, 0.08)' : 'transparent',
                      border: 'none',
                      color: activeTab === 'addresses' ? '#136c39' : '#71717a',
                      fontWeight: activeTab === 'addresses' ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '14px'
                    }}
                  >
                    <i className="fa-regular fa-location-dot" style={{ marginRight: '10px' }}></i> Saved Addresses
                  </button>
                  <button
                    onClick={() => setActiveTab('password')}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: activeTab === 'password' ? 'rgba(19, 108, 57, 0.08)' : 'transparent',
                      border: 'none',
                      color: activeTab === 'password' ? '#136c39' : '#71717a',
                      fontWeight: activeTab === 'password' ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '14px'
                    }}
                  >
                    <i className="fa-regular fa-lock" style={{ marginRight: '10px' }}></i> Change Password
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: activeTab === 'orders' ? 'rgba(19, 108, 57, 0.08)' : 'transparent',
                      border: 'none',
                      color: activeTab === 'orders' ? '#136c39' : '#71717a',
                      fontWeight: activeTab === 'orders' ? '600' : '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '14px'
                    }}
                  >
                    <i className="fa-regular fa-bag-shopping" style={{ marginRight: '10px' }}></i> My Orders
                  </button>
                  <hr style={{ borderColor: '#e4e4e7', margin: '12px 0' }} />
                  <button
                    onClick={handleLogout}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontSize: '14px'
                    }}
                  >
                    <i className="fa-regular fa-arrow-right-from-bracket" style={{ marginRight: '10px' }}></i> Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="col-lg-9 col-md-8">
              <div style={{
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 20px 55px rgba(11, 37, 69, 0.18), 0 0 0 1px rgba(254, 208, 0, 0.06)',
                minHeight: '400px',
                color: '#18181b'
              }}>
                
                {/* 1. PROFILE DETAILS TAB */}
                {activeTab === 'profile' && (
                  <div>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      marginBottom: '6px',
                      background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #eb7f23 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>Profile Details</h3>
                    <p style={{ color: '#71717a', fontSize: '13px', marginBottom: '24px' }}>Keep your account profile and contact details up to date</p>

                    {updateSuccess && (
                      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                        Profile updated successfully!
                      </div>
                    )}
                    {authError && (
                      <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                        {authError}
                      </div>
                    )}

                    <form onSubmit={handleProfileUpdateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
                      <div className="profile-form-grid">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>First Name</label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              color: '#1f2937',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Last Name</label>
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #d1d5db',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              color: '#1f2937',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Email Address (read-only)</label>
                        <input
                          type="email"
                          disabled
                          value={customer.email}
                          style={{
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            color: '#71717a',
                            fontSize: '14px',
                            cursor: 'not-allowed'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 99999 99999"
                          style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            color: '#1f2937',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={updating}
                        style={{
                          backgroundColor: '#136c39',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '12px',
                          fontSize: '14px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          marginTop: '10px',
                          width: '180px',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        {updating ? 'Saving...' : 'Save Changes'}
                      </button>
                    </form>
                  </div>
                )}

                {/* 2. SAVED ADDRESSES TAB */}
                {activeTab === 'addresses' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                      <div>
                        <h3 style={{
                          fontSize: '22px',
                          fontWeight: '800',
                          marginBottom: '6px',
                          background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #eb7f23 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>Saved Addresses</h3>
                        <p style={{ color: '#71717a', fontSize: '13px', margin: 0 }}>Manage your shipping addresses for faster checkout</p>
                      </div>
                      {!isAddressFormOpen && (
                        <button
                          onClick={openAddAddress}
                          style={{
                            backgroundColor: '#136c39',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Add New Address
                        </button>
                      )}
                    </div>

                    {isAddressFormOpen ? (
                      /* Add/Edit Address Form */
                      <div style={{
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '24px',
                        marginBottom: '20px'
                      }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#18181b', marginBottom: '20px' }}>
                          {editingAddressId ? 'Edit Address' : 'New Shipping Address'}
                        </h4>

                        {addressError && (
                          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
                            {addressError}
                          </div>
                        )}
                        {addressSuccess && (
                          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
                            Address saved successfully!
                          </div>
                        )}

                        <form onSubmit={handleSaveAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div className="profile-form-grid">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>First Name *</label>
                              <input type="text" required value={addrFirstName} onChange={(e) => setAddrFirstName(e.target.value)} style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>Last Name *</label>
                              <input type="text" required value={addrLastName} onChange={(e) => setAddrLastName(e.target.value)} style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                            </div>
                          </div>

                          <div className="profile-form-grid">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>Company / College (Optional)</label>
                              <input type="text" value={addrCompany} onChange={(e) => setAddrCompany(e.target.value)} style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>Phone Number *</label>
                              <input type="tel" required value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)} style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>Address Line 1 *</label>
                            <input type="text" required value={addr1} onChange={(e) => setAddr1(e.target.value)} placeholder="Hostel/Room No, Street Name" style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>Address Line 2 (Optional)</label>
                            <input type="text" value={addr2} onChange={(e) => setAddr2(e.target.value)} placeholder="Landmark, Area" style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                          </div>

                          <div className="profile-form-grid">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>City *</label>
                              <input type="text" required value={addrCity} onChange={(e) => setAddrCity(e.target.value)} style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>Province / State *</label>
                              <input type="text" required value={addrProvince} onChange={(e) => setAddrProvince(e.target.value)} placeholder="e.g. Maharashtra" style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                            </div>
                          </div>

                          <div className="profile-form-grid">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>PIN / Postal Code *</label>
                              <input type="text" required value={addrPostalCode} onChange={(e) => setAddrPostalCode(e.target.value)} style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', fontWeight: '600', color: '#4b5563' }}>Country ISO Code *</label>
                              <input type="text" required value={addrCountryCode} onChange={(e) => setAddrCountryCode(e.target.value)} placeholder="in" maxLength={2} style={{ backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px', color: '#1f2937', fontSize: '13px' }} />
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                            <button
                              type="submit"
                              disabled={addressLoading}
                              style={{
                                backgroundColor: '#136c39',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 20px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              {addressLoading ? 'Saving...' : 'Save Address'}
                            </button>
                            <button
                              type="button"
                              onClick={() => { setIsAddressFormOpen(false); setEditingAddressId(null); }}
                              style={{
                                backgroundColor: '#f3f4f6',
                                color: '#71717a',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px 20px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : addresses.length === 0 ? (
                      <div style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        backgroundColor: '#f9fafb',
                        border: '1px dashed #e4e4e7',
                        borderRadius: '12px',
                        color: '#71717a'
                      }}>
                        <i className="fa-regular fa-location-dot" style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }}></i>
                        <span style={{ fontSize: '14px', fontWeight: '500', display: 'block' }}>No saved addresses</span>
                        <p style={{ fontSize: '12px', marginTop: '4px', maxWidth: '300px', margin: '4px auto 0 auto' }}>You have not added any shipping addresses yet.</p>
                      </div>
                    ) : (
                      /* Address Cards Grid */
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                        {addresses.map((addr: any) => (
                          <div key={addr.id} style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e4e4e7',
                            borderRadius: '12px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '16px'
                          }}>
                            <div>
                              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#18181b', margin: '0 0 6px 0' }}>
                                {addr.first_name} {addr.last_name}
                              </h4>
                              {addr.company && (
                                <span style={{ fontSize: '12px', color: '#136c39', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                  {addr.company}
                                </span>
                              )}
                              <p style={{ fontSize: '13px', color: '#4b5563', margin: '0 0 4px 0', lineHeight: '1.4' }}>
                                {addr.address_1}
                                {addr.address_2 ? `, ${addr.address_2}` : ''}
                              </p>
                              <p style={{ fontSize: '13px', color: '#4b5563', margin: '0 0 10px 0' }}>
                                {addr.city}, {addr.province} - {addr.postal_code}
                              </p>
                              {addr.phone && (
                                <span style={{ fontSize: '12px', color: '#71717a', display: 'block' }}>
                                  <i className="fa-solid fa-phone" style={{ marginRight: '6px' }}></i>{addr.phone}
                                </span>
                              )}
                            </div>

                            <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #e4e4e7', paddingTop: '12px' }}>
                              <button
                                onClick={() => openEditAddress(addr)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#136c39',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                <i className="fa-regular fa-pen-to-square" style={{ marginRight: '4px' }}></i> Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(addr.id)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#ef4444',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  padding: 0
                                }}
                              >
                                <i className="fa-regular fa-trash" style={{ marginRight: '4px' }}></i> Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. CHANGE PASSWORD TAB */}
                {activeTab === 'password' && (
                  <div>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      marginBottom: '6px',
                      background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #eb7f23 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>Change Password</h3>
                    <p style={{ color: '#71717a', fontSize: '13px', marginBottom: '24px' }}>Update your account password to ensure security</p>

                    {passSuccess && (
                      <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                        Password updated successfully!
                      </div>
                    )}
                    {passError && (
                      <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px' }}>
                        {passError}
                      </div>
                    )}

                    <form onSubmit={handleChangePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Current Password</label>
                        <input
                          type="password"
                          required
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            color: '#1f2937',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>New Password</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            color: '#1f2937',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '12px', fontWeight: '600', color: '#4b5563' }}>Confirm New Password</label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            color: '#1f2937',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={passLoading}
                        style={{
                          backgroundColor: '#136c39',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '12px',
                          fontSize: '14px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          marginTop: '10px',
                          width: '180px',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        {passLoading ? 'Updating...' : 'Update Password'}
                      </button>
                    </form>
                  </div>
                )}

                {/* 4. ORDER HISTORY TAB */}
                {activeTab === 'orders' && (
                  <div>
                    <h3 style={{
                      fontSize: '22px',
                      fontWeight: '800',
                      marginBottom: '6px',
                      background: 'linear-gradient(135deg, #0b2545 0%, #136c39 50%, #eb7f23 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>Order History</h3>
                    <p style={{ color: '#71717a', fontSize: '13px', marginBottom: '24px' }}>View all your past orders and project purchases</p>

                    {ordersLoading ? (
                      <div style={{ padding: '40px 0', textAlign: 'center' }}>
                        <div className="spinner-border text-success" role="status" style={{ width: '2rem', height: '2rem' }}></div>
                        <p style={{ color: '#71717a', fontSize: '13px', marginTop: '10px' }}>Loading orders...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        backgroundColor: '#f9fafb',
                        border: '1px dashed #e4e4e7',
                        borderRadius: '12px',
                        color: '#71717a'
                      }}>
                        <i className="fa-regular fa-bag-shopping" style={{ fontSize: '32px', marginBottom: '12px', display: 'block' }}></i>
                        <span style={{ fontSize: '14px', fontWeight: '500', display: 'block' }}>No orders found</span>
                        <p style={{ fontSize: '12px', marginTop: '4px', maxWidth: '300px', margin: '4px auto 0 auto' }}>You haven't placed any orders yet. Explore our components page and build something awesome!</p>
                        <a href="/shop" className="rbt-btn btn-sm btn-gradient mt--15" style={{ fontSize: '12px', padding: '8px 16px', height: 'auto', lineHeight: 1.5 }}>
                          Shop Components
                        </a>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {orders.map((order) => {
                          const mapStatus = (fulfillment: string, payment: string): string => {
                            if (fulfillment === "fulfilled" || fulfillment === "shipped") return "Shipped"
                            if (fulfillment === "partially_fulfilled" || payment === "captured" || payment === "paid") return "Processing"
                            return "Pending"
                          }
                          const mappedStatus = mapStatus(order.fulfillment_status, order.payment_status);
                          const statusColor = mappedStatus === 'Shipped' ? '#10b981' : (mappedStatus === 'Processing' ? '#eb7f23' : '#f59e0b');
                          return (
                            <div key={order.id} style={{
                              backgroundColor: '#f9fafb',
                              border: '1px solid #e4e4e7',
                              borderRadius: '12px',
                              padding: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e4e4e7', paddingBottom: '12px' }}>
                                <div>
                                  <span style={{ fontSize: '12px', color: '#71717a', display: 'block' }}>Order ID</span>
                                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#18181b', fontFamily: 'monospace' }}>
                                    {order.display_id ? `#${order.display_id}` : order.id.substring(0, 12)}
                                  </span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <span style={{ fontSize: '12px', color: '#71717a', display: 'block' }}>Placed On</span>
                                  <span style={{ fontSize: '13px', color: '#4b5563' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <span style={{ fontSize: '12px', color: '#71717a', display: 'block', marginBottom: '4px' }}>Items</span>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    {order.items?.map((item: any) => (
                                      <span key={item.id} style={{ fontSize: '13px', color: '#1f2937' }}>
                                        {item.quantity}x {item.title} {item.variant_title ? `(${item.variant_title})` : ''}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <span style={{ fontSize: '12px', color: '#71717a', display: 'block' }}>Total</span>
                                  <span style={{ fontSize: '16px', fontWeight: '800', color: '#136c39' }}>{formatPrice(order.total, order.currency_code)}</span>
                                  <span style={{
                                    display: 'inline-block',
                                    fontSize: '10px',
                                    fontWeight: '700',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    backgroundColor: `${statusColor}15`,
                                    color: statusColor,
                                    border: `1px solid ${statusColor}30`,
                                    marginTop: '6px'
                                  }}>
                                    {mappedStatus.toUpperCase()}
                                  </span>
                                  {mappedStatus === 'Shipped' && (
                                    <span style={{
                                      display: 'block',
                                      fontSize: '11px',
                                      color: '#71717a',
                                      marginTop: '6px',
                                      fontStyle: 'italic',
                                      maxWidth: '220px',
                                      lineHeight: '1.4'
                                    }}>
                                      From here you will receive product status from the courier service
                                    </span>
                                  )}
                                  {(() => {
                                    const tracking = trackingMap[order.id]
                                    if (!tracking) return null
                                    return (
                                      <span style={{
                                        display: 'block',
                                        marginTop: '8px',
                                        padding: '10px 12px',
                                        borderRadius: '10px',
                                        backgroundColor: '#f0fdf4',
                                        border: '1px solid #bbf7d0',
                                        textAlign: 'left',
                                        maxWidth: '280px'
                                      }}>
                                        <span style={{ display: 'block', fontSize: '10px', fontWeight: '700', color: '#136c39', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                                          Shipment Tracking
                                        </span>
                                        {(tracking.courier_name || tracking.tracking_number) && (
                                          <span style={{ display: 'block', fontSize: '11px', color: '#1f2937', fontFamily: 'monospace', fontWeight: '600', marginBottom: '4px' }}>
                                            {tracking.courier_name ? tracking.courier_name + ' · ' : ''}{tracking.tracking_number || ''}
                                          </span>
                                        )}
                                        {tracking.tracking_url && tracking.tracking_url !== '#' && (
                                          <a
                                            href={tracking.tracking_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ display: 'inline-block', fontSize: '12px', fontWeight: '700', color: '#136c39', textDecoration: 'underline' }}
                                          >
                                            Open tracking →
                                          </a>
                                        )}
                                      </span>
                                    )
                                  })()}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </main>
      <Modals />
      <Footer />
    </>
  )
}
