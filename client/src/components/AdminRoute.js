import React from 'react';
import { Route, Redirect } from 'react-router-dom';

 const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = localStorage.getItem('admin_token');
        if (!currentUser ) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)

export default AdminRoute ;