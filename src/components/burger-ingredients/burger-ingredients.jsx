import React from 'react';
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../utils/data';
import Ingredient from '../ingredient/ingredient';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one');
  return(
    <div>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
        <div className={styles.tabs}>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.components}>
          <h2 className="text text_type_main-medium mt-10 mb-6">Булки</h2>
          <ul className={styles.listElements}>
            {data.map(obj => {
              if(obj.type === "bun") {
                return <Ingredient key={obj._id} {...obj} />
              }
            })}
          </ul>
          <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
          <ul className={styles.listElements}>
            {data.map(obj => {
              if(obj.type === "sauce") {
                return <Ingredient key={obj._id} {...obj} />
              }
            })}
          </ul>
          <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
          <ul className={styles.listElements}>
            {data.map(obj => {
              if(obj.type === "main") {
                return <Ingredient key={obj._id} {...obj} />
              }
            })}
          </ul>
        </div>
    </div> 
  )
}

export default BurgerIngredients;