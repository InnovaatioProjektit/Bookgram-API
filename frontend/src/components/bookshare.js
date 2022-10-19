import { useEffect, useState } from "react";
import { Avatar, Box, Chip, Container, createTheme, CssBaseline, Divider, Grid, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { stringAvatar } from "../utils/stringMods";

import BookItem from "./bookItem";
import { getBooksByUser } from "../api/books";
import { findUser } from "../api/auth";
import { Bookmark } from "@mui/icons-material";





/**
 * Julkisesti jaettava kokoelmalista, joka jaetaan julkisella linkillä. Listanäkymä
 * ei saa olla muokattavissa, vaikka kyseessä olisi kirjautunut omistaja. Muokkaukset ja muut 
 * muutokset pitää tehdä kokoelman hallintasivulla.
 */
export default (props) => {
    const [profile, setProfile] = useState()
    const [collection, setCollection] = useState(null);
    const { collectionID } = useParams();

    // hajotetaan puristettu linkki jossa on käyttäjä data ja kokoelma id
    const params = atob(collectionID).split("_")
    const user = params[0]
    const shelf = params[1]
    const title = params[2]

    useEffect(() => {
        // hae kokoelman teokset
        getBooksByUser(user, shelf).then(res => {
            if(res.data){
                setCollection(res.data)
            }
        })

        //hae kirjautuneen yleistiedot
        findUser(user).then((usr) => {
            const [success, data] = usr
            if(success){
                setProfile(data.rows)
            }
        })

    }, [collectionID])


    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container disableGutters maxWidth="100%">
            <Grid container sx={{ 
                    paddingTop: 5, 
                    paddingBottom: 10, 
                    paddingLeft: 20, 
                    paddingRight: 20, 
                    
                    bgcolor: '#ff54000d', 
                    height: '20vh' 
                    }}>
                        <Box sx= {{
                        mt: 0,
                        mx: "auto",
                        width: 1096,
                        maxWidth: "100%"
                    }}>

                    
                    <Divider>
                    <Stack
                        direction="row"
                        spacing= {2}
                        justifyContent="center"
                        width= "100%"
                        sx = {{
                            mb:4
                        }}
                    >

                        
                        <Typography
                        variant="h6"
                        component="h4"
                        color="text.primary"
                        >
                             <span>A curated collection by </span>{profile && profile.fullname +" "+ profile.lastname}
                        </Typography>
                    </Stack>
                    </Divider>
                    

                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        
                        <Bookmark/> {title}
                    </Typography>



                    </Box>
            </Grid>

            <Grid container sx={{
                    px: 20,
                    maxWidth: "100%"
                }}>

                <Box sx={{
                        mt: 0,
                        mx: "auto",
                        width: 1096,
                        
                        maxWidth: "100%"
                    }}>

                    <Typography variant="h5" sx={{py: 5}}>Books in this collection</Typography>
                    <Grid container spacing={5}>

                        {collection && collection.map((card) => (
                            <Grid item key={card.id} xs={8} md={3}>
                                <BookItem uid={null} data={card} />
                            </Grid>
                        ))}

                    </Grid>





                </Box>
            </Grid>

        </Container>
        </ThemeProvider>
       

    );
};