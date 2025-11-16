import { UserAuth } from "../context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { userData } = UserAuth();

  if (!userData || !userData.id) {
    return <Navigate to="/" replace />;
  }

  return children;
}
