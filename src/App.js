import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Createpost from './components/Createpost';
import UserProfile from './components/UserProfile';
import { initialState, reducer } from './Reducers/userReducer';
import MyFollowings from './components/MyFollowings';

export const UserContext = createContext();
const Routing = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      history.push('/signup');
    }
  }, []);

  return (
    <Switch>

      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />

      <Route path="/profile/:userid" component={UserProfile} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/createPost" component={Createpost} />
      <Route path="/myfollowings" component={MyFollowings} />
      <Route path="/" component={Home} />

    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>

        <Navbar />
        <Routing />

      </Router>
    </UserContext.Provider>

  );
}

export default App;
