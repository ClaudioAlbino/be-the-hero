import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

//importação do pacote de ícones, "/fi" por ser do "feather icons"
//caso quisesse do "fontawnsome", seria "/fa"
//a "chaves{}" após o "import" é colocada para trazermos só os ícones que queremos
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

//importando a imagem "heroes.png" para a aplicação
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            
            //"localStorage" guardará a informação temporariamente do "id" 
            //e do "name" da ONG para usarmos nas outras páginas.
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        }catch (err) {
            alert('Falha no Login, tente novamente!');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    {/* trocado "a" por "link" para não ter que recarregar a página toda quando
                    chamarmos a página do link. Altera-se o "href" para "to"*/}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>

                </form>

            </section>

            <img src={heroesImg} alt="Heroes" />

        </div>
    )
}