import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import PropTypes from 'prop-types';

function Ingredient({ name, price, image}) {
  return (
    <li className={styles.element}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={image} alt={name} />
      <div className={styles.price}>
        <p className={"text text_type_digits-default mt-1 mb-1"}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={"text text_type_main-default pb-8" + ' ' + styles.title}>{name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default Ingredient;