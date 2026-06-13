import { Link } from "react-router-dom";

export function NotFound() {
  return <div className="not-found"><h1>404</h1><p>The admin page you requested does not exist.</p><Link to="/dashboard">Back to dashboard</Link></div>;
}
