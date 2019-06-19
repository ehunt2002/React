import * as React from "react";
import styles from "./SiteUsageApp.module.scss";
import { ISiteUsageAppProps } from "./ISiteUsageAppProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { UsageData, IUsageData } from "../components/UsageData";
import { LibUsageQuota, ILibUsageData } from "../components/LibUsageQuota";
import { ConvertBytestToGB } from "../loc/CustomUtil";

const SampleTable = props => {
  return (
    <table className={styles.customers}>
      <tr>
        <th>Library Name</th>
        <th>Size</th>
        <th>Quota</th>
      </tr>
      <tr>
        <td>Shared Documents</td>
        <td>
          <progress value="44" max="100" />
        </td>
        <td>10000</td>
      </tr>
      <tr>
        <td>Company Documents</td>
        <td>
          <progress value="33" max="100" />
        </td>
        <td>10000</td>
      </tr>
      <tr>
        <td>Organized Documents</td>
        <td>
          <progress value="88" max="100" />
        </td>
        <td>10000</td>
      </tr>
      <tr>
        <td>Not Organized Documents</td>
        <td>
          <progress value="11" max="100" />
        </td>
        <td>10000</td>
      </tr>
    </table>
  );
};

export default class SiteUsageApp extends React.Component<
  ISiteUsageAppProps,
  {}
> {
  public render(): React.ReactElement<ISiteUsageAppProps> {
    return (
      <div>
        <h3>Total Site Quota: {ConvertBytestToGB("10737418240")}</h3>
        <div className={styles.mainGrid} dir="ltr">
          <div className={styles.mainGridrow}>
            <div className={styles.mainGridcol2}>
              <UsageData
                AssignedQuota={10737418240}
                UsedQuota={478645670}
                AssignedLabelText={ConvertBytestToGB("10737418240")}
                UsedLabelText={ConvertBytestToGB("478645670")}
              />
            </div>
            <div className={styles.mainGridcol2}>
              <LibUsageQuota AssignedQuota={10000} UsedQuota={3000} />
            </div>
          </div>
          <div className={styles.mainGridrow}>
            <div className={styles.mainGridTable}>
              <SampleTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
