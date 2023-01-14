import React ,{useState}from 'react'
import { useNavigate  } from 'react-router-dom'

const Signup = () => {
  const [credentials, setCredentials] = useState({name:"",email:"", password:"", cpassword:""})
    let navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        navigate("/");
      }else{
        alert("User Already Exists");
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
        <label htmlFor="name">Full Name</label>
        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter your name" onChange={onChange} value={credentials.name} required minLength={5}/> 
      </div>

      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email"  name="email" aria-describedby="emailHelp"  onChange={onChange}placeholder="Enter email" value={credentials.email} required minLength={5}/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control"  name="password" id="password" placeholder="Password" onChange={onChange} value={credentials.password} required minLength={5}/>
      </div>
      <div className="form-group">
        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Re-enter password" onChange={onChange} value={credentials.cpassword} required minLength={5}/>
      </div>
      <button type="submit" className="btn btn-success">Signup</button>
    </form>
    </div>
  )
}

export default Signup