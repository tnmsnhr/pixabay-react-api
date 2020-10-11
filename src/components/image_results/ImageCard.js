import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import GetAppIcon from '@material-ui/icons/GetApp';
import './ImageCard.css';

const ImageCard = (props) => {
    return (
        <div>
            <Grid item>
                <Card className='root'>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe" className='avatar'>
                            <img src={props.avatar} style={{backgroundSize:'auto'}}/>
                        </Avatar>
                        }
                        action={
                            <Tooltip title="Quick View">
                                <IconButton aria-label="Quick View">
                                <ZoomInIcon onClick={props.clicked}/>
                                </IconButton>
                            </Tooltip>
                        }
                        title={props.user}
                        subheader={'views: '+props.views}
                    />
                    <CardMedia
                        className='media'
                        image={props.src}
                        title={props.user}
                    />
                    <CardContent>
                        <Typography className='tagArea' variant="body2" color="textSecondary" component="p">
                            {props.tags.split(',').map(tag=><Chip size="small" className='chip' label={tag}/>)}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" color="secondary">
                        <FavoriteIcon />
                            <p style={{fontSize:'16px'}}>{props.favorites}</p>
                        </IconButton>
                        <IconButton aria-label="share">
                            <GetAppIcon color="primary"/>
                            <p style={{fontSize:'16px'}}>{props.downloads}</p>
                        </IconButton>
                     </CardActions>
                </Card>
            </Grid>
        </div>
    )
}

export default ImageCard;
