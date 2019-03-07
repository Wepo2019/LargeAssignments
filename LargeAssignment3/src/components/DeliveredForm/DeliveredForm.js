import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Input/Input';
import validator from 'validator';
import toastr from 'toastr';

class  DeliveredForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                name: '',
                address: '',
                city: '',
                telephone: '',
                region: ''
            },
            errors: {
                nameError: '',
                addressError: '',
                cityError: '',
                telephoneError: '',
                regionError: ''
            }
        };
    }
    
    onInput(e) {
        this.setState({
            fields: {
            ...this.state.fields,
            [e.target.name]: e.target.value }
        });
    };

    validate() {
        const {name, address, city, telephone, region} = this.state.fields;
        const errors = {};
        if(name === '') { errors.nameError = 'You need to enter your name'; }
        if(address === '') { errors.addressError = 'You need to enter your address'; }
        if(city === '') { errors.cityError = 'You need to enter your city'; }
        if(telephone === '') { errors.telephoneError = 'You need to enter your phone number'; }
        if(region === '' ) { errors.regionError = 'You need to enter your postal code'; }
        if(!validator.isLength(telephone,{min:7}, {max:14})) { errors.telephoneError = 'Phone number must be seven numbers'}

        if(Object.keys(errors).length > 0) {
            this.setState({...this.state.errors, errors});
            return false;
        }
        return true;
    };

    submitForm(e) {
        e.preventDefault();
        if (this.validate()) {
            console.log("WIN");
            toastr.success('Successfully submitted!', 'Success!');
            this.props.history.push('/review');
        } else {
            console.log("LOST");
            toastr.error('Failed to be submitted!', 'Failed!');
        }
    }

    render() {
        const { name, address, city, telephone, region } = this.state.fields;
        const { nameError, addressError, cityError, telephoneError, regionError } = this.state.errors;
        return (
            <>
            <h1>Please fill out this form!</h1>
            <Form onSubmit={ e => this.submitForm(e)} >
                <Input
                    type="text"
                    name="name"
                    value={ name }
                    htmlId="name"
                    label="Enter your full name"
                    errorMessage={ nameError }
                    onInput={e => this.onInput(e)} />
                <Input
                    type="text"
                    name="address"
                    value={ address }
                    htmlId="address"
                    label="Enter your address"
                    errorMessage={ addressError }
                    onInput={e => this.onInput(e)} />
                <Input
                    type="text"
                    name="city"
                    value={ city }
                    htmlId="city"
                    label="Enter your city"
                    errorMessage={ cityError }
                    onInput={e => this.onInput(e)} />
                <Input
                    type="number"
                    name="telephone"
                    value={ telephone }
                    htmlId="telephone"
                    label="Enter your phone number"
                    errorMessage={ telephoneError }
                    onInput={e => this.onInput(e)} />
                 <Input
                    type="text"
                    name="region"
                    value={ region }
                    htmlId="region"
                    label="Enter your region"
                    errorMessage={ regionError }
                    onInput={e => this.onInput(e)} />
                <input type="submit" value="Submit!" className="btn btn-primary" style={{ float: 'right', marginTop: 10 }} />
            </Form>
            </>
         )
    }
};

export default DeliveredForm;
