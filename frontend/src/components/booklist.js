import React, {useRef, useEffect,  useState} from "react";
import { Link } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


import { clearCollection, collections, createCollection, getBooks, removeCollection, updateCollection } from "../api/books";

import Toast from './Toast'
import BookItem from "./bookItem";
import { Box, Divider, Drawer, Fade, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import {Bookmark, Book, BookmarkAdd, KeyboardArrowDown} from '@mui/icons-material';
import FormDialog from "./FormDialog";
import Clipboard from './Clipboard'
import { hexEncode } from "../utils/stringMods";

/**
 * Käyttäjän kirjakokoelmat
 * 
 * @param {*} props 
 * @returns 
 */
function BookCollection(props) {
  const { state } = props;
  const [volumes, setVolumes] = useState([])  // fill volumes with book data of current collection
  const [shelves, setShelves] = useState([])  // all user collections

  // user auth
  const token = state.useAuth()
  const loggedIn = !!token

  // menun toiminta
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedName, setSelectedName] = useState("");
  const [anchorMenu, setAnchorMenu] = useState(null);
  const open = Boolean(anchorMenu)

  // Toast tila
  const [severity, setSeverity] = useState("")
  const [message, setMessage] = useState("")
  let toast = null

  const selectOnce = useRef(true)
  const drawerWidth = 360;

  useEffect(() => {
    //hae käyttäjän kaikki kokoelmat
    if(!loggedIn) return;
    collections().then((res) => {
      const { data } = res
      if(data){
        setShelves(data.rows)
        if(selectOnce.current){
          selectOnce.current = false
          setSelectedIndex(data.rows[0].id)
          setSelectedName(data.rows[0].cname)
        }
        
      }
    })
  }, [loggedIn, message])


  useEffect(() => {
    // hae valitun kokoelman teokset
    getBooks(selectedIndex).then((res) => {
      const {data} = res 
      if(data){
        setVolumes(data)
      }else{
        setVolumes([])
      }
    })

  }, [selectedIndex])




  // kokoelman asetusvalikko

  const handleMenuOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const handleListItemClick = (event, index, content) => {
    setSelectedName(content)
    setSelectedIndex(index);
  };


  // modal
  const [showModal, setShowModal] = useState(false)
  const [options, setOptions] = useState({})

  const openModal = (opts) => {
    setOptions(opts)
    setShowModal(true)
  }

  const hideModal = () => {
    setShowModal(false)
  }


  // nappien toiminta
  const onCreateCollection = () => {
    openModal({
      title: "Create New Collection",
      message: "To create a new empty collection, simply give it a unique name",
      noform: true,
      limit: 30,
      onSubmit: (data) => {
        const user = token.id 
        const collectionName = data

        createCollection({user, collectionName}).then((res) => {
          const {data} = res
          if(data && data.rows){
            setSeverity("success")
            setMessage(data.message)
            toast(true)
          }else{
            setSeverity("error")
            setMessage(res.err.message)
            toast(true)
          }
        })
      }
    })
  }

  const onEditCollection = () => {
    openModal({
      title: "Edit " + selectedName,
      message: "To edit, give your collection a unique name",
      noform: true,
      limit: 30,
      onSubmit: (data) => {
        const user = token.id  
        const collectionName = data
        const shelf = selectedIndex

        updateCollection({user, shelf, collectionName}).then((res) => {
              const {data} = res 
              if(data && data.rows === 1){
                  setSeverity("success")
                  setMessage(data.message)
                  toast(true)
                  setSelectedName(collectionName)
              }else{
                  setSeverity("error")
                  setMessage(res.err.message)
                  toast(true)
              }
        })

        
      }
    })

    handleMenuClose()
  }

  const onClearCollection = () => {
    openModal({
      title:  "Clearing '" + selectedName + "' ?",
      message: "Once accepted, all books in the collection will purge",
      noform: false,
      onSubmit: (data) => {
        const user = token.id
        const shelf = selectedIndex

        clearCollection({user, shelf}).then((res) => {
          const {data} = res 
          if(data.rows){
            setSeverity("success")
            setMessage(data.message)
            toast(true)
            setVolumes([])
        }else{
            setSeverity("error")
            setMessage(res.err.message)
            toast(true)
        }

        

        })
      }
    })
    
    handleMenuClose()
  }

  const onDeleteCollection = () => {
    openModal({
      title: "Delete '" + selectedName + "' ?",
      message: "You are about to delete a collection. Change is permanent",
      noform: false,
      onSubmit: (data) => {
        const user = token.id
        const shelf = selectedIndex

        removeCollection({user, shelf}).then((res) => {
          const {err, data} = res 
          if(data.rows){
            setSeverity("success")
            setMessage(data.message)
            toast(true)
          }else{
              setSeverity("error")
              setMessage(data.message)
              toast(true)
          }
        })
  
      }
    })
    
    handleMenuClose()
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />

    <FormDialog show={showModal} hide={hideModal} data={options} />
    <Toast message={message} horizontal="left" vertical="bottom" severity={severity} buoy={(hook) => {toast = hook}} />

    <Container sx={{mb: 4}} maxWidth="sm">
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
            
    </Container>

    <Divider />


    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            top: "unset"
          }
        }}
        variant="permanent"
        anchor="left"
      >
        
        <List>
          <ListItem key="New Collection" >
            <ListItemButton

            onClick={onCreateCollection}
            sx={{
              borderRadius: 2,
              background:"lightGrey",
              fontSize: "20px",
              padding: 2,
            }}>

              <ListItemIcon>
                <BookmarkAdd/>
              </ListItemIcon>
              <ListItemText primary="New Collection" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>

          {shelves.map(data => (
            <ListItem key={data.id} disablePadding>
              <ListItemButton
                selected={selectedIndex === data.id}
                onClick={(ev) => { handleListItemClick(ev, data.id, data.cname)}}
              >
                <ListItemIcon>
                    <Book />
                </ListItemIcon>
                <ListItemText primary={data.cname} />
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
        <Typography variant="h5"  color="text.primary">
          <Bookmark/> {selectedName} <Typography color="text.secondary" variant="body1" paragraph>{volumes.length} books</Typography>
        </Typography>
        </div>

        <Clipboard text={"http://10.114.32.8:3000/booklist/share/" +  btoa(token.id + "_" + selectedIndex + "_" + selectedName ) }/>


        

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
          <MenuItem onClick={onEditCollection}>Edit Name</MenuItem>
          <MenuItem disabled={volumes.length === 0} onClick={onClearCollection}>Clear Collection</MenuItem>
          <MenuItem disabled={shelves.length <= 1} sx={{color: "red"}} onClick={onDeleteCollection}>Delete Collection</MenuItem>
        </Menu>
        </Grid>


        {(volumes.length === 0) && <Typography sx={{display: "flex", alignContent: "center", justifyContent: "center", mb: "100px", mt: "100px"}} paragraph>No Books yet in this collection.</Typography>}
        <Grid container spacing={4} >

          {volumes.map((card) => (
              <Grid item key={card.id} >
                  <BookItem uid={token.id} data={card} />
              </Grid>
          ))}

        </Grid>
        
        
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default BookCollection;

  