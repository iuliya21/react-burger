import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getPost } from "../utils/burger-api";


function BurgerConstructor() {

  const items = useSelector(store => store.ingredients.data);

  const [openModal, setOpenModal] = useState(false);
  const [numberOrder, setNumberOrder] = useState(); // состояние номера заказа

  const showModal = () => { // открыть модальное окно
    setOpenModal(true);
  }

  const hideModal = () => { // скрыть модальное окно
    setOpenModal(false);
  }

  const getIngredient = () => { // достать _id ингредиентов из списка пользователя
    const ingId = [];
    items.forEach(obj => {
      ingId.push(obj._id);
    })
    return ingId;
  }

  const getNumberOrder = async () => {  // получить номер заказ / отправка запроса POST
    return await getPost({getIngredient})
    .then((data) => setNumberOrder(data.order.number))
    .catch((err) => console.log(err));
  }

  const buns = items.filter(item => item.type === 'bun'); // массив булок
  const numberBun = 0; // индекс из массива булок, чтобы при рендере булки были одинаковыми
  const priceBuns = buns[numberBun]?.price * 2; //цена 2х булок
  const ingredients = items.filter(item => item.type !== 'bun'); // массив ингредиентов

  const burger = [buns[numberBun], ...ingredients, buns[numberBun]];

  const totalPrice = ingredients.reduce((sum, ingredient) => sum + ingredient.price, priceBuns).toString();

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
          {items.map(obj => {
            if(obj.type !== "bun") {
              return (
                <li key={obj._id} className={styles.element}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={obj.name}
                    price={obj.price}
                    thumbnail={obj.image}
                  />
                </li>
              )
            }
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
          <Button htmlType="button" type="primary" size="large" onClick={() => {showModal(); getNumberOrder()}}>
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