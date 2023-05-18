import { useDispatch, useSelector } from "react-redux";
import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getIngredients } from "../../services/actions";

function IngredientDetails() {

  const { id } = useParams();
  const [ingredient, setElement] = useState(undefined);

  const ingredients = useSelector(store => store.ingredients.data);


  useEffect(()=>{
    setElement(ingredients.find(ing => ing._id === id))
  }, [ingredients]);
   
  // const ingredient = ingredients.find((ing) => ing._id === id);
  
  return ingredient ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-medium mb-8 mt-4">{ingredient.name}</p>
      <div className={styles.composition}>
        <div className={styles.calories}>
          <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div className={styles.elements}>
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div className={styles.elements}>
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div className={styles.elements}>
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  ) : null
}

export default IngredientDetails;