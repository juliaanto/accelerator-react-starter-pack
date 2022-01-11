import {Link, useHistory} from 'react-router-dom';

import {AppRoute} from '../../const';

function ServerUnavailable(): JSX.Element {
  const history = useHistory();

  const handleClick = () => {
    history.push(AppRoute.Main);
    window.location.reload();
  };

  return (

    <section className='modal-success--review'>
      <h1>Сервер недоступен</h1>
      <Link to="#" className="link" onClick={handleClick}>Попробовать снова</Link>
    </section>

  );
}

export default ServerUnavailable;
