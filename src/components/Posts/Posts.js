import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import useStyles from './styles'
const Posts = ({ setCurrentId }) => {
    const {posts, isLoading} = useSelector((state) => state.posts)
    console.log('Posts')
    console.log(posts)
    const classes = useStyles()

    if(!posts.length && !isLoading) return 'No Posts'
    
    return(
        //if post.length is greater than 0 then it will show the grid otherwise cuircular progress
        isLoading ? <CircularProgress /> : (
            
            //not decond bracket
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts