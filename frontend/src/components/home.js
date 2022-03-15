import React, {useEffect, useRef, useState, useMemo} from "react";
import { Link } from "react-router-dom";

const sections = [
    { title: 'Kaikki kirjat', url: '#' },
    { title: 'Oma kokoelma', url: '#' },
    { title: 'Omat Arvostelut', url: '#' }
  ];

function Home() {
  return (
    
    <div>
      <h1>This is the home page</h1>
      <Link to="about">Click to view our about page</Link>
      <Link to="contact">Click to view our contact page</Link>
    </div>
  );
}

export default Home;

  