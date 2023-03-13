import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

function IngredientDetails({ currentElement }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
      </div>
      <img src={currentElement.image_large} alt={currentElement.name} />
      <p className="text text_type_main-medium mb-8 mt-4">{currentElement.name}</p>
      <div className={styles.composition}>
        <div className={styles.calories}>
          <p className="text text_type_main-small text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{currentElement.calories}</p>
        </div>
        <div className={styles.elements}>
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentElement.proteins}</p>
        </div>
        <div className={styles.elements}>
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentElement.fat}</p>
        </div>
        <div className={styles.elements}>
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentElement.carbohydrates}</p>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  currentElement: PropTypes.object.isRequired,
}

export default IngredientDetails;