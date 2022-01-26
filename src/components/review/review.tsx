import { Comment } from '../../types/comment';
import RatingStars from '../rating-stars/rating-stars';
import { getDateFormatted } from '../../utils/guitar';

type ReviewProps = {
  review: Comment;
}

function Review(props: ReviewProps): JSX.Element {
  const {review} = props;

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4>
        <span className="review__date">{getDateFormatted(review.createAt)}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true"><span className="visually-hidden">Рейтинг:</span>
        <RatingStars rating={review.rating} width={16} height={16} />

        <span className="rate__count"></span><span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{review.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{review.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{review.comment}</p>
    </div>
  );

}

export default Review;
