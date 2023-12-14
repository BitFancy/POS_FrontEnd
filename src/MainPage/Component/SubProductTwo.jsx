import React, { useState, useEffect } from 'react';
import { useOrderContext } from '../../context/OrderContext';

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
      className="col-lg-2 col-sm-6 d-flex"
      style={{ marginTop: '10px' }}
    >
      <div
        className="productset flex-fill"
        style={{
          background: '#fe9f43',
          border: `${activeState[productId] ? '2px solid #7367f0' : 'none'}`,
        }}
      >
        <div className="productsetcontent">
          <h4>{name}</h4>
          <h6>{price}</h6>
        </div>
      </div>
    </div>
  );
};

export default SubProductTwo;
