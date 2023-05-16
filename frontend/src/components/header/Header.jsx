import React from "react";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { link, notAuth } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slice/userDataSlice";
const Header = () => {
  const { pathname } = useLocation();
  const isAuth = useSelector((state) => Boolean(state.UserData.data));
	const dispatch = useDispatch()
	const onClickLogout = () => {
		dispatch(removeUser())
		window.localStorage.removeItem('token')
	}
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src="public/serviceImg/cook-svgrepo-com.svg" alt="" />
        <p>REACT RECIPE</p>
      </div>
      <div className={styles.links}>
        {isAuth ? (
          <>
            {link.map((item, i) => (
              <>
                {item.link === "/logout" ? (
                  <>
                    <button onClick={() => onClickLogout()}
                      className={pathname === item.link ? styles.active : ""}
                    >
                      {item.title}
                    </button>
                  </>
                ) : (
                  <Link
                    key={i}
                    to={item.link}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      className={pathname === item.link ? styles.active : ""}
                    >
                      {item.title}
                    </button>
                  </Link>
                )}
              </>
            ))}
          </>
        ) : (
          <>
            {notAuth.map((item, i) => (
              <Link key={i} to={item.link} style={{ textDecoration: "none" }}>
                <button className={pathname === item.link ? styles.active : ""}>
                  {item.title}
                </button>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
