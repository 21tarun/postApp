
import './App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import Nav from './Nav'
import Home from './Home'
import SignIn from './Signin'
import Signup from './Signup'
// import About from './About'
// import Error from './Error'
// import Userlist from './Userlist'
// import User from './User'
// import Get from './Get'
// import Create from './Create'
// import Update from './Update'
// import Delete from './Delete'
// import Counter from './Counter'

function App() {



  return (
    <div className='App'>
      {/* <Nav /> */}
      <Routes> 
        <Route path="" element={<Home/>}/>
        
        <Route path="/login" element={<SignIn /> }/> 
        <Route path="/signup" element={<Signup /> }/> 
        {/* <Route path="users" element={<Userlist /> }/> 
        <Route path='*' element={<Error />}/>
        <Route path="/users/:id" element={<User/>}/>
        <Route path="/getdata" element={<Get/>}/>
        <Route path="/createdata" element={<Create/>}/>
        <Route path="/delete" element={<Delete/>}/>
        <Route path="/update" element={<Update/>}/>
        <Route path="/counter" element={<Counter/>}/> */}
      </Routes>

    </div>
  )

}



export default App;

