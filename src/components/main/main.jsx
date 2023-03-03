import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function Main() {
  return(
    <div className={styles.main}>
      <BurgerIngredients />
      {/* <BurgerConstructor /> */}
    </div>
  );
}

export default Main;