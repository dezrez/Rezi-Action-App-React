import React from 'react';

import './ReziActionAppWrapper.css';
import { AppMessaging } from './AppMessaging';
import Spinner from './Components/Spinner';
import ErrorBoundary from './Components/ErrorBoundary';
import ReziActionApp from './Components/ReziActionApp';
import { ContainerSetup } from './DataContracts/BaseModules';


interface IProps {
}

interface IState {
  WidgetId: number | null;
  ContainerId: string | null;
  Token: string;
  RefreshToken: string;
  ApiUrl: string;
  Context: any;
  Loading: boolean;
  ShowSetup: boolean;
}

class ReziActionAppWrapper extends React.Component<IProps, IState> {
  AppName: string = "REACTACTIONAPP";
  AppTitle: string = "React Action App";
  SupportEmail: string = "you@yourdomain.com";
  SupportTel: string = "07007 007007";
  SupportUrl: string = "https://www.yourdomain.com";
  HasSetup: boolean = true;
  ContractedHeight: number = 2;
  ExpandedHeight: number = 2;
  Level: string = "";


  constructor(props: IProps) {
    super(props);

    this.state = {
      WidgetId: 0,
      ContainerId: "",
      Token: "",
      RefreshToken: "",
      ApiUrl: "",
      Context: {},
      Loading: true,
      ShowSetup: true
    }

    this.navBackHandler = this.navBackHandler.bind(this)

  }

  navBackHandler() {
    this.setState({ShowSetup: false});
}


  componentDidMount() {
    const self: ReziActionAppWrapper = this;

    console.log("The Rezi App ReziActionAppWrapper did mount!");
    const urlParams = new URLSearchParams(window.location.search);
    let widgetId: number = 0;

    const param_widgetId: string | null = urlParams.get("widgetId");
    if (param_widgetId) widgetId = parseInt(param_widgetId);
    const param_containerId: string = urlParams.get("containerId") || "";

    this.setState({ WidgetId: widgetId, ContainerId: param_containerId });

    if (param_containerId || widgetId) {
      const containerSetup: ContainerSetup = new ContainerSetup(
        widgetId,
        param_containerId,
        this.ContractedHeight,
        this.ExpandedHeight,
        this.HasSetup,
        this.SupportEmail,
        this.SupportTel,
        this.SupportUrl

      );
      AppMessaging(containerSetup, self.startApp, self.expanded, self.contracted, self.externalCommand, this.showSettings);

    }

  }

  startApp = (token: string, refresh: string, apiUrl: string, context: any) => {
    console.log("App Was started By IFrame Container");
    this.setState({ ...this.state, Token: token, RefreshToken: refresh, ApiUrl: apiUrl, Context: context, Loading: false, ShowSetup: false });
  }

  //occurs when the widget changes height larger size
  expanded = (height: number) => {

  }

  //occurs when the widget changes hight to its smaller size
  contracted = (height: number) => {

  }

  //the default button for the app dialog, will fire this command,
  //allowing you to act on it, doing work such as save or refer...
  externalCommand = (command: any) => {

  }

  //the cog icon in the widget will fire this command
  //allowing you to create per instance widget settings
  showSettings = (command: any) => {
    const state: IState = this.state;
    state.ShowSetup = true;
    this.setState({ ...this.state, ShowSetup: true });
  }


  render() {
    return (
      <div className="App">
        <Spinner name={this.AppTitle} loading={this.state.Loading}></Spinner>
        {this.state && this.state.Loading === false &&
          <ErrorBoundary AppTitle={this.AppTitle} Tel={this.SupportTel} Email={this.SupportEmail} >

            <ReziActionApp Token={this.state.Token} WidgetId={this.state.WidgetId} ContainerId={this.state.ContainerId} Context={this.state.Context} Loading={this.state.Loading} ApiUrl={this.state.ApiUrl} RefreshToken={this.state.RefreshToken} AppTitle={this.AppTitle} Tel={this.SupportTel} Email={this.SupportEmail} Url={this.SupportUrl} HasSetup={this.HasSetup} ShowSetup={this.state.ShowSetup} navBackHandler={this.navBackHandler}></ReziActionApp>

          </ErrorBoundary>
        }
      </div>
    );
  }
}

export default ReziActionAppWrapper;
