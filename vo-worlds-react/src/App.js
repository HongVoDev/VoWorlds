import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Rivendell from './components/Rivendell/Rivendell';
import Gondor from './components/Gondor/Gondor';
import Rohan from './components/Rohan/Rohan'
import Mordor from './components/Mordor/Mordor';

function App() {
 return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing />}>    </Route>
    <Route path="/rivendell" element={<Rivendell />}>    </Route>
    <Route path="/gondor" element={<Gondor />}>    </Route>
    <Route path="/rohan" element={<Rohan />}>    </Route>
    <Route path="/mordor" element={<Mordor />}>    </Route>
      </Routes>
    </BrowserRouter>
);

}

export default App;
