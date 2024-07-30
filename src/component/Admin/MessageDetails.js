

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const MessageDetails = () => {

    const messageId = useParams();
    const [message, setMessage] = useState({});

    console.log(messageId);

    useEffect(() => {

        fetch(`https://farming-assistant-backend.vercel.app/api/v1/message/${messageId.id}`)
            .then(res => res.json())
            .then(data => setMessage(data.message))

    }, [messageId])

    console.log(message);

    return (
        <div className='dashboard min-h-screen'>
            <Sidebar />
            <div className="dashboardContainer">
                <h1> Message Details </h1>
                <div className='px-12 flex gap-5 mb-10'>
                    <div className='flex flex-col gap-5'>
                        <div> <h1 className='text-5xl font-bold text-primary'> User Name: {message?.name} </h1> </div>
                        <div> <h1 className='text-5xl font-bold text-primary'> User Email: {message?.email} </h1> </div>
                        <div> <h1 className='text-3xl font-bold text-primary'> Message: {message?.message} </h1> </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageDetails;