import styles from "./login.module.css";
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from "../services/actions/user";

function Login() {
  const dispatch = useDispatch();
  const isSuccessLogin = useSelector(store => store.user.success);

  const [valueEmail, setValueEmail] = useState('')
  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(valueEmail, valuePassword));
  }

  if(isSuccessLogin) {
    return <Navigate to="/react-burger"/>;
  }

  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Вход</h2>
      <EmailInput
        onChange={onChangeEmail}
        value={valueEmail}
        name={'email'}
        isIcon={false}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={onChangePassword}
        value={valuePassword}
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