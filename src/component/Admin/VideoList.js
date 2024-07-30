

import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, deleteVideo, getAllVideo } from '../action/videoAction';
import { NEW_VIDEO_RESET } from '../constant/videoConstant';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';

const VideoList = () => {

    const dispatch = useDispatch();
    const { error, videos } = useSelector((state) => state.videos);
    const { error: deleteError, isDeleted } = useSelector((state) => state.video);

    // console.log(products);
    const navigate = useNavigate();

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            toast.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("Product deleted successfully")
            dispatch({ type: NEW_VIDEO_RESET })
            navigate('/admin/dashboard');
        }
        dispatch(getAllVideo())

    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const deleteProductHandler = (id) => {
        dispatch(deleteVideo(id));
    }

    const columns = [
        { field: "id", headerName: "Video ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },


        {
            field: "link",
            headerName: "Video Url",
            type: "text",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>


                        <Button
                            onClick={() => deleteProductHandler(params.row.id)}
                        >
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ]

    const rows = [];
    videos &&
        videos.forEach((item) => {
            rows.push({
                id: item?._id,
                name: item?.title,
                link: item?.videoUrl,
            })
        })


    return (
        <Fragment>
            {/* <MetaData title={`ALL Products - Admin`} /> */}
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[15]}
                        disableRowSelectionOnClick
                        autoHeight
                        className='productListTable'
                    >
                    </DataGrid>
                </div>
            </div>
        </Fragment>
    );
};

export default VideoList;