import { Link, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./Navigation";
import { Container } from "../ui/Container";
import { useAuth } from "../../context/AuthContext";
import { LiaSignOutAltSolid } from "react-icons/lia";

function Navbar() {
  const location = useLocation();
  const { isAuth, user, signOut } = useAuth();

  return (
    <>
      <nav className="bg-green-100">
        <Container className="flex justify-between items-center py-3">
          <Link to="/">
            <h1 className="text-2xl font-bold text-slate-950">Tienda</h1>
          </Link>
          <ul className="flex gap-x-1 items-center justify-center">
            {isAuth ? (
              <>
                {privateRoutes.map(({ name, path, icon }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className={
                        location.pathname === path
                          ? "text-emerald-400 items-center flex px-4 py-2 gap-x-2"
                          : "text-slate-950 items-center flex px-4 py-2 gap-x-2"
                      }
                    >
                      {icon}
                      <p className="hidden sm:block">{name}</p>
                    </Link>
                  </li>
                ))}

                <li className="flex px-8 items-center justify-center">
                  <Link to="/profile">
                    <img
                      src={user.gravatar}
                      alt=""
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </Link>
                </li>

                <li
                  onClick={signOut}
                  className="hover:cursor-pointer flex flex-col items-center px-3 py-1 gap-x-1"
                >
                  <LiaSignOutAltSolid className="h-7 w-7" />
                  <span className="font-medium">Salir</span>
                </li>
              </>
            ) : (
              publicRoutes.map(({ name, path }) => (
                <li
                  key={path}
                  className={
                    location.pathname === path
                      ? "text-emerald-400 items-center flex px-4 py-2 gap-x-2"
                      : "text-slate-950 items-center flex px-4 py-2 gap-x-2"
                  }
                >
                  <Link to={path}>{name}</Link>
                </li>
              ))
            )}
          </ul>
        </Container>
      </nav>
    </>
  );
}

export default Navbar;
