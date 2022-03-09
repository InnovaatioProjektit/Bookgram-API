import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect, Link, useHistory} from 'react-router-dom'


import { getDecodedToken } from './api/token'


import Login from './components/login'
import Register from './components/register'
import NotFound from "./components/notFound";


const App = () => {
    const history = useHistory();

    state = {
        decodedToken: getDecodedToken(), // hakee kirjautumisavaimen localStorage API:sta, jos se on tyhjä palauttaa null
    }

    useEffect(() => {
        history.push("/login")
    })

    return (
        <Router>
        <div id="app" className="App">
          <Fragment>
              <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route component={NotFound}/>

              </Switch>
            </Fragment>

        </div>
        </Router>


       
    )
}


export default App