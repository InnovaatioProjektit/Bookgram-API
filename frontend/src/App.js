import React, {useEffect} from 'react'
import {Route, useHistory} from 'react-router-dom'

import Login from './components/login'
import Register from './components/register'


const App = () => {
    const history = useHistory();

  useEffect(() => {
    history.push("/login")
  })

    return (
        <div className="container">
             <Route path="/login" component={Login}/>
             <Route path="/register" component={Register}/>
        </div>
        


       
    )
}


export default App