import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useOrderContext } from '../../context/OrderContext';

const Addon = ({
  activeState,
  setActiveState,
  productList,
  handleSelected,
}) => {
  const { changeAction } = useOrderContext();
  const [addons, setAddons] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [addonId, setAddonId] = useState('');

  const handleSubmit = (addonid) => {
    setIsActive(!isActive);
    setAddonId(addonid);
    setActiveState({ ...activeState, [addonid]: !activeState[addonid] });
  };
  
  useEffect(() => {
    handleSelected(addonId, activeState[addonId]);
  }, [isActive]);
  
  useEffect(() => {
    setIsActive(false);
  }, [changeAction]);

  useEffect(() => {
    (async () => {
      const res = await api.get('/product');
      const realAddon = res.data.filter((item) => item.productType.includes(5));
      setAddons(realAddon);
    })();
  }, []);

  return (
    <>
      <div className="modal-header">
        <h5 className="modal-title">Addon</h5>
        <button
          type="button"
          className="close"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">x</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="row">
          {addons.map((addon, index) => (
            <div
              key={index}
              className="col-lg-2 col-sm-12 col-12 d-flwx"
              onClick={() => handleSubmit(addon._id)}
            >
              <div
                className="productset flex-fill"
                style={{
                  background: '#fe9f43',
                  border: `${
                    activeState[addon._id] ? '2px solid #7367f0' : 'none'
                  }`,
                }}
              >
                <div className="productsetcontent">
                  <h4>{addon.productName}</h4>
                  <h6>{addon.price}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-12">
          <div to="#" className="btn btn-submit me-2" data-bs-dismiss="modal">
            Addon
          </div>
          <div to="#" className="btn btn-cancel" data-bs-dismiss="modal">
            Close
          </div>
        </div>
      </div>
    </>
  );
};
export default Addon;
