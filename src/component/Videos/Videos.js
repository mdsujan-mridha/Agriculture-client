

import React, { Fragment, useEffect } from 'react';
import "./Videos.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getAllVideo } from '../action/videoAction';
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import VideoCard from './VideoCard';


const Videos = () => {

    const dispatch = useDispatch();

    const { loading, error, videos } = useSelector((state) => state.videos);

    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        dispatch(getAllVideo())

    }, [error, dispatch]);

    console.log(videos);

    return (
        <Fragment>
            {
                loading ? (
                    <Loader />
                ) :
                    (
                        <Fragment>
                            <div className="pb-96">
                                <MetaData title={"Video page"} />
                                <h2 className='productsHeading text-white'> All Videos  </h2>
                                <div className="px-12 w-full grid grid-cols-2 gap-5">
                                    {
                                        videos &&
                                        videos?.map((item) => (
                                            <VideoCard
                                                key={item?._id}
                                                item={item}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default Videos;