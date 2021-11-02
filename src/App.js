import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import OrderReview from './component/OrderReview/OrderReview';
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/NotFound/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PlaceOrder from './component/PlaceOrder/PlaceOrder';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import AuthProvider from './component/Context/AuthProvider';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Shipping from './component/Shipping/Shipping';
import Orders from './component/Orders/Orders';


function App() {
   
  return (
    <div className="App">
       <AuthProvider>
         <Router>
            <Header></Header>
            <Switch>
               <Route exact path="/">
                  <Shop></Shop>
               </Route>
               <Route path="/shop">
                  <Shop></Shop>
               </Route>
               <Route path="/review">
                  <OrderReview></OrderReview>
               </Route>
               <PrivateRoute path="/inventory">
                  <Inventory></Inventory>
               </PrivateRoute>
               <PrivateRoute path="/placeorder">
                  <PlaceOrder></PlaceOrder>
               </PrivateRoute>
               <PrivateRoute path="/orders">
                  <Orders></Orders>
               </PrivateRoute>
               <PrivateRoute path="/shipping">
                  <Shipping></Shipping>
               </PrivateRoute>
               <Route path="/login">
                  <Login></Login>
               </Route>
               <Route path="/register">
                  <Register></Register>
               </Route>
               <Route path="*">
                  <NotFound></NotFound>
               </Route>
            </Switch>
         </Router>
       </AuthProvider>
      
    </div>
  );
}

export default App;
