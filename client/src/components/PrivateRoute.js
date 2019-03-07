import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import Auth from '../Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route exact {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
        <Component {...props} {...rest} />
    ) : (
        <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
        }}/>
    )
    )}/>
)

export default PrivateRoute