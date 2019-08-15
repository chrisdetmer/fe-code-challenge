import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import Button from 'common/Button';
import Modal from 'common/Modal';

class SpotDetail extends PureComponent {
    static propTypes = {
        spot: PropTypes.object,
        price: PropTypes.string,
        setSpot: PropTypes.func.isRequired,
        pushTo: PropTypes.func.isRequired
    };

    _onBookClick = spot => {
        const {
            pushTo,
        } = this.props;

        pushTo('/checkout');
    }

    _onCloseModal = evt => {
        const {
            setSpot,
        } = this.props;

        setSpot(null);
    }

    render() {
        const {
            spot,
            price = spot.price * 0.01
        } = this.props;

        return (
            <Modal
                title="Spot Details"
                className="SpotDetailsModal"
                inline
                animated
                showing
                onCloseModal={this._onCloseModal}
            >
                <div className="SpotDetail">
                    <h3 className="title">{spot.title}</h3>
                    <p>{spot.description}</p>
                    <div className="Button-block">
                        <Button
                            color="primary"
                            type="button"
                            onClick={this._onBookClick}
                        >
                            ${price.toFixed(2)} | Book It!
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotDetail);
