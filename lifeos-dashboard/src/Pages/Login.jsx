function Login() {
  return (
    <div >
        <h1>Login Page</h1>
        <p>This is where the login form will go.</p>
        <input type="text" placeholder="Username" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
        <input type="password" placeholder="Password" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
        <button style={{ padding: "10px 20px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px" }}>Login</button> 
        <p style={{ marginTop: "10px" }}>Don't have an account? <a href="/register" style={{ color: "#3b82f6" }}>Register here</a></p>
    </div>
  );
}   
export default Login;