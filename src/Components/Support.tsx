import React from 'react';
import './Support.css';

interface IProps {
    Email: string;
    Tel: string;
    AppTitle: string,
    ErrorMessage?: string,
    Stack?: string

}

interface IState {

}

class Support extends React.Component<IProps, IState> {
 

    EmailLink = () : string => {
        return `mailto:${this.props.Email}?subject=${encodeURI(this.props.AppTitle)}&body=What%20Happened%3F%0D%0A%0D%0A${encodeURI(this.props.ErrorMessage?this.props.ErrorMessage:"")}%0D%0A%0D%0AWhat%20were%20you%20doing%3F%0D%0A%0D%0AHow%20Can%20We%20Reproduce%20It%3F%0D%0A`;
    }
    TelLink = () : string => {
        return `tel:${this.props.Tel}`;
    }

    render() {
        return (

            <section className="support">

                <p>Support for this app</p>
                <p>email: <a target="_main" href={this.EmailLink()}>{this.props.Email}</a></p>
                <p>tel: <a target="_main" href={this.TelLink()}>{this.props.Tel}</a></p>


            </section>

        );
    }
}

export default Support;
