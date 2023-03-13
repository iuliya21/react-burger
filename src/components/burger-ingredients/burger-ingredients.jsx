import React from 'react';
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients({ items }) {

  const [current, setCurrent] = React.useState('bun');
  const [openModal, setOpenModal] = React.useState(true);

  const showModal = () => {
    setOpenModal(true);
  }

  const hideModal = () => {
    setOpenModal(false);
  }

  return (
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
          {items.map(obj => {
            if(obj.type === "bun") {
              return <Ingredient key={obj._id} {...obj} openModal={showModal} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles.listElements}>
          {items.map(obj => {
            if(obj.type === "sauce") {
              return <Ingredient key={obj._id} {...obj} openModal={showModal} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles.listElements}>
          {items.map(obj => {
            if(obj.type === "main") {
              return <Ingredient key={obj._id} {...obj} openModal={showModal} />
            }
          })}
        </ul>
      </div>

      {openModal && 
          (<Modal onClosePopup={hideModal}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
          </Modal>)
        }
    </div> 
  )
}

export default BurgerIngredients;