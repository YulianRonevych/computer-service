import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Order from "./Order";

export default function OrderList({currUser}){

    const params = useParams();

    const [orders, setOrders] = useState([]);

   useEffect(function(){
   axios.get(`http://localhost:5000/orderList/${params.username}`).then(function(res){
    console.log(res);
    setOrders(res.data);
   })
   }, [])

    return(
        <div className="default-r">
        {orders.map(function(curr){
         return <Order element={curr} currUser={currUser}/>;
        })}
        </div>
    )
}