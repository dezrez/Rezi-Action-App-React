import React, { Fragment } from 'react';
import logo from '../logo.svg';
import rezi from '../Rezi.svg';
import './Setup.css';

interface IProps {
    AppTitle: string,
    navBackHandler: any
}

interface IState {

}

class Setup extends React.Component<IProps, IState> {



    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="column">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="column">
                        <img src={rezi} className="App-logo-rezi" alt="logo" />
                    </div>

                </div>
                <p><a href="#" onClick={this.props.navBackHandler}>Back</a></p>
                <h3>Settings</h3>
                <p>Collect data here and persist it for a widget using the ReziApi.SaveWidgetSettings command</p>
                <p>An example component has not been created, because action apps do not require settings, and widgets dont always need settings</p>            </Fragment>

        );
    }
}

export default Setup;
