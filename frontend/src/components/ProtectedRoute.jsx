import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children, redirectTo, isAllowed }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace/>;
  }

  return children ? children : <Outlet />;
}

export { ProtectedRoute }
