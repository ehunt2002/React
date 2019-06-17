import * as React from "react";
import Chart from "react-apexcharts";

export interface IUsageData {
  AssignedQuota: number;
  UsedQuota: number;
}

export class UsageData extends React.Component<IUsageData, {}> {
  public render(): React.ReactElement<IUsageData> {
    const options = {
      series: [this.props.AssignedQuota, this.props.UsedQuota],
      labels: ["Assigned Quota (GB)", "Quota Used (GB)"]
    };

    return (
      <Chart options={options} series={options.series} type="pie" width="380" />
    );
  }
}
