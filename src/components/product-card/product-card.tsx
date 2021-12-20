import { APIRouteWithVariable, Links } from '../../const';
import { useEffect, useState } from 'react';

import { Comments } from '../../types/comment';
import { Guitar } from '../../types/guitar';
import { Link } from 'react-router-dom';
import RatingStars from '../rating-stars/rating-stars';
import api from '../../services/api';

type ProductCardProps = {
  guitar: Guitar;
}

function ProductCard(props: ProductCardProps): JSX.Element {
  const {guitar} = props;
  const [rateCount, setRateCount] = useState<number>(0);

  useEffect(() => {
    api.get<Comments>(APIRouteWithVariable.CommentsByGuitarId(guitar.id)).then((response) => setRateCount(response.data.length));
  }, [guitar.id, setRateCount]);

  return (
    <div className="product-card">
      <img src={guitar.previewImg} width="75" height="190" alt={guitar.name}></img>
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>

          <RatingStars rating={guitar.rating} />

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
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
