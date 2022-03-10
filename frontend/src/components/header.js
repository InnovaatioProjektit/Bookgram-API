import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link } from 'react-router-dom'

export default function Header(){
    return (
        <div className="app-header">
        <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="menu">
            <ul>
                <li> <Link to="/">Home</Link> </li>
                <li> <Link to="/login">login</Link> </li>
            </ul>
        </div>
    </div>

    )
    
}
