import React, {Fragment, useEffect} from 'react'
import {Routes, Route, Redirect, Link, useNavigate } from 'react-router-dom'

import { getDecodedToken } from './api/token'

import Home from './components/home'
import Header from './components/header'
import Login from './components/login'
import Register from './components/register'
import NotFound from "./components/notFound";


const App = () => {
  //  const navigate = useNavigate();

// const state = {
 //       decodedToken: getDecodedToken(), // hakee kirjautumisavaimen localStorage API:sta, jos se on tyhjä palauttaa null
 //   }
 //   const loggedIn = !!state.decodedToken

    

 //   const requireAuth = () => {
 //       if(loggedIn) <navigate to="login" />
 //   }
    

    return (
        <div className="App">
           <h1>hello World</h1>
        </div>
    )
}


export default App