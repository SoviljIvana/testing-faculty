import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import * as authCheck from './authCheck.js';

export const PrivateRouteAdmin = ({ component: Component, ...rest }) => {

    useEffect(() => {
        if(!authCheck.isAdmin()){
            NotificationManager.error('Samo admin može pristupiti ovoj stranici!');
        }
      });
    return (
    <Route {...rest} render={ props => localStorage.getItem('jwt') && authCheck.isAdmin() ? ( <Component {...props} />) : 
             ( <Redirect to={{ pathname: "/dashboard"}} />
        )}/>
    )
}