import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Utils/storage";

function ProtectedRoute({ children }) {

  const isLoggedIn =
    isAuthenticated("isLoggedIn");

  if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
    }

    
export default ProtectedRoute;