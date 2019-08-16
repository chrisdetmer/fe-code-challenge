import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {purchase} from 'spot/spot-actions';
import CheckoutForm from 'checkout/CheckoutForm';
import TextButton from 'common/TextButton';
import Image from 'common/Image';

class Checkout extends PureComponent {
    static propTypes = {
        selectedSpot: PropTypes.object,
        pushTo: PropTypes.func.isRequired,
        doCheckout: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const {
            selectedSpot,
            pushTo
        } = props;

        if (!selectedSpot) {
            pushTo('/');
        }
    }

    _onSubmit = values => {
        const {
            doCheckout,
            pushTo
        } = this.props;

        doCheckout(values);
        pushTo('/confirmation');
    }

    render() {
        const {
            selectedSpot
        } = this.props;

        if (!selectedSpot) {
            return null;
        }

        const price = selectedSpot.price * 0.01;

        return (
            <div className="Checkout">
                <div className="Checkout-wrapper">
                    <div className="Checkout-ctas">
                        <TextButton href="/">&#60; Back to Search</TextButton>
                    </div>
                    <div className="SpotItem Checkout-item">
                        <Image src={selectedSpot.image} />
                        <div className="SpotItem-info Checkout-item-info">
                            <h2>{selectedSpot.title}</h2>
                            <p>{selectedSpot.distance}</p>
                        </div>
                    </div>
                    <CheckoutForm
                        price={price.toFixed(2)}
                        onSubmit={this._onSubmit}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        },
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
    doCheckout: purchase
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
