import styles from "./info-user.module.css";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import { EmailInput, Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

function UserInfo() {

  const {name, email} = useSelector(store => store.user);

  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    inputRef.current.disabled = false;
    // inputRef.current.classList.remove('input__textfield-disabled');
  }

  const [valueName, setValueName] = useState('Марк');
  const onChangeName = e => {
    setValueName(e.target.value);
  }

  const [valueEmail, setValueEmail] = useState('iuliya@mail.ru');
  const onChangeEmail = e => {
    setValueEmail(e.target.value);
  }

  const [valuePassword, setValuePassword] = useState('');
  const onChangePassword = e => {
    setValuePassword(e.target.value);
  }

  return (
    <form>
        <Input
          onChange={onChangeName}
          value={valueName}
          name={'name'}
          error={false}
          errorText={"Ошибка"}
          placeholder={'Имя'}
          icon={'EditIcon'}
          onIconClick={onIconClick}
          ref={inputRef}
          disabled={true}
          extraClass={styles.input}
        />
        <EmailInput
          onChange={onChangeEmail}
          value={valueEmail}
          name={'email'}
          isIcon={true}
          placeholder='Логин'
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={valuePassword}
          name={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
        />
        <div className={styles.buttons}>
          <Button htmlType="button" type="secondary" size="medium">Отмена</Button>
          <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
        </div>

      </form>
  )
}

export default UserInfo;