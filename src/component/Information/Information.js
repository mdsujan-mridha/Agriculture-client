import React, { Fragment, useState } from 'react';
import image from "../images/Organic product/product 6.jpg";
import InformationCard from './InformationCard';
import d1 from "../images/d/d-1.png";
import d2 from "../images/d/d-2.png";
import d3 from "../images/d/d-3.png";
import d4 from "../images/d/d-4.png";

const fakeData = [

    {
        _id: 1,
        title: "How to grow a corn",
        metaDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit",
        category: "Corn",
        images: d1,
        user: " Sujan"
    },
    {
        _id: 2,
        title: "How to grow a corn",
        metaDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit",
        category: "Corn",
        images: d2,
        user: " Sujan"
    },
    {
        _id: 3,
        title: "How to grow a corn",
        metaDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit",
        category: "Corn",
        images: d3,
        user: " Sujan"
    },
    {
        _id: 4,
        title: "How to grow a corn",
        metaDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit ",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quo. Lorem ipsum dolor sit amet consectetur adipisicing elit",
        category: "Corn",
        images: d4,
        user: " Sujan"
    }
]


const informationCategory = [
    "চাষাবাদ পদ্ধতি",
    "পাখি পশু পালন ",
    "ফসলি রোগ জীবাণু ",
    "কৃষি তথ্য",
    
]
const Information = () => {

    const [category, setCategory] = useState('');

    return (
        <Fragment>
            <div className='px-12'> <h1 className='text-center text-5xl font-bold mt-10 border-b-2'> কৃষি তথ্য </h1> </div>
            <div className='flex flex-col lg:flex-row  min-h-screen px-12'>
                <div className='w-full lg:w-1/12'>
                    <div className='pt-10 mt-10'>
                        <p className='text-xl font-bold pb-5'> Category </p>
                        <ul>
                            {
                                informationCategory.map((category, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setCategory(category)}
                                        className='text-lg font-bold opacity-60 cursor-pointer'
                                    >
                                        {category}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className='w-full lg:w-4/5'>
                    {
                        fakeData &&
                        fakeData.map((item) => (
                            <InformationCard
                                key={item._id}
                                item={item}
                            />
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Information;