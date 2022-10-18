import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


import { getBooks } from "../api/books";
import BookCard from "./bookCard";

import Toast from './Toast'
import BookItem from "./bookItem";
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { BookmarkIcon, BookIcon, BookmarkAddIcon, KeyboardArrowDown} from "@mui/icons-material"

/**
 * Käyttäjän kirjakokoelmat
 * 
 * @param {*} props 
 * @returns 
 */
function BookCollection(props) {
  const { state } = props;
  const { id } = state.useAuth()
  const [volumes, setVolumes] = useState([])  // fill volume with book data from Google Books based on tag

  // menun toiminta
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const open = Boolean(anchorMenu)

  const drawerWidth = 360;

  const handleMenuOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
              My Collections
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              This section contains all your favorite books in your curated collections—You may 
              add more books or remove any extras as you wish.
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

    







    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="permanent"
        anchor="left"
      >
        
        <List>
          <ListItem key="New Collection" >
            <ListItemButton sx={{
              borderRadius: 2,
              background:"lightGrey",
              fontSize: "20px",
              padding: 2,
            }}>

              <ListItemIcon>
                <BookmarkAddIcon/>
              </ListItemIcon>
              <ListItemText primary="New Collection" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {["My Favorites", "Lord Of The Rings Saga", "All Marvel Comics"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(ev) => { handleListItemClick(ev, index)}}
              >
                <ListItemIcon>
                    <BookIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{pr:5}}
        >
        <div>
        <Typography variant="h5"  color="text.primary" paragraph>
          <BookmarkIcon/> Lord Of The Rings Ultimate Collectors Edition <Typography color="text.secondary" variant="body1">2 books</Typography>
        </Typography>
        </div>

        <Button
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          
          onClick={handleMenuOpen}
          endIcon={<KeyboardArrowDown />}
        >
          Options
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorMenu}
          open={open}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleMenuClose}>Edit name</MenuItem>
          <MenuItem onClick={handleMenuClose}>Clear Collection</MenuItem>
          <MenuItem sx={{color: "red"}} onClick={handleMenuClose}>Delete Collection</MenuItem>
        </Menu>
    
        
        </Grid>
        
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>


    </ThemeProvider>
  );
}

export default BookCollection;

  