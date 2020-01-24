import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "MandAReadOnlySpfxAppWebPartStrings";
import MandAReadOnlySpfxApp from "./components/MandAReadOnlySpfxApp";
import { IMandAReadOnlySpfxAppProps } from "./components/IMandAReadOnlySpfxAppProps";

export interface IMandAReadOnlySpfxAppWebPartProps {
  ownersgroup: string;
  policylist: string;
  azurefunction: string;
  azurefunctionname: string;
  policyname: string;
  azurefunctionid: string;
}

export default class MandAReadOnlySpfxAppWebPart extends BaseClientSideWebPart<
  IMandAReadOnlySpfxAppWebPartProps
  > {
  public render(): void {
    const element: React.ReactElement<IMandAReadOnlySpfxAppProps> = React.createElement(
      MandAReadOnlySpfxApp,
      {
        context: this.context,
        ownersgroup: this.properties.ownersgroup,
        azurefunction: this.properties.azurefunction,
        policylist: this.properties.policylist,
        azurefunctionname: this.properties.azurefunctionname,
        policyname: this.properties.policyname,
        azurefunctionid: this.properties.azurefunctionid
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Read Only WebPart Properties"
          },
          groups: [
            {
              groupName: "WebPart Configuration",
              groupFields: [
                PropertyPaneTextField("ownersgroup", {
                  label: "Owner Group Name"
                }),
                PropertyPaneTextField("policylist", {
                  label: "SharePoint Site Policy List Name"
                }),
                PropertyPaneTextField("azurefunction", {
                  label: "Azure Function Url"
                }),
                PropertyPaneTextField("azurefunctionname", {
                  label: "Azure Function Name"
                }),
                PropertyPaneTextField("policyname", {
                  label: "Policy Name"
                }),
                PropertyPaneTextField("azurefunctionid", {
                  label: "Azure Function AppID"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
