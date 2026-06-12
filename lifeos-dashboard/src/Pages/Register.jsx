import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Register() {


const navigate = useNavigate();

const [name, setName] = useState("");
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [errors, setErrors] = useState({});

// Form validation function
const validateForm = () => {
  let newErrors = {};

  // Username

  const usernameRegex = /^[a-zA-Z0-9_]+$/;

    

    if (!username.trim()) {
        newErrors.username = "Username is required";
        }
        if (!usernameRegex.test(username)) {
        newErrors.username =
            "Username can only contain letters, numbers and underscores";
        }
        else if (username.length < 3) {
        newErrors.username =
            "Username must be at least 3 characters";
        }
        else if (username.length > 20) {
        newErrors.username =
            "Username must be less than 20 characters";
        }
       

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
     newErrors.email = "Enter a valid email address";
    }

  // Password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!passwordRegex.test(password)) {
    newErrors.password =
      "Password must contain uppercase, lowercase, number and 8+ chars";
  }
  if (password.length < 8) {
    newErrors.password =
      "Password must be at least 8 characters";
  }
  if(!password.trim()) {
    newErrors.password = "Password is required";
  }
   

  // Confirm Password
  if (password !== confirmPassword) {
    newErrors.confirmPassword =
      "Passwords do not match";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

// Handle form submission
const handleRegister = (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const user = {
    name,
    username,
    email,
    password
  };

  localStorage.setItem(
    "registeredUser",
    JSON.stringify(user)
  );

  navigate("/");
};

    return (
            <div
                style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "400px",
                margin: "0 auto"
            }}
            >
            <h1 style={{ fontSize: "24px", color: "#475569" }}>Register Page - Coming Soon!</h1>
            <p style={{ fontSize: "16px", color: "#94a3b8" }}>This is where the registration form will go.</p>

            {/*Full Name Validation*/}
            <input 
                type="text" 
                placeholder="Full Name" 
                style={{ padding: "8px", marginBottom: "10px", width: "100%" }} 
                value={name.toUpperCase()}
                onChange={(e) => setName(e.target.value)}
            />
            {/*Username Validation*/}
            <input 
                type="text" 
                placeholder="Username" 
                style={{ padding: "8px", marginBottom: "10px", width: "100%" }} 
                value={username}
                onChange={(e) => setUsername(e.target.value)}

            />
                {errors.username && (<p style={{color: "red",fontSize: "12px"}}>{errors.username}</p>)}
            {/*Email Validation*/}
            <input 
                type="email" 
                placeholder="Email" 
                style={{ padding: "8px", marginBottom: "10px", width: "100%" }} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}          
            />
                {errors.email && (<p style={{ color: "red",fontSize: "12px"}}>{errors.email}</p>)}    
            
            {/*Date of Birth Validation*/}
            <input 
                type="date" 
                placeholder="Date of Birth" 
                style={{ padding: "8px", marginBottom: "10px", width: "100%" }} 
            />
            {/*Password Validation*/}
            <input 
                type="password" 
                placeholder="Password" 
                style={{ padding: "8px", marginBottom: "10px", width: "100%" }} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
                {errors.password && (<p style={{ color: "red",fontSize: "12px"}}>{errors.password}</p>)}
            <p>
                {
                password.length < 8
                ? "Weak"
                : password.length < 12
                ? "Medium"
                : "Strong"
                }
            </p>

            {/*Confirm Password Validation*/}
            <input 
                type="password" 
                placeholder="Confirm Password" 
                style={{ padding: "8px", marginBottom: "10px", width: "100%" }} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
            />
                {errors.confirmPassword && (<p style={{ color: "red",fontSize: "12px"}}>{errors.confirmPassword}</p>)}
            
            {/*Submit Button*/}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <button 
                style={{ padding: "10px 20px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px" }}
                onClick={handleRegister} disabled={!name || !username || !email || !password || !confirmPassword}
            >
                Create Account
            </button>
            <p style={{ marginLeft: "10px", color: "#94a3b8" }}>Already have an account? <Link to="/" style={{ color: "#3b82f6" }}>Login here</Link></p>
            </div>
        </div>
    );

}

export default Register;