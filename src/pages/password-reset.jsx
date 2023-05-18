import styles from "./password-reset.module.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { RESTORE_PASSWORD_RESET } from "../services/actions/user";
import { resetPassword } from "../services/actions/user";

function PasswordReset() {

  const dispatch = useDispatch();
  const isSuccessReset = useSelector(store => store.user.success);

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const [valueCode, setValueCode] = useState('');
  const onChangeCode = e => {
    setValueCode(e.target.value)
  }

  useEffect(() => {
    dispatch({
      type: RESTORE_PASSWORD_RESET
    });
  }, [dispatch]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(valuePassword, valueCode));
  }

  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h2>
      <PasswordInput
        placeholder={"Введите новый пароль"}
        onChange={onChangePassword}
        value={valuePassword}
        name={'password'}
        extraClass="mt-6 mb-6"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        value={valueCode}
        onChange={onChangeCode}
        name={'code'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Button 
        htmlType="submit" type="primary" size="medium" extraClass={styles.button}>
          Сохранить
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вспомнили пароль? 
        <Link to="/react-burger/login" className={styles.link}> Войти</Link>
      </p>
    </form>
  )
}

export default PasswordReset;