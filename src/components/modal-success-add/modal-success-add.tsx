import { AppRoute, Key } from '../../const';

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

type ModalSuccessAddProps = {
  onCloseClick: () => void;
}

function ModalSuccessAdd(props: ModalSuccessAddProps): JSX.Element {
  const {onCloseClick} = props;

  useEffect(() => {
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.removeEventListener('keydown', handleEscClick);
    };
  });

  const handleEscClick = (event: { key: string; }) => {
    if (event.key === Key.Escape) {
      onCloseClick();
    }
  };

  const handleContinueClick = () => {
    onCloseClick();
  };

  return (
    <div className="modal is-active modal--success">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={onCloseClick}
        >
        </div>
        <div className="modal__content">
          <svg className="modal__icon" width="26" height="20" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <p className="modal__message">Товар успешно добавлен в корзину</p>
          <div className="modal__button-container modal__button-container--add">
            <Link to={AppRoute.Cart} className="button button--small modal__button">Перейти в корзину</Link>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={handleContinueClick}
            >Продолжить покупки
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={onCloseClick}
          ><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessAdd;
