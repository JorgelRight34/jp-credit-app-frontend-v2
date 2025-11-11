import { NavLink } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { getFirstAndLastName } from "../../utils/utils";

const TopNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="d-flex align-items-center p-2 shadow-sm bg-white">
      <div>
        <img
          className="img-fluid"
          style={{ height: "3rem" }}
          src="/horizontal-logo.png"
        />
      </div>
      <div className="flex content-end ms-auto">
        <NavLink className={"nav-link p-2 text-muted"} to={"/login"}>
          <i className="fa-solid fa-user-tie me-2"></i>
          {user && getFirstAndLastName(user)}
        </NavLink>
        <NavLink
          className={"nav-link p-2 text-muted"}
          onClick={logout}
          to={"/login"}
        >
          <i className="fa-solid fa-right-from-bracket me-2"></i>
          Cerrar Sesión
        </NavLink>
      </div>
    </div>
  );
};

export default TopNavbar;
