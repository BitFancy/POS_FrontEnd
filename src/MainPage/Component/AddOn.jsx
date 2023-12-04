import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Addon = () => {
  const [addons, setAddons] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await api.get('/product');
      console.log("whole products ==============", res.data);
      const realAddon = res.data.filter((item) => item.productType === 5);
      console.log(realAddon, "this is realadd on");
      setAddons(realAddon);
    })();
  }, [setAddons]);

  useEffect(() => {
    console.log("This is addons--------------", addons);
  }, [addons]);

  const showAddons = addons.map((addon, index) => {
    return (
      <div key={index} className="col-lg-3 col-sm-12 col-12 d-flwx">
        <div className="productset flex-fill" style={{ background: '#fe9f43' }}>
          <div className="productsetcontent">
            <h4>{addon.productName}</h4>
            <h6>{addon.price}</h6>
          </div>
        </div>
      </div>
    );
  });

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
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="row">
          {/* <div className="col-lg-3 col-sm-12 col-12"> */}
            {showAddons}
          {/* </div> */}
        </div>
        <div className="col-lg-12">
          <Link to="#" className="btn btn-submit me-2">
            Addon
          </Link>
          <Link to="#" className="btn btn-cancel" data-bs-dismiss="modal">
            Close
          </Link>
        </div>
      </div>
    </>
  );
};

export default Addon;
