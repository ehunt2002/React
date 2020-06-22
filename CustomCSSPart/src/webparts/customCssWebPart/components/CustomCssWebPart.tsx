import * as React from 'react';
import styles from './CustomCssWebPart.module.scss';
import { ICustomCssWebPartProps } from './ICustomCssWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';


export default class CustomCssWebPart extends React.Component<ICustomCssWebPartProps, {}> {

  public render(): React.ReactElement<ICustomCssWebPartProps> {

    return (
      <div>

      </div>
    );
  }
}
