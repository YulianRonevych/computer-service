import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Order({element, currUser}){

    const [isR, setIsR] = useState(element.isReady);

    function handleCancel(){
      axios.put(`http://localhost:5000/orderList/admin`, {
        isReady: false,
        username: element.name
      })
      setIsR(false);
    }

    function handleReady(){
        axios.put(`http://localhost:5000/orderList/admin`, {
            isReady: true,
            username: element.name
          })
        setIsR(true);
    }



    return(
        <div  className="st-container">
        <div className="sc-firstrow">
        <h2>{element.shortName}</h2>
        <h6>Date of creation: {element.dateOfCreation.split('T')[0]}</h6>
        <h6>Is Ready: {isR ? 'yes' : 'no'}</h6>
        </div>
        <hr className="brake"/>
        <div className="sc-descr">
        <p>
        {element.description.slice(0,250)}...
        <br/>
        Type: {element.type}<br/> Model: {element.model} <br/> Company: {element.company}<br/> Number: {element.number}  
        </p>
        </div>
        {(currUser.username == 'admin') ? isR ? <button className="sign-in-button" onClick={handleCancel}>Cancel</button> : <button className="sign-in-button" onClick={handleReady}>Ready</button> : ''} 
        <div className="sc-author">
        <span> Ordered by: {element.name}</span>
        </div>
        </div>
    )
}