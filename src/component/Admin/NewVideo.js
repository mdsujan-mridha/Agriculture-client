

import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MetaData from '../Layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createVideo } from '../action/videoAction';
import { Description, Spellcheck, Storage } from '@mui/icons-material';
import { Button } from '@mui/material';
import { NEW_VIDEO_RESET } from '../constant/videoConstant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewVideo = () => {

    const dispatch = useDispatch();
    const { error, loading, success } = useSelector((state) => state.newVideo);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const navigate = useNavigate();

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const productData = {

            title,
            description,
            videoUrl,


        };
        console.log(productData);
        dispatch(createVideo(productData));
    }

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (success) {
            toast.success(success);
            dispatch({ type: NEW_VIDEO_RESET });
            navigate("/admin/dashboard");
        }

    }, [error, success, dispatch, navigate]);

    return (
        <Fragment>
            <MetaData title="Post new video" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Post New video</h1>

                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Video title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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
                            <Storage />
                            <input
                                type="text"
                                placeholder="Video Url"
                                required
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                            />
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

export default NewVideo;