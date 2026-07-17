import React from 'react';

const SectionCard = ({ title, icon, children, delay = 0 }) => {
  return (
    <div className="glass animate-fade-in" style={{
      padding: '2rem',
      borderRadius: 'var(--radius-lg)',
      marginBottom: '2rem',
      animationDelay: `${delay}s`,
      borderTop: '4px solid var(--primary)'
    }}>
      <h2 style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        marginBottom: '1.5rem',
        color: 'var(--primary-hover)',
        fontSize: '1.5rem'
      }}>
        {icon}
        {title}
      </h2>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
