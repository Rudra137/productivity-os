import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { getUser } from "../Utils/storage";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async () => {

  try {
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("EMAIL TYPE:", typeof email);
      console.log("EMAIL VALUE:", JSON.stringify(email));
      
    await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password.trim()
    );

    navigate("/dashboard");

  } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("CODE:", error.code);
  console.log("MESSAGE:", error.message);

  alert(`${error.code} | ${error.message}`);
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
            onChange={(e) => setEmail(e.target.value.trim())}
        />
        <input 
            type="password" 
            placeholder="Password" 
            style={{ padding: "8px", marginBottom: "10px", width: "50%", border: "1px solid #ccc",borderRadius: "4px" }} 
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
        />
        <button onClick={handleLogin}
        
        style={{ padding: "8px 16px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px" }} >Login</button>
        <p style={{ marginTop: "10px" }}>Don't have an account? <Link to="/register" style={{ color: "#3b82f6" }}>Register here</Link></p>
    </div>
  );
}   
export default Login;