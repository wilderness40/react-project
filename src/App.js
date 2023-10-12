import React, {useState, useEffect} from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom"
import { Home, Play, Work, Food, News, BackHome, Lounge, Register} from './pages'


function App() {
     const [userInfo, setUserInfo] = useState({ keyword : '', address : ''})
     useEffect(() => {
        fetch('http://127.0.0.1:5300/user/isLogin', {
          method: 'GET',
          headers: { 
          'Content-Type': 'application/json',
          },
          credentials : 'include'

        })
        .then(res => res.json())
        .then((res) => {
          setUserInfo({ keyword : res.keyword, address : res.address})
          })
     }, [])
     

  return (
    <div className="App">
      <Routes>
         <Route exact path='/' element={<Home setUserInfo={setUserInfo}/>} />
         <Route exact path='/play' element={<Play userInfo={userInfo}/>} />
         <Route exact path='/work' element={<Work userInfo={userInfo}/>} />
         <Route exact path='/food' element={<Food userInfo={userInfo}/>} />
         <Route exact path='/news' element={<News />} />
         <Route exact path='/BackHome' element={<BackHome />} />
         <Route exact path='/lounge' element={<Lounge />} />
         <Route exact path='/register' element={<Register />} />
         <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
