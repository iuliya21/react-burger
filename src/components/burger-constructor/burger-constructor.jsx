import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { setOrder, ADD_INGREDIENT, ADD_BUN, MOVE_INGREDIENT } from "../../services/actions";
import BurgerConstructorSorted from "../burger-constructor-sorted/burger-constructor-sorted";
import { v4 as uuidv4 } from 'uuid';


function BurgerConstructor() {

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const ingredients = useSelector(store => store.burgerIngredients.ingredients); // ингредиенты из стора
  const bun = useSelector(store => store.burgerIngredients.bun); // булки из стора
  const buns = bun.slice(bun.length - 1); // оставляем в массиве только последний элемент
  const numberOrder = useSelector(store => store.numberOrder.order); // номер заказа из стора
  const burger = [...buns, ...ingredients];

    const [{ isHover }, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if(item.props.type === 'bun') {
        dispatch({
          type: ADD_BUN,
          data: item.props,
        })
      } 
      else {
        addIngredient(item);
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    })
  })

  const outlineColor = isHover ? 'lightgreen' : '#131316';

  const addIngredient = (ing) => {
    dispatch({
      type: ADD_INGREDIENT,
      data: ing.props,
    })
  }

  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_INGREDIENT,
      itemFrom: dragIndex,
      itemTo: hoverIndex,
    })
  }, [ingredients]);

  const showModal = () => { // открыть модальное окно
    dispatch(setOrder(burger.map(item => item._id)));
    setOpenModal(true);
  }

  const hideModal = () => { // скрыть модальное окно
    setOpenModal(false);
  }

  const numberBun = 0; // индекс из массива булок, чтобы при рендере булки были одинаковыми
  const priceBuns = buns[numberBun]?.price * 2; //цена 2х булок

  const totalPrice = (ingredients.length > 0 || buns.length > 0) && 
  ingredients.reduce((sum, ingredient) => sum + ingredient.price, priceBuns).toString();

  const bunUpper = buns.map((item) => { // разметка для верхней булки
    return (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={item.name + '\n(верх)'}
          price={item.price}
          thumbnail={item.image}
        />
      )
    })

  const bunBottom = buns.map((item) => { // разметка для нижней булки
    return (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={item.name + '\n(низ)'}
        price={item.price}
        thumbnail={item.image}
      />
    )
  })

  return(
    <div className={styles.content} ref={dropRef} style={{outlineColor}}>
        <div className={styles.borderElement}>
          {bunUpper[numberBun]}
        </div>
          <ul className={styles.list}>
            {ingredients.map((ing, index) => {
              ing.id = uuidv4();
              ing.index = index;
              return (
                <li key={ing.id} className={styles.element}>
                  <BurgerConstructorSorted ing={ing} index={index} moveIngredient={moveIngredient} />
                </li> 
              )
            })}
          </ul>
        <div className="pl-8 mt-4">
          {bunBottom[numberBun]}
        </div>
        <div className={styles.order}>
          <div className={styles.resultSum}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            {burger.length > 0 && (
              <div className={styles.diamond}></div>
            )}
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => {showModal()}}>
            Оформить заказ
          </Button>
        </div>

        {openModal && (
          <Modal onClosePopup={hideModal}>
            <OrderDetails numberOrder={numberOrder}/>
          </Modal>
        )}
    </div>
  )
}

export default BurgerConstructor;