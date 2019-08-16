import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Modal extends PureComponent {
    static propTypes = {
        /** Additional class(es) to add to the component. */
        className: PropTypes.string,
        /** Title for the modal. */
        title: PropTypes.string,
        /** The markup node to insert into the modal. */
        children: PropTypes.node,
        /**  **/
        inline: PropTypes.bool,
        /**  **/
        animated: PropTypes.bool,
        /**  **/
        showing: PropTypes.bool,
        /**  **/
        onCloseModal: PropTypes.func
    };

    render() {
        const {
            className,
            title,
            children,
            inline,
            animated,
            showing,
            onCloseModal
        } = this.props;

        const classes = classNames(
            'Modal',
            {'Modal-inline': inline},
            {'Modal-animated': animated},
            {'Modal-showing': showing},
            className
        );

        return (
            <div className={classes}>
                <div className="Modal-shim" />
                <div className="Modal-wrapper">
                    <div className="Modal-container Modal-container-normal Modal-container-animated">
                        <div className="Modal-ctas">
                            <button
                                className="Button Modal-close"
                                type="button"
                                onClick={onCloseModal}
                            >
                                <svg
                                    className="Icon Icon-times"
                                    role="presentation"
                                    viewBox="0 0 1024 1024"
                                    width="20px"
                                    height="20px"
                                >
                                    <path d="M622.7,512l378.9-378.9c29.8-29.8,29.8-76.6,0-110.7c-29.8-29.8-76.6-29.8-110.7,0L512,401.3L133.1,22.4c-29.8-29.8-76.6-29.8-110.7,0C-7.5,52.2-7.5,99,22.4,133.1L401.3,512L22.4,890.9c-29.8,29.8-29.8,76.6,0,110.7c29.8,29.8,76.6,29.8,110.7,0L512,622.7l378.9,378.9c29.8,29.8,76.6,29.8,110.7,0c29.8-29.8,29.8-76.6,0-110.7L622.7,512z" />
                                </svg>
                            </button>
                        </div>
                        <div className="Modal-title">{title}</div>
                        <div className="Modal-content SpotDetailsModal-main">
                            <div className="Modal-content-wrapper">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
