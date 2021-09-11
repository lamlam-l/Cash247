import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css'
import ContextProvider from './contextProvider/context'
import Login from './components/loginAndRegister/Login'
import Register from './components/loginAndRegister/Register'
import Profile from './components/Profile/Profile'
import Dashboard from './components/dashboard/Dashboard'
import Auth from './authenticated/Auth'
import Report from './components/report/Report'

import Test from './components/test/Test'

function App() {
  return (<>
    <Router>
      <Switch>
        <ContextProvider>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile'><Auth cp={Profile} /></Route>
          <Route exact path='/dashboard'><Auth cp={Dashboard} /></Route>
          <Route exact path='/report'><Auth cp={Report} /></Route>
          <Route exact path='/test' component={Test} />
        </ContextProvider>
      </Switch>
    </Router>
  </>)
}

export default App;
