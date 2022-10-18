import React, {useEffect, useRef, useState, useMemo} from "react";
import { Avatar, Button, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { stringAvatar } from "../utils/stringMods";
import { deleteReview } from "../api/reviews";

 /**
 * Käyttäjän kommenttikortti, joka alkaa ListItem:nä. 
 * 
 */
  export default (props) => {
    const {disable, data} = props;


    const onRemove = async () => {
      const user = data.userid
      const book = data.booktag
      deleteReview({user, book }).then((res) => {
        const { data } = res
        if(data){
          props.toast("success", "Remove " + data.message)
        }
      })
    }

    return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar {...stringAvatar(data.fullname + " " + data.lastname)} />
        </ListItemAvatar>
        <div>
        <ListItemText
          primary={ data.fullname + " " + data.lastname }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                { data.comment }
              </Typography>
            </React.Fragment>
          }          
        />
        <div>
          {disable && <Button aria-label="comment" onClick={onRemove}><Typography variant="button">Remove</Typography></Button>}
          <Button disabled={true}  aria-label="comment">
              <Typography variant="button">Reply</Typography>
          </Button>
        </div>
       
        </div>
        
        
    </ListItem>
    );
    
  }