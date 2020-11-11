import logo from './logo.svg';
import Signup from './auth/signup';
import Login from './auth/login';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;