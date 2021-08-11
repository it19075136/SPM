import React, {useState,useEffect} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import {Provider} from 'react-redux';
import {store} from './redux/store';
import './app.css';
import jwt from 'jsonwebtoken';

export default function app(){
    
    return(
        <Provider store={store}>
            <WebNavbar/>
            <AdminSideNav />
            <BrowserRouter>
            <Switch>
                <Route exact path="/" >Hello world! </Route>
            </Switch>
            </BrowserRouter>
        </Provider>
    )
}