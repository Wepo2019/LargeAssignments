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
                code: ''
            },
            errors: {
                nameError: '',
                addressError: '',
                cityError: '',
                telephoneError: '',
                codeError: ''
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
        const {name, address, city, telephone, code} = this.state.fields;
        const errors = {};
        if(name === '') { errors.nameError = 'You need to enter your name'; }
        if(address === '') { errors.addressError = 'You need to enter your address'; }
        if(city === '') { errors.cityError = 'You need to enter your city'; }
        if(telephone === '') { errors.telephoneError = 'You need to enter your phone number'; }
        if(code === '' ) { errors.codeError = 'You need to enter your postal code'; }
        if(!validator.isLength(telephone,{min:7}, {max:14})) { errors.telephoneError = 'Phone number must be at least 7 numbers'}
        if(!validator.isLength(code,{min:3}, {max:6})) { errors.codeError = 'Phone number must be at least 3 numbers'}

        if(Object.keys(errors).length > 0) {
            this.setState({...this.state.errors, errors});
            return false;
        }
        return true;
    };

    submitForm(e) {
        e.preventDefault();
        if (this.validate()) {
            //toastr.success('Successfully submitted!', 'Success!');
            localStorage.setItem('user', JSON.stringify(this.state.fields));
            this.props.history.push('/review');
        } else {
            //toastr.error('Failed to be submitted!', 'Failed!');
        }
    }

    render() {
        const { name, address, city, telephone, code } = this.state.fields;
        const { nameError, addressError, cityError, telephoneError, codeError } = this.state.errors;
        return (
            <>
            <div className="form">
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
                    type="number"
                    name="code"
                    value={ code }
                    htmlId="code"
                    label="Enter your postal code"
                    errorMessage={ codeError }
                    onInput={e => this.onInput(e)} />
                <input type="submit" value="Submit!" className="submit-button" style={{ float: 'right', marginTop: 10}} />
            </Form>
            </div>
            </>
         )
    }
};

export default DeliveredForm;
