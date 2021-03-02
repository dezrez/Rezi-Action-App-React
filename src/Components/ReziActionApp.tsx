import React, { Fragment } from 'react';
import './ReziActionApp.css';
import logo from '../logo.svg';
import rezi from '../Rezi.svg';
import ReziApi from '../Xhr/ReziApi'
import { AxiosResponse } from 'axios';
import Spinner from './Spinner';
import DisabledMessage from './DisabledMessage';
import Setup from './Setup';

import ErrorMessage from './ErrorMessage';



interface IProps {
    Token: string;
    RefreshToken: string;
    WidgetId: number | null;
    ContainerId: string | null;
    ApiUrl: string;
    AppTitle: string;
    Tel: string;
    Email: string;
    Url: string;
    HasSetup: boolean;
    Loading: boolean;
    ShowSetup: boolean;
    Context: any;
    navBackHandler: any;

}

interface IState {
    Loading: boolean;
    Enabled: boolean;
    Me: any;
    AsyncError: boolean;
    ErrorDetail: any;
    ShowSetup: boolean;

}

class App extends React.Component<IProps, IState> {
    ReziApi?: ReziApi;
    constructor(props: IProps) {
        super(props);
        this.state = {
            Me: {},
            Loading: true,
            Enabled: true,
            AsyncError: false,
            ErrorDetail: {},
            ShowSetup: props.ShowSetup
        }

        this.navBackHandler = this.navBackHandler.bind(this)

        this.ReziApi = new ReziApi(props.ApiUrl, props.Token, props.RefreshToken);


    }

    navBackHandler() {
        this.props.navBackHandler();
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            ShowSetup: nextProps.ShowSetup,
        };
    }

    componentDidMount() {
        console.log("The Rezi App did mount!");

        if (this.ReziApi) {
            this.ReziApi.Me().then((response: AxiosResponse) => {
                this.setState({ ...this.state, Me: response.data, Loading: false });
            }).catch((err) => {
                let errmsg = "";
                if (err.data && err.data.MessageDetail) {
                    errmsg = err.data.MessageDetail;
                } if (err.message) {
                    errmsg = err.message;
                }
                console.error(errmsg);


                this.setState({ ...this.state, AsyncError: true, ErrorDetail: errmsg, Loading: false });

            });
        }

    }



    render() {

        return (
            <Fragment>
                <Spinner name={'Loading negotiator'} loading={this.state.Loading}></Spinner>
                {this.state && this.state.Enabled && !this.state.AsyncError &&
                    <header className="App-header" style={{ display: this.state.Loading ? "none" : "" }}>
                        {this.state.ShowSetup &&
                            <Fragment>
                                <Setup AppTitle={this.props.AppTitle} navBackHandler={this.navBackHandler}></Setup>
                            </Fragment>

                        }
                        {!this.state.ShowSetup &&
                            <Fragment>
                                <div className="row">
                                    <div className="column">
                                        <img src={logo} className="App-logo" alt="logo" />
                                    </div>
                                    <div className="column">
                                        <img src={rezi} className="App-logo-rezi" alt="logo" />
                                    </div>

                                </div>

                               

                                <h2 style={{ color: 'white' }}>Rezi React App Starter</h2>
                                <p>Username From Rezi API: {this.state.Me.ContactName}</p>
                                <p>Style Guide can be found <a href="https://www.figma.com/proto/gkk8GGnjKDp9D0AhsSMlhF/Dashboard?node-id=319%3A4263&viewport=490%2C-124%2C1.019605278968811&scaling=scale-down-width" target="_main">Here</a></p>
                                {this.props.ContainerId &&
                                    <Fragment>

                                        <h3>ACTION APP MODE</h3>
                                        <p>ContainerId : {this.props.ContainerId}</p>
                                        <p>There are no settings for action apps!</p>
                                        <p>Save and Cancel Button Text can be changed for your app</p>
                                        <p>Default Width and height can be changed for your app, although they should be responsive</p>
                                        <p>The context that has been passed to this app is:</p>
                                        <pre className="context">{JSON.stringify(this.props.Context, null, 4)}</pre>
                                    </Fragment>
                                }


                                {this.props.WidgetId &&
                                    <Fragment>
                                        <h3>WIDGET APP MODE</h3>
                                        <p>WidgetId : {this.props.WidgetId}</p>

                                        <p>Settings can be navigated to using the widgets cog icon</p>
                                        <p>Load widget settings using ReziApi.GetWidgetSettings command</p>
                                        <p>Default widget width 1-3 and height 1-3, can be changed for your app</p>
                                        <h4>In ReziActionAppWrapper</h4>
                                        <p>If widget has no settings, set HasSetup = false</p>
                                        <p>Make ContractedHeight &lt; ExpandedHeight to allow expansion of widget</p>

                                    </Fragment>

                                }


                            </Fragment>

                        }



                    </header>
                }



                {this.state && !this.state.Enabled && !this.state.AsyncError &&
                    <DisabledMessage AppTitle={this.props.AppTitle}></DisabledMessage>
                }
                {this.state && this.state.AsyncError &&
                    <ErrorMessage AppTitle={this.props.AppTitle} Tel={this.props.Tel} Email={this.props.Email} ErrorMessage={this.state.ErrorDetail} ErrorStack={'Async Error'} ></ErrorMessage>
                }
            </Fragment>

        );
    }
}

export default App;
