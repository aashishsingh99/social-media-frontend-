import React,{useEffect,createContext,useReducer,useContext} from 'react';
import '../src/App.css';
import {BrowserRouter as Router,Route,Switch,useHistory} from "react-router-dom";
import Home from '../src/components/Home';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';
import Navbar from '../src/components/Navbar';
import Profile from '../src/components/Profile';
import Createpost from '../src/components/Createpost';
import UserProfile from '../src/components/UserProfile';
import {initialState,reducer} from '../src/Reducers/userReducer';
import MyFollowings from '../src/components/MyFollowings';
export const UserContext=createContext();
const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(UserContext);
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else{
      history.push("/signup")
    }
  },[])
  
  return(
  <Switch>
    
  <Route path="/signup" component={Signup} />
  <Route path="/login" component={Login} />
    
  <Route path="/profile/:userid" component={UserProfile}/>
  <Route exact path="/profile" component={Profile}/>
  <Route path="/createPost" component={Createpost}/>
  <Route path="/myfollowings" component={MyFollowings}/>
  <Route path="/" component={Home} />
  
  </Switch>
  );
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <Router>
        
        
        <Navbar/>
        <Routing/>
        
      </Router>
    </UserContext.Provider>
    
  );
}

export default App;
