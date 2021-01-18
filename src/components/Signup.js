import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom';
const Signup=()=> {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history=useHistory();
    const postData=(e)=>{
        e.preventDefault();
        fetch('http://localhost:5000/users/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password

            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                history.push('/login');
            }
        })
        .catch(err=>console.log(err));
    }
    return (
        <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>
        <form onSubmit={postData}>
            <div className="form-group">
                <label>Name</label>
                <input
                type="text" 
                className="form-control"
                value={name}
                onChange={e=>setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input 
                type="email" 
                className="form-control"
                value={email}
                onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                type="password" 
                className="form-control"
                value={password}
                onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">
                SignUp
            </button>
        </form>  
        </div>
    );
}

export default Signup;

