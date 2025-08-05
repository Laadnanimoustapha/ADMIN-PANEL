import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    content: null,
    buttons: [],
    onClose: null
  });

  const showModal = (title, content, buttons = ['Close'], onClose = null) => {
    setModal({
      isOpen: true,
      title,
      content,
      buttons,
      onClose
    });
  };

  const hideModal = () => {
    if (modal.onClose) {
      modal.onClose();
    }
    setModal({
      isOpen: false,
      title: '',
      content: null,
      buttons: [],
      onClose: null
    });
  };

  const value = {
    modal,
    showModal,
    hideModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};