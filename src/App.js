import "./App.scss";
import { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import RegisterForm from './components/Register'
import LoginForm from './components/Login'
import HomePage from './components/HomePage'


const token = JSON.parse(localStorage.getItem('userData'))
function App() {
  const [userPresent, setUserPresent] = useState(token)

  return (
    <Switch>
      <Route exact path={'/register'} render={() => !userPresent?.token ? <RegisterForm setUserPresent={setUserPresent} userPresent={userPresent} /> : <Redirect to={'/'} />} />
      <Route exact path={'/login'} render={() => !userPresent?.token ? <LoginForm setUserPresent={setUserPresent} userPresent={userPresent} /> : <Redirect to={'/'} />} />
      <Route exact path={'/'} render={() => userPresent?.token ? <HomePage token={token} setUserPresent={setUserPresent} userPresent={userPresent} /> : <Redirect to={'/register'} />} />
    </Switch>
  )
}

export default App;
