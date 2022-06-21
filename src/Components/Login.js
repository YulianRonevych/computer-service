import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login(){

    const butRef = useRef(null);

    const [loginData,setLoginData] = useState({
       username: '',
       password: ''
    });

    function handleChange(e){
        setLoginData(function(cur){
           return {
               ...cur,
               [e.target.name]: e.target.value 
           }
        })
      }

      useEffect(function(){
        let correct = true;

        if(!loginData.password || !loginData.username){
            correct = false;
        }


        if(!correct){
            butRef.current.setAttribute('disabled', 'true');
        }else{
            butRef.current.removeAttribute('disabled');
        }
      }, [loginData]);

      const [usersData, setUsersData] = useState();

   useEffect(function(){
      axios.get('http://localhost:5000/register').then(function(res){
        setUsersData(res);
      })
   }, [])


      function handleLogin(){
          if(usersData?.data.find(cur=>cur.username == loginData.username && cur.password == loginData.password)){
            localStorage.setItem('currUser', JSON.stringify(usersData?.data.find(cur=>cur.username == loginData.username && cur.password == loginData.password)))
            window.location.href = 'http://localhost:3000/';
          }else{
            console.log('Wrong data!');
          }
      }



    return(
        <div className="default-r">
        <form className="login-form" autoComplete="off">
        <input autoComplete="false" name="hidden" type="text" style={{display: "none"}}/>
        <p>Login</p>
        <input name="username" placeholder="Username" onChange={handleChange} value={loginData.username}/>
        <input name="password" type='password' placeholder="Password"onChange={handleChange} value={loginData.password}/>
        <button type="button" ref={butRef} onClick={handleLogin} className="def-button">Login</button>
        </form>
        </div>
    )
}