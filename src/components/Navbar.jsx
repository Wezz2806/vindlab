import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Beaker, Zap } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="no-print" style={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>
          <Beaker size={24} />
          <span>VindLab</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: location.pathname === '/' ? 600 : 500
          }}>
            <Home size={18} /> Beranda
          </Link>
          <Link to="/usaha" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: location.pathname === '/usaha' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: location.pathname === '/usaha' ? 600 : 500
          }}>
            <Beaker size={18} /> Usaha
          </Link>
          <Link to="/energi" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: location.pathname === '/energi' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: location.pathname === '/energi' ? 600 : 500
          }}>
            <Zap size={18} /> Energi
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
