import { FormEvent, useReducer, useRef, useState } from 'react';

import { reviewPostAction } from '../../store/api-actions';
import { useDispatch } from 'react-redux';

type ModalReviewProps = {
  handleCloseClick: () => void;
  guitarId: number;
  guitarName: string;
}

function ModalReview(props: ModalReviewProps): JSX.Element {
  const {handleCloseClick, guitarId, guitarName} = props;

  const dispatch = useDispatch();

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const prosRef = useRef<HTMLInputElement | null>(null);
  const consRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const [rate, setRate] = useState<number>();
  const [isFormCorrect, setIsFormCorrect] = useState<boolean | null>(true);
  const [isFirstTry, setIsFirstTry] = useState<boolean | null>(true);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const checkForm = () => {
    if (isFirstTry) {
      return;
    }

    if (
      userNameRef.current !== null &&
      userNameRef.current?.value.length > 0 &&
      rate !== null &&
      rate &&
      prosRef.current !== null &&
      prosRef.current?.value.length > 0 &&
      consRef.current !== null &&
      consRef.current?.value.length > 0 &&
      commentRef.current !== null &&
      commentRef.current?.value.length > 0
    ) {
      setIsFormCorrect(true);
    } else {
      setIsFormCorrect(false);
    }

    forceUpdate();
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    checkForm();

    if (isFormCorrect && userNameRef.current && prosRef.current && consRef.current && commentRef.current && rate) {

      dispatch(reviewPostAction({
        guitarId: guitarId,
        userName: userNameRef.current.value,
        advantage: prosRef.current.value,
        disadvantage: consRef.current.value,
        comment: commentRef.current.value,
        rating: rate,
      }));
    } else {
      setIsFormCorrect(false);
    }
  };

  const handleRateClick = () => {
    const checkedRadio = document.querySelector('input[name=rate]:checked') as HTMLInputElement;

    if (!checkedRadio) {
      return;
    }

    setRate(Number(checkedRadio.value));
  };

  return (
    <div className="modal is-active modal--review modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal></div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
          <form
            className="form-review"
            onSubmit={(evt) => {
              setIsFirstTry(false);
              handleSubmit(evt);
            }}
          >
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                <input
                  className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  ref={userNameRef}
                  onInput={checkForm}
                />
                {!isFormCorrect && (!userNameRef.current || userNameRef.current.value.length < 1) ?
                  <span className="form-review__warning">Заполните поле</span>
                  : ''}
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div
                  className="rate rate--reverse"
                  onClick={handleRateClick}
                >
                  <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label><span className="rate__count"></span>
                  {!isFormCorrect && (!rate || rate === null) ?
                    <span className="rate__message">Поставьте оценку</span>
                    : ''}
                </div>
              </div>
            </div>
            <label className="form-review__label form-review__label--required" htmlFor="pros">Достоинства</label>
            <input
              className="form-review__input"
              id="pros"
              type="text"
              autoComplete="off"
              ref={prosRef}
              onInput={checkForm}
            />
            {!isFormCorrect && (!prosRef.current || prosRef.current.value.length < 1) ?
              <span className="form-review__warning">Заполните поле</span>
              : ''}
            <label className="form-review__label form-review__label--required" htmlFor="cons">Недостатки</label>
            <input
              className="form-review__input"
              id="cons"
              type="text"
              autoComplete="off"
              ref={consRef}
              onInput={checkForm}
            />
            {!isFormCorrect && (!consRef.current || consRef.current.value.length < 1) ?
              <span className="form-review__warning">Заполните поле</span>
              : ''}
            <label className="form-review__label form-review__label--required" htmlFor="user-name">Комментарий</label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="user-name"
              rows={10}
              autoComplete="off"
              ref={commentRef}
              onInput={checkForm}
            >
            </textarea>
            {!isFormCorrect && (!commentRef.current || commentRef.current.value.length < 1) ?
              <span className="form-review__warning">Заполните поле</span>
              : ''}
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseClick}
          ><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalReview;
