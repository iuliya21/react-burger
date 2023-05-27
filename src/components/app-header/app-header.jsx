import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';

function AppHeader() {
  const location = useLocation();
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <NavLink end to="/react-burger" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-default` 
          : `${styles.link} text text_type_main-default`}>
            <BurgerIcon type={location.pathname === "/react-burger" ? "primary" : "secondary"} />
            Конструктор
          </NavLink>
          <button className={styles.button}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </button>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.rightContainer}>
          <NavLink to="react-burger/profile" className={({isActive}) => isActive ? `${styles.activeLink} text text_type_main-default` 
          : `${styles.link} text text_type_main-default`}>
            <ProfileIcon type={location.pathname.includes("/react-burger/profile") ? "primary" : "secondary"} />
            Личный кабинет
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;