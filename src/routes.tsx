import React from 'react';

import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Playlist from './pages/Playlist';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Playlist} path="/playlist" />
        </BrowserRouter>
    )
}

export default Routes;