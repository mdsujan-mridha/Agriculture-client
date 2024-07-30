import React, { Fragment, useEffect, useRef, useState } from 'react';
import contactImage from "../images/contact.svg";
import { ContactMail, LocationCity, } from '@mui/icons-material';
import leafImg from "../images/about/about.png";
import axios from 'axios';
import { toast } from 'react-toastify';

import syed from "../images/admin/Sayed.png";
import sagor from "../images/admin/Sagor.png";
import Saif from "../images/admin/Saif.png";

const Contact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    // use Ref for read data 
    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();


    const messageHandler = (e) => {
        e.preventDefault();
        setName(nameRef.current.value);
        setEmail(emailRef.current.value);
        setMessage(messageRef.current.value);

    }

    // fetch data 
    const formData = {
        name: name,
        email: email,
        message: message
    };
    const sentMessage = async () => {
        try {
            const response = await axios.post('https://farming-assistant-backend.vercel.app/api/v1/new/message', formData);
            console.log('Message sent successfully:', response.data);
            if (response.data.success === true) {
                toast.success('Message sent successfully')
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    useEffect(() => {

        sentMessage()

    })


    return (
        <Fragment>

            <div className=' min-h-screen w-full'>
                <div>
                    <h1 className='text-4xl font-bold text-center pt-56'> প্রযুক্তি নির্ভর আধুনিক কৃষি সম্পর্কিত তথ্যের জন্য যোগাযোগ করুন </h1>
                </div>

                <div className='flex justify-center ju items-center pt-10'>
                    <img src={leafImg} alt="leaf" />
                </div>

                <div className="px-12 flex flex-col lg:flex-row items-center justify-around pb-10 pt-32">
                    <div className="w-full lg:w-96">
                        <img src={contactImage} alt="Contact us" />
                    </div>

                    <div className="">
                        <div className="card w-full lg:w-auto bg-secondary shadow-2xl py-10">
                            <h1 className='text-center text-4xl py-5 font-bold'> <ContactMail fontSize='inherit' /> Contact us </h1>
                            <p className='text-center text-base font-semibold text-gray-200 py-5'> Lorem ipsum dolor sit amet. </p>
                            <hr />
                            <form onSubmit={messageHandler} className='px-5 pt-5 flex flex-col gap-5'>
                                <input
                                    type="text"
                                    ref={nameRef}
                                    placeholder="You name"
                                    className="input input-bordered w-96  bg-transparent border-gray-200"
                                />
                                <input
                                    type="email"
                                    ref={emailRef}
                                    placeholder="You email"
                                    className="input input-bordered w-96  bg-transparent border-gray-200"
                                />
                                <input
                                    type="text"
                                    ref={messageRef}
                                    placeholder="You message"
                                    className="input input-bordered w-96 h-32 bg-transparent border-gray-200"
                                />
                                {/* <input type='button' value="Send" className="input input-bordered w-96 " /> */}
                                <input type="submit" value="Send" className=' btn btn-primary w-96 text-white' />
                            </form>
                        </div>
                    </div>

                </div>
                <div className=" bg-secondary border-t-2 border-gray-500 mt-14 px-12 h-96 flex justify-center items-center gap-5">
                    <div className='w-96 h-72 gap-5 flex justify-center items-center flex-col bg-primary shadow-2xl rounded-md'>
                        
                        <img src={syed} alt="Syed" className='w-32 h-32 rounded-full  border-solid border-2 border-gray-200' />
                        <h1 className='text-3xl font-bold'> Sayed Abu Hasan </h1>
                        <p className='text-md font-bold'>sayedabuhasan445@gmail.com</p>
                    </div>
                    <div className='w-96 h-72 gap-5 flex justify-center items-center flex-col bg-primary shadow-2xl rounded-md'>
                       
                        <img src={sagor} alt="sagor" className='w-32 h-32 rounded-full  border-solid border-2 border-gray-200' />
                        <h1 className='text-3xl font-bold'> Sagor Ahammed </h1>
                        <p className='text-md font-bold'> sagorahammed164@gmail.com</p>
                    </div>
                    <div className='w-96 h-72 gap-5 flex justify-center items-center flex-col bg-primary shadow-2xl rounded-md'>
                       
                        <img src={Saif} alt="Syed" className='w-32 h-32 rounded-full  border-solid border-2 border-gray-200' />
                        <h1 className='text-3xl font-bold'> Saifuddin</h1>
                        <p className='text-md font-bold'> mdsaifuddinnobab5@gmail.com</p>
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default Contact;