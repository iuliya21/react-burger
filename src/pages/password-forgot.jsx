import styles from "./password-forgot.module.css";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import { Link } from 'react-router-dom';

function PasswordForgot() {
  const [valueEmail, setValueEmail] = useState('');
  const onChangeEmail = e => {
    setValueEmail(e.target.value)
  }

  return (
    <div className={styles.content}>
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
        htmlType="button" type="primary" size="medium" extraClass={styles.button}>
          Восстановить
      </Button>
      <p className={`text text_type_main-default text_color_inactive ${styles.text}`}>
        Вспомнили пароль? 
        <Link to="/react-burger/login" className={styles.link}> Войти</Link>
      </p>
    </div>
  )
}

export default PasswordForgot;