import { useEffect, useState } from "react";
import { Avatar, Box, Chip, Container, createTheme, CssBaseline, Divider, Grid, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { stringAvatar } from "../utils/stringMods";

import BookItem from "./bookItem";





/**
 * Julkisesti jaettava kokoelmalista, joka jaetaan julkisella linkillä. Listanäkymä
 * ei saa olla muokattavissa, vaikka kyseessä olisi kirjautunut omistaja. Muokkaukset ja muut 
 * muutokset pitää tehdä kokoelman hallintasivulla.
 */
export default (props) => {
    const [collection, setCollection] = useState(null);
    const { collectionID } = useParams();

    useEffect(() => {
        setCollection(collectionID)

    }, [collectionID])


    const volumes = [
        {tag: "324234", id: 1, title: "Lord of The rings : The Two Towers", author:"J.R.R Tolkien" },
        {tag: "324234", id: 2, title: "Lord of The rings : The Return of the King", author:"J.R.R Tolkien" },
        {tag: "324234", id: 4, title: "A Clash Of Swords", author:"George R.R. Martin" },
        {tag: "324234", id: 5, title: "A Song of Ice And Fire: History of Targaryens", author:"George R.R. Martin" },
        {tag: "324234", id: 6, title: "Stardust", author:"Elephena Bastion" },
        {tag: "324234", id: 7, title: "The Mist", author:"Andew King" },
        {tag: "324234", id: 8, title: "Blood of The Dragon", author:"Janus Sipowski" },
        {tag: "324234", id: 9, title: "The Ironheart: Origins", author:"Janus Sipowski" },
        {tag: "324234", id: 10, title: "Harry Potter and The Prisoner of Azkaban", author:"J.K Rowling" }
    
    ];


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
                        variant="subtitle2"
                        component="h4"
                        color="text.secondary"
                        gutterBottom>
                            Authored By
                        </Typography>

                        <Avatar {...stringAvatar('Kent Dodds')} />
                        <Typography
                        variant="h6"
                        component="h4"
                        color="text.primary"
                        >
                            Kent Dodds
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
                        Silmarillion Saaga
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

                        {volumes.map((card) => (
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