import styles from "./info-user.module.css";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import { EmailInput, Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

function UserInfo() {

  

  const {name, email} = useSelector(store => store.user);

  const [valueName, setValueName] = useState(name);
  const onChangeName = e => {
    setValueName(e.target.value);
  }

  const [valueEmail, setValueEmail] = useState(email);
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
          disabled = {true}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChangeEmail}
          value={valueEmail}
          name={'email'}
          disabled = {true}
          icon={'EditIcon'}
          placeholder={'Логин'}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={valuePassword}
          name={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
        />
      </form>
  )
}

export default UserInfo;