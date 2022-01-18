import { Guitar } from '../../types/guitar';
import { Link } from 'react-router-dom';
import { Links } from '../../const';
import RatingStars from '../rating-stars/rating-stars';
import { State } from '../../types/state';
import { getCommentsCount } from '../../store/guitar-data/selectors';
import { useSelector } from 'react-redux';

type ProductCardProps = {
  guitar: Guitar;
}

function ProductCard(props: ProductCardProps): JSX.Element {
  const {guitar} = props;

  const rateCount = useSelector((state: State) => getCommentsCount(state, guitar.id));

  return (
    <div className="product-card">
      <img src={guitar.previewImg} width="75" height="190" alt={guitar.name}></img>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <RatingStars rating={guitar.rating} width={12} height={11} />

          <span className="rate__count">{rateCount}</span><span className="rate__message"></span>
        </div>
        <p className="product-card__title">{guitar.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{String(guitar.price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link to={Links.ProductById(guitar.id)} className="button button--mini">
          Подробнее
        </Link>
        <Link to="#" className="button button--red button--mini button--add-to-cart">Купить</Link>
      </div>
    </div>
  );
}

export default ProductCard;
