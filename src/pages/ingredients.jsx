import styles from "./ingredients.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

function IngredientsPage () {
  return (
    <div className={styles.container}>
      <div className={styles.ingredient}>
        <IngredientDetails />
      </div>
    </div>
  )
}

export default IngredientsPage;