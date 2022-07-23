import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import PreLoginHome from './component/preLoginHome/PreLoginHome';


function App() {
   return (
        <PreLoginHome/>
   );
}

export default App;
