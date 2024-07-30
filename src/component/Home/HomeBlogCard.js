

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const HomeBlogCard = ({ blog }) => {



    return (
        <Fragment>
            <Link to={`/post/${blog._id}`}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={blog?.images[0]?.url}
                            alt="green iguana"
                            
                            
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {blog?.title}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Fragment>
    );
};

export default HomeBlogCard;