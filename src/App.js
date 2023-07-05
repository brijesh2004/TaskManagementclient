
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Addtask from './components/Addtask';


function App() {
  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/'  element={<Home/>}></Route>
        <Route exact path='/addtask'  element={<Addtask/>}></Route>
        
        <Route exact path='/register' element={<Signup/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
      </Routes>
     </Router>
    </>
  );
}

export default App;
