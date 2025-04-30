import { Link } from "react-router-dom";
import './Header.css'
const Header = () =>{
    return (
        <div className="abc">
          <Link to='/'>Home</Link>
          <Link to='/blogs'>Blogs</Link>
          <Link to='/create-blog'>Create Blog</Link>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </div>
      )
}

export default Header;