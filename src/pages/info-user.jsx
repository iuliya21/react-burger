import styles from "./info-user.module.css";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EmailInput, Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUser, getUser } from "../services/actions/user";
import { useModal } from "../hooks/useModal";
import Modal from "../components/modal/modal";
import { useForm } from "../hooks/useForm";

function UserInfo() {
  const {name, email, success} = useSelector(store => store.user);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: ''});

  const { isModalOpen, openModal, closeModal } = useModal();

  const showModal = () => {
    openModal();
  }

  const hideModal = () => {
    closeModal();
  }

  useEffect(() => {
    dispatch(getUser());
    setValues({name: name, email: email, password: ''})
  }, [name, email]);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    inputRef.current.disabled = false;
    inputRef.current.classList.remove('input__textfield-disabled');
  }

  const onBlur = () => {
    inputRef.current.disabled = true;
    inputRef.current.classList.add('input__textfield-disabled');
  }

  const handlerCancel = () => {
    setValues({name: name, email: email, password: '********'})
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUser(values.email, values.name, values.password));
    if(success) {
      showModal();
    }
  }

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <Input
          onChange={handleChange}
          value={values.name}
          name={'name'}
          error={false}
          errorText={"Ошибка"}
          placeholder={'Имя'}
          icon={'EditIcon'}
          onIconClick={onIconClick}
          ref={inputRef}
          disabled={true}
          onBlur={onBlur}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          isIcon={true}
          placeholder='Логин'
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
        />
        <div className={styles.buttons}>
          <Button htmlType="button" type="secondary" size="medium" onClick={handlerCancel}>Отмена</Button>
          <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
        </div>
      </form>

      <div>
        {isModalOpen && 
          <Modal onClosePopup={hideModal}>
            <div className={styles.container}>
              {success 
              ? <p className="text text_type_main-medium">Ваши данные успешно изменены</p> 
              : <p className="text text_type_main-medium">Произошла ошибка. Попробуйте снова</p>}
            </div>
          </Modal>
        }
      </div>
    </>
      
  )
}

export default UserInfo;