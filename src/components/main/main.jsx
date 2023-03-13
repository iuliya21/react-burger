import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function Main({ items }) {

  return(
    <main className={styles.main}>
      <BurgerIngredients items={items}/>
      <BurgerConstructor items={items}/>
    </main>
  );
}

export default Main;