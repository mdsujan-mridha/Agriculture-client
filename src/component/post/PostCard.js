import React from 'react';
import { Link } from "react-router-dom"
import "./postCard.css";

const PostCard = ({ item }) => {
    // console.log(item);

    return (
        <Link to={`/post/${item._id}`} className='productCard' >
            <img src={item.images[0]?.url} alt={item.name} />
            <p className='text-white'> {item.title} </p>
            <div>
            </div>
            
        </Link>
    );
};

export default PostCard;