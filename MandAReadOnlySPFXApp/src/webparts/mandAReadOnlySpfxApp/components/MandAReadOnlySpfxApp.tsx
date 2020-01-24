/* All the required imports are placed here */
import * as React from "react";
import styles from "./MandAReadOnlySpfxApp.module.scss";
import { IMandAReadOnlySpfxAppProps } from "./IMandAReadOnlySpfxAppProps";
import { IAppState } from "./IMandAReadOnlySpfxAppProps";
import {
  getOwners,
  applyProjectPolicy,
  ifPolicyApplied,
  checkIfLoaded
} from "../../mandAReadOnlySpfxApp/loc/customJsCode/DataProcessor";

import { AadHttpClient, HttpClient, HttpClientResponse } from "@microsoft/sp-http";

require("sp-init");
require("microsoft-ajax");
require("sp-runtime");
require("sharepoint");
require("sp-policy");

/* Base Component for this webpart */
export default class MandAReadOnlySpfxApp extends React.Component<
  IMandAReadOnlySpfxAppProps,
  IAppState
  > {
  /*Constructor of the component where we are setting the state variables for this component */
  public constructor(props: IMandAReadOnlySpfxAppProps, state: IAppState) {
    super(props);
    this.state = {
      btntext: "Loading..",
      tokenloaded: false,
      isadmin: false,
      loading: ""
    };
  }

  public updateBtnText = btntext => {
    this.setState({
      btntext: btntext
    });
  };

  public updateIsAdmin = isadmin => {
    this.setState({
      isadmin: isadmin
    });
  };

  /*The job is function is to check if policy has been applied or not (this will execute when this component will be loaded*/
  public async componentDidMount() {
    debugger;
    getOwners(this.props, this.updateIsAdmin);

    console.log("loading props " + this.props.context.pageContext.web.title);

    await ifPolicyApplied(this.props, this.updateBtnText);
    this.setState({ loading: "" });
  }

  /* Render markup of the component will be placed here */
  public render(): React.ReactElement<IMandAReadOnlySpfxAppProps> {
    return (
      <div className={styles.mandAReadOnlySpfxApp}>
        {this.state.isadmin == true && (
          <a
            href="#"
            className={styles.button}
            onClick={() => {
              applyProjectPolicy(this.state, this.props, this.updateBtnText);
              this.setState({ loading: "Please wait..." });
            }}
          >
            <span className={styles.label}>{this.state.btntext}</span>
          </a>
        )}
        {this.state.isadmin == true && (
          <iframe
            src={this.props.azurefunction}
            onLoad={() =>
              checkIfLoaded(this.props) && this.setState({ tokenloaded: true })
            }
            className={styles.hideIFrame}
          ></iframe>
        )}
        {this.state.isadmin == true && <div>{this.state.loading}</div>}


      </div>

    );
  }
}
