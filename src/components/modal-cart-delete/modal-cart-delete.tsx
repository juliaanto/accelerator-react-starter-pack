import { getGuitarType, getPriceFormatted } from '../../utils/guitar';
import { useDispatch, useSelector } from 'react-redux';

import { Guitar } from '../../types/guitar';
import { Key } from '../../const';
import { State } from '../../types/state';
import { getGuitarsInCart } from '../../store/user-actions/selectors';
import { updateGuitarsInCart } from '../../store/action';
import { useEffect } from 'react';

type ModalCartAddProps = {
  guitar: Guitar;
  onCloseClick: () => void;
}

function ModalCartDelete(props: ModalCartAddProps): JSX.Element {
  const {guitar, onCloseClick} = props;

  const dispatch = useDispatch();

  const guitarsInCart = useSelector((state: State) => getGuitarsInCart(state));

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

  const handleDeleteClick = () => {
    const updatedGuitars = guitarsInCart.filter((item) => item.id !== guitar.id);
    dispatch(updateGuitarsInCart(updatedGuitars));
    onCloseClick();
  };

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div
          className="modal__overlay" data-close-modal
          onClick={onCloseClick}
        >
        </div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info">
            <img className="modal__img" src={`${process.env.PUBLIC_URL}/${guitar.previewImg}`} width="67" height="137" alt={guitar.name} />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
              <p className="modal__product-params">{getGuitarType(guitar.type)}, {guitar.stringCount} струнная</p>
              <p className="modal__price-wrapper"><span className="modal__price">Цена:</span><span className="modal__price">{getPriceFormatted(guitar.price)}</span></p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--small modal__button"
              onClick={handleDeleteClick}
            >Удалить товар
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={onCloseClick}
            >Продолжить покупки
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={onCloseClick}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCartDelete;
