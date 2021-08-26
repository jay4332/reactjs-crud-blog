import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="navbar">
            <h1>The CRUD Blog</h1>
            <div className="links">

                <Link to="/">Home</Link>
                <Link to="/create">New Item</Link>
            </div>
        </div>
     );
}
 
export default Navbar;