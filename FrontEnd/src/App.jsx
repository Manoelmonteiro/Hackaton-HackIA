import React, { useState } from "react";

function Dashboard() {
  const [aparelho, setAparelho] = useState("");
  const [consumo, setConsumo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarDados = async () => {
    try {
      const response = await fetch("http://localhost:8000/atualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aparelho: aparelho,
          consumo: parseFloat(consumo)
        })
      });

      const data = await response.json();
      console.log("Retorno da API:", data);

      setMensagem("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setMensagem("Erro ao enviar dados.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Painel de Controle</h1>

      <input
        type="text"
        placeholder="Nome do aparelho"
        value={aparelho}
        onChange={(e) => setAparelho(e.target.value)}
      />

      <input
        type="number"
        placeholder="Consumo (kWh)"
        value={consumo}
        onChange={(e) => setConsumo(e.target.value)}
      />

      <button onClick={enviarDados}>Enviar para o Gráfico</button>

      {mensagem && <p>{mensagem}</p>}

      <img 
        
        src={`http://localhost:8000/static/grafico_aparelhos.png?${Date.now()}`}
        alt="Gráfico"
        style={{ marginTop: "20px", width: "80%", borderRadius: "10px" }}
      />
    </div>
  );
}

export default Dashboard;
