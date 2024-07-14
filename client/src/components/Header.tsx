import { useState } from 'react'
import { FaSearch, FaShoppingBag, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const user = {_id : "", role: "user",}

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const LogoutHandler = () => {
    setIsOpen(false);
  }

  return <nav className='header'>
    <h2>@mixin.</h2>
    <Link onClick={() => setIsOpen(false)} to={'/home'}>HOME</Link>
    <Link onClick={() => setIsOpen(false)} to={'/search'}> <FaSearch/> </Link>
    <Link onClick={() => setIsOpen(false)} to={'/cart'}> <FaShoppingBag/> </Link>

    {
        user?._id? (
        <>
        <button className='user' onClick={() => setIsOpen((prev) => !prev)}> <FaUser/> </button>
        <dialog open={isOpen}>
        <div>{
          user.role === "admin" && (
            <Link to='/admin/dashboard'>Admin</Link>
          )}
          <Link onClick={LogoutHandler} to={"/orders"}>Order</Link>
           <button><FaSignOutAlt/></button>
        </div>
        </dialog>
        </> 
        ) : <Link to={"/register"}>sign up</Link>
    }
  </nav>
}

export default Header
