import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to documents page as the default view
  return <Navigate to="/documents" replace />;
};

export default Index;
