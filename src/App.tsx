import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Spaceapi from './Spaceapi';
import Login from './Login';
import Register from './Register';
import './index.css'

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <div className="stars" aria-hidden="true"></div>
      <div className="twinkling" aria-hidden="true"></div>

      
      
      <div className="app-container">
        <aside className="sidebar sidebar-left" aria-label="Left sidebar"></aside>
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <header>
                  <div id="logoparent">
                    <a href="https://mfrspace.blog">
                      <img className="head-logo" id="logo" src="/OCPR.png" alt="MFR Space Blog Logo"></img>
                    </a>
                  </div>
                  <h1>The MFR Space Blog</h1>
                </header>
                <Spaceapi/>
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        
        <aside className="sidebar sidebar-right" aria-label="Right sidebar">
          {!isAuthPage && (
            <nav className="sidebar-nav">
              <Link to="/login" className="sidebar-btn">Login</Link>
              <Link to="/register" className="sidebar-btn">Register</Link>
            </nav>
          )}
        </aside>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
