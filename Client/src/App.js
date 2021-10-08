import React, { useEffect,useState } from 'react'
import ReactDOM from 'react-dom';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';




const App = () =>  {
    

    return (
        <BrowserRouter>
        <Container maxidth='lg'>
        <Navbar />
        <switch>
           <Route path="/" exact component={Home} />
           <Route path="/Auth" exact component={Auth} />
        </switch>
        
        </Container>
        </BrowserRouter>
        
    );
}

export default App;
