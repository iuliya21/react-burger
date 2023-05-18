import styles from "./ingredients.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

function IngredientsPage () {
  return (
    <div className={`${styles.container} pt-30`}>
      <IngredientDetails />
    </div>
  )
}

export default IngredientsPage;