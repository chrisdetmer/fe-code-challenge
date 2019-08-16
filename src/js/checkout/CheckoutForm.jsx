import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import Button from 'common/Button';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter an email address.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Please enter a valid email address.';
    }
    if (!values.phone) {
        errors.phone = 'Please enter a phone number.';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i.test(values.phone)) {
        errors.phone = 'Please enter a valid phone number.';
    } else if (values.phone.length < 10) {
        errors.phone = 'Please enter at least 10 digits';
    }

    return errors;
};

const renderField = ({
    input,
    label,
    type,
    meta: {touched, error}
}) => (

    <div className={'Field-group' + ((touched && error) ? ' Field-has-error' : '')}>
        <label className="Field-label">{label}</label>
        <input
            {...input}
            type={type}
            className="Field-input"
        />
        {touched &&
        (error && <span className="Field-error">{error}</span>)}
    </div>
);

renderField.propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    type: PropTypes.string,
    meta: {
        touched: PropTypes.bool,
        error: PropTypes.bool
    }
};

const CheckoutForm = props => {
    const {handleSubmit, pristine, submitting, price} = props;

    return (
        <div className="Checkout-form">
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstname"
                    type="text"
                    component={renderField}
                    label="First Name"
                />
                <Field
                    name="lastname"
                    type="text"
                    component={renderField}
                    label="Last Name"
                />
                <Field
                    name="email"
                    type="email"
                    component={renderField}
                    label="Email"
                />
                <Field
                    name="phone"
                    type="phone"
                    component={renderField}
                    label="Phone"
                />
                <div className="Button-block">
                    <Button
                        type="submit"
                        color="primary"
                        disabled={pristine || submitting}
                    >
                        Purchase for ${price}
                    </Button>
                </div>
            </form>
        </div>
    );
};

CheckoutForm.propTypes = {
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    price: PropTypes.string
};

export default reduxForm({
    form: 'CheckoutForm',
    validate
})(CheckoutForm);
