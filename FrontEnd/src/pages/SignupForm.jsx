import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css'; 
import Logo from '../components/logo'; // Certifique-se que o nome do arquivo bate com o import

const SignupForm = () => {
    const navigate = useNavigate();
    
    const [erro, setErro] = useState(''); 
    
    const [formData, setFormData] = useState({
        nome: '',
        tipoConta: '', // O valor aqui será 'pessoal' ou 'empresarial'
        senha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErro(''); 

        // Validações
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
    
        console.log("Dados válidos! Redirecionando...", formData);

        // --- AQUI ESTÁ A MUDANÇA ---
        // Verifica o que o usuário escolheu no select e manda para a rota certa
        if (formData.tipoConta === 'empresarial') {
            navigate('/dashboard-pj');
        } else {
            // Se for 'pessoal' (ou qualquer outro caso), vai para o PF
            navigate('/dashboard-pf');
        }
    };

    return (
        <div className="container">
            <div className="card">
                {/* Ajuste de estilo da logo para ficar centralizada */}
                <div style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>
                    <Logo />
                </div>

                <h2 className="title">Crie sua Conta</h2>
                
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        className="input-field"
                        value={formData.nome}
                        onChange={handleChange}
                    />

                    <div className="select-wrapper">
                        <select
                            name="tipoConta"
                            className="input-field select-field"
                            value={formData.tipoConta}
                            onChange={handleChange}
                        >
                            <option value="" disabled hidden>Tipo de Conta ⌄</option>
                            {/* Os valores 'value' aqui devem bater com o if lá em cima */}
                            <option value="pessoal">Pessoa Física</option>
                            <option value="empresarial">Pessoa Jurídica</option>
                        </select>
                    </div>

                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        className="input-field"
                        value={formData.senha}
                        onChange={handleChange}
                    />

                    {erro && (
                        <p style={{ color: '#ff4d4d', fontSize: '0.9rem', textAlign: 'center' }}>
                            {erro}
                        </p>
                    )}

                    <button type="submit" className="submit-btn">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;