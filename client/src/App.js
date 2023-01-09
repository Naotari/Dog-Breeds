import './App.css';
import { Route } from "react-router-dom";
import NavBar from "./routes/NavBar"
import FrontPage from './routes/FrontPage';
import Home from './routes/Home';
import Details from './routes/Details';
import Creation from './routes/Creation';


function App() {
  return (
    <div className="App">
      <Route path="/">
        <NavBar/>
      </Route>

      <Route exact path="/">
        <FrontPage/>
      </Route>

      <Route path="/home">
        <Home/>
      </Route>

      <Route path="/details">
        <Details/>
      </Route>

      <Route path="/creation">
        <Creation/>
      </Route>
    </div>
  );
}

export default App;
