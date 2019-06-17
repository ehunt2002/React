import * as React from "react";
import styles from "./SiteUsageApp.module.scss";
import { ISiteUsageAppProps } from "./ISiteUsageAppProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { UsageData, IUsageData } from "../components/UsageData";

export default class SiteUsageApp extends React.Component<
  ISiteUsageAppProps,
  {}
> {
  public render(): React.ReactElement<ISiteUsageAppProps> {
    return (
      <div>
        {" "}
        <h3>Site Usage</h3>
        <div className={styles.leftbox}>
          <UsageData AssignedQuota={10000} UsedQuota={3000} />
        </div>
        <div className={styles.rightbox}>
          <UsageData AssignedQuota={10000} UsedQuota={3000} />
        </div>
      </div>
    );
  }
}
