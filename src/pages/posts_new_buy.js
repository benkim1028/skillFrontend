import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { createPost, showLoading } from "../actions/index";
import {Paper, Button, TextField, InputAdornment} from "@material-ui/core";
import ImgUploder from "../components/image_uploader";


const dataSource = {sports: ["Soccer", "archery", "badminton", "baseball", "softball", "beach volleyball", "boxing", "canoe / kayak", "climbing", "cycling", "fencing"],
    music: ["guitar", "piano", "ukulele", "violin", "saxophone","cello","trumpet","acoustic guitar","electric guitar","accordion","flute","drum","oboe","clarinet","base guitar","xylophone","mandolin","viola","tuba","trombone","harp","cajon","organ"],
    art: [],
    science: [],
    cooking: []} ;

class PostsNewBuy extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    errorMessage(){
        if (this.props.error){
            return(
                <div className="text-danger">
                    <p className="errorText">{this.props.error}</p>
                </div>
            )
        }
    }

    renderField(field) {
        const {meta: {touched, error}} = field;
        // const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <TextField
                style={{textAlign: 'left'}}
                id={field.label}
                label={field.label}
                error={touched && error}
                multiline={field.multiLines}
                rows={field.multiLines ? 5 : 1}
                helperText={touched && error}
                fullWidth
                InputProps={{
                    startAdornment: <InputAdornment position="start"> </InputAdornment>,
                }}
                {...field.input}
            />
        )
    }

    handleSubmit(values) {
        console.log(values);
        this.props.showLoading();
        this.props.createPost(values, this.props.match.params.category, "buy", () => {
             this.props.history.push(`/buy&sell/${this.props.match.params.category}`);
         })

    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="div-fullpage">
                <Header/>
                <div className="container text-center div-content-fullpage">
                        <h2 className="text">Buying Skill - Create a Post</h2>
                    <div className="row align-items-center">
                        <div className="col"/>
                        <div className="col text-center align-content-center">
                            <Paper>
                                <form onSubmit={handleSubmit(this.handleSubmit)}>
                                    <Field className="form-control" label="Skill Category" name="category" component={this.renderField}/><br/>
                                    <Field name="subCategory" component={this.renderField} label="Sub Category" category={this.props.match.params.category}/><br/>
                                    <Field className="form-control" label="Title" name="title" component={this.renderField}/><br/>
                                    <Field className="form-control" label="Duration" name="duration" component={this.renderField}/><br/>
                                    <Field className="form-control" label="Description" name="description" component={this.renderField} multiLines={true}/><br/>
                                    <Button type="submit" color="primary" variant="raised" style={{margin: '15px 15px 5px 5px'}}>Create</Button>
                                    <Button onClick={() => this.props.history.push(`/buy&sell/${this.props.match.params.category}`)} variant="raised" color="secondary" style={{margin: '15px 15px 5px 5px'}}>Cancel</Button>
                                    {this.errorMessage()}
                                </form>
                            </Paper>
                            <br/>
                        </div>
                        <div className="col"/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function validate(values) {

    // console.log(values) -> {title:"asdf", categories: "asdf", content: "asdf"}
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.category) {
        errors.category = "choose one category!";
    }
    if (!values.subCategory) {
        errors.subCategory = "choose one sub-category!";
    }
    if (!values.title) {
        errors.title = "Enter a title of this post!";
    }
    if (!values.duration){
        errors.duration = "Enter the duration";
    }
    if (!values.description){
        errors.description = "Enter the description";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid+
    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, {showLoading, createPost})(PostsNewBuy)
);