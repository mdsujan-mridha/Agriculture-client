
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, loadUser, updateProfile } from '../action/userAction';
import { toast } from 'react-toastify';
import { UPDATE_PROFILE_RESET } from '../constant/userConstant';
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import { Face, MailOutline } from '@mui/icons-material';
import "./updateProfile.css";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
    // all state 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = {
            name,
            email,
            avatar,
        }
        // console.log(myForm);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user?.avatar?.url)
        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success('Profile updated successfully')
            dispatch(loadUser());
            navigate("/user/dashboard")
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [dispatch, user, isUpdated, error, navigate])
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Update Profile" />
                    <div className="updateProfileContainer">
                        <div className="updateProfileBox">
                            <h2 className="updateProfileHeading">Update Profile</h2>
                            <form
                                className="updateProfileForm"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="updateProfileName">
                                    <Face />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
                                    <MailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateProfile;