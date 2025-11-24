import React, { useState } from 'react';
import './SignupForm.css'; // Importando o CSS

const SignupForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    tipoConta: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // Lógica de envio aqui
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Crie sua Conta</h2>
        
        <form onSubmit={handleSubmit} className="form">
          {/* Input Nome */}
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            className="input-field"
            value={formData.nome}
            onChange={handleChange}
          />

          {/* Select Tipo de Conta */}
          <div className="select-wrapper">
            <select
              name="tipoConta"
              className="input-field select-field"
              value={formData.tipoConta}
              onChange={handleChange}
            >
              <option value="" disabled hidden>Tipo de Conta ⌄</option>
              <option value="pessoal">Pessoal</option>
              <option value="empresarial">Empresarial</option>
            </select>
          </div>

          {/* Input Senha */}
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            className="input-field"
            value={formData.senha}
            onChange={handleChange}
          />

          {/* Botão Cadastrar */}
          <button type="submit" className="submit-btn">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;