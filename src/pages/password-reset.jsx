import styles from "./password-reset.module.css";
import { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

function PasswordReset() {

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value)
  }

  const [valueCode, setValueCode] = useState('')
  const inputRefCode = useRef(null)

  return (
    <form className={styles.content}>
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
        onChange={setValueCode}
        name={'code'}
        error={false}
        ref={inputRefCode}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mb-6"
      />
      <Button 
        htmlType="button" type="primary" size="medium" extraClass={styles.button}>
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