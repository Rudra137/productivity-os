import { FaPlaceOfWorship } from "react-icons/fa";

function Register() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <h1 style={{ fontSize: "24px", color: "#475569" }}>Register Page - Coming Soon!</h1>
            <p style={{ fontSize: "16px", color: "#94a3b8" }}>This is where the registration form will go.</p>
            <input type="text" placeholder="Full Name" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
            <input type="text" placeholder="Username" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
            <input type="email" placeholder="Email" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
            <input type="text" placeholder="City" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
            <input type="date" placeholder="Date of Birth" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
            <input type="number" placeholder="Phone Number" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
            <input type="password" placeholder="Password" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
            <input type="password" placeholder="Confirm Password" style={{ padding: "8px", marginBottom: "10px", width: "100%" }} />
            <button style={{ padding: "10px 20px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px" }}>Create Account</button>
        </div>
    );

}

export default Register;