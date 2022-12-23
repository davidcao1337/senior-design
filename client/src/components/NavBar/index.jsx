import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/exercise'>Exercise</Link>
            <Link to='/diet'>Diet</Link>
            <Link to='/sleep'>Sleep</Link>
        </div>
    )
}

export default NavBar;