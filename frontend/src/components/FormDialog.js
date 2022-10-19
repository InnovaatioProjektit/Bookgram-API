import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, {useEffect, useRef, useState, useMemo} from "react";


/**
 * Käyttömääritettävä yleisdialogi
 * 
 * Kutsutaan 'onSubmit' funktiolla
 * 
 * noform - kun käytetään Input
 * limit - Input tekstiraja
 * title - otsikko
 * message - viesti
 * openDialog - avaa dialogi
 * 
 * 
 * 
 * @param {*} props title, message, noform, limit, onSubmit
 * @returns 
 */
export default function FormDialog(props) {
    const {show, hide, onSubmit, data} = props
    const [colName, setColName] = useState("")
  
    const handleClose = () => {
      hide()
      setColName("")
    };
  
    const handleSubmit = () => {
      data.onSubmit(colName)
      handleClose()
    }
  
    return (
      <div>
        <Dialog open={show} onClose={handleClose}>
          <DialogTitle>{data.title}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{overflowY:"auto"}}>
              {data.message}
            </DialogContentText>
            {data.noform && <TextField
              error={colName.length > data.limit}
              onChange={(e)=>{
                const value = e.currentTarget.value
                if(value.length <= data.limit){
                  setColName(value)
                }
              }}
              value={colName}
              autoFocus
              margin="dense"
              id="name"
              label="Collection Name"
              type="name"
              fullWidth
              variant="standard"
            />}
            {data.noform && <DialogContentText color="theme.secondary">
              {data.limit - colName.length} 
            </DialogContentText>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={data.noform && colName.length < 2} onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }