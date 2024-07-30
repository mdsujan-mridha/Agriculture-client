

import React, { Fragment, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Delete, Launch } from '@mui/icons-material';
import MetaData from '../Layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

const Message = () => {

    const [messages, setMessages] = useState([]);


    useEffect(() => {

        fetch(`https://farming-assistant-backend.vercel.app/api/v1/messages`)
            .then(res => res.json())
            .then(data => setMessages(data.messages))

    }, [])
    const deleteUserHandler = (id) => {
        // dispatch(deleteUser(id));
    }
    //   table data 
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Message",
            type: "string", // Corrected: Use "string" instead of "number" for role
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.role === "admin" // Corrected: Access role from params.row
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const messageId = params.row.id; // Corrected: Access row.id instead of getValue(params.id, "id")
                return (
                    <Link to={`/message/${messageId}`}>
                        <Launch />
                    </Link>
                );
            },
        },
    ];

    const rows = [];

    messages &&
        messages.forEach((item) => {
            rows.push({
                id: item._id,
                email: item.email,
                name: item.name,
                role: item.message,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL Message - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL Message</h1>
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
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default Message;