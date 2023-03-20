import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import PropTypes from "prop-types";

function Main() {

  return(
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}

// Main.propTypes = {
//   items: PropTypes.array.isRequired,
// }

export default Main;