import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header({curUser, handleLogOut}){

   function handleLogOut1(){
     localStorage.removeItem('currUser');
     handleLogOut();
   }


    return(
        <header>
            <nav>
                <img src={require("../Resources/Logo.jpg")} id="logo" alt="failed"/>
                <ul id="nav-list">
                    <Link to='/'>
                    <li>Main</li>
                    </Link>
                    <Link to='/help'>
                    <li>Help</li>
                    </Link>
                </ul>
                {curUser &&  <Link  className="sign-in-button" to={`/orderList/${curUser.username}`}>Check orders</Link>}
                {curUser && <Link  className="sign-in-button" to='/makeOrder'>Make order</Link>}
                {!curUser &&   <Link  className="sign-in-button" to='/login'>Sign in</Link>}
                { !curUser &&  <Link  id="sign-up-button" to='/register'>Sign up</Link>}
                {curUser &&   <button id="sign-up-button" onClick={handleLogOut1}>Sign out</button>}
            </nav>
        </header>
    )
}