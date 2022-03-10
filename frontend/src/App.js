import React, {Fragment, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Redirect, Link, useNavigate } from 'react-router-dom'



import { getDecodedToken } from './api/token'

import Header from './components/header'
import Login from './components/login'
import Register from './components/register'
import NotFound from "./components/notFound";


const App = () => {
    const navigate = useNavigate();

    const state = {
        decodedToken: getDecodedToken(), // hakee kirjautumisavaimen localStorage API:sta, jos se on tyhjä palauttaa null
    }
    const loggedIn = !!state.decodedToken

    

    const requireAuth = () => {
        if(loggedIn) <navigate to="login" />
    }
    

    return (
        <Router>
             <Routes>
                <Route exact path="/" component={<Header /> } />
                <Route path="login" component={<Login />}/>
                <Route path="register" component={<Register />}/>
                <Route element={NotFound}/>
              </Routes>
        </Router>
    )
}


export default App