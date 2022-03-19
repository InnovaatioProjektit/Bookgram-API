import React, {createContext, useContext, useEffect, useState} from 'react'
import {Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { getDecodedToken } from './api/token'

import Home from './components/home'
import Header from './components/header'
import Footer from './components/footer'
import Login from './components/login'
import Register from './components/register'
import NotFound from "./components/notFound";

import BookCollection from './components/booklist'
import BookReviews from './components/bookreviews'


const sections = [
    { title: 'All Books', url: '/' },
    { title: 'My Collection', url: '/booklist' },
    { title: 'My Likes', url: '/reviews' }
  ];


const App = () => {

    let state = {
        title: "Between Books",
        token: getDecodedToken,
        useAuth: () => {
            return getDecodedToken()
        }
    }

    const RequireAuth = ({ children }) => {
        return !!state.useAuth() ? children : <Navigate to="register" />
    }

    return (
       
        <div className="App">
            <Header state={state} sections={sections} />
            <Routes>
                <Route exact path="/" element={ <RequireAuth> <Home state={state} /> </RequireAuth> } />
                <Route path="reviews" element={ <RequireAuth> <BookReviews /> </RequireAuth> }/>
                <Route path="booklist" element={ <RequireAuth> <BookCollection state={state} /> </RequireAuth> }/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
            <Footer />
        </div>
    
    )
}


export default App