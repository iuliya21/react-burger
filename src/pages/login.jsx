import styles from "./login.module.css";
import { EmailInput, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import { Link } from 'react-router-dom';

function Login() {
  const [valueEmail, setValueEmail] = useState('')
  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  return (
    <form className={styles.content}>
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
        htmlType="button" type="primary" size="medium" extraClass={styles.button}>
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