import styles from "./info-user.module.css";
import { useState, useRef } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { EmailInput, Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

function UserInfo() {
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

  return (
    <form>
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
          extraClass="mb-6"
          icon={'EditIcon'}
        />
        <EmailInput
          onChange={onChangeEmail}
          value={valueEmail}
          name={'email'}
          isIcon={false}
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