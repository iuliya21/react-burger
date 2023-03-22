import { useContext, useState, useReducer } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
// import PropTypes from "prop-types";
import BurgerContext from "../burger-context";

const UrlPost = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {

  const items = useContext(BurgerContext); // данные приходят через API в компоненте App, передаются в этот компонент через Context

  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
  }

  const hideModal = () => {
    setOpenModal(false);
  }

  const getIngredient = () => {
    const ingId = [];
    items.forEach(obj => {
      ingId.push(obj._id);
    })
    console.log(ingId);
    return ingId;
  }

  const getPost = () => {  // отправка запроса POST
    return fetch(UrlPost, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        "ingredients": getIngredient()
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  }

  const buns = items.filter((item) => {  // в массиве хранятся только ингредиенты с типом "bun"
    return item.type === 'bun';
  })

  const numberBun = 0; // индекс из массива булок, чтобы при рендере булки были одинаковыми

  const totalPrice = (items) => { // расчет цены
    let priceBuns = [];
    let price = 0;

    items.forEach(obj => {  // массив стоимостей всех ингридиентов из данных api
      if(obj.type === 'bun') {
        priceBuns.push(obj.price); // массив стоимостей булок
      } else {
        price += obj.price; // стоимость ингредиентов
      }
    })
    
    const result = price + (priceBuns[numberBun] * 2);
    return result;
  }

  const bunUpper = buns.map((item) => {
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

  const bunBottom = buns.map((item) => {
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
            <p className="text text_type_digits-medium">{totalPrice(items)}</p>
            <div className={styles.diamond}></div>
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={() => {showModal(); getPost()}}>
            Оформить заказ
          </Button>
        </div>

        {openModal && (
          <Modal onClosePopup={hideModal}>
            <OrderDetails />
          </Modal>
        )}
    </div>
  )
}

// BurgerConstructor.propTypes = {
//   items: PropTypes.array.isRequired,
// }

export default BurgerConstructor;