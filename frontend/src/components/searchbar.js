import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Box, Toolbar, Button, IconButton, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.light, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        fontSize: 16,
      padding: theme.spacing(2, 2, 2, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '40ch'
        },
      },
    },
  }));


export default function SearchBar({request, requestSearch}) {
    return (
      <Box sx={{ flexGrow: 2 }}>
        <Search>
              <SearchIconWrapper>
                
                    <SearchIcon />
                
              </SearchIconWrapper>
              <form onSubmit={(e) => {
                e.preventDefault()
                request()


              }}>
              <StyledInputBase
          
                placeholder="Search by Title, Author, Keyword or ISBN"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(s) => {requestSearch(s.target.value)}}
                
              />
              </form>
        </Search>

      </Box>
      
    );
  }