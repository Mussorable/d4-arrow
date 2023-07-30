import clsx from "clsx";
import { Outlet, NavLink, Link } from "react-router-dom";
import { default as Logo } from "../../assets/logo.svg";
import { createRipple } from "../../utils/effects";
import "./header.scss";

interface ActiveClassProps {
  isActive: boolean;
  isPending: boolean;
}

const pages = ["Home", "Classes", "Builds", "Skills calculator"];

const Header = () => {
  const setActiveClass = ({ isActive, isPending }: ActiveClassProps) =>
    isPending ? "pending" : isActive ? "active" : "";

  return (
    <>
      <header className="header">
        <div className="header-wrapper container">
          <div className="logo-wrapper">
            <img
              className="logo-image"
              src={Logo}
              width="60"
              height="60"
              alt="D4 Fast Arrow logo"
            />
            <Link to="/" className="logo-title">
              D4 Fast Arrow
            </Link>
          </div>
          <nav className="navigation-container">
            <ul className="navigation-list">
              {pages &&
                pages.map((page: string) => {
                  const pageLink = page.toLowerCase().replace(" ", "-");
                  return (
                    <li key={pageLink} className="nav-item">
                      <NavLink
                        onClick={createRipple}
                        className={clsx(setActiveClass, "nav-link")}
                        to={pageLink === "home" ? "/" : pageLink}
                      >
                        {page}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
      </header>
      <div className="margin-indent" />
      <Outlet />
    </>
  );
};

export default Header;
