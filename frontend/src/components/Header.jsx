import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/articles");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Príbehy Sveta</Link>
      </div>
      <ul>
        {user ? (
          <div>
            <li>
              <Link to="/">Príbehy</Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Odhlásenie
              </button>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Link to="/articles">Príbehy</Link>
            </li>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Prihlásenie
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Registrácia
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
