import * as React from "react";
import { HorizontalBar } from "react-chartjs-2";

export interface ILibUsageData {
  AssignedQuota: number;
  UsedQuota: number;
}

const BarChart = props => {
  const data = {
    labels: ["Videos", "Documents"],
    datasets: [
      {
        label: "Shared Documents",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [props.assigned, props.used, 20, 800, 900]
      }
    ]
  };

  console.log(props);
  return <HorizontalBar data={data} />;
};

export class LibUsageQuota extends React.Component<ILibUsageData, {}> {
  public render(): React.ReactElement<ILibUsageData> {
    return (
      <div>
        <BarChart
          assigned={this.props.AssignedQuota}
          used={this.props.UsedQuota}
        />
      </div>
    );
  }
}
