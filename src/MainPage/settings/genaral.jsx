import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { Upload } from '../../EntryFile/imagePath';

const GenaralSettings = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantEmail, setRestaurantEmail] = useState('');
  const [restaurantPhone, setRestaurantPhone] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantZipCode, setRestaurantZipCode] = useState('');
  const [restaurantLogo, setRestaurantLogo] = useState('');

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Setting</h4>
            <h6>Manage General Setting</h6>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Restaurant Name <span className="manitory">*</span>
                  </label>
                  <input type="text" />
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Email<span className="manitory">*</span>
                  </label>
                  <input type="text" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Phone<span className="manitory">*</span>
                  </label>
                  <input type="text" />
                </div>
              </div>
              <div className="col-lg-3 col-sm-12">
                <div className="form-group">
                  <label>
                    Zip Code<span className="manitory">*</span>{' '}
                  </label>
                  <input type="text" />
                </div>
              </div>
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label>
                    Address<span className="manitory">*</span>{' '}
                  </label>
                  <input type="text" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    Restaurant Logo<span className="manitory">*</span>{' '}
                  </label>
                  <div className="image-upload">
                    <input type="file" />
                    <div className="image-uploads">
                      <img src={Upload} alt="img" />
                      <h4>Drag and drop a file to upload</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <Link to="#" className="btn btn-submit me-2">
                    Save
                  </Link>
                  <Link to="#" className="btn btn-cancel">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenaralSettings;
