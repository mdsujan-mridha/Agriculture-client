import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import profile from "../images/user/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, newReview, productDetails } from '../action/productAction';
import Carousel from 'react-material-ui-carousel';
import { toast } from 'react-toastify';
import Loader from '../Layout/Loader';
import { addItemToCart } from '../action/cartAction';
import { NEW_REVIEW_REQUEST } from '../constant/ProductConstant';



const ProductDetails = () => {

    const { productId } = useParams();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [open, setOpen] = useState(false);
    // state for quantity 
    const [quantity, setQuantity] = useState(1);

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,

    }
    // increase quantity 
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);

    }

    const addToCartHandler = () => {
        dispatch(addItemToCart(productId, quantity))
        toast.success("Item added to cart");
    };
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }
    const reviewSubmitHandler = () => {
        const myForm = {
            rating: rating,
            comment: comment,
            productId: productId,
        }
        dispatch(newReview(myForm));
        setOpen(false);

    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        };
        if (reviewError) {
            toast.error(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            toast.success("Review submitted successfully")
            dispatch({ type: NEW_REVIEW_REQUEST });

        }
        dispatch(productDetails(productId))

    }, [productId, dispatch, error, reviewError, success]);

    console.log(product);

    return (
        <Fragment>

            {
                loading ? (<Loader />)
                    :
                    (<Fragment>
                        <div>
                            <div className='w-full bg-primary flex flex-col lg:flex-row justify-evenly lg:items-center px-12' style={{ minHeight: '90vh' }}>
                                <div className='w-full lg:w-1/2 pb-5 lg:pb-0'>
                                    <div
                                        className='flex lg:justify-center lg:items-center rounded-md bg-secondary shadow-xl'
                                        style={{
                                            width: '600px', height: '600px', border: '2px solid gray',
                                        }}>
                                        <Carousel className='w-full h-full'>
                                            {
                                                product?.images &&
                                                product?.images.map((item, i) => (
                                                    <img
                                                        key={item.url}
                                                        src={item?.url}
                                                        alt={`${i} Slide`}
                                                        className='w-full h-full'
                                                    />
                                                ))
                                            }

                                        </Carousel>
                                    </div>
                                </div>
                                <div className='w-full lg:w-1/2 flex flex-col justify-start items-start p-5'>
                                    <p className='text-3xl pb-3 font-bold'> {product?.name} </p>
                                    <p className='text-xl font-bold opacity-60 border-b border-gray-500 w-full'>  productID: #{product?._id} </p>

                                    <div className="w-full flex items-center justify-start py-10 border-b border-gray-500">
                                        <Rating {...options} />
                                        <span className='text-lg font-semibold text-gray-400'> ({product?.numOfReviews} Reviews) </span>
                                    </div>
                                    <div>
                                        <h1 className='text-4xl font-bold py-7'> BDT {product?.price} /- </h1>
                                        <div className='flex justify-start items-center border-b border-gray-500 pb-7'>
                                            <button
                                                className='text-white font-bold text-2xl bg-secondary shadow-xl'
                                                style={{
                                                    width: 45, height: 45,
                                                }}
                                                onClick={decreaseQuantity}
                                            > - </button>
                                            <input
                                                type="number"
                                                value={quantity}
                                                readOnly
                                                style={{ width: 60, height: 45, textAlign: 'center', outline: 'none', color: '#1c1c1c' }}
                                            />
                                            <button
                                                className='text-white font-bold text-2xl bg-secondary shadow-xl' style={{
                                                    width: 45, height: 45,
                                                }}
                                                onClick={increaseQuantity}
                                            > + </button>
                                            <button
                                                className='btn btn-secondary ml-7 rounded-full text-md shadow-2xl'
                                                disabled={product.Stock <= 1 ? true : false}
                                                onClick={addToCartHandler}
                                            > Add to cart </button>
                                        </div>
                                        <div className='py-7 border-b border-gray-500'>
                                            <p className=' text-2xl font-bold text-gray-200'> status:
                                                <span className={product?.Stock <= 1 ? "text-red-700" : "text-orange-500"}> {product.Stock <= 1 ? "OutOfStock" : "InStock"} </span> </p>
                                        </div>
                                        <div className='py-7'>
                                            <p className='text-xl font-bold text-gray-200'> Description </p>
                                            <p className='py-4 text-justify font-semibold opacity-70'> {product?.description} </p>

                                        </div>
                                        <div className='py-7'>
                                            <p className='text-xl font-bold text-gray-200'> Location: </p>
                                            <p className='py-4 text-justify font-semibold opacity-70'> {product?.location} </p>

                                        </div>
                                        <button
                                            onClick={submitReviewToggle}
                                            className='btn w-52 bg-secondary text-white outline-none border-0 rounded-full shadow-2xl'> Submit Review </button>
                                    </div>
                                    <Dialog
                                        aria-labelledby='simple-dialog-title'
                                        open={open}
                                        onClose={submitReviewToggle}
                                    >
                                        <DialogTitle>Submit Review</DialogTitle>
                                        <DialogContent className="submitDialog"
                                            style={{ display: 'flex', flexDirection: "column-reverse" }}
                                        >
                                            <Rating
                                                onChange={(e) => setRating(e.target.value)}
                                                value={rating}
                                                size="large"

                                            />

                                            <textarea
                                                className="submitDialogTextArea border-primary" // Add border-primary class here
                                                style={{ border: "1px solid black", padding: "10px" }} // Add inline style for border
                                                cols="30"
                                                rows="5"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Write your review here"

                                            ></textarea>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={submitReviewToggle} color="secondary">
                                                Cancel
                                            </Button>
                                            <Button onClick={reviewSubmitHandler} color="primary">
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </div>
                            </div>
                            <div>
                                <h1 className='text-center py-7 text-3xl font-bold  uppercase pb-4'> Reviews </h1>
                                <hr style={{ width: 200, border: '2px solid gray', alignItems: 'center', margin: '0 auto' }} />
                            </div>

                            <div className='flex gap-5 items-center justify-center mt-24 overflow-x-scroll pb-5 px-12'>

                                {
                                    product?.reviews && product?.reviews[0] ? (
                                        <div>
                                            {
                                                product?.reviews &&
                                                product?.reviews?.map((review) => (
                                                    <div key={review?._id} className="w-72 h-80 bg-secondary flex flex-col items-center rounded-md px-5">
                                                        <img src={profile} alt="" className='w-32 h-32 rounded-full mt-5' />
                                                        <h2 className='py-4 text-xl font-bold'> {review?.name} </h2>
                                                        <p className=' text-justify font-semibold text-sm opacity-70'> {review?.comment} </p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <p className='text-2xl font-semibold text-orange-700'> Now Review Yest </p>
                                    )
                                }
                            </div>
                        </div>

                    </Fragment>)
            }
        </Fragment>
    );
};

export default ProductDetails;