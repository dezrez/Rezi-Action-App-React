import React from 'react';
import './ErrorMessage.css';
import Support from './Support';

interface IProps {
    AppTitle: string,
    Tel: string,
    Email: string,
    ErrorMessage: string,
    ErrorStack: string
   
}

interface IState {
    hasError: boolean
    error: Error,
    info: any
}

class ErrorMessage extends React.Component<IProps, IState> {

    Reload() {
        window.location.reload();
    }

    render() {
            return (

                <section className="ErrorMessage">

                    <div className="bold"> <img src="https://rezi-apps.dezrez.com/rezi/Content/Images/error.svg" alt="Error Icon" />
                                "<span>{this.props.AppTitle}</span>" has experienced an error.
                        <p>{this.props.ErrorMessage}</p>
                        <Support AppTitle={this.props.AppTitle} Tel={this.props.Tel} Email={this.props.Email} ErrorMessage={this.props.ErrorMessage}></Support>
                        <button className="btn btn-primary" onClick={this.Reload}>Reload</button>
                    </div>

                </section>
            );
        
     }
}

export default ErrorMessage;
