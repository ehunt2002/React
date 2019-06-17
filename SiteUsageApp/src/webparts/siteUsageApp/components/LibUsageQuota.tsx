import * as React from "react";
import Chart from "react-apexcharts";

export interface ILibUsageData {
  AssignedQuota: number;
  UsedQuota: number;
}

export class LibUsageQuota extends React.Component<ILibUsageData, {}> {
  public render(): React.ReactElement<ILibUsageData> {
    const options = {
      series: [this.props.AssignedQuota, this.props.UsedQuota],
      labels: ["Assigned Quota", "Quota Used"]
    };

    return (
      <Chart options={options} series={options.series} type="pie" width="380" />
    );
  }
}
