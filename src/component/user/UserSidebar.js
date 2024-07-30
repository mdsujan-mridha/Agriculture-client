import { Add, ChevronRight, Dashboard, ExpandMore, PostAdd } from '@mui/icons-material';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./UserSidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, updatePassword } from '../action/userAction';
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Slide, TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserSidebar = () => {
    const dispatch = useDispatch();
    const { user, error, loading } = useSelector((state) => state.user);
    const { error: errorPassword, isUpdated } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = {
            oldPassword,
            newPassword,
            confirmPassword
        }
        dispatch(updatePassword(myForm))
        console.log(myForm);

    }


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        if (errorPassword) {
            toast.error(errorPassword);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            toast.success("Password updated successfully")
            navigate("/user/dashboard");
            setOpen(false);
        }

    }, [error, dispatch, errorPassword, isUpdated, navigate])


    return (
        <div className='sidebar'>
            <Link to="/" className='flex justify-center items-center gap-2'>
                {/* <img src={logo} alt="Log" /> <p className='text-4xl font-bold text-primary'> Book Share </p> */}
            </Link>
            <div className='px-12 flex flex-col gap-5'>
                <p className='text-left font-bold text-3xl opacity-60'> {user?.name} </p>
                <p className='text-xl font-bold opacity-60'> {user?.email} </p>
            </div>

            <Link to="/user/dashboard">
                <p> <Dashboard /> Dashboard</p>
            </Link>
            <Link>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronRight />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/new/product">
                            <TreeItem nodeId="2" label="Add" icon={<Add />} />
                        </Link>
                        <Link to="/products">
                            <TreeItem nodeId="3" label="All" icon={<PostAdd />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/orders"> Orders </Link>
            <Link onClick={handleClickOpen}> Change password </Link>
            <Link to="/update-profile"> Update Profile </Link>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"

            >
                <DialogTitle>{"Update Password"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <form onSubmit={handlePasswordSubmit} style={{ width: '400px', display: 'flex', justifyContent: "center", alignItems: "center", gap: "10px", flexDirection: "column", marginTop: 20 }}>
                            <TextField
                                id="outlined-password-input"
                                label="Old Password"
                                type="password"
                                value={oldPassword}
                                placeholder='Enter old password'
                                onChange={(e) => setOldPassword(e.target.value)}
                                className='w-full px-12'
                            />
                            <TextField
                                id="outlined-password-input"
                                label="New Password"
                                type="password"
                                value={newPassword}
                                placeholder='Enter old password'
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='w-full px-12'
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                placeholder='Enter old password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full px-12'
                            />
                            <Button variant="contained" type='submit' className='w-full px-12'>Change</Button>
                        </form>
                    </DialogContentText>
                </DialogContent>

            </Dialog>

        </div>
    );
};

export default UserSidebar;