import React, {useEffect, useRef, useState, useMemo} from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import  { register } from '../api/auth'

export default function Register(){
    const [err, setErr] = useState(false)
    const [pwdMatch, setPwdMatch] = useState(false)
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setErr(false)
        const data = new FormData(event.currentTarget);

        const credentials = {
            username: data.get('email'),
            password: data.get('lpassword'),
            name: data.get('name'),
            surname: data.get('surname')
        }

        setPwdMatch(credentials.password == data.get('rpassword'))

        if(!pwdMatch || err){
            return
        }

        console.log(credentials);
        const token = register(credentials)
        if(token){
            console.log(token)
        }
    };


    function InfoPanel(props){
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {err && "Submit failed"}
            </Typography>
        )
    }

    const theme = createTheme();


    const validateEmail = (e) => {
        console.log("validate", e, this)
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    }


    return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                            required
                            fullWidth
                            id="name"
                            label="First Name"
                            name="name"
                            autoComplete="given-name"
                            autoFocus
                        />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                            required
                            fullWidth
                            id="lastname"
                            label="Surname"
                            name="lastname"
                            autoComplete="family-name"
                            autoFocus
                        />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                        error= { err }
                        helperText={err && "Invalid Email Address. Try Another."}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange= { (e) => { setErr(validateEmail(e.target.value))  }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                            error = { !pwdMatch }
                            helperText={!pwdMatch && "Passwords do not match."}
                            margin="normal"
                            required
                            fullWidth
                            name="lpassword"
                            label="Type Password"
                            type="password"
                            id="lpassword"
                            autoComplete="new-password"
                        />
                        <TextField
                            error = { !pwdMatch }
                            helperText={!pwdMatch && "Passwords do not match."}
                            margin="normal"
                            required
                            fullWidth
                            name="rpassword"
                            label="Retype Password"
                            type="password"
                            id="rpassword"
                            autoComplete="new-password"
                        />
                  </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" variant="body2">
                        Already have an account? Log in here
                    </Link>
                </Grid>
            </Grid>
        </Box>
        </Box>
        <InfoPanel sx={{ mt: 4}} />
        </Container>
        </ThemeProvider>
    );
}