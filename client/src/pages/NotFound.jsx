import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="content">
        <div className="not-found">
            <h2>404 Not Found</h2>
            <Link to={'/'}>Home</Link>
        </div>
    </div>
  );
};