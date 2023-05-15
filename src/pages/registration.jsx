import styles from "./registration.module.css";
import { EmailInput, Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { registerUser } from "../services/actions/user";

function Registration() {

  const dispatch = useDispatch();
  const [valueName, setValueName] = useState('');
  const inputRefName = useRef(null);

  const [valueEmail, setValueEmail] = useState('')
  const onChangeEmail = e => {
    setValueEmail(e.target.value);
  }

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(valueEmail, valuePassword, valueName));
  }
  
  return (
    <form className={styles.content} onSubmit={handlerSubmit}>
      <h2 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h2>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setValueName(e.target.value)}
        value={valueName}
        name={'name'}
        error={false}
        ref={inputRefName}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
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
          Зарегистрироваться
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Уже зарегистрированы?
        <Link to="/react-burger/login" className={styles.link}> Войти</Link>
      </p>
    </form>
  )
}

export default Registration;