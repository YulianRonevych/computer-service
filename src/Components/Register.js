import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Register(){

   const [userData, setUserData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    passwordAgain: ''
   });

   const [usersData, setUsersData] = useState();

   useEffect(function(){
      axios.get('http://localhost:5000/register').then(function(res){
        setUsersData(res);
        console.log(res);
      })
   }, [])

   function handleSubmit(){
    axios.post('http://localhost:5000/register', userData, {"content-type": "application/json"}).then(function(res){
        window.location.href = 'http://localhost:3000/';
        console.log(res);
        localStorage.setItem('currUser', JSON.stringify(userData));
    }).catch(function(err){
        console.log(err);
    })
   }

   const buttonRef = useRef(null);


   function handleForm(e){
     setUserData(function(cur){
        return {
            ...cur,
            [e.target.name]: e.target.value 
        }
     })
   }

   useEffect(function(){
     let correct = true;

     if(userData.name == '' || userData.surname == '' || userData.username == '' || userData.email == '' || userData.password == '' || userData.passwordAgain == ''){
       correct = false; 
     }

     if(!userData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
        correct = false;
     }

     if(userData.password !== userData.passwordAgain){
        correct = false;
     }

     if(usersData?.data.find(curr=>curr?.username == userData.username) || usersData?.data.find(curr=>curr?.email == userData.email)){
        correct = false;
     }

     if(!correct){
        buttonRef.current.setAttribute('disabled', 'true');
     }else{
        buttonRef.current.removeAttribute('disabled');
     }
   }, [userData])

    return(
        <div className="default-r">
        <form className="register-form" autoComplete="off">
        <input autoComplete="false" name="hidden" type="text" style={{display: "none"}}/>
        <p>Register</p>
        <input name="name" placeholder="Name" onChange={handleForm} value={userData.name}/>
        <input name="surname" placeholder="Surname" onChange={handleForm} value={userData.surname}/>
        <input name="username" placeholder="Username" onChange={handleForm} value={userData.username}/>
        <input name="email" placeholder="Email" onChange={handleForm} value={userData.email}/>
        <input name="password" placeholder="Password" onChange={handleForm} value={userData.password} type='password'/>
        <input name="passwordAgain" placeholder="Password again" onChange={handleForm} value={userData.passwordAgain} type='password'/>
        <button type="button" ref={buttonRef} onClick={handleSubmit} className="def-button">register</button>
        </form>
        </div>
    )
}