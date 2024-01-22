import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { Upload } from '../../EntryFile/imagePath';
import alertify from 'alertifyjs';
import { api } from '../../utils/api';

const GenaralSettings = () => {
  const inputRef = useRef(null);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantEmail, setRestaurantEmail] = useState('');
  const [restaurantPhone, setRestaurantPhone] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantZipCode, setRestaurantZipCode] = useState('');
  const [restaurantLogo, setRestaurantLogo] = useState('');
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('hello general setting');
    const formData = new FormData();
    formData.append('restaurantName', restaurantName);
    formData.append('restaurantEmail', restaurantEmail);
    formData.append('restaurantPhone', restaurantPhone);
    formData.append('restaurantAddress', restaurantAddress);
    formData.append('restaurantZipCode', restaurantZipCode);
    formData.append('restaurantLogo', restaurantLogo);
    try {
      console.log(formData);
      const response = await api.post('/restaurant/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      alertify.success('Restaurant added successfully.');
    } catch (error) {
      console.error(error);
      alertify.error('Some error occurred');
    }
  };

  useEffect(() => {
    console.log(restaurantLogo);
  }, [restaurantLogo]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setRestaurantLogo(file);
    setLogo(URL.createObjectURL(file));
  };

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
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(event) => setRestaurantName(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Email<span className="manitory">*</span>
                  </label>
                  <input
                    type="email"
                    value={restaurantEmail}
                    onChange={(event) => setRestaurantEmail(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-12">
                <div className="form-group">
                  <label>
                    Phone<span className="manitory">*</span>
                  </label>
                  <input
                    type="text"
                    value={restaurantPhone}
                    onChange={(event) => setRestaurantPhone(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-3 col-sm-12">
                <div className="form-group">
                  <label>
                    Zip Code<span className="manitory">*</span>{' '}
                  </label>
                  <input
                    type="text"
                    value={restaurantZipCode}
                    onChange={(event) =>
                      setRestaurantZipCode(event.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-sm-12">
                <div className="form-group">
                  <label>
                    Address<span className="manitory">*</span>{' '}
                  </label>
                  <input
                    type="text"
                    value={restaurantAddress}
                    onChange={(event) =>
                      setRestaurantAddress(event.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <label>
                    Restaurant Logo<span className="manitory">*</span>{' '}
                  </label>
                  <div className="image-upload">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      name="logo"
                      style={{ display: 'none' }}
                      ref={inputRef}
                      required
                    />
                    <div
                      className="image-uploads"
                      style={{ position: 'relative' }}
                      onClick={() => inputRef.current.click()}
                    >
                      {logo ? (
                        <img
                          src={logo}
                          alt="img"
                          style={{
                            objectFit: 'contain',
                            height: '100%',
                          }}
                        />
                      ) : (
                        <div>
                          <img src={Upload} alt="img" />
                          <h4>Drag and drop a file to upload</h4>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <button
                    onSubmit={handleSubmit}
                    className="btn btn-submit me-2"
                  >
                    Save
                  </button>
                  <button type="button" className="btn btn-cancel">
                    Cancel
                  </button>
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
