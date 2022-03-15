import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link } from 'react-router-dom'
import { Toolbar, Button, IconButton, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Header(props){
    const {state, sections} = props;

    const loggedIn = !!state.decodedToken

    function RegisterButton(){
        return(
            <Link to="/register"><Button variant="outlined" size="large">
                        Sign Up
                    </Button></Link>
        )
    }

    function LogoutButton(){
        return(
            <Link to="/logout"><Button variant="outlined" size="large">
                        Log out
                    </Button></Link>
        )
    }
    
    return(
        <React.Fragment>
            <Toolbar sx={{ borderBotton: 1, borderColor: 'divider', backgroundColor: "#eceff1"  }}>
                {!loggedIn && <Link to="/login"><Button size="large">Login</Button></Link> }
                <Typography 
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1}}
                    > {state.title} </Typography>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    {loggedIn ? <LogoutButton/> : <RegisterButton/> }
            </Toolbar>
            <Toolbar 
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto'}}
                >
                   {sections.map((section) => {
                       <Link to={section.url}
                        color="inherit"
                        noWrap 
                        key={section.title}
                        variant="body"
                        sx={{p: 1, flexShrink: 0}}
                        >{section.title}</Link>
                   })}
                </Toolbar>
        </React.Fragment>
    );

     
}
