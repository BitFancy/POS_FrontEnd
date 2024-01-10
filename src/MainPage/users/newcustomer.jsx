import React, { useState } from 'react';
import Select2 from 'react-select2-wrapper';
import { useNavigate } from 'react-router-dom';
import 'react-select2-wrapper/css/select2.css';
import { Upload } from '../../EntryFile/imagePath';
import alertify from 'alertifyjs';
import { api } from '../../utils/api';
import { set } from 'react-hook-form';

const AddCustomer = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/customer/add', {
        customerName,
        email,
        phoneNumber,
        city,
        address,
        zipCode,
      });
      alertify.success('Successfully Customer Added');
      setCustomerName('');
      setEmail('');
      setPhoneNumber('');
      setCity('');
      setAddress('');
      setZipCode('');
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        alertify.warning('Customer Already Exists');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="page-title">
            <h4>Add Customer</h4>
            <h6>Add/Update Customer</h6>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      // placeholder="Enter Name"
                      onChange={(event) => setCustomerName(event.target.value)}
                      value={customerName}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      // placeholder="Enter Email"
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      // placeholder="Enter Phone Number"
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      required
                      value={phoneNumber}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 col-12">
                  <div className="form-group">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        // placeholder="Enter City"
                        onChange={(event) => setCity(event.target.value)}
                        required
                        value={city}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      // placeholder="Enter Address"
                      onChange={(event) => setAddress(event.target.value)}
                      required
                      value={address}
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      // placeholder="Enter ZipCode"
                      onChange={(event) => setZipCode(event.target.value)}
                      required
                      value={zipCode}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    onSubmit={handleSubmit}
                    className="btn btn-submit me-2"
                  >
                    Submit
                  </button>
                  <button type="button" className="btn btn-cancel">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
