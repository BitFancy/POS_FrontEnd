import React, { useState, useEffect, useContext } from 'react';
import { useOrderContext } from '../../context/OrderContext';
import './index.css';

const SubProductTwo = ({
  productId,
  name,
  price,
  handleSelected,
  activeState,
  setActiveState,
}) => {
  const { changeAction } = useOrderContext();
  const [isActive, setIsActive] = useState(false);
  const handleSubmit = () => {
    setIsActive(!isActive);
    setActiveState({ ...activeState, [productId]: !activeState[productId] });
  };

  useEffect(() => {
    setIsActive(false);
  }, [changeAction]);

  useEffect(() => {
    handleSelected(productId, activeState[productId]);
  }, [isActive]);
  return (
    <div
      onClick={handleSubmit}
      // className="col-lg-3 col-sm-6 d-flex"
      // className="col-lg-3 col-sm-6 d-flex"
      style={{ marginTop: '10px' }}
    >
      <div
        className="product-lists-subtwo mb-3 d-flex justify-content-center"
        style={{
          width: '150px',
          height: '70px',
          color: `${activeState[productId] ? 'red' : 'black'}`,
        }}
      >
        <div>
          <p
            style={{
              fontSize: '17px',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            {name}
          </p>
          <p className="card-text">£{price}</p>
        </div>
      </div>
    </div>
  );
};

export default SubProductTwo;
