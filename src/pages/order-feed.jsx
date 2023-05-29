import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./order-feed.module.css";
import { WS_CLOSE_CONNECTION, WS_CONNECTION_START } from "../services/actions/websocket";

function Feed () {

  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(store => store.wsFeed);
  const ingredients = useSelector(store => store.ingredients.data); // все ингредиенты
  

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START
    });
    return () => {
      dispatch({
        type: WS_CLOSE_CONNECTION
      })
    }
  }, [])

  const ordersDone = useMemo(() => 
    orders.filter((item) => item.status === 'done'),
    [orders]
  )

  const OrdersPending = useMemo(() => 
    orders.filter((item) => item.status === 'pending' || "created"),
    [orders]
  )

  const diffDays = (first, second) => {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  } 

  const diffToString = (diff) => {
    switch (diff) {
      case 0:
        return 'Сегодня';
      case 1:
        return 'Вчера';
      default:
        return `${diff} дня назад`;
    }
  }
  
  return (
    <div className={styles.container}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Лента заказов</h2>
      <div className={styles.box}>
        <div className={styles.leftContainer}>
          <ul className={styles.list}>
            {orders.map((order) => {
              const orderDate = new Date(Date.parse(order.createdAt));
              const todayDate = new Date();
              const diffDate = diffDays(orderDate, todayDate);
              
              return (
                <li className={styles.orderElement} key={order.number}>
                <div className={`${styles.infoOrder} mb-6`}>
                  <p className="text text_type_digits-default">#{order.number}</p>
                  <p className="text text_type_main-default text_color_inactive">
                  {`${diffToString(diffDate)},${orderDate.getHours()}:${orderDate.getMinutes()}
                    i-GMT${orderDate.getTimezoneOffset()>0?`+${orderDate.getTimezoneOffset()/60}`
                    :orderDate.getTimezoneOffset()/60}`}
                  </p>
                </div>
                <h2 className="text text_type_main-medium mb-6">{order.name}</h2>
                <ul className={styles.ingredients}>
                  {order.ingredients.reverse().map((ingredient, index) => {
                    return (
                      <li key={index} style={{zIndex: index}} className={styles.imgElement}>
                        <img src={ingredients.find((el) => el._id === ingredient).image_mobile} 
                        alt={ingredients.find((el) => el._id === ingredient).name}
                        className={styles.image} />
                      </li>
                    )
                  })}
                </ul>
              </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.orders}>
            <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
            <h2 className="text text_type_main-medium mb-6">В работе:</h2>
            <ul className={`${styles.ordersDone} text text_type_digits-default`}>
              {ordersDone.slice(0, 12).map((item) => {
                return (
                  <li className={`${styles.elementList} ${styles.color}`} key={item.number}>
                    {item.number}
                  </li>
                )
              })}
            </ul>
            <ul className={`${styles.ordersDone} text text_type_digits-default`}>
              {OrdersPending.slice(0, 12).map((item) => {
                return (
                  <li className={`${styles.elementList}`} key={item.number}>
                    {item.number}
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div>
            <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed;