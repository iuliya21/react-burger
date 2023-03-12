import React from "react";
import styles from "./burger-constructor.module.css";
import data from '../utils/data';
import { ConstructorElement, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";


function BurgerConstructor({ items }) {

  const [openModal, setOpenModal] = React.useState(false);

  const showModal = () => {
    setOpenModal(true);
  }

  const hideModal = () => {
    setOpenModal(false);
  }

  return(
    <div className={styles.content}>
        <div className={styles.borderElement}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name + '\n(верх)'}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <ul className={styles.list}>
          {data.map(obj => {
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
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[0].name + '\n(низ)'}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
        <div className={styles.order}>
          <div className={styles.resultSum}>
            <p className="text text_type_digits-medium">610</p>
            <div className={styles.diamond}></div>
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={showModal}>
            Оформить заказ
          </Button>
        </div>

        {openModal && (
      <Modal onClosePopup={hideModal}>
        блаблабла
      </Modal>
    )}
    </div>
  )
}

export default BurgerConstructor;