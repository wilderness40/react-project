import './App.css';
import {Routes, Route} from "react-router-dom"
import { Home, Play, Work, Food, News, BackHome} from './pages'
import { NewsPaper } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
         <Route exact path='/' element={<Home />} />
         <Route exact path='/play' element={<Play />} />
         <Route exact path='/work' element={<Work />} />
         <Route exact path='/food' element={<Food />} />
         <Route exact path='/news' element={<News />} ><Route exact path='article' element={<NewsPaper />}></Route></Route>
         <Route exact path='/BackHome' element={<BackHome />} />
      </Routes>
    </div>
  )
}

export default App;
