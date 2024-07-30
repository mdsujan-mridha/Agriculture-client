import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { AccountTree, AttachMoney, DescriptionSharp, LocalActivity, Spellcheck, Storage } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, productDetails, updateProduct } from '../action/productAction';
import { UPDATE_PRODUCT_RESET } from '../constant/ProductConstant';
import "./NewProduct.css";

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
    "Accessories"
];

const UpdateProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdate } = useSelector((state) => state.product);
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [location, setLocation] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const productId = id;

    useEffect(() => {

        if (product && product?._id !== productId) {
            dispatch(productDetails(productId))
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
            setLocation(product?.location);
        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdate) {
            toast.success("Update product successful");
            navigate("/admin/dashboard")
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }

    }, [product, error, updateError, dispatch, isUpdate, navigate, productId]);

    // update product handler 
    const updateProductHandlerSubmit = (e) => {
        e.preventDefault();
        const myForm = {
            name,
            description,
            price,
            Stock,
            category,
            images,
            location
        };


        dispatch(updateProduct(productId, myForm));

    }
    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
    };

    return (
        <Fragment>
            {/* <MetaData title="Create Product" /> */}
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductHandlerSubmit}
                    >
                        <h1>Update Product</h1>

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
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionSharp />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>
                        <div>
                            <LocalActivity />

                            <textarea
                                placeholder="Seller Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTree />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
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
                                value={Stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
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

export default UpdateProduct;