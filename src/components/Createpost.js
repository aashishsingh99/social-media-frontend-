import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../components/CreatePost.css';
function Createpost() {
    const [body,setBody]=useState("");
    const history=useHistory();
    const postBody=(e)=>{
        e.preventDefault();
        fetch('http://localhost:5000/posts/post',{
            method:"post",
            headers:{

                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                post:body

            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                
                history.push('/');
            }
        })
        .catch(err=>console.log(err));
    }
    return (
        <div className='card create-input'>
            <input type='text' placeholder='what do you want to share?' value={body} onChange={(e)=>setBody(e.target.value)}/>
            <button onClick={postBody} type="submit" className="btn btn-primary">
                Post
            </button>
        </div>
    )
}

export default Createpost;
