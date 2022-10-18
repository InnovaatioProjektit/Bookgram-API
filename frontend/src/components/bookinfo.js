import { Box, Typography, Grid, Item, Paper, Select, FilledInput, MenuItem, InputLabel, FormControl, Chip, Avatar, Divider, List, Link, Button } from "@mui/material";
import React, {useEffect, useRef, useState, useMemo} from "react";
import { useParams, useSearchParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Comment from './comment'
import Toast from './Toast'

import { stringAvatar } from '../utils/stringMods'
import { addBook, collections, collectionsByTagAndUser, getBook, getVolume, removeBook } from "../api/books";
import { reviewsByBook } from "../api/reviews";
import CommentBox from "./CommentBox";
import { findUser } from "../api/auth";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, collection, theme) {
    return {
      fontWeight:
        collection.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightBold
    };
  }

 /**
 * Yksittäisen kirjan näkymä, jonka tiedot tuodaan tunnisteella. Tunniste syötetään linkin parametrilla 'booktag'
 * esim. https://bookclub.com/books/details?booktag=fseoifjsoi lähettää GET API-pyynnön getBook('fseoifjsoi').
 * 
 */
export default (props) => {
    const { state } = props;
    
    const token = state.useAuth()
    const loggedIn = !!token

    //kirjautuneen käyttäjätiedot kommentin luomista varten
    const [profile, setProfile] = useState({})

    // Toast tila
    const [severity, setSeverity] = useState("")
    const [message, setMessage] = useState("")
    let toast = null

    // kirjadata
    const [article, setArticle] = useState(null);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [availablecollections, setAvailableCollections] = useState([]);
    const { bookID } = useParams();


    // kirjan kommentit
    const [comments, setComments] = useState([])


    useEffect(() => {
        // hae kirjan tiedot
        getVolume(bookID).then((data) => {
            setArticle(data.data)
        })
    }, [bookID])

    useEffect(() => {
        // hae kommentit
        reviewsByBook(bookID).then((res) => {
            const {err, data} = res
            if(err){
                setComments([])
                return
            }

            setComments(data.rows)
        })
    }, [bookID, message])

    useEffect(() => {
        // haetaan kaikki käyttäjän kokoelmat
        if(!loggedIn) return
        collections().then((col) => {
            setAvailableCollections(col.data.rows)
        })

        //hae kaikki käyttäjän kokoelmat joissa kirja on
        collectionsByTagAndUser({user: token.id, tag: bookID}).then((col) => {
            let clist = []
            if(col.data.message == "OK"){
                col.data.rows.map((c) => {
                    clist.push(c.cname)
                })
                setSelectedCollections(clist) 
            } 
        })

        //hae kirjautuneen yleistiedot
        findUser(token.id).then((usr) => {
            const [success, data] = usr
            if(success){
                setProfile(data.rows)
            }
        })
        
    }, [bookID, loggedIn])

    const bookItem = {
        img: "https://images.unsplash.com/photo-1618123069754-cd64c230a169",
        title: "heh"
        
    }

    /**
     * Add/Remove book to/from collection
     */
    const CollectionAction = async (shelf, bool) => {
        const user = token.id
        const tag = bookID
        const { data } = await (bool ? addBook({user, tag, shelf}) : removeBook({user, tag, shelf}));
        if(data.rows){
            setSeverity("success")
            setMessage(data.message)
            toast(true)
        }else{
            setSeverity("error")
            setMessage(data.message)
            toast(true)
        }
    }

    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toast message={message} horizontal="left" vertical="bottom" severity={severity} buoy={(hook) => {toast = hook}} />
            <Container disableGutters maxWidth="auto">
                <Grid container sx={{ 
                    paddingTop: 5, 
                    paddingBottom: 10, 
                    paddingLeft: 20, 
                    paddingRight: 20, 
                    
                    bgcolor: '#ff54000d', 
                    height: '45vh' 
                    }}>


                    <Box sx= {{
                        mt: 0,
                        mx: "auto",
                        width: 1096,
                        display: "flex",
                        maxWidth: "100%"
                    }}>
                        <div style={{
                                maxWidth: 315,
                                minWidth: 315,
                                width: "100%" }}>

                            <Paper elevation={8} >
                            <img    style={{minHeight: 350, maxWidth: "100%"}}
                                    src={article && article?.volumeInfo.imageLinks.small}
                                    srcSet={`${bookItem.img}?w=512&fit=crop&auto=format&dpr=2 2x`}
                                    alt={bookItem.title}
                                    loading="lazy"
                                    
                                />

                            </Paper>

                            <Box>
                            <FormControl sx={{ m: 0, width: 210 }}>
                                <InputLabel sx={{ color: "white" }}shrink={false} variant="filled">Add To Collection</InputLabel>
                                <Select
                                multiple
                                displayEmpty 
                                value={selectedCollections}
                                renderValue={(selected) => {}}
                                onChange={(event) => {
                                    const { target: { value }} = event; 
                                    setSelectedCollections(typeof value === "string" ? value.split(",") : value)
                                }}
                                onClick={(event)=>{
                                    if(event.target.id > 0){
                                        let bool = selectedCollections.indexOf(event.target.textContent) === -1;
                                        CollectionAction(event.target.id, bool)
                                    }
                                    
                                }}
                                input={<FilledInput disabled={!loggedIn} sx={{  bgcolor: "#44049361"  }} />}
                                MenuProps={MenuProps}
                                
                                >
                                    <MenuItem disabled value=""><em>You have {availablecollections.length} collections</em></MenuItem>
                                    {availablecollections.map((name) => (
                                        <MenuItem
                                        key={name.id}
                                        id={name.id}
                                        value={name.cname}
                                        style={getStyles(name.cname, selectedCollections, theme)}
                                        >
                                        {name.cname}
                                        </MenuItem>
                                    ))}

                                </Select>     
                            </FormControl>
                            </Box>

                        </div>

                        <Box sx={{
                            paddingLeft: 5,
                            width: "100%"
                        }}>
                            <Typography sx={{mb: 5}}  variant="h4">
                                {article ? article?.volumeInfo.title : " "}


                                <Typography sx={{ mt: 2, fontWeight: 'bold' }} variant="body1">Author:   {article ? article?.volumeInfo.authors[0] : " "}</Typography>
                                <Typography sx={{ mb: 2,  }} variant="body1">Publisher: {article ? article?.volumeInfo.publisher : " "}</Typography>
                            
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {article ? article.volumeInfo.description : " "}
                            </Typography>

                            <Button variant="contained" sx={{ mb: 2 }}>
                                <Link href={"#"}></Link>
                                Read Preview
                            </Button>

                            <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {article && article.volumeInfo.categories ? article.volumeInfo.categories.split(",").map((value) => (
                                    <Chip key={value} label={value} />
                                )): " "}
                            </Box>

                            {selectedCollections.length === 0 ? "" : (
                                <Box>
                                    <Typography>Found in your collection(s):</Typography>
                                    <Paper variant="outlined"  square>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, m:1, mb:4 }}>
                                        {selectedCollections.map((value) => (
                                            <Chip sx={{ bgcolor: "#222", color: "white", borderRadius: "5px"}} key={value} label={value} />
                                        ))}
                                    </Box>
                                    </Paper>
                                </Box>
                            )}

                           

                        </Box>

                        
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
                    <Typography variant="h5" sx={{py: 5}}>Community Reviews</Typography>
                    <Box sx={{
                        display: "flex"
                    }}>
                        {loggedIn ? <CommentBox user={token.id} book={bookID} author={profile.fullname + " " + profile.lastname} toast={(severity, message) => {
                            setSeverity(severity)
                            setMessage(message)
                            toast(true)

                        }}/> : <Typography variant="subtitle1">Log in to write a review...</Typography> }
                        
                    </Box>

                    <List sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}>
                        <Divider variant="inset" component="li" sx={{minWidth: 400, mx: "auto"}} />
                        <Typography sx={{p: 2}} variant="subtitle1">{comments.length} Comments</Typography>


                        {comments.map((value) => (
                            <Comment key={value.id} disable={token.id === value.userid} data={value} toast={(severity, message) => {
                                setSeverity(severity)
                                setMessage(message)
                                toast(true)
                            }}/>
                        ))}

                    </List>


                    

                </Box>
                    
                </Grid>

                

            </Container>
        </ThemeProvider>
    ) 

}