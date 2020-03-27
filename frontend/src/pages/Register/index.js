import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    //constantes para guardar os valores dos inputs do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    //chamando o "useHistory" fará com que após o cadastro
    //o usuário seja direcionado para alguma outra página
    const history = useHistory();

    //a função "handleRegister" será responsável por fazer o cadastro do usuário
    //ela será disparada assim que o formulário der um "submit"
    async function handleRegister(e) {
        //o "preventDefault" não deixa a página se recarregar sem ação
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        //"try" e "catch" são usados para retornar ações
        //caso dê certo, retorna o conteúdo de "try"
        //e caso dê errado, o de "cath".
        try {
             //pegar a resposta do cadastro para passar uma mensagem
            //ao usuário, como "sucesso" e etc.
            //sempre que usar o "await" é necessário colocar o "async" antes da função.
            const response = await api.post('ongs', data);

            //usando as "crases ``" conseguimos colocar uma "template string $"
            //que é uma variável dentra resposta, neste caso, o "alert".
            alert(`Seu ID de acesso: ${response.data.id}`);

            //após dar certo o cadastro, o usuário retornará para a "raiz /"
            history.push('/');
        } catch {
            alert('Erro no cadastro, tente novamente!')
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="tel" 
                        placeholder="WhatsApp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }} 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}