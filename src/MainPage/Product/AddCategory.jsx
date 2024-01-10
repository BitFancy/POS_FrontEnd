import React, { useState } from 'react';
import { Upload } from '../../EntryFile/imagePath';
import {api} from '../../utils/api';
import alertify from 'alertifyjs';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async () => {
    console.log('category name>>>>>>>>>', categoryName);
    await api
      .post('/category/add', { categoryName })
      .then((res) => {
        console.log('res data ========>>', res.data);
        alertify.success('Successfully Category Added');
        setCategoryName('');
      })
      .catch((err) => {
        console.log('err >>>>>>>>>==========', err);
      });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="page-header">
            <div className="page-title">
              <h4>Add Category</h4>
              <h6>Create new product Category</h6>
            </div>
          </div>
          <div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input
                        type="text"
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                        value={categoryName}
                      />
                    </div>
                  </div>
                  {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea className="form-control" defaultValue={""} />
                                        </div>
                                    </div> */}
                  <div className="col-lg-12">
                    <button
                      onClick={handleSubmit}
                      className="btn btn-submit me-2"
                    >
                      Submit
                    </button>
                    <button className="btn btn-cancel">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
