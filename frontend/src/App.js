import React, {Fragment, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Redirect, Link, useNavigate } from 'react-router-dom'



import { getDecodedToken } from './api/token'


import Login from './components/login'
import Register from './components/register'
import NotFound from "./components/notFound";


const App = () => {
    const navigate = useNavigate();

    const state = {
        decodedToken: getDecodedToken(), // hakee kirjautumisavaimen localStorage API:sta, jos se on tyhjä palauttaa null
    }
    const loggedIn = !!state.decodedToken

    useEffect(() => {
        navigate('login');
    })



    const requireAuth = () => {
        if(loggedIn) <navigate to="login" />
    }
    

    return (
        <Router>
        <div id="app" className="App">
          <Fragment>
              <Routes>
                <Route exact path="/" element={<Login /> } />
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route element={NotFound}/>
              </Routes>
            </Fragment>

        </div>
        </Router>


       
    )
}


export default App