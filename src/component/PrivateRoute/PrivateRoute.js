import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../hooks/useAuth';
import { Spinner } from 'react-bootstrap';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading} = useAuth();
    if(isLoading){
      return <div className="mx-auto">
          <Spinner animation="border" variant="danger"/>
      </div>;
  }
    return (
        <Route
            {...rest}
            render={({ location }) =>
            user?.displayName ? 
                children  : 
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                ></Redirect>}
              >  
        </Route>
    );
};

export default PrivateRoute;