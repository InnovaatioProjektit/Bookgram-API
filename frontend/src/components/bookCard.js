import React, {useEffect, useRef, useState, useMemo} from "react";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "@mui/material";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { limit } from '../utils/inputValidation'
import { getBook, addBook, removeBook } from "../api/books";


/**
 * Tallenna kirja tietokantaan
 */
const btn_saveBook = (user, tag) => {
    const {err, data} = addBook({user, tag})

    if(err){
        console.log(err)
    }

}

/**
 * Poista kirja tietokannasta
 */
const btn_unsafeBook = (user, tag) => {
    const {err, data} = removeBook({user, tag})

    if(err){
        console.log(err)
    }

}

/**
 * Tallenna kirjan tykkäys
 */
const btn_likeBook = () => {


}



export default (props) => {
    const {id, data} = props;

    //const book = getBook(data.volumeInfo.tag)
    // ad

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
            component="img"
            sx={{
                // 16:9
                pt: '56.25%',
            }}
            image={data.volumeInfo.imageLinks.thumbnail}
            alt="random"
            />
            <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
                {data.volumeInfo.title}
            </Typography>
            <Typography paragraph>
                {limit(data.volumeInfo.description, 255)} <br/>
                <Link href={data.volumeInfo.previewLink}> Click To Preview</Link>
            </Typography>
            <Typography sx={{ mt: 5 }}  variant="subtitle2" color="text.secondary">
                Author: {data.volumeInfo.authors}<br/>
                Publisher: {data.volumeInfo.publisher}
            </Typography>
            </CardContent>
                <CardActions>
                <Button size="small" onClick={() => { btn_saveBook(id, data.id) }}>Add</Button>
                <Button size="small" onClick={() => { btn_unsafeBook(id, data.id) }}>Remove</Button>
                <Button size="small" onClick={() => { btn_likeBook() }}>Like</Button>
                </CardActions>
        </Card>
    )

}