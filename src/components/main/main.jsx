import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getIngredients } from '../../services/actions';

function Main() {

  const params = useParams();
  let location = useLocation();
  let background = location.state?.background;
  
  return (params.id && !(location.state && background)) ? 
    (<Outlet />) :
      (<main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
  );
}

export default Main;