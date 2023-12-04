import React, { useState, useEffect } from 'react';

const SubProductThree = ({ productId, name, price, handleSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const handleSubmit = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    handleSelected(productId, isActive);
  }, [isActive]);
  return (
    <div
      onClick={handleSubmit}
      className="col-lg-2 col-sm-6 d-flex"
      style={{ marginTop: '10px' }}
    >
      <div className="productset flex-fill" style={{ background: '#C68C53' }}>
        <div className="productsetcontent">
          <h4>{name}</h4>
          <h6>{price}</h6>
        </div>
      </div>
    </div>
  );
};

export default SubProductThree;
