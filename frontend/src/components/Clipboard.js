import React, {Fragment, forwardRef} from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import {CopyAll} from '@mui/icons-material';

async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    console.log("kek", text)
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

/**
 * Tallenna linkki  input-syötteestä käyttäjän muistiin
 */
export default function Clipboard({ text }) {
  
  return (
    <Box sx={{
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "space-between",
    }}>
      <Tooltip title="Link share" arrow>
      <input style={{
        padding: ".5rem 1rem",
        minWidth: "300px"
      }} type="text" value={text} readOnly />
       </Tooltip>
      <Button onClick={()=>{ copyTextToClipboard(text) }}>
        <span>Copy</span><CopyAll />
      </Button>
    </Box>
  );
}