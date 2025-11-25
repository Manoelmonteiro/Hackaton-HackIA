import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard_PF.css';

const Dashboard_PF = () => {
  const navigate = useNavigate();

  const [consumo, setConsumo] = useState("");
  const [resultado, setResultado] = useState(null); // null, 'aprovado' ou 'reprovado'

  const verificarTarifa = (e) => {
    e.preventDefault();

    if (!consumo) return;

    const valor = parseFloat(consumo);

    // Lógica da Tarifa Social (Menor ou igual a 80 kWh)
    if (valor <= 80) {
        setResultado('aprovado');
    } else {
        setResultado('reprovado');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Painel Pessoa Física</h1>
        <button className="logout-btn" onClick={() => navigate('/')}>Sair</button>
      </header>

      <main className="content">
        
        {/* Único Cartão Centralizado */}
        <div className="card input-card" style={{ maxWidth: '500px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Verificar Tarifa Social
            </h3>
            
            <form onSubmit={verificarTarifa} className="dashboard-form">
                <label style={{ color: '#ccc', marginLeft: '10px' }}>
                    Qual foi o seu consumo este mês?
                </label>
                
                <input
                    type="number"
                    placeholder="Ex: 75 kWh"
                    className="input-field-dark"
                    value={consumo}
                    onChange={(e) => {
                        setConsumo(e.target.value);
                        setResultado(null); // Limpa o resultado ao digitar de novo
                    }}
                />

                <button type="submit" className="action-btn">
                    Verificar Direito
                </button>
            </form>

            {/* Área de Resposta Condicional */}
            {resultado === 'aprovado' && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    backgroundColor: 'rgba(196, 240, 42, 0.1)', 
                    border: '1px solid #c4f02a', 
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    <h4 style={{ color: '#c4f02a', fontSize: '1.2rem' }}>Parabéns! 🎉</h4>
                    <p style={{ marginTop: '5px', color: 'white' }}>
                        Seu consumo foi de <strong>{consumo} kWh</strong>.
                        Você tem direito à <strong>Tarifa Social</strong> de Energia Elétrica.
                    </p>
                </div>
            )}

            {resultado === 'reprovado' && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '15px', 
                    backgroundColor: 'rgba(255, 77, 77, 0.1)', 
                    border: '1px solid #ff4d4d', 
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    <h4 style={{ color: '#ff4d4d', fontSize: '1.1rem' }}>Atenção</h4>
                    <p style={{ marginTop: '5px', color: 'white' }}>
                        Seu consumo de <strong>{consumo} kWh</strong> ultrapassou o limite de 80 kWh para isenção total/desconto máximo.
                    </p>
                </div>
            )}
        </div>

      </main>
    </div>
  );
};

export default Dashboard_PF;