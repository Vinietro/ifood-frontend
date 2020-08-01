import React from 'react';
// import axios from 'axios';

import './style.scss'

import logo from '../../assets/logo.png'

import environment from '../../environment';

const Home = () => {
    const loginUser = () => {
        window.location.href= `${environment.urlAuthorizeSpotify}?client_id=${environment.clientId}&response_type=token&redirect_uri=${environment.urlAplication}/playlist`;
    }

    return (
        <div id="page-home">
            <div className="content">
                <main>
                    <img src={logo} alt="Ifood Music" />
                    <button onClick={loginUser}>Entrar</button>
                </main>
            </div>
        </div>
    )
}

export default Home;