import React, { useState, useEffect} from 'react'
import { TextField, Button, Typographym, Paper, Typography} from '@material-ui/core'
import userStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'


const Form = ({ currentId, setCurrentId }) => {

    //creating the post object in useSate to use it for post
    const [postdata, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    const post = useSelector((state) => currentId? state.posts.posts.find((message) => message._id === currentId):null)


    const classes = userStyles()
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()

    useEffect(() => {
        if(post) setPostData(post)
    },[post])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(currentId){
            
           
            dispatch(updatePost(currentId,{...postdata,name: user?.result?.name}))
            
            clear()
            
        } else {
           
            dispatch(createPost({...postdata,name: user?.result?.name}))
            clear()
        }

    

        

        
        
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }
    if(!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              বক্তব্য জমা,পছন্দ বা মন্তব্যের জন্য অনুগ্রহ করে প্রবেশ করুন
            </Typography>
          </Paper>
        );
      }
    else{
        return (
          <Paper className={classes.paper}>
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={handleSubmit}
            >
              <Typography variant="h6">
                {currentId ? "পোস্ট সংশোধন" : "নতুন পোস্ট"}
              </Typography>
              <TextField
                name="title"
                variant="outlined"
                label="টপিক"
                fullWidth
                value={postdata.title}
                onChange={(event) =>
                  setPostData({ ...postdata, title: event.target.value })
                }
              />
              <TextField
                name="message"
                variant="outlined"
                label="বক্তব্য"
                fullWidth
                rows={5}
                multiline
                value={postdata.message}
                onChange={(event) =>
                  setPostData({ ...postdata, message: event.target.value })
                }
              />
              <TextField
                name="tags"
                variant="outlined"
                label="ট্যাগ (কমা দিয়ে আলাদা)"
                fullWidth
                value={postdata.tags}
                onChange={(e) =>
                  setPostData({ ...postdata, tags: e.target.value.split(",") })
                }
              />
              <div className={classes.fileInput}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postdata, selectedFile: base64 })
                  }
                />
              </div>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
              >
                জমা দিন
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={clear}
                fullWidth
              >
                মুছুন
              </Button>
            </form>
          </Paper>
        );
    }
}

export default Form