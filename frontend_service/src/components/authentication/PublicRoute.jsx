import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
    return !!localStorage.getItem("authToken"); // Check if token exists
};

function PublicRoute({ children }) {
    if (isAuthenticated()) {
        return <Navigate to="/app/home" replace />;
    }
    return children;
}

export default PublicRoute;
