import React, { useState } from 'react'
import './Orders.css'

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'completed', label: 'Completed' },
  ];

  const upcomingFeatures = [
    {
      icon: '📋',
      title: 'Order Management',
      description: 'View and manage all incoming orders with real-time status updates and customer details.'
    },
    {
      icon: '🚚',
      title: 'Delivery Tracking',
      description: 'Track order delivery status and manage delivery assignments with integrated mapping.'
    },
    {
      icon: '💰',
      title: 'Revenue Analytics',
      description: 'Comprehensive analytics dashboard showing sales trends, popular items, and revenue insights.'
    },
    {
      icon: '🔔',
      title: 'Real-time Notifications',
      description: 'Instant notifications for new orders, status changes, and important business updates.'
    }
  ];

  return (
    <div className='orders fade-in'>
      <div className="orders-header">
        <h1 className="orders-title">Orders Management</h1>
        <div className="orders-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="orders-container">
        <div className="orders-empty">
          <div className="empty-icon">📦</div>
          <h3 className="empty-title">Orders Management Coming Soon</h3>
          <p className="empty-description">
            We're building an amazing orders management system with powerful features to help you manage your restaurant efficiently.
          </p>
          <div className="coming-soon-badge">
            <span>🚀</span>
            Coming Soon
          </div>
        </div>
      </div>

      <div className="feature-preview">
        {upcomingFeatures.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h4 className="feature-title">{feature.title}</h4>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders