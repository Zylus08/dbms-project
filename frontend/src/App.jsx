import { useEffect, useState } from 'react';
import axios from 'axios';
import { PackageX, Search, LogOut } from 'lucide-react';
import './App.css';

function App() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState('home');
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Auth State

  const fetchData = async () => {
    try {
      const [lostRes, foundRes] = await Promise.all([
        axios.get('${API_BASE_URL}/api/lost-items'),
        axios.get('{API_BASE_URL}/api/found-items')
      ]);
      setLostItems(lostRes.data);
      setFoundItems(foundRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo" style={{cursor: 'pointer'}} onClick={() => setActiveTab('home')}>
          📦 I FOUND
          <span className="logo-sub">Discover, Connect, Reclaim</span>
        </div>
        <div className="nav-links">
          <button className={`nav-link ${activeTab === 'home' ? 'home-btn' : ''}`} onClick={() => setActiveTab('home')}>Home</button>
          <button className={`nav-link ${activeTab === 'dashboard' ? 'home-btn' : ''}`} onClick={() => setActiveTab('dashboard')}>Browse Items</button>
          <button className={`nav-link ${activeTab === 'report-lost' ? 'home-btn' : ''}`} onClick={() => setActiveTab('report-lost')}>Report Lost</button>
          <button className={`nav-link ${activeTab === 'report-found' ? 'home-btn' : ''}`} onClick={() => setActiveTab('report-found')}>Report Found</button>
          
          {currentUser ? (
            <>
              <button className={`nav-link ${activeTab === 'profile' ? 'home-btn' : ''}`} onClick={() => setActiveTab('profile')}>Profile ({currentUser.name})</button>
              <button className="btn-signout" onClick={() => { setCurrentUser(null); setActiveTab('login'); }}>Sign Out</button>
            </>
          ) : (
            <button className="btn-signout" onClick={() => setActiveTab('login')}>Login / Sign Up</button>
          )}
        </div>
      </nav>

      <main className="main-content">
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div className="hero-layout">
            <div>
              <h1 className="hero-title">
                Find &<br/>
                Recover<br/>
                <span className="highlight">With Ease</span>
              </h1>
              <p className="hero-subtitle">
                Experience effortless recovery with our dedicated lost and found service.
              </p>
            </div>
            
            <div style={{display: 'flex', gap: '4rem', alignItems: 'center'}}>
              <div className="hero-actions">
                <button className="action-btn lost" onClick={() => setActiveTab('report-lost')}>
                  Lost <PackageX size={28} />
                </button>
                <button className="action-btn found" onClick={() => setActiveTab('report-found')}>
                  Found <Search size={28} />
                </button>
              </div>
              <div className="hero-visual" style={{width: '300px', height: '300px', borderRadius: '20px', background: 'url("https://www.guidanceforever.org/wp-content/uploads/2023/11/thapar-institute-of-engineering-and-technology-deemed-to-be-university-patiala-featured.jpg") center/cover', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}></div>
            </div>
          </div>
        )}

        {/* LOGIN / AUTH VIEW */}
        {activeTab === 'login' && (
          <AuthPanel onAuthSuccess={(user) => { setCurrentUser(user); setActiveTab('home'); }} />
        )}

        {/* REPORT LOST / REGISTER VIEW */}
        {(activeTab === 'report-lost' || activeTab === 'report-found') && (
          <div className="auth-split">
            {currentUser ? (
                <ReportForm 
                  type={activeTab === 'report-lost' ? 'lost' : 'found'} 
                  user={currentUser}
                  onSuccess={() => { fetchData(); setActiveTab('dashboard'); }} 
                />
            ) : (
                <div className="form-card" style={{textAlign: 'center'}}>
                  <h2 className="form-title" style={{color: '#c25c56'}}>Login Required</h2>
                  <p style={{marginBottom: '1rem'}}>You need to be logged in to report items.</p>
                  <button className="form-button" onClick={() => setActiveTab('login')}>Go to Login</button>
                </div>
            )}
            <VisualPanel />
          </div>
        )}

        {/* PROFILE VIEW */}
        {activeTab === 'profile' && currentUser && (
          <div className="form-card" style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👤</div>
            <h2 className="form-title" style={{ marginBottom: '0.5rem' }}>My Profile</h2>
            <p style={{ color: '#57534e', marginBottom: '2rem' }}>Manage your account details and settings here.</p>
            
            <div style={{ textAlign: 'left', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <div className="form-group" style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <label className="form-label" style={{ color: '#6dbc5c' }}>Name</label>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{currentUser.name}</div>
              </div>
              <div className="form-group" style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <label className="form-label" style={{ color: '#6dbc5c' }}>Email</label>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{currentUser.email}</div>
              </div>
              <div className="form-group" style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                <label className="form-label" style={{ color: '#6dbc5c' }}>Phone / Contact</label>
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{currentUser.phone}</div>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ color: '#6dbc5c' }}>Role</label>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', textTransform: 'capitalize' }}>{currentUser.role} — {currentUser.department} Dept.</div>
              </div>
            </div>
            
            <button className="form-button" style={{ marginTop: '2rem', width: '100%', background: '#c25c56' }} onClick={() => {setCurrentUser(null); setActiveTab('login');}}>
              Sign Out
            </button>
          </div>
        )}

        {/* DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="list-col">
              <div className="list-header lost">Lost Items ({lostItems.length})</div>
              {lostItems.map(item => (
                <div key={item.lost_id} className="item-card lost" style={{position: 'relative'}}>
                  {(currentUser && currentUser.user_id === item.user_id) && (
                      <button 
                        onClick={async () => {
                          if(window.confirm('Delete this lost item?')) {
                            await axios.delete(`${API_BASE_URL}/api/lost-items/${item.lost_id}`);
                            fetchData();
                          }
                        }} 
                        style={{position: 'absolute', right: '10px', top: '10px', background: 'transparent', border: 'none', color: '#c25c56', cursor: 'pointer', fontWeight: 'bold'}}
                      >X</button>
                  )}
                  <h4>{item.item_name}</h4>
                  <p>{item.description}</p>
                  <div className="item-meta">
                    <span>{item.category}</span>
                    <span>{item.lost_location}</span>
                  </div>
                  {/* Contact Info Block */}
                  <div style={{marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee', fontSize: '0.85rem'}}>
                     <strong style={{color: '#c25c56'}}>Lost By:</strong> {item.contact_name || 'System'}<br/>
                     <strong>Contact:</strong> {item.contact_email || 'N/A'} <br/> 
                     <strong>Phone:</strong> {item.contact_phone || 'N/A'}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="list-col">
              <div className="list-header found">Found Items ({foundItems.length})</div>
              {foundItems.map(item => (
                <div key={item.found_id} className="item-card found" style={{position: 'relative'}}>
                  {(currentUser && currentUser.user_id === item.user_id) && (
                      <button 
                        onClick={async () => {
                          if(window.confirm('Delete this found item?')) {
                            await axios.delete(`${API_BASE_URL}/api/found-items/${item.found_id}`);
                            fetchData();
                          }
                        }} 
                        style={{position: 'absolute', right: '10px', top: '10px', background: 'transparent', border: 'none', color: '#6dbc5c', cursor: 'pointer', fontWeight: 'bold'}}
                      >X</button>
                  )}
                  <h4>{item.item_name}</h4>
                  <p>{item.description}</p>
                  <div className="item-meta">
                    <span>{item.category}</span>
                    <span>{item.found_location}</span>
                  </div>
                  {/* Contact Info Block */}
                  <div style={{marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee', fontSize: '0.85rem'}}>
                     <strong style={{color: '#6dbc5c'}}>Found By:</strong> {item.contact_name || 'System'}<br/>
                     <strong>Contact:</strong> {item.contact_email || 'N/A'} <br/> 
                     <strong>Phone:</strong> {item.contact_phone || 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
           <div className="logo" style={{fontSize: '1.2rem'}}>
            📦 I FOUND
            <span className="logo-sub">Discover, Connect, Reclaim</span>
          </div>
        </div>
        <div>
          <h4>Site</h4>
          <ul>
            <li onClick={() => setActiveTab('dashboard')}>Lost</li>
            <li onClick={() => setActiveTab('report-lost')}>Report Lost</li>
            <li onClick={() => setActiveTab('dashboard')}>Found</li>
            <li onClick={() => setActiveTab('report-found')}>Report Found</li>
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li>Customer Support</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>Tel: +91 7290931767</li>
            <li>Email: smishra2_be24@thapar.edu, akumar_be24@thapar.edu, agulalia_be24@thapar.edu</li>
            <li style={{marginTop: '1rem'}}>🐦 📘 📸 🐱</li>
          </ul>
        </div>
        <div className="footer-copy">
          © Copyright 2024 Lost and Found<br/>All Right Reserved
        </div>
      </footer>
    </>
  );
}

// Subcomponents

function AuthPanel({ onAuthSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('student');
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'login' ? `${API_BASE_URL}/api/login` : `${API_BASE_URL}/api/signup`;
      const payload = mode === 'login' ? { username, password } : { username, password, phone, role };
      const res = await axios.post(endpoint, payload);
      onAuthSuccess(res.data.user);
    } catch (err) {
      alert(err.response?.data?.error || 'Authentication Failed');
    }
  };

  return (
    <div className="auth-split">
      <VisualPanel />
      <div className="form-card">
        <h2 className="form-title">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">User Name (or Email)</label>
            <input required type="text" className="form-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="your new name" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input required type="password" className="form-input" value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === 'login' ? "Enter password (default: password123)" : "Create a new password"} />
          </div>
          {mode === 'signup' && (
            <>
              <div className="form-group">
                <label className="form-label">Phone Reference</label>
                <input required type="text" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="000-000-0000" />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select className="form-input" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}
          <div className="form-row" style={{marginTop: '2rem'}}>
            {mode === 'login' ? (
                <>
                  <button type="submit" className="form-button">Sign In</button>
                  <button type="button" className="form-button" style={{background: '#cbd5e1', color: '#333'}} onClick={() => setMode('signup')}>Go to Sign Up</button>
                </>
            ) : (
                <>
                  <button type="submit" className="form-button">Register User</button>
                  <button type="button" className="form-button" style={{background: '#cbd5e1', color: '#333'}} onClick={() => setMode('login')}>Go to Login</button>
                </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function VisualPanel() {
  return (
    <div className="visual-panel">
      <div className="visual-overlay">
        <h3>Welcome to Our Lost and Found Website!</h3>
        <p>We're excited to help you find and recover lost items. Easily report lost belongings, search for found items, and connect with others. Our user-friendly platform aims to reunite you with your lost possessions quickly and efficiently.</p>
        <p style={{marginTop: '1rem'}}>Thank you for choosing our service. If you need assistance, feel free to contact us.</p>
        <p style={{marginTop: '1rem', fontStyle: 'italic'}}>Happy searching and best of luck!</p>
      </div>
    </div>
  );
}

function ReportForm({ type, user, onSuccess }) {
  const isLost = type === 'lost';
  const [formData, setFormData] = useState({
    item_name: '', category: '', description: '', location: '', date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLost ? `${API_BASE_URL}/api/lost-items` : `${API_BASE_URL}/api/found-items`;
    const payload = {
      user_id: user.user_id, // Link to auth user
      item_name: formData.item_name, category: formData.category, description: formData.description,
      [isLost ? 'lost_location' : 'found_location']: formData.location,
      [isLost ? 'lost_date' : 'found_date']: formData.date
    };
    try {
      await axios.post(endpoint, payload);
      onSuccess();
    } catch (err) {
      alert(`Error submitting: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title" style={{textAlign: 'left', marginBottom: '1.5rem'}}>Report {isLost ? 'Lost' : 'Found'} Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Item Name</label>
          <input required type="text" className="form-input" value={formData.item_name} onChange={e => setFormData({...formData, item_name: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <input required type="text" className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input required type="text" className="form-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input required type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input required type="text" className="form-input" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
        <button type="submit" className="form-button">Submit As {user.name}</button>
      </form>
    </div>
  );
}

export default App;
