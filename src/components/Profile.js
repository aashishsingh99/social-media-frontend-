import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../App';
import '../components/Profile.css';
function Profile() {
    const {state,dispatch} = useContext(UserContext)
    const [data,setData]=useState([])
    
    useEffect(()=>{
        fetch('http://localhost:5000/posts/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.mypost)})
    },[])
    return (
        <div className='outer'>
            <div className="profile">
                <div className="pic">
                    <img src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                    alt=''/>
                </div>
                <div className="info">
                    <h4 style={{fontWeight:"bold",margin:"10px"}}>{state?state.name:"loading"}</h4>
                    <h4 style={{fontWeight:"bold"}}>{state?state.email:"loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                    <h6>{data.length} posts</h6>
                    <h6>{state?state.friends.length:"loading"} friends</h6>
                       
                   </div>
                    
                </div>
                
            </div>
            {
                data.map(item=>{
                    return(
                    <div className='card home-card'>
                        <h3>{item.postedBy.name}</h3>
                        
                        <div className="card_content">
                            <h5>{item.post}</h5>
                            <i class="material-icons">thumb_up</i>
                            <p>{item.likes.length} likes</p>
                            {
                            item.comments.map(record=>{
                                return(
                                    <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                )
                            })
                        }   
                            <br></br>
                            
                        </div>
                    </div>
                )})
            }
            
            
        </div>
        


    )
}

export default Profile;
