import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import '../assets/Profile.css';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserProfile = () => {
  const [data, setData] = useState(null);

  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showFollow, setshowFollow] = useState(state ? !state.friends.includes(userid) : true);

  useEffect(() => {
    fetch(`${BASE_URL}/user/${userid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      }).catch((err) => { console.log(err); });
  }, []);
  const followUser = () => {
    fetch(`${BASE_URL}/follow`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,

      },
      body: JSON.stringify({
        followId: userid,
      }),
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch({ type: 'UPDATE', payload: { friends: result.friends } });
        localStorage.setItem('user', JSON.stringify(result));
        setData((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            friends: [...prevState.user.friends, result._id],
          },
        }));
        setshowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch(`${BASE_URL}/unfollow`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,

      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch({ type: 'UPDATE', payload: { friends: result.friends } });
        localStorage.setItem('user', JSON.stringify(result));
        setData((prevState) => {
          const newFollower = prevState.user.friends.filter((item) => item !== result._id);
          return {
            ...prevState,
            user: {
              ...prevState.user,
              friends: newFollower,
            },
          };
        });
        setshowFollow(true);
      });
  };
  return (
    <>
      {data
        ? (
          <div className="outer">
            <div className="profile">
              <div className="pic">
                <img
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  alt=""
                />
              </div>
              <div className="info">
                <h4 style={{ fontWeight: 'bold' }}>{data.user.name}</h4>
                <h4 style={{ fontWeight: 'bold' }}>{data.user.email}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '108%' }}>
                  <h6>
                    {data.posts.length}
                    {' '}
                    posts
                  </h6>
                  <h6>
                    {data.user.friends.length}
                    {' '}
                    friends
                  </h6>

                </div>
                {showFollow ? <button className="btn btn-primary" onClick={() => followUser()}>Add as Friend</button> : <button className="btn btn-primary" onClick={() => unfollowUser()}>Unfriend</button>}

              </div>

            </div>
            {
            data.posts.map((item) => (
              <div className="card home-card">
                <h3 style={{ margin: '10px', fontWeight: 'bold' }}>{item.postedBy.name}</h3>

                <div className="card_content">
                  <h5>{item.post}</h5>
                  <i className="material-icons">thumb_up</i>
                  <br />

                </div>
              </div>
            ))
        }

          </div>
        )

        : <h2>Loading...</h2>}

    </>

  );
};

export default UserProfile;
