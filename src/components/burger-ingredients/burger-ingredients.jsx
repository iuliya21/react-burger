import React, { useContext } from 'react';
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
//import PropTypes from "prop-types";
import BurgerContext from "../burger-context";

function BurgerIngredients() {

  const items = useContext(BurgerContext);

  const [current, setCurrent] = React.useState('bun');
  const [openModal, setOpenModal] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

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
          {items.map(obj => {
            if(obj.type === "bun") {
              return <Ingredient key={obj._id} {...obj} openModal={() => showModal(obj)} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <ul className={styles.listElements}>
          {items.map(obj => {
            if(obj.type === "sauce") {
              return <Ingredient key={obj._id} {...obj} openModal={() => showModal(obj)} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <ul className={styles.listElements}>
          {items.map(obj => {
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

// BurgerIngredients.propTypes = {
//   items: PropTypes.array.isRequired,
// }

export default BurgerIngredients;