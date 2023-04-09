import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { setOrder } from "../../services/actions";
import { getPost } from "../utils/burger-api";


function BurgerConstructor() {

  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.burgerIngredients.ingredients);
  const buns = useSelector(store => store.burgerIngredients.bun);
  const numberOrder = useSelector(store => store.numberOrder.order);
  const burger = [...buns, ...ingredients];

  const [openModal, setOpenModal] = useState(false);

  const showModal = () => { // открыть модальное окно
    dispatch(setOrder(burger.map(item => item._id)));
    setOpenModal(true);
  }

  const hideModal = () => { // скрыть модальное окно
    setOpenModal(false);
  }

  const numberBun = 0; // индекс из массива булок, чтобы при рендере булки были одинаковыми
  const priceBuns = buns[numberBun]?.price * 2; //цена 2х булок

  const totalPrice = (ingredients.length > 0 && buns.length > 0) && ingredients.reduce((sum, ingredient) => sum + ingredient.price, priceBuns).toString();

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
    <div className={styles.content}>
        <div className={styles.borderElement}>
          {bunUpper[numberBun]}
        </div>
        <ul className={styles.list}>
          {ingredients.map(ing => {
            return (
              <li key={ing._id} className={styles.element}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={ing.name}
                    price={ing.price}
                    thumbnail={ing.image}
                  />
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
            <div className={styles.diamond}></div>
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