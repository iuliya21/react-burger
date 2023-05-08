import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <button className={styles.button}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </button>
          <button className={styles.button}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </button>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.rightContainer}>
          <Link to="/react-burger/login">
          {/* <button className={styles.button}> */}
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          {/* </button> */}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;