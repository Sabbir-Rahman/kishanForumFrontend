import React, {useState} from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch }  from 'react-redux'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useHistory } from 'react-router-dom'
import { deletePost, likePost } from '../../../actions/posts'
import { sizing,maxHeight } from "@material-ui/system";
const Post = ({ post, setCurrentId }) => {
   
    const classes = useStyles()
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const [likes, setLikes ] = useState(post?.likes)

    //sub component for likes

    const hasLiked = post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
    const userId = user?.result.googleId || user?.result?._id
    
   

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

    const handleLike = async()=>{
      dispatch(likePost(post._id))

      if(hasLiked){
        setLikes(post.likes.filter((id)=> id !== userId))
      } else {
        setLikes([...post.likes, userId])
      }
    }

     const Likes = () => {
       if (likes.length > 0) {
         return likes.find(
           (like) => like === userId
         ) ? (
           <>
             <ThumbUpAltIcon fontSize="small" />
             &nbsp;
             {likes.length > 2
               ? `You and ${likes.length - 1} others`
               : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
           </>
         ) : (
           <>
             <ThumbUpAltOutlined fontSize="small" />
             &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
           </>
         );
       }

       return (
         <>
           <ThumbUpAltOutlined fontSize="small" />
           &nbsp;Like
         </>
       );
     };

    return (
      <Card className={classes.card} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        {(user?.result?.googleId === post?.creator ||
          user?.result._id === post?.creator) &&
          localStorage.getItem("profile") && (
            <div className={classes.overlay2}>
              <Button
                style={{ color: "white" }}
                size="small"
                onClick={() => setCurrentId(post._id)}
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            </div>
          )}
        <ButtonBase className={classes.cardAction} onClick={openPost}>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message.slice(0, 150)}...
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </Button>

          {(user?.result?.googleId === post?.creator ||
            user?.result._id === post?.creator) &&
            localStorage.getItem("profile") && (
              <Button
                size="small"
                color="primary"
                onClick={() => dispatch(deletePost(post._id))}
              >
                <DeleteIcon fontSize="small" />
                Delete
              </Button>
            )}
        </CardActions>
      </Card>
    );
}

export default Post