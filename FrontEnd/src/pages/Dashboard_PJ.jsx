import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard_PJ.css'; // Garanta que o CSS bonito esteja aqui

const Dashboard_PJ = () => {
  const navigate = useNavigate();

  // --- LÓGICA (Que você mandou) ---
  const [aparelho, setAparelho] = useState("");
  const [consumo, setConsumo] = useState("");
  const [mensagem, setMensagem] = useState("");
  
  // Trigger para atualizar a imagem
  const [updateTrigger, setUpdateTrigger] = useState(Date.now());

  const enviarDados = async (e) => {
    e.preventDefault();

    if (!aparelho || !consumo) {
        setMensagem("Preencha todos os campos!");
        return;
    }

    try {
      const response = await fetch("http://localhost:8000/atualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aparelho: aparelho,
          consumo: parseFloat(consumo)
        })
      });

      if (response.ok) {
        setMensagem("Dados enviados com sucesso!");
        setAparelho(""); 
        setConsumo("");
        // Força a imagem a recarregar
        setUpdateTrigger(Date.now());
      } else {
        setMensagem("Erro ao salvar no backend.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  // URL da imagem apontando para a rota do FastAPI
  // Se você configurou a rota estática, mantenha /static/. Se configurou FileResponse, use /imagem-grafico
  const graficoUrl = `http://localhost:8000/static/grafico_aparelhos.png?${updateTrigger}`; 

  // --- VISUAL (Estética Dark) ---
  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Painel de Controle</h1>
        <button className="logout-btn" onClick={() => navigate('/')}>Sair</button>
      </header>

      <main className="content">
        
        {/* Cartão da Esquerda: Formulário */}
        <div className="card input-card">
            <h3>Novo Registro</h3>
            <form onSubmit={enviarDados} className="dashboard-form">
                <input
                    type="text"
                    placeholder="Nome do aparelho"
                    className="input-field-dark"
                    value={aparelho}
                    onChange={(e) => setAparelho(e.target.value)}
                />
                
                <input
                    type="number"
                    placeholder="Consumo (kWh)"
                    className="input-field-dark"
                    value={consumo}
                    onChange={(e) => setConsumo(e.target.value)}
                />

                <button type="submit" className="action-btn">
                    Enviar para o Gráfico
                </button>
            </form>
            {mensagem && <p className="msg-status">{mensagem}</p>}
        </div>

        {/* Cartão da Direita: Imagem */}
        <div className="card chart-card">
          <h3>Consumo em Tempo Real</h3>
          <div className="image-wrapper">
            <img 
              src={graficoUrl} 
              alt="Gráfico de Consumo" 
              className="chart-img"
              onError={(e) => {
                  // Se a imagem quebrar, esconde ela ou mostra aviso
                  e.target.style.display = 'none'; 
                  console.log("Erro ao carregar imagem. Backend está rodando?");
              }}
              onLoad={(e) => e.target.style.display = 'block'}
            />
          </div>
        </div>

      </main>
    </div>
  );

  
};

export default Dashboard_PJ;