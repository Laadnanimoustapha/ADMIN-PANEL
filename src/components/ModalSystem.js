import React from 'react';
import { useModal } from '../context/ModalContext';

const ModalSystem = () => {
  const { modal, hideModal } = useModal();

  if (!modal.isOpen) return null;

  const handleButtonClick = (buttonText) => {
    if (buttonText === 'Cancel' || buttonText === 'Close') {
      hideModal();
    } else {
      // Execute the onClose callback for action buttons
      if (modal.onClose) {
        modal.onClose();
      }
      hideModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity"
          onClick={hideModal}
        ></div>

        {/* Center modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-neutral-900 mb-4">
                {modal.title}
              </h3>
              <div className="mt-2">
                {modal.content}
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse">
            {modal.buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button)}
                className={`
                  w-full inline-flex justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm
                  ${button === 'Cancel' || button === 'Close'
                    ? 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus:ring-primary'
                    : 'border-transparent bg-primary text-white hover:bg-primary-dark focus:ring-primary'
                  }
                `}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSystem;