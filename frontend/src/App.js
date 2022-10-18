import React, {createContext, useContext, useEffect, useState} from 'react'
import {Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { getDecodedToken } from './api/token'

import Home from './components/home'
import Header from './components/header'
import Footer from './components/footer'
import Login from './components/login'
import Register from './components/register'
import NotFound from "./components/notFound";

import BookList from './components/booklist'
import BookReviews from './components/bookreviews'
import BookInfo from  './components/bookinfo'
import SharedList from './components/bookshare'


const sections = [
    { title: 'All Books', url: '/' },
    { title: 'My Collections', url: '/booklist' },
    { title: 'My Likes', url: '/reviews' }
  ];


const App = () => {

    let state = {
        title: "Bookgram",
        token: getDecodedToken,
        useAuth: () => {
            return getDecodedToken()
        }
    }

    const RequireAuth = ({ children }) => {
        return !!state.useAuth() ? children : <Navigate to="/login" />
    }

    return (
       
        <div className="App">
            <Header state={state} sections={sections} />
            <Routes>
                <Route exact path="/" element={ <RequireAuth> <Home state={state} /> </RequireAuth> } />
                <Route path="reviews" element={ <RequireAuth> <BookReviews /> </RequireAuth> }/>
                <Route path="booklist" element={ <RequireAuth> <BookList state={state} /> </RequireAuth> }/>
                <Route path="booklist/share/:collectionID" element={<SharedList />}/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route path="book/details/:bookID" element={<BookInfo state={state} />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
            <Footer />
        </div>
    
    )
}


export default App