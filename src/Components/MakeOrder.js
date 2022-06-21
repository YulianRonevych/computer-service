import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {v4 as uuid} from "uuid";
import axios from "axios";

export default function MakeOrder({currUser}){

    const clientRef = useRef(null);
    const butRef = useRef(null);

    const [order, setOrder] = useState({
        id: '',
        client: '',
        date: '',
        short_name: '',
        description: '',
        type: '',
        company: '',
        model: '',
        phone: ''
    });


    useEffect(function(){
        const uid = uuid();
        const smallid = uid.slice(0,8);


        const date = new Date();
     const day = date.getDay();
     const month = date.getMonth();
     const year = date.getFullYear();

    //  dateRef.current.value = `${year}-${month/10 < 1 ? '0' + month : month}-${day/10 < 1 ? '0' + day : day}`

     setOrder(function(curr){
        return {
            ...curr,
            date: `${year}-${month/10 < 1 ? '0' + month : month}-${day/10 < 1 ? '0' + day : day}`
        }
    });

    console.log(currUser);

    // clientRef.current.value = currUser?.name + ' ' + currUser?.surname;

    
    setOrder(function(curr){
        return {
            ...curr,
            id: smallid
        }
    });
    
    }, [])

    function handleChange(e){
        setOrder(function(cur){
           return {
               ...cur,
               [e.target.name]: e.target.value 
           }
        })
      }

      function handleSubmit(){
        axios.post('http://localhost:5000/makeOrder', {
            ...order,
            client: currUser?.username
        }, {"content-type": "application/json"}).then(function(res){
            window.location.href = `http://localhost:3000/orderList/${currUser.username}`;
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })
       }

       useEffect(function(){
           let correct = true;
           
           if(!order.company || !order.description || !order.model || !order.short_name || !order.type || !order.phone){
            correct = false;
           }

           if(!correct){
            butRef.current.setAttribute('disabled', 'true');
           }else{
            butRef.current.removeAttribute('disabled');
           }

           console.log(order);

       }, [order])

    return(
        <div className="default-r">
        <form className="makeOrder-form">
        <h1>Make Order</h1>
        <div className="level-one">
        <div className="first-part">
        <p>Short Name</p>
       <input name="short_name" onChange={handleChange} value={order.short_name}/>
       <p>Describe your problem</p>
       <textarea name="description" onChange={handleChange} value={order.description}/>
       </div>
       <div className="second-part">
       <div>
        <div>
       <p>Client</p>
       <input ref={clientRef} name="client" readOnly value={currUser?.name + ' ' + currUser?.surname}/>
       </div>
       <div>
       <p>Date</p>
       <input name="date" readOnly value={order.date}/>
       </div>
       </div>
       <div>
        <div>
       <p>Device type(pc, laptop)</p>
       <input name="type" onChange={handleChange} value={order.type}/>
       </div>
       <div>
       <p>Company</p>
       <input name="company" onChange={handleChange} value={order.company}/>
       </div>
       </div>
       <div>
        <div>
       <p>Device model name</p>
       <input name="model" onChange={handleChange} value={order.model}/>
       </div>
       <div>
       <p>Phone number</p>
       <input name="phone" onChange={handleChange} value={order.phone}/>
       </div>
       </div>
       <button type="button" onClick={handleSubmit} ref={butRef} className="def-button">Submit</button>
       </div>
       </div>
        </form>
        </div>
    )
}