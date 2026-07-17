import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Zap, ArrowRight, Atom, Sparkles, GraduationCap, User } from 'lucide-react';

const FloatingParticle = ({ delay, size, left, duration }) => (
  <div style={{
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: '50%',
    background: `radial-gradient(circle, rgba(251,196,116,0.35) 0%, rgba(92,124,150,0.15) 100%)`,
    left: left,
    bottom: '-20px',
    animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
    pointerEvents: 'none',
    filter: 'blur(1px)',
  }} />
);

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Animated Background Particles */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <FloatingParticle delay={0} size="12px" left="10%" duration={8} />
        <FloatingParticle delay={1.5} size="8px" left="25%" duration={10} />
        <FloatingParticle delay={0.5} size="15px" left="40%" duration={7} />
        <FloatingParticle delay={2} size="10px" left="55%" duration={9} />
        <FloatingParticle delay={1} size="6px" left="70%" duration={11} />
        <FloatingParticle delay={3} size="14px" left="85%" duration={8} />
        <FloatingParticle delay={0.8} size="9px" left="95%" duration={10} />
      </div>

      {/* Decorative Gradient Orbs */}
      <div style={{
        position: 'fixed', top: '-150px', right: '-150px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,196,116,0.15) 0%, transparent 70%)',
        transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
        transition: 'transform 0.8s ease-out',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-200px', left: '-100px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(92,124,150,0.15) 0%, transparent 70%)',
        transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
        transition: 'transform 0.8s ease-out',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '2rem 1rem 4rem' }}>

        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          paddingTop: '3rem',
          paddingBottom: '2.5rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Animated Icon */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            boxShadow: '0 8px 32px rgba(92,124,150,0.25), 0 0 0 8px rgba(92,124,150,0.06)',
            marginBottom: '1.5rem',
            animation: 'pulse 3s ease-in-out infinite',
          }}>
            <Atom size={48} color="white" strokeWidth={1.5} />
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradientShift 4s ease-in-out infinite',
            marginBottom: '0.75rem',
            letterSpacing: '-1px',
          }}>
            VindLab
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: 'var(--primary)',
            fontWeight: 600,
            marginBottom: '0.25rem',
            letterSpacing: '0.5px',
          }}>
            Laboratorium Virtual terkombinasi LKPD
          </p>
          <p style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: 'var(--text-muted)',
            fontWeight: 500,
          }}>
            Materi Usaha dan Energi
          </p>
        </div>

        {/* Experiment Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto 3rem',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}>
          {/* Card Usaha */}
          <Link to="/usaha" style={{ textDecoration: 'none' }}>
            <div className="glass" style={{
              padding: '2.5rem 2rem',
              borderRadius: '20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              borderTop: '3px solid var(--primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(92,124,150,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}>
              {/* Decorative corner */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '100px', height: '100px',
                background: 'radial-gradient(circle at top right, rgba(92,124,150,0.1) 0%, transparent 70%)',
                borderRadius: '0 20px 0 0',
              }} />

              <div style={{
                width: '72px', height: '72px', borderRadius: '18px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
                boxShadow: '0 4px 16px rgba(92,124,150,0.2)',
              }}>
                <Settings size={32} color="white" />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>Eksperimen Usaha</h2>
              <div className="btn btn-primary" style={{
                width: '100%', fontSize: '1rem', padding: '0.85rem 1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              }}>
                Mulai Eksperimen <ArrowRight size={18} />
              </div>
            </div>
          </Link>

          {/* Card Energi */}
          <Link to="/energi" style={{ textDecoration: 'none' }}>
            <div className="glass" style={{
              padding: '2.5rem 2rem',
              borderRadius: '20px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              borderTop: '3px solid var(--secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(251,196,116,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '100px', height: '100px',
                background: 'radial-gradient(circle at top right, rgba(251,196,116,0.15) 0%, transparent 70%)',
                borderRadius: '0 20px 0 0',
              }} />

              <div style={{
                width: '72px', height: '72px', borderRadius: '18px',
                background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary-hover) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
                boxShadow: '0 4px 16px rgba(251,196,116,0.25)',
              }}>
                <Zap size={32} color="white" />
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>Eksperimen Energi</h2>
              <div className="btn btn-secondary" style={{
                width: '100%', fontSize: '1rem', padding: '0.85rem 1.5rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--secondary), var(--secondary))',
              }}>
                Mulai Eksperimen <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div style={{
          maxWidth: '500px',
          margin: '0 auto',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            border: '1px solid rgba(92,124,150,0.15)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(92,124,150,0.15), rgba(92,124,150,0.05))',
              marginBottom: '1rem',
              color: 'var(--primary)',
            }}>
              <GraduationCap size={24} />
            </div>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Dikembangkan Oleh
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: '1.5' }}>
              Program Studi S1 Pendidikan Fisika
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Fakultas Matematika dan Ilmu Pengetahuan Alam
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontWeight: 600 }}>
              2026
            </p>
            <div style={{ width: '60px', height: '2px', margin: '1.5rem auto', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '2px' }} />
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(92,124,150,0.15), rgba(92,124,150,0.05))',
              marginBottom: '1rem',
              color: 'var(--primary)',
            }}>
              <User size={24} />
            </div>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Pengembang
            </p>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              Iklil Nur Chakimah
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Mahasiswa S1 Pendidikan Fisika
            </p>
          </div>
        </div>

      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 32px rgba(92,124,150,0.3), 0 0 0 8px rgba(92,124,150,0.08); }
          50% { box-shadow: 0 8px 40px rgba(92,124,150,0.4), 0 0 0 16px rgba(92,124,150,0.04); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Home;
