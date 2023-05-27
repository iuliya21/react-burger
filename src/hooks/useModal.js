import { useState, useCallback } from "react";
import { useLocation, useParams } from 'react-router-dom';

export const useModal = () => {

  const params = useParams();
  const location = useLocation();
  const background = params.id && location.state && location.state.background;

  const [isModalOpen, setIsModalOpen] = useState(background || false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
