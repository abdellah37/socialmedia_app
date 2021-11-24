import React, { useState,useEffect,useRef  } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../actions/posts";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import useStyles from "./styles";

const Comment = ({ post }) => {

  const [comments, setComments] = useState(post?.comments);
  console.log("comments lwlin ", comments);
  console.log("my fucking post ",post);
  const [comment, setComment] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const finalComment = ` ${user?.result?.name} : ${comment}`;
  console.log("comments hna",comments);
  const commentsRef = useRef();



  const handleClick = async () => {
    const finalComment = ` ${user?.result?.name} : ${comment}`;
    const newcomments = await dispatch(createComment(finalComment, post._id));
    setComments(newcomments);
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c?.split(': ')[0]}</strong>
              {c?.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && ( 
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleClick}>
            Comment
          </Button>
        </div>

        )}
      </div>
    </div>
  );
};

export default Comment;
