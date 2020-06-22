import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CustomCssWebPartWebPartStrings';
import CustomCssWebPart from './components/CustomCssWebPart';
import { ICustomCssWebPartProps } from './components/ICustomCssWebPartProps';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface ICustomCssWebPartWebPartProps {
  description: string;
  cssfile: string;
}

export default class CustomCssWebPartWebPart extends BaseClientSideWebPart<ICustomCssWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICustomCssWebPartProps> = React.createElement(
      CustomCssWebPart,
      {
        description: this.properties.description,
        cssfile: this.properties.cssfile
      }
    );
    if (this.properties.cssfile !== "") {
      SPComponentLoader.loadCss(this.properties.cssfile);
    }
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('cssfile', {
                  label: "cssfile"
                }),
              ]
            }
          ]
        }
      ]
    };
  }


}
