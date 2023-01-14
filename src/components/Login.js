import React ,{useState}from 'react'
import { useNavigate  } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            props.showAlert("Login Successful", "success");
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
          }else{
            props.showAlert("Invalid Credentials", "danger");
          }
    }
    const onChange = (e)=>{
        // ...note => jo chiz note me phele se hai vo rahe
        // baki usme ab ye chiz add karo ya overwrite karo
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label >Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email}name="email" aria-describedby="emailHelp" placeholder="Enter email"/><small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password}name="password" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Login