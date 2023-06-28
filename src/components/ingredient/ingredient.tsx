import { useDrag } from 'react-dnd/dist/hooks';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { useNavigate, useMatch } from 'react-router-dom';
import { useAppSelector } from "../../hooks/customHooks";

type TIngredientProps = {
  name: string,
  price: number,
  image: string,
  openModal: Function,
  _id: string,
  type: string,
}

function Ingredient(props: TIngredientProps) {

  const {name, price, image, openModal, _id, type} = props;
  const navigate = useNavigate();
  const match = useMatch('ingredients/:id');
  const { id } = match?.params || {};

  let countIngredients = useAppSelector(store => store.burgerIngredients.ingredients.filter(ing => ing._id === _id).length);
  const bun = useAppSelector(store => store.burgerIngredients.bun);
  const buns = bun.slice(bun.length - 1);
  let countBun = buns.filter(ing => ing._id === _id).length * 2;

  const count = type === 'bun'
    ? countBun
    : countIngredients;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { props },
  });

  return (
    <li className={styles.element} onClick={() => {
      if(id !== _id) {
        navigate(`/react-burger/ingredients/${_id}`, { state: { background: true } });
      }
      openModal();
    }} draggable ref={dragRef}>
      {count !== 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={image} alt={name} />
      <div className={styles.price}>
        <p className={"text text_type_digits-default mt-1 mb-1"}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={"text text_type_main-default pb-8" + ' ' + styles.title}>{name}</p>
    </li>
  )
}

export default Ingredient;