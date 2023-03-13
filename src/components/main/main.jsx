import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from "prop-types";

function Main({ items }) {

  return(
    <main className={styles.main}>
      <BurgerIngredients items={items}/>
      <BurgerConstructor items={items}/>
    </main>
  );
}

Main.propTypes = {
  items: PropTypes.array.isRequired,
}

export default Main;