import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { useOrderContext } from '../../context/OrderContext';
import './index.css';

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
              className="col-lg-2 col-sm-12 col-12 d-flex"
              onClick={() => handleSubmit(addon._id)}
            >
              <div className="product-lists-main mb-3 d-flex justify-content-center ">
                <div>
                  <p
                    style={{
                      color: `${
                        activeState[addon._id]
                          ? 'rgba(255, 100, 39, 0.6)'
                          : 'rgba(0, 0, 0, 0.6)'
                      }`,
                      fontSize: activeState[addon._id] ? '19px' : '17px',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {addon.productName}
                  </p>
                  <p>£{addon.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-12 d-flex justify-content-center">
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
