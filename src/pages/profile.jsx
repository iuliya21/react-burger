import { useDispatch } from "react-redux";
import styles from "./profile.module.css";
import { NavLink, Outlet } from 'react-router-dom';
import { logoutUser } from "../services/actions/user";

function Profile() {

  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(logoutUser());
  }

  return (
    <div className={styles.content}>
      <div className={styles.navigation}>
        <ul className={`text text_type_main-medium ${styles.list}`}>
          <li className={styles.element}>
            <NavLink end to="/react-burger/profile" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-medium`
            : `${styles.link} text text_type_main-medium`}>
              Профиль
            </NavLink>
          </li>
          <li className={styles.element}>
            <NavLink to="/react-burger/profile/orders" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-medium`
            : `${styles.link} text text_type_main-medium`}>
              История заказов
            </NavLink>
          </li>
          <li className={styles.element}>
            <NavLink to="/react-burger/profile/exit" onClick={handlerLogout} className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-medium`
            : `${styles.link} text text_type_main-medium`}>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <Outlet/>
    </div>
  )
}

export default Profile;