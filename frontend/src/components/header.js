import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Toolbar, Button, IconButton, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import  { logout } from '../api/auth'

export default function Header(props){
    const {state, sections} = props;
    let token = state.useAuth()
    const loggedIn = !!token

    const navigate = useNavigate()

    function RegisterButton(){
        return(
            <Link to="/register"><Button variant="outlined" size="large">
                        Join Club
                    </Button></Link>
        )
    }

    function LogoutButton(){
        return(
            <Button variant="outlined" size="large" onClick={(ev) => {
                const success = logout()
                if(success){
                    navigate("/login")
                }
            }}>
                        Log out
                    </Button>
        )
    }
    
    return(
        <React.Fragment>
            <Toolbar sx={{ borderBotton: 1, borderColor: 'divider', backgroundColor: "#eceff1"  }}>
                {loggedIn ? <h5>Logged in as {token.user}</h5> : <Link to="/login"><Button size="large">Login</Button></Link> }
                <Typography 
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1}}
                    > {state.title} </Typography>
                    
                    {!!token ? <LogoutButton/> : <RegisterButton/> }
            </Toolbar>
            <Toolbar 
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto'}}
                >
                   {loggedIn && sections.map((section) => {
                       return <Link to={section.url}
                        color="inherit"
                        nowrap="true"
                        key={section.title}
                        variant="body"
                        sx={{p: 1, flexShrink: 0}}
                        >{section.title}</Link>
                   })}
                </Toolbar>
        </React.Fragment>
    );

     
}
