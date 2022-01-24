import { AppLink } from '../../const';
import { Guitar } from '../../types/guitar';
import { Link } from 'react-router-dom';
import ModalCartAdd from '../modal-cart-add/modal-cart-add';
import RatingStars from '../rating-stars/rating-stars';
import { State } from '../../types/state';
import { getCommentsCount } from '../../store/guitar-data/selectors';
import { useSelector } from 'react-redux';
import { useState } from 'react';

type ProductCardProps = {
  guitar: Guitar;
}

function ProductCard(props: ProductCardProps): JSX.Element {
  const {guitar} = props;

  const rateCount = useSelector((state: State) => getCommentsCount(state, guitar.id));

  const [isModalCartAddOpen, setIsModalCartAddOpen] = useState<boolean>(false);

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
        <Link to={AppLink.ProductById(guitar.id)} className="button button--mini">
          Подробнее
        </Link>
        <Link
          to="#"
          className="button button--red button--mini button--add-to-cart"
          onClick={() => setIsModalCartAddOpen(true)}
        >Купить
        </Link>
      </div>

      {isModalCartAddOpen ?
        <ModalCartAdd guitar={guitar}/>
        : ''}
    </div>
  );
}

export default ProductCard;
