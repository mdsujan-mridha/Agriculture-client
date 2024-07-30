import React from 'react';
import ReactPlayer from 'react-player'

const VideoCard = ({ item }) => {



    return (
        <div className='w-full'>
            <ReactPlayer
                url={item?.videoUrl}
                controls={true}
                muted={true}
                playIcon
                style={{
                    width: '100%'
                }}
            />
            <h1 className='text-2xl font-medium py-5'> {item?.title} </h1>
            <p className='text-md font-semibold pb-10'> {item?.description} </p>
        </div>
    );
};

export default VideoCard;