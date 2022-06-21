import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ContactUs from './Components/ContactUs';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Help from './Components/Help';
import Login from './Components/Login';
import Main from './Components/Main';
import MakeOrder from './Components/MakeOrder';
import OrderList from './Components/OrderList';
import Register from './Components/Register';
import Error from './Components/Error';
import { useEffect, useState } from 'react';

function App() {


   const [curUser, setCurUser] = useState();

   useEffect(function(){
    if(localStorage.getItem('currUser')){
       setCurUser(JSON.parse(localStorage.getItem('currUser')));
    }else{
       setCurUser(null);
    }
  }, [])

  function handleLogOut(){
    setCurUser(null);
    window.location.href = 'http://localhost:3000/';
  }


  return (
    <Router>
    <div className="App">
      <Header curUser={curUser} handleLogOut={handleLogOut}/>
      <Routes>
        <Route path='/' exact element={<Main curUser={curUser}/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/help' exact element={<Help/>}/>
        <Route path='/register' exact element={<Register/>}/>
        <Route path='/contactUs' exact element={<ContactUs/>}/>
        <Route path='/makeOrder' exact element={<MakeOrder currUser={curUser}/>}/>
        <Route path='/orderList/:username' element={<OrderList currUser={curUser}/>}/>
        <Route path='*' exact element={<Error/>}/>
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
