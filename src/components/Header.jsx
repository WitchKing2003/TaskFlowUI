import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/about">About</NavLink>
    </>
  );
}

export default Header;
