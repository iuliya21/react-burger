import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";

function BurgerIngredients() {

  const ingredients = useSelector(store => store.ingredients.data); // список ингредиентов с сервера

  const [current, setCurrent] = useState('bun');
  const [openModal, setOpenModal] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  const showModal = (element) => {
    setOpenModal(true);
    setCurrentIngredient(element);
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
          {ingredients.map(obj => {
            if(obj.type === "bun") {
              return <Ingredient key={obj._id} {...obj} openModal={() => showModal(obj)} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles.listElements}>
          {ingredients.map(obj => {
            if(obj.type === "sauce") {
              return <Ingredient key={obj._id} {...obj} openModal={() => showModal(obj)} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles.listElements}>
          {ingredients.map(obj => {
            if(obj.type === "main") {
              return <Ingredient key={obj._id} {...obj} openModal={() => showModal(obj)} />
            }
          })}
        </ul>
      </div>

      {openModal && 
          <Modal onClosePopup={hideModal}>
            <IngredientDetails currentElement={currentIngredient}/>
          </Modal>
        }
    </div> 
  )
}

export default BurgerIngredients;