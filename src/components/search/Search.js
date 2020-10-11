import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import ImageResults from '../image_results/ImageResults';
import { Alert, AlertTitle } from '@material-ui/lab';
import './Search.css';

export default class Search extends Component {

    state = {
        searchText:'flower',
        amount:15,
        apiUrl:'https://pixabay.com/api',
        apiKey: '7129816-eca694d6cc4ede47255ad861c',
        images: [],
        loading:false
    }

    onTextChange = (e)=>{
        const val = e.target.value
        console.log(val)
        this.setState({loading:true})
        this.setState(()=>({searchText: val}),()=>{
            if(val===''){
                this.setState({images:[], loading:false})
            }else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res=>this.setState({images: res.data.hits, loading: false}))
                .catch(err=>{
                    console.log(err)
                    this.setState({loading:false})
                })
            }
        })
    }

    onAmountChange = (event)=>{
        this.setState({amount: event.target.value})
    }

    render() {
        let result=(
            <div style={{width:'500px', margin:'auto'}}>
                <Alert severity="info">
                    <AlertTitle>No Image available</AlertTitle>
                    To see images from Pixabay — <strong>type something!</strong>
                </Alert>
            </div>
        )

        if(this.state.loading){
            result = (
                <div style={{width:'200px',margin:'auto','text-align':'center'}}>
                    <CircularProgress />
                </div>

            )
        }
        return (
            <div>
                <TextField 
                    name="searchText"
                    value={this.setState.searchText}
                    onChange={this.onTextChange}
                    fullWidth={true}
                    color="primary"
                    label="Search Here"
                    variant="outlined"
                    className="searchArea"
                />
                <div style={{width:'200px', margin:'10px auto'}}>
                    <FormControl style={{width:'100%'}}>
                        <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                        >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                {this.state.images.length > 0 ? <ImageResults images={this.state.images} searchText={this.state.searchText} loading={this.state.loading}/>:result}

            </div>
        )
    }
}
