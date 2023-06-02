import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./order-user-history.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { WS_CLOSE_CONNECTION_USER, WS_CONNECTION_START_USER } from "../../services/actions/websocket-user";
import { getCookie } from "../../utils/cookieFunction";
import { diffToString, diffDays } from "../../utils";
import { v4 as uuidv4 } from 'uuid';
import { useModal } from "../../hooks/useModal";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import Modal from "../modal/modal";
import FeedInfo from "../feed-info/feed-info";


function OrdersUserHistory() {

  const params = useParams();
  const location = useLocation();
  const background = location.state?.background;

  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const orders = useSelector(store => store.wsFeedUser.orders).reverse();
  const authUser = useSelector(store => store.user.authorizedUser);
  const ingredients = useSelector(store => store.ingredients.data);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START_USER,
      payload: getCookie("accessToken")
    });
    return () => {
      dispatch({
        type: WS_CLOSE_CONNECTION_USER
      })
    };
  }, [authUser]);

  const hideModal = () => {
    closeModal();
    navigate('/react-burger/profile/orders')
  }

  const totalPrice = (burger) => {
    let sum = 0;
    burger.forEach(ing => {
      if (ing !== null) {
        sum += ingredients.find(el => el._id === ing).price;
      }
    });
    return sum;
  }

  return (params.id && !background) ?
    (<Outlet />) :
    (<div className={styles.container}>
      <ul className={styles.list}>
        {orders.map((order) => {
          const _id = order._id;
          const status = order.status === 'done' ? 'Выполнен'
            : (order.status === 'pending') ? 'Готовится'
              : 'Создан';
          const orderDate = new Date(Date.parse(order.createdAt));
          const todayDate = new Date();
          const diffDate = diffDays(orderDate, todayDate);
          const orderMinutes = orderDate.getMinutes().toString().length < 2 ? `0${orderDate.getMinutes()}` : orderDate.getMinutes();
          return (
            <li className={styles.element} key={_id} onClick={() => {
              
              navigate(`/react-burger/profile/orders/${_id}`, { state: { background: true } });
              openModal();
            }}>
              <div className={styles.header}>
                <p className="text text_type_digits-default mb-6">#{order.number}</p>
                <p className="text text_type_main-default text_color_inactive">
                  {`${diffToString(diffDate)}, ${orderDate.getHours()}:${orderMinutes}
                      i-GMT${orderDate.getTimezoneOffset() > 0 ? `+${orderDate.getTimezoneOffset() / 60}`
                      : orderDate.getTimezoneOffset() / 60}`}
                </p>
              </div>
              <p className="text text_type_main-medium mb-2">{order.name}</p>
              <p className={status === 'Выполнен'
                ? `${styles.color} text text_type_main-default mb-6`
                : 'text text_type_main-default mb-6'}>{status}</p>
              <div className={styles.footer}>
                <ul className={styles.ingredients}>
                  {order.ingredients.map((ingredient, index) => {
                    if (ingredient !== null) {
                      if (index > 0 && index <= 5) {
                        return (
                          <li key={uuidv4()} style={{ zIndex: index }} className={styles.ingredient}>
                            <img src={ingredients.find((el) => el._id === ingredient).image_mobile}
                              alt={ingredients.find((el) => el._id === ingredient).name}
                              className={styles.image} />
                          </li>
                        )
                      }
                      if (order.ingredients.length > 5) {
                        if (index === 0) {
                          return (
                            <li key={uuidv4()} style={{ zIndex: index }} className={`${styles.ingredient} ${styles.last}`}>
                              <p className={`${styles.text}`}>+{order.ingredients.length - 5}</p>
                              <img src={ingredients.find((el) => el._id === ingredient).image_mobile}
                                alt={ingredients.find((el) => el._id === ingredient).name}
                                className={styles.image} />
                            </li>
                          )
                        }
                      }
                    }
                  })}
                </ul>
                <div className={styles.price}>
                  <p className="text text_type_digits-default">{totalPrice(order.ingredients)}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {isModalOpen &&
      <Modal onClosePopup={hideModal}>
        <FeedInfo />
      </Modal>}
    </div>
    )
}

export default OrdersUserHistory;