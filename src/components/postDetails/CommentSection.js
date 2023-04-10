import { Typography, TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts.js';

import useStyle from "./styles.js";


const CommentSection = ({post}) => {
    const classes = useStyle();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    };

    return (
        <>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    { comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}: </strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                    <div style={{width: '70%'}}>
                        <Typography gutterBottom variant="h6">Write a Comments</Typography>
                        <TextField  
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{marginTop: '10px'}} fullWidth color="primary" variant='contained' disabled={!comment} onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )}    
            </div>
        </>
    );
};

export default CommentSection;
