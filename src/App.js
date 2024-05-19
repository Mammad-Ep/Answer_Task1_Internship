import React, { Component } from 'react';

// // Task1
import { Link, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import RickMortyList from './components/RickMortyList';
import { Provider } from 'react-redux';
import store from './app/store';
import Character from './components/Character';
// __________________________________________________________________________________

// // Task1

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Provider store={store}><RickMortyList /></Provider>}></Route>

                <Route path={`character/:id/:page`} element={<Provider store={store}><Character /></Provider>}></Route>
            </Routes>
        </>
    );
}

export default App;
// ---------------------------------------------------------------------------

