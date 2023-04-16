import { useRef } from "react";
import {useDrop, useDrag} from "react-dnd";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-sorted.module.css";
import { DELETE_INGREDIENT } from "../../services/actions";

function BurgerConstructorSorted(props) {

  const { name, price, image, _id } = props.ing;
  const { index, moveIngredient } = props;

  const dispatch = useDispatch();
  const ref = useRef();


  const removeIngredient = (ing) => {
    dispatch({
      type: DELETE_INGREDIENT,
      data: ing._id,
    })
  }

  const [, drop] = useDrop({
    accept: 'ingredientList',
    hover(item, monitor) {
      if (!ref.current) {
          return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if(dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [, dragRef] = useDrag({
    type: 'ingredientList',
    item: () => {
      return {_id, index}
    }
  })

  dragRef(drop(ref));

  return (
    <div ref={ref} className={styles.element}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => removeIngredient(props.ing)}
      />
    </div> 
  )
}

BurgerConstructorSorted.propTypes = {
  props: PropTypes.object,
};

export default BurgerConstructorSorted;