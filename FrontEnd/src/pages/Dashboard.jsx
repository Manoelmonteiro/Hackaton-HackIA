import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // URL do seu backend FastAPI
  const graficoUrl = "http://localhost:8000/api/grafico/vendas"; 

  return (
    <div className="dashboard-container">
      {/* Cabeçalho simples */}
      <header className="header">
        <h1>Painel de Controle</h1>
        <button className="logout-btn">Sair</button>
      </header>

      <main className="content">
        {/* Card do Gráfico */}
        <div className="chart-card">
          <h3>Consumo Mensal de Energia</h3>
          <p className="subtitle">Visualização gerada via Python (Matplotlib)</p>
          
          <div className="image-wrapper">
            {/* A mágica acontece aqui: O src é a URL do FastAPI */}
            <img 
              src={graficoUrl} 
              alt="Gráfico de Consumo" 
              className="chart-img"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;