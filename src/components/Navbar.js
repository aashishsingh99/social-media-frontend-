
import React,{Component, useContext} from "react";
import {Link} from "react-router-dom";
import {UserContext} from '../App';
function Navbar(){
        const {state,dispatch}=useContext(UserContext)
        if(!state){
            return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            
            <Link to="/" className="navbar-brand">Social</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto"></ul>
            <li className="navbar-item">
            <Link to="/login" className="nav-link" style={{color:"white"}}>Login</Link>
            </li>
            <li className="navbar-item">
            <Link to="/signup" className="nav-link" style={{color:"white"}}>Signup</Link>
            </li>
            </div>
            </nav> 
            )  
        }
        

        
        return(
            
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            
            <Link to="/" className="navbar-brand">Social</Link>
            <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/" className="nav-link">Home</Link>
            </li>
            
            
            <li className="navbar-item">
            <Link to="/createPost" className="nav-link">Create Post</Link>
            </li>
            <li className="navbar-item">
            <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li className="navbar-item">
            <Link to="/myfollowings" className="nav-link">My Friends</Link>
            </li>
            <li className="navbar-item">
            <Link to="/login" className="nav-link" onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
            }}>Logout</Link>
            </li>
            </ul>
            </div>
            </nav>
        );
    }
export default Navbar;
