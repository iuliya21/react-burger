import styles from "./burger-constructor.module.css";
import data from '../utils/data';
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
  return(
    <div className={styles.content}>
      <ul className={styles.elements}>
        <li>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={data[0].name}
          price={data[0].price}
          thumbnail={data[0].image}
        />
        </li>
        {data.map(obj => {
          if(obj.type !== "bun") {
            return (
              <li key={obj._id} className={styles.element}>
                <div className={styles.dots}></div>
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
    </div>
  )
}

export default BurgerConstructor;