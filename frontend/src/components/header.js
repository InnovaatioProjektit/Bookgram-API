import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Toolbar, Button, IconButton, Typography, Box, ListItem, List, ListItemButton} from '@mui/material';

import  { logout } from '../api/auth'

export default function Header(props){
    const {state, sections} = props;
    let token = state.useAuth()

    const loggedIn = !!token

    const navigate = useNavigate()

    function RegisterButton(){
        return( <Link to="/register">
                    <Button sx={{
                                flexBasis: 0,
                                flexGrow: 1,
                                textAlign: "center"}}>
                                    <Box
                                    sx={{
                                        borderRadius: 1,
                                        backgroundColor: "#4c94ff",
                                        color: "#fff",
                                        textTransform: "uppercase",
                                        fontWeight: 500,
                                        padding: "10px 29px 10px",
                                        '&:hover': {
                                            backgroundColor: "#1775ff"
                                        },
                                        '&:focus':{
                                            backgroundColor: "#1775ff"
                                        }
                                        
                                        }}>
                                                    Join Club
                                </Box>
                        </Button>
            </Link>)
    }

    function LoginButton(){
        return( <Link to="/login">
                    <Button sx={{
                                flexBasis: 0,
                                flexGrow: 1,
                                textAlign: "center"}}>
                                    <Box variant="outlined"
                                    sx={{
                                        borderRadius: 1,
                                        backgroundColor: "#4c94ff",
                                        color: "#fff",
                                        textTransform: "uppercase",
                                        fontWeight: 500,
                                        padding: "10px 29px 10px",
                                        '&:hover': {
                                            backgroundColor: "#1775ff"
                                        },
                                        '&:focus':{
                                            backgroundColor: "#1775ff"
                                        }
                                        
                                        }}>
                                                    Sign In
                                </Box>
                        </Button>
            </Link>)
    }

    function LogoutButton(){
        return(
    
            <Button variant="outlined" sx={{padding: 2}} 
            onClick={(ev) => {
                const success = logout()
                if(success){
                    navigate("/login")
                }
            }}>
                        Sign out
            </Button>
        )
    }
    
    return(
        <React.Fragment>
            <Toolbar sx={{ borderBotton: 2, borderColor: 'divider', backgroundColor: "#eceff1"  }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                     letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}>
                        {state.title}
                </Typography>

                
                <Box sx={{ flexGrow: 1}} />



                
                <Box sx={{ flexGrow: 1}}>
                    {loggedIn && sections.map((section) => {
                     return  <Button key={section.title}>
            
                                <Link style={{textDecoration: "none"}} to={section.url}>
                                        {section.title}
                                </Link>
                            </Button>
                            
                    })}
                </Box>



                {!!token ? <LogoutButton/> : <RegisterButton/> }
                {!loggedIn && <LoginButton/> }

                    
                
            </Toolbar>
            <Toolbar 
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto'}}
                >
                    <Box sx={{ flexGrow: 1}} />
                    {loggedIn && <Typography>Logged in as {token.user}</Typography>}

                </Toolbar>
        </React.Fragment>
    );

     
}