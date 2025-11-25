import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css'; 

const SignupForm = () => {
    const navigate = useNavigate();
    
    const [erro, setErro] = useState(''); 
    
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
        setErro(''); 

        if (!formData.nome || !formData.senha || !formData.tipoConta) {
            setErro("Por favor, preencha todos os campos!");
            return;
        }

        if (formData.senha.length < 6) {
            setErro("A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        if (formData.nome.trim().split(' ').length < 2) {
            setErro("Por favor, digite seu nome e sobrenome.");
            return;
        }
    
        console.log("Dados válidos! Enviando...", formData);
        navigate('/dashboard'); 
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

                    {/* 3. Área para EXIBIR o erro na tela para o usuário */}
                    {erro && (
                        <p style={{ color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center' }}>
                            {erro}
                        </p>
                    )}

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