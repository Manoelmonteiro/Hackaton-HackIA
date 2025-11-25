import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignupForm from './pages/SignupForm.jsx'; 
import Dashboard from './pages/Dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Raiz (Login) */}
        <Route path="/" element={<SignupForm />} />
        
        {/* Rota do Painel (Gráfico) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;