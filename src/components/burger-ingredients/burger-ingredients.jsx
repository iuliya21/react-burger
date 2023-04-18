import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Ingredient from '../ingredient/ingredient';
import Modal from '../modal/modal';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getDetailsIngredient, deleteDetailsIngredient } from "../../services/actions";
import { useModal } from "../../hooks/useModal";

function BurgerIngredients() {

  const { isModalOpen, openModal, closeModal } = useModal();

  const ingredients = useSelector(store => store.ingredients.data); // список ингредиентов с сервера, хранится в сторе

  const [current, setCurrent] = useState('bun');
  const container = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainRef = useRef();

  const dispatch = useDispatch();

  const showModal = (element) => { // открытие модального окна
    dispatch(getDetailsIngredient(element));
    openModal();
  }

  const hideModal = () => { // закрытие модального окна
    dispatch(deleteDetailsIngredient());
    closeModal();
  }

  const handleScroll = () => {
    if (container.current.getBoundingClientRect().top > bunsRef.current.getBoundingClientRect().top) {
      setCurrent('bun');
    }
    if (container.current.getBoundingClientRect().top > saucesRef.current.getBoundingClientRect().top) {
      setCurrent('sauce');
    }
    if (container.current.getBoundingClientRect().top > mainRef.current.getBoundingClientRect().top) {
      setCurrent('main');
    }
  };

  const setTab = (state, element) => {
    element.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <h1 className="text text_type_main-large mb-5 mt-10">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={(e) => {setTab(e, bunsRef)}} id={"bun"}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={(e) => {setTab(e, saucesRef)}} id={"sauce"}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={(e) => {setTab(e, mainRef)}} id={"main"}>
          Начинки
        </Tab>
      </div>
      <div className={styles.components} ref={container} onScroll={handleScroll}>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={bunsRef}>Булки</h2>
        <ul className={styles.listElements}>
          {ingredients.map(obj => {
            if(obj.type === "bun") {
              return <Ingredient key={obj._id} {...obj} openModal={() => showModal(obj)} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={saucesRef}>Соусы</h2>
        <ul className={styles.listElements}>
          {ingredients.map(obj => {
            if(obj.type === "sauce") {
              return <Ingredient key={obj._id} {...obj} openModal={() => showModal(obj)} />
            }
          })}
        </ul>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={mainRef}>Начинки</h2>
        <ul className={styles.listElements}>
          {ingredients.map(obj => {
            if(obj.type === "main") {
              return <Ingredient key={obj._id} {...obj} openModal={() => showModal(obj)} />
            }
          })}
        </ul>
      </div>

      {isModalOpen && 
          <Modal onClosePopup={hideModal}>
            <IngredientDetails />
          </Modal>
        }
    </div> 
  )
}

export default BurgerIngredients;