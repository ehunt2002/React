import * as React from "react";
import { Pie } from "react-chartjs-2";
import { toReadableBytes } from "../loc/CustomUtil";

export interface IUsageData {
  AssignedQuota: number;
  UsedQuota: number;
  AssignedLabelText: string;
  UsedLabelText: string;
}

const PieChart = props => {
  const data = {
    labels: [
      "Assigned Quota: " + props.assignedtext,
      "Used Quota: " + props.usedtext
    ],
    datasets: [
      {
        data: [props.assigned, props.used],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };
  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, dat) => {
          //converting the tooltip labels on the pie slice to show readable value of the disk spaces for each datapoint
          var readableBytes = "";
          var datasetindex = 0;
          console.log(dat.datasets[datasetindex].data[tooltipItem.index]);
          readableBytes = toReadableBytes(
            dat.datasets[datasetindex].data[tooltipItem.index]
          );

          return readableBytes;
        }
      }
    }
  };
  console.log(props);
  return <Pie data={data} options={options} />;
};

export class UsageData extends React.Component<IUsageData, {}> {
  public render(): React.ReactElement<IUsageData> {
    return (
      <div>
        <PieChart
          assigned={this.props.AssignedQuota}
          used={this.props.UsedQuota}
          assignedtext={this.props.AssignedLabelText}
          usedtext={this.props.UsedLabelText}
        />
      </div>
    );
  }
}
