import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import ImageCard from './ImageCard';
import FlatButton from 'material-ui/FlatButton';
import './ImageResult.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';



class ImageResults extends Component {

    state= {
        open:false,
        currentImage:'',
        user:'',
        userImageURL:''
    }

    handleOpen = (img, user, userImageURL) =>{
        this.setState({open:true, currentImage:img, user: user, userImageURL })
    }

    handleClose = () =>{
        this.setState({open:false})
    }

    render() {
        
        const {images}=this.props
        
        let imageListContent;

        if(images){
            imageListContent = (
                <div>
                <Grid container className='results' justify='center' spacing={3}>
                    {images.map(img=>(
                        <Grid item xs={12} sm={6} lg={3}>
                            <div className='mycard'>
                            <ImageCard 
                            clicked={()=>this.handleOpen(img.largeImageURL, img.user, img.userImageURL )}
                            tags={img.tags}
                            key={img.id}
                            user={img.user}
                            src={img.largeImageURL}
                            avatar={img.userImageURL}
                            favorites={img.favorites}
                            downloads={img.downloads}
                            views={img.views}
                        />
                            </div>
                        </Grid>
                       
                    ))}
                </Grid>
            </div>
                
            )
        }

        const actions =[
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ];

        return (
            <div>
                {imageListContent}
                {/* <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                     <img src={this.state.currentImage} alt='' style={{'width':'100%'}}/>
                 </Dialog> */}

                 <Dialog
                    open={this.state.open}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >

                    <DialogTitle id="alert-dialog-slide-title">
                        <Avatar alt={this.state.user}> 
                            < img src={this.state.userImageURL} /><span><p>{`:${this.state.user}`}</p></span>
                        </Avatar>
                    </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <img src={this.state.currentImage} alt='' style={{'width':'100%'}}/>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults; 
