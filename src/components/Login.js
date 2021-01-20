import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const postData = (e) => {
    e.preventDefault();
    fetch(`${BASE_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({

        email,
        password,

      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Login</h2>
      <form onSubmit={postData}>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            password={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary dark">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
