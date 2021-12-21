import { APIRoute, AppRoute } from '../../const';
import { ConnectedProps, connect } from 'react-redux';

import { ThunkAppDispatch } from '../../types/action';
import { fetchFilteredGuitarsAction } from '../../store/api-actions';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeFilterValue(searchParams: string) {
    dispatch(fetchFilteredGuitarsAction(searchParams));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Filter(props: PropsFromRedux): JSX.Element {
  const {onChangeFilterValue} = props;

  const history = useHistory();

  const priceMinRef = useRef<HTMLInputElement | null>(null);

  const handleInput = () => {
    let searchInput = '';

    if (priceMinRef.current?.value) {
      searchInput += `${APIRoute.FilterPriceMin}${priceMinRef.current?.value}`;
    }

    history.push(String(AppRoute.FilterPrefix) + searchInput);

    if (searchInput) {
      onChangeFilterValue(searchInput);
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder="1 000"
              id="priceMin"
              name="от"
              ref={priceMinRef}
              onInput={handleInput}
            >
            </input>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до"></input>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"></input>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric"></input>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"></input>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"></input>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"></input>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"></input>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled></input>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export {Filter};
export default connector(Filter);
