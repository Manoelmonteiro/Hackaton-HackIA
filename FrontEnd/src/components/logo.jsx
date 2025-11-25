import React from 'react';
import './Logo.css'; // Importa o CSS específico da logo

const Logo = () => {
  return (
    <h1 className="app-logo">
      {/* A parte verde */}
      <span className="logo-watt">Watt</span>
      {/* A parte cinza */}
      <span className="logo-solutions">Solutions</span>
    </h1>
  );
};

export default Logo;