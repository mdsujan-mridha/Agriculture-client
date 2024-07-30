

import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getPost } from '../action/postAction';
import Loader from '../Layout/Loader';
import { Link } from 'react-router-dom';
import HomeBlogCard from './HomeBlogCard';

const HomeBlog = () => {

    const dispatch = useDispatch();

    const {
        loading,
        posts,
        error,
    } = useSelector((state) => state.posts);


    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        dispatch(getPost())

    }, [dispatch, error])

    const homePost = posts?.slice(0, 4);

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (<Fragment>
                        <div className='px-12 py-10 '>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-2xl font-bold text-white lg:text-center'>  Popular Post </h1>

                                <Link to="/post" className='text-white'> View All </Link>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
                                {
                                    homePost &&
                                    homePost?.map((blog) => (
                                        <HomeBlogCard
                                            key={blog?._id}
                                            blog={blog}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    );
};

export default HomeBlog;