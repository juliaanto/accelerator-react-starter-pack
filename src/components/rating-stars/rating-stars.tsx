const MAX_RATING_VALUE = 5;

type RatingStarsProps = {
  rating: number;
}

function RatingStars(props: RatingStarsProps): JSX.Element {
  const {rating} = props;

  const ratingValue = Math.floor(rating);

  const ratingFullStars = [];
  const ratingEmptyStars = [];

  if (rating >= 0 && ratingValue <= MAX_RATING_VALUE) {
    for (let i = 0; i < ratingValue; i++) {
      ratingFullStars.push(i);
    }

    for (let i = 0; i < MAX_RATING_VALUE - ratingValue; i++) {
      ratingEmptyStars.push(i);
    }
  }

  return (
    <>
      {
        ratingFullStars.map((i) => (
          <svg key={i} width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
        ))
      }
      {
        ratingEmptyStars.map((i) => (
          <svg key={i} width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
        ))
      }
    </>

  );
}

export default RatingStars;