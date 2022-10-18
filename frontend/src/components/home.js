import React, {useEffect, useState} from "react";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


import books from "../api/books";
import BookCard from "./bookCard";


import SearchBar from "./searchbar";
import Toast from './Toast'


function Home(props) {
  const {state} = props;
  const [query, setQuery] = useState("magic")
  const [volume, setVolume] = useState([])  // fill volume with book data from Google Books

  const { id } = state.useAuth()

  /**
   * Hae kirjoja haulla.
   */
  async function fetchBooks(){
    const { data } = await books(query)
    if(data){
      setVolume(data.items)
    }

  }

  /**
   * Päivitä kirjahaku kun sivu latautuu kerran.
   */
  useEffect(() => {
    fetchBooks()
  }, [id])

  const theme = createTheme();
  let toast

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="sm">
            <Toast message="hello" horizontal="left" vertical="bottom" severity="success" buoy={(hook) => {toast = hook}} />
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              All Books
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              <b>{state.title}</b> is a book club. Here you can find your favorite books and 
              authors, add your favorites in collections and review your latest 
              books.
            </Typography>
            
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
      
            </Stack>
            <SearchBar request={fetchBooks} requestSearch={setQuery}></SearchBar>

    </Container>
    <Container sx={{ py: 8 }} maxWidth="md">
    <Grid container spacing={4}>

    {volume.map((card) => (
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <BookCard uid={id} data={card} />
      </Grid>
    ))}

    </Grid>
    </Container>

    </ThemeProvider>
  );
}

export default Home;

  