import React, { useState } from 'react';
import { Fragment } from 'react';
import profile from "../images/user/profile.jpg";
import { useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {

    const { user } = useSelector((state) => state.user);
    // console.log(user);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // handle submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            email: email
        }
        console.log(data);
        setOpen(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <div className='flex lg:justify-center lg:items-center container mx-auto'>
                <div className="mockup-browser border bg-base-300 lg:w-full" style={{ marginTop: 100 }}>
                    <div className="mockup-browser-toolbar">
                        <div className="input">http://localhost:3000/profile</div>
                    </div>
                    <div className="flex flex-col px-4 py-16 bg-base-200 justify-between lg:items-center w-full">
                        <div className='flex flex-col lg:flex-row justify-evenly lg:items-center gap-12 w-full'>
                            <img src={profile} alt="user_profile" style={{ width: 300, height: 300 }} className='rounded-full' />
                            <div className='flex flex-col gap-5 justify-center lg:items-center'>
                                <div>
                                    <h1 className='text-2xl font-bold text-start'> Full Name </h1>
                                    <p className='font-bold py-3'> {user?.name} </p>
                                    <h1 className='text-2xl font-bold text-start'> Email: </h1>
                                    <p className='font-bold py-3'> {user?.email}</p>
                                    <h1 className='text-2xl font-bold text-start'> Joined Date </h1>
                                    <p className='font-bold py-3'> {user?.createAt} </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-96 gap-5 justify-start' style={{ marginTop: 50 }}>
                            <button onClick={handleClickOpen} className='btn btn-primary'> Update Profile </button>
                            <button className='btn btn-primary'> My orders </button>
                            <button className='btn btn-primary'> Change password </button>
                        </div>
                    </div>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle> {"Update Profile"} </DialogTitle>
                    <DialogContent>
                        <form
                            onSubmit={handleSubmit}
                            className='w-96 flex flex-col gap-5 justify-center items-center px-5'>
                            <div>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder='Name'
                                    className='w-full h-14 rounded-xl border-2 outline-none px-5' />
                            </div>
                            <div>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder='Email'
                                    className='w-full h-14 rounded-xl border-2 outline-none px-5' />
                            </div>
                            <input className='w-full bg-primary text-white h-14 rounded-full' type="submit" value="Update" />
                        </form>
                    </DialogContent>
                    <DialogActions
                    >
                        <Button onClick={handleClose}> Disagree </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>
    );
};

export default Profile;