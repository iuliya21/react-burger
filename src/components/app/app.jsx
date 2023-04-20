import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header.jsx";
import Main from "../main/main.jsx";
import { getIngredients } from '../../services/actions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return(
    <>
      <AppHeader />
      <Main />
    </>
  );
}

export default App;