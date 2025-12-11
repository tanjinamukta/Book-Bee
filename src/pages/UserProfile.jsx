import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../services/orderService';
import { getAllUsers, updateUserRole } from '../services/userService';

const UserProfile = () => {
  const { user, userProfile, updateUserProfileData, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // Initialize form data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || user.name || '',
        email: userProfile.email || user.email || '',
        phone: userProfile.phone || '',
        address: userProfile.address || {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        }
      });
    } else if (user) {
      // If userProfile doesn't exist yet, use data from auth
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        }
      });
    }
  }, [userProfile, user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user orders
        const ordersData = await getUserOrders(user.uid);
        setOrders(ordersData);
        
        // If admin, fetch all users
        if (userProfile?.role === 'admin') {
          const usersData = await getAllUsers();
          setUsers(usersData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, userProfile, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);
    setUpdateError('');
    
    try {
      const result = await updateUserProfileData(formData);
      if (result.success) {
        setUpdateSuccess(true);
        setIsEditing(false);
        // Refresh the user profile data
        await refreshUserProfile();
      } else {
        setUpdateError(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateError(error.message || 'An error occurred while updating your profile');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      // Refresh users list
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (loading) {
    return <div className="container">Loading profile...</div>;
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="user-profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            {userProfile?.role === 'admin' && (
              <button 
                className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                Users
              </button>
            )}
          </div>
        </div>

        {updateSuccess && (
          <div className="alert alert-success">
            Profile updated successfully!
          </div>
        )}

        {updateError && (
          <div className="alert alert-error">
            {updateError}
          </div>
        )}

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-card">
                <div className="profile-header-section">
                  <div className="profile-avatar">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="profile-info">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <span className={`role-badge ${userProfile?.role}`}>
                      {userProfile?.role || 'customer'}
                    </span>
                  </div>
                  <button 
                    className="btn btn-outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <h3>Address</h3>
                    <div className="form-group">
                      <label>Street</label>
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address.street}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input
                          type="text"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>ZIP Code</label>
                        <input
                          type="text"
                          name="address.zip"
                          value={formData.address.zip}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Country</label>
                        <input
                          type="text"
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-details">
                    <div className="detail-row">
                      <span className="label">Name:</span>
                      <span>{userProfile?.name || user.name || 'Not provided'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Email:</span>
                      <span>{userProfile?.email || user.email || 'Not provided'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Phone:</span>
                      <span>{userProfile?.phone || 'Not provided'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Address:</span>
                      <span>
                        {userProfile?.address?.street || 'Not provided'}<br />
                        {userProfile?.address?.city && userProfile?.address?.state && userProfile?.address?.zip 
                          ? `${userProfile.address.city}, ${userProfile.address.state} ${userProfile.address.zip}` 
                          : 'Not provided'
                        }
                        <br />
                        {userProfile?.address?.country || 'Not provided'}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Member Since:</span>
                      <span>
                        {userProfile?.createdAt?.toDate?.().toLocaleDateString() || 'Unknown'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="profile-section">
              <div className="profile-card">
                <h2>Order History</h2>
                {orders.length === 0 ? (
                  <div className="empty-state">
                    <p>You haven't placed any orders yet.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate('/books')}
                    >
                      Browse Books
                    </button>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="order-item">
                        <div className="order-header">
                          <div>
                            <h3>Order #{order.id.slice(-6)}</h3>
                            <p>{order.createdAt?.toDate?.().toLocaleDateString()}</p>
                          </div>
                          <span className={`status-badge ${order.status}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="order-details">
                          <div className="order-items">
                            {order.items.map((item, index) => (
                              <div key={index} className="order-item-detail">
                                <span>{item.title} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="order-total">
                            <span>Total:</span>
                            <span>${order.total?.toFixed(2) || '0.00'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && userProfile?.role === 'admin' && (
            <div className="profile-section">
              <div className="profile-card">
                <h2>User Management</h2>
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Member Since</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <select 
                              value={u.role}
                              onChange={(e) => handleRoleChange(u.id, e.target.value)}
                              className="role-select"
                            >
                              <option value="customer">Customer</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td>{u.createdAt?.toDate?.().toLocaleDateString()}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline"
                              onClick={() => navigate(`/user/${u.id}`)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;