import { Link, useLocation } from 'react-router-dom';

import { Guitar } from '../../types/guitar';
import { Hash } from '../../const';
import { getGuitarType } from '../../utils/guitarPage';

type TabsProps = {
  product: Guitar;
}

function Tabs(props: TabsProps): JSX.Element {
  const {product} = props;

  const currentTab = String(useLocation<string>().hash);

  return (
    <div className="tabs">
      <Link to="#characteristics" className={`button ${currentTab !== Hash.Description ? '' : 'button--black-border'} button--medium tabs__button`}>Характеристики</Link>
      <Link to="#description" className={`button ${currentTab === Hash.Description ? '' : 'button--black-border'} button--medium tabs__button`}>Описание</Link>

      <div className="tabs__content" id="characteristics">
        {currentTab === Hash.Description ?

          <p className="tabs__product-description">{product.description}</p>
          :
          <table className="tabs__table">
            <tbody>
              <tr className="tabs__table-row">
                <td className="tabs__title">Артикул:</td>
                <td className="tabs__value">{product.vendorCode}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Тип:</td>
                <td className="tabs__value">{getGuitarType(product.type)}</td>
              </tr>
              <tr className="tabs__table-row">
                <td className="tabs__title">Количество струн:</td>
                <td className="tabs__value">{product.stringCount} струнная</td>
              </tr>
            </tbody>
          </table>}

      </div>
    </div>
  );
}

export default Tabs;
