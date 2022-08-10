import React, {Fragment} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signout , isAuthenticated} from "../auth";
import { itemTotal } from "./cartHelpers";

const Menu = () => {

    const history = useNavigate();
    const sigOnut = () => {
        history('/home');
        signout()
    }



return (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" to="/home"> Home </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/shop"> Shop </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/cart"> Cart{" "}<sup><small className="cart-badge">{itemTotal()}</small></sup> </Link>
            </li>
           {isAuthenticated() && isAuthenticated().user.role ===0 && (
                         <li className="nav-item">
                         <Link className="nav-link"  to="/user/dashboard"> Dashboard </Link> 
                          
                       </li>
           )}
             {isAuthenticated() && isAuthenticated().user.role ===1 && (
                         <li className="nav-item">
                         <Link className="nav-link"  to="/admin/dashboard"> Dashboard </Link> 
                          
                       </li>
           )}

          {!isAuthenticated() && (
              <Fragment>
                    <li className="nav-item">
                      <Link className="nav-link"  to="/signin"> Signin </Link>
                  </li>
                   <li className="nav-item">
                      <Link className="nav-link" to="/signup"> Signup</Link>
                   </li>
              </Fragment>
          )}
           
          {isAuthenticated() && (
              <div>
                    <li className="nav-item">
                <span className="nav-link" style={{cursor: 'pointer' , color: '#ffffff' }} 
                onClick={sigOnut }  > Signout</span>
            </li>
           
              </div>
          )}

        </ul>
    </div>
)
            }

export default Menu