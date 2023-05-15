import styles from "./password-forgot.module.css";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { restorePassword } from "../services/actions/user";

function PasswordForgot() {

  const dispatch = useDispatch();
  const isSuccessPost = useSelector(store => store.user.success);
  
  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = e => {
    setValueEmail(e.target.value);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(restorePassword(valueEmail));
  }

  if (isSuccessPost) {
    return <Navigate to="/react-burger/reset-password"/>;
  }

  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
      <EmailInput
        placeholder={'Укажите e-mail'}
        onChange={onChangeEmail}
        value={valueEmail}
        name={'email'}
        isIcon={false}
        extraClass="mt-6 mb-6"
      />
      <Button 
        htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
          Восстановить
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вспомнили пароль? 
        <Link to="/react-burger/login" className={styles.link}> Войти</Link>
      </p>
    </form>
  )
}

export default PasswordForgot;