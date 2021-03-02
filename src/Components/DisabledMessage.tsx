import React from 'react';
import './DisabledMessage.css';

interface IProps {
    AppTitle: string,
}

interface IState {

}

class DisabledMessage extends React.Component<IProps, IState> {
 


    render() {
        return (
            <div className="DisabledMessage">
                <div>
                    <p className="bold"> <img src="https://rezi-apps.dezrez.com/rezi/Content/Images/Rezi.svg" alt="rezi logo"/>
                        "<span>{this.props.AppTitle}</span>" is not enabled, Please contact Rezi customer support to get this feature enabled.
                    </p>
                </div>
            </div>
        );
    }
}

export default DisabledMessage;
