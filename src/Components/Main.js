import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Main({curUser}){


    return(
        <div className="default">
        <div className="main-logo">
            <img src={require("../Resources/Main.png")} className="main-photo"/>
            <p>Best</p>
            <p>Computer</p>
            <p>Service</p>
        </div>
        <div className="main-info">
          <img src={require("../Resources/Logo.jpg")} alt="logo"/>
          <p>{!curUser ? 'Register or login to order' : 'Welcome back!'}</p>
          {curUser && <Link to='/makeOrder'>Make order</Link>}
          {!curUser && <Link to='/register'>Register</Link>}
          {!curUser && <hr/>}
          {!curUser && <Link to='/login'>Login</Link>}
        </div>
        </div>
    )
}