import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importe suas telas
import SignupForm from './pages/SignupForm'; 
import Dashboard_PJ from './pages/Dashboard_PJ'; 
import Dashboard_PF from './pages/Dashboard_PF'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Raiz (Login) */}
        <Route path="/" element={<SignupForm />} />
        
        {/* Rotas Específicas */}
        <Route path="/dashboard-pj" element={<Dashboard_PJ />} />
        <Route path="/dashboard-pf" element={<Dashboard_PF />} />
      </Routes>
    </Router>
  );
}

export default App;