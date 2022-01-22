import { FIRST_RATE_VALUE, Key, LAST_RATE_VALUE } from '../../const';
import { FormEvent, useEffect, useReducer, useRef, useState } from 'react';

import { reviewPostAction } from '../../store/api-actions';
import { useDispatch } from 'react-redux';

type ModalReviewProps = {
  onCloseClick: () => void;
  guitarId: number;
  guitarName: string;
}

function ModalReview(props: ModalReviewProps): JSX.Element {
  const {onCloseClick, guitarId, guitarName} = props;

  const dispatch = useDispatch();

  const userNameRef = useRef<HTMLInputElement | null>(null);
  const prosRef = useRef<HTMLInputElement | null>(null);
  const consRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const [rate, setRate] = useState<number>();
  const [isFormCorrect, setIsFormCorrect] = useState<boolean | null>(true);
  const [isFirstTry, setIsFirstTry] = useState<boolean | null>(true);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleEscClick = (event: { key: string; }) => {
    if (event.key === Key.Escape) {
      onCloseClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.removeEventListener('keydown', handleEscClick);
    };
  });

  useEffect(() => {
    checkForm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rate]);

  const checkForm = () => {

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

    checkedRadio.focus();

    setRate(Number(checkedRadio.value));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRateKeyDown = (evt: any) => {

    document.querySelectorAll('input[name=rate]:checked').forEach((element) => element.removeAttribute('checked'));
    let currentValue = rate;

    if (!currentValue) {
      currentValue = LAST_RATE_VALUE;
    }

    if (evt.key === Key.ArrowLeft || evt.key === Key.ArrowDown) {
      evt.preventDefault();

      if (currentValue === FIRST_RATE_VALUE) {
        (document.querySelector(`#star-${LAST_RATE_VALUE}`) as HTMLElement).click();
      } else {
        (document.querySelector(`#star-${currentValue - 1}`) as HTMLElement).click();
      }
    }

    if (evt.key === Key.ArrowRight || evt.key === Key.ArrowUp) {
      evt.preventDefault();

      if (currentValue === LAST_RATE_VALUE) {
        (document.querySelector(`#star-${FIRST_RATE_VALUE}`) as HTMLElement).click();
      } else {
        (document.querySelector(`#star-${currentValue + 1}`) as HTMLElement).click();
      }
    }
  };

  return (
    <div className="modal is-active modal--review modal-for-ui-kit">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={onCloseClick}
        >
        </div>
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
                {!isFormCorrect && !isFirstTry && (!userNameRef.current || userNameRef.current.value.length < 1) ?
                  <span className="form-review__warning">Заполните поле</span>
                  : ''}
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div
                  className="rate rate--reverse"
                  onClick={handleRateClick}
                  onKeyDown={handleRateKeyDown}
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
                  {!isFormCorrect && !isFirstTry && (!rate || rate === null) ?
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
            {!isFormCorrect && !isFirstTry && (!prosRef.current || prosRef.current.value.length < 1) ?
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
            {!isFormCorrect && !isFirstTry && (!consRef.current || consRef.current.value.length < 1) ?
              <span className="form-review__warning">Заполните поле</span>
              : ''}
            <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="comment"
              rows={10}
              autoComplete="off"
              ref={commentRef}
              onInput={checkForm}
            >
            </textarea>
            {!isFormCorrect && !isFirstTry && (!commentRef.current || commentRef.current.value.length < 1) ?
              <span className="form-review__warning">Заполните поле</span>
              : ''}
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
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

export default ModalReview;
