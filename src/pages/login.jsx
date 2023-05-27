import styles from "./login.module.css";
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loginUser } from "../services/actions/user";
import { useForm } from "../hooks/useForm";

function Login() {

  const { values, handleChange } = useForm({ email: '', password: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSuccessLogin = useSelector(store => store.user.authorizedUser);

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(values.email, values.password));
  }

  if(isSuccessLogin) {
    navigate(-1);
  }

  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Вход</h2>
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={'password'}
        extraClass="mt-6 mb-6"
      />
      <Button 
        htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
          Войти
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вы - новый пользователь? 
        <Link to="/react-burger/register" className={styles.link}> Зарегистрироваться</Link>
      </p>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Забыли пароль? 
        <Link to="/react-burger/forgot-password" className={styles.link}> Восстановить пароль</Link>
      </p>
    </form>
  )
}

export default Login;