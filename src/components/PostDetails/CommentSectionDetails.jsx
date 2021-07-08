import React, { useState, useRef } from "react";
import { Typography, TextField, Button, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  console.log(post);
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const commentsRef = useRef()

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`

    const newComments = await dispatch(commentPost(finalComment,post._id))

    setComments(newComments)
    setComment('')

    commentsRef.current.scrollIntoView({ behavior: 'smooth'})
  };

  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant="h6">
          মন্তব্যগুলি
        </Typography>
        {comments.map((c, i) => (
          <Typography key={i} gutterBottom variant="subtitle1">
            <strong>{c.split(":")[0]}</strong>
            <br />
            {c.split(":")[1]}
            <Divider style={{ margin: "5px 0" }} />
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>
      <div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              মন্তব্য করুন
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px", color: "blue" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
            >
              মন্তব্য জমা দিন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;