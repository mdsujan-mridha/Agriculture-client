import React, { Fragment, useEffect, useState } from 'react';
import { clearErrors, createProduct } from '../action/productAction';
import { NEW_PRODUCT_RESET } from '../constant/ProductConstant';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AccountTree, AttachMoney, Description, LocationCity, Spellcheck, Storage } from '@mui/icons-material';
import { Button } from '@mui/material';

import "./newProduct.css";
import UserSidebar from './UserSidebar';

// set category 
const categories = [
    "Beans",
    "Radish",
    "Cauliflower",
    "Cabbage",
    "Pumpkin",
    "Capsicum",
    "Pea",
    "Haicha",
    "Lemon",
    "Carrot",
    "Tomato",
    "Pumpkin",
    "Accessories"
];

const SellNewProduct = () => {

    const dispatch = useDispatch();

    const { error, loading, success } = useSelector((state) => state.newProduct);
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState("");

    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (error) {
            toast.error(error)
            console.log(error)
            dispatch(clearErrors());

        }
        if (success) {
            toast.success("Product create successfully")
            navigate("/admin/dashboard")
            dispatch({ type: NEW_PRODUCT_RESET })
        }
    }, [dispatch, error, success, navigate])

    const createProductSubmitHandler = (e) => {
        e.preventDefault()
        const myForm = {
            name,
            price,
            description,
            category,
            Stock,
            images,
            location,
        }
        dispatch(createProduct(myForm));


    }


    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    }

    return (
        <Fragment>
            {/* <MetaData title="Create Product" /> */}
            <div className="dashboard">
                <UserSidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>
                        <div>
                            <LocationCity />

                            <textarea
                                placeholder="Your location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTree />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default SellNewProduct;