import * as React from "react";
import { Pie } from "react-chartjs-2";

export interface IUsageData {
  AssignedQuota: number;
  UsedQuota: number;
}

const PieChart = props => {
  const data = {
    labels: ["Assigned Quota", "Used Quota"],
    datasets: [
      {
        data: [props.assigned, props.used],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };
  console.log(props);
  return <Pie data={data} />;
};

export class UsageData extends React.Component<IUsageData, {}> {
  public render(): React.ReactElement<IUsageData> {
    return (
      <div>
        <PieChart
          assigned={this.props.AssignedQuota}
          used={this.props.UsedQuota}
        />
      </div>
    );
  }
}
