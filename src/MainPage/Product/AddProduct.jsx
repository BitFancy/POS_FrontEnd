import React, { useEffect, useState } from 'react'
import { Upload } from '../../EntryFile/imagePath';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import api from '../../utils/api';
import alertify from "alertifyjs";

const productTypes = [
    {id: 1, text: 'Main Product' },
    {id: 2, text: 'Sub Product 1' },
    {id: 3, text: 'Sub Product 2' },
    {id: 4, text: 'Sub Product 3' },
    {id: 5, text: 'Addon' },
    {id: 6, text: 'Minus' },
]

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState();
    const [productType, setProductType] = useState('');
    const [price, setPrice] = useState('');

    const data = {
        productName,
        category,
        productType,
        price
    }
    
    const handleSubmit = async (e) => {
        // e.preventDefault();
        await api.post("/product/add", data)
        .then(res => {
            console.log(res.data);
            alertify.success("Successfully Product Added");
            setProductName('');
            setCategory('');
            setProductType('');
            setPrice('');
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        const getCategoryType = async () => {
            await api.get("/category").then(res => {
                console.log(res.data);
                res.data.forEach((row) => {
                    setCategories(prevCategory => [...prevCategory, { id: row._id, text: row.categoryName }]);
                });
            })
        }
        getCategoryType();
    }, []);

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="page-title">
                            <h4>Add Product</h4>
                            <h6>Create new Product</h6>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input 
                                                type="text" 
                                                onChange={(event) => setProductName(event.target.value)}
                                                value={productName}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <Select2
                                                className="select"
                                                data={categories}
                                                options={{
                                                    placeholder: 'Choose Category',
                                                }}
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Product Type</label>
                                            <Select2
                                                className="select"
                                                data={productTypes}
                                                options={{
                                                    placeholder: 'Choose Product Type',
                                                }}
                                                onChange={(e) => setProductType(e.target.value)}
                                                value={productType}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input 
                                                type="text"
                                                onChange={(e) => setPrice(e.target.value)}
                                                value={price}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <button onClick={handleSubmit} className="btn btn-submit me-2">
                                            Submit
                                        </button>
                                        <button className="btn btn-cancel">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProduct;