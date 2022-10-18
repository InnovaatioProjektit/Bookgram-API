import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Toolbar, Button, Box, Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" to="#">
          Alexandr Liski
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  

export default function Footer(props){
    const theme = createTheme();
    return(
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                    Author
                    </Typography>
                    <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                    >
                    Google Books API © Google.com
                    </Typography>
                    <Copyright />
                </Box>
            </ThemeProvider>
            <CssBaseline />
        </React.Fragment>
    );

     
}
