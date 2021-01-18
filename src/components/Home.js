import React,{useState,useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Home.css';
import {Link} from 'react-router-dom';
import {UserContext} from '../App';
function Home() {
    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:5000/posts/posts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)})
    },[])
    const deletePost=(postid)=>{
        fetch(`http://localhost:5000/posts/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }

        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.filter(item=>{
                return item._id!==result._id
            })
            setData(newData)
        })

    }
    const likePost=(id)=>{
        fetch('http://localhost:5000/posts/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())

        .then(result=>{
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        })
    }
    const makeComment=(text,postId)=>{
        fetch('http://localhost:5000/posts/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:postId,
                text:text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{console.log(err)})
    }
    return (

        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className='card home-card' key={item._id}>
                        <h3 style={{margin:'10px',fontWeight:'bold'}}>{item.postedBy.name}</h3>
                        
                        
                        <div className="card_content">
                            <h5>{item.post}</h5>
                            <br></br>
                        {
                            item.comments.map(record=>{
                                return(
                                    <h6 key={record._id}><span style={{fontWeight:'bold'}}>{record.postedBy.name}</span> {record.text}</h6>
                                )
                            })
                        }    
                        {!item.likes.includes(state._id)
                            && <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}>thumb_up</i>
                        }
                            
                            <p >{item.likes.length} likes</p>
                            <br></br>
                            <form onSubmit={(e=>{
                                e.preventDefault()
                                makeComment(e.target[0].value,item._id)
                                console.log(e.target[0].value)
                            })}>
                            <input style={{margin:'20px'}} classname="comment-input" type="text" placeholder="add a comment" />
                            {item.postedBy._id===state._id && <i className="material-icons" onClick={()=>deletePost(item._id)}>delete</i>}
                            
                            </form>
                        </div>
                        </div>
                    )
                })
            }
            

        </div>
    )
}

export default Home;
