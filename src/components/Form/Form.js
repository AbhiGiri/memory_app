import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyle from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/posts';
import { updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';


const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    const post = useSelector((state) => (currentId ? state.posts.posts.find((post) => post._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyle();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
       if(post) {
         setPostData(post);
       }
      }, [post]);
      
    const clear = () => {
      setCurrentId(null);
      setPostData({  title: '', message: '', tags: '', selectedFile: '' })
     };

    const handleForm = (e) => {
      e.preventDefault();
      if(currentId) {
        dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
      } else {
        dispatch(createPost({...postData, name: user?.result?.name, navigate}));
      }
      clear();
    };

    if(!user?.result?.name) {
      return (
        <Paper className={classes.paper}>
          <Typography variant='h6'>
            Please Sign In to create your memories and like other's memories.
          </Typography>
        </Paper>
      )
    }

    return (
      <>
        <Paper className={classes.paper} elevation={6}>
          <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleForm}>
            <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>
            {/* <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator: e.target.value})} /> */}
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}/>
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}/>
            <div className={classes.fileInput}>
              <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
              <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
              <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </div>
          </form>

        </Paper>
      </>
    )
};

export default Form;
