import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = () => {

  const savedUser =
    JSON.parse(localStorage.getItem("registeredUser"));

  if (!savedUser) {
    alert("No account found. Please register first.");
    return;
  }

  if (
  email === savedUser.email &&
  password === savedUser.password
) {
  localStorage.setItem("isLoggedIn", "true");

  navigate("/dashboard");
} else {
  alert("Invalid Credentials");
}
};

  return (
    <div >
        <h1>Login Page</h1>

        <p>This is where the login form will go.</p>
  
        <input 
            type="email" 
            placeholder="Email" 
            style={{ padding: "8px", marginBottom: "10px", width: "50%", border: "1px solid #ccc",borderRadius: "4px" }} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input 
            type="password" 
            placeholder="Password" 
            style={{ padding: "8px", marginBottom: "10px", width: "50%", border: "1px solid #ccc",borderRadius: "4px" }} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}
        
        style={{ padding: "8px 16px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px" }} >Login</button>
        <p style={{ marginTop: "10px" }}>Don't have an account? <Link to="/register" style={{ color: "#3b82f6" }}>Register here</Link></p>
    </div>
  );
}   
export default Login;