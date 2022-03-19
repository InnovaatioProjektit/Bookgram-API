import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


import books from "../api/books";
import BookCard from "./bookCard";
import { Card } from "@mui/material";

/**
 * Käyttäjän tekemät arvostelut
 * 
 * @param {*} props 
 * @returns 
 */
function BookReviews(props) {
  const {state} = props;

  useEffect(() => {
   
  })

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Likes
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                This section contains all your reviewed and/or favorited books in a single collection. 
                You may add them to your personal collection or unpin them.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
    </Container>
    <Container sx={{ py: 8 }} maxWidth="md">
    <Grid container spacing={4}>
    {cards.map((card) => (
      <Grid item key={card} xs={12} sm={6} md={4}>
        <BookCard />
      </Grid>
    ))}

    </Grid>
    </Container>

    </ThemeProvider>
  );
}

export default BookReviews;

  