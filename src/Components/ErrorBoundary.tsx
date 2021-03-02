import React, { Fragment } from 'react';
import './ErrorBoundary.css';

import ErrorMessage from './ErrorMessage';

interface IProps {
    AppTitle: string,
    Tel: string,
    Email: string
   
}

interface IState {
    hasError: boolean
    error: any,
    info: any
}

class ErrorBoundary extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            hasError: false,
            error: {name:"", message:""},
            info: null
        };
     }

    componentDidCatch(error: any, info: any) {

        this.setState({...this.state, hasError: true, error: error, info: info });
    }


    Reload() {
        window.location.reload();
    }


    render() {
        if (this.state && this.state.hasError) {
            return (
                <Fragment>
                <ErrorMessage AppTitle={this.props.AppTitle} Tel={this.props.Tel} Email={this.props.Email} ErrorMessage={this.state.error.message} ErrorStack={this.state.info.stackTrace} ></ErrorMessage>
                </Fragment>
               
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
