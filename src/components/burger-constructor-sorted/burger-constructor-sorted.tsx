import { useRef, RefObject } from "react";
import {useDrop, useDrag} from "react-dnd";
import { useDispatch } from "react-redux";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-sorted.module.css";
import { DELETE_INGREDIENT } from "../../services/actions";
import { TIngredient } from "../../services/types/types";
import { useAppDispatch } from "../../hooks/customHooks";

type TIngredientSorted = {
  index: number,
  ing: TIngredient,
  moveIngredient: Function,
}

function BurgerConstructorSorted(props: TIngredientSorted) {

  const { name, price, image, _id } = props.ing;
  const { index, moveIngredient } = props;

  const dispatch = useAppDispatch();
  const ref = useRef() as RefObject<HTMLDivElement>;

  const removeIngredient = (ing: TIngredient) => {
    dispatch({
      type: DELETE_INGREDIENT,
      data: ing._id,
    })
  }

  const [, drop] = useDrop({
    accept: 'ingredientList',
    hover(item: any, monitor) {
      if (!ref.current) {
          return;
      }
      const dragIndex: any = item.index;
      const hoverIndex = index;
      if(dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
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

export default BurgerConstructorSorted;