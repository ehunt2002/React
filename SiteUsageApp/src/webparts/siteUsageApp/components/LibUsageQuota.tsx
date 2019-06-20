import * as React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { toReadableBytes } from "../loc/CustomUtil";
import styles from "./SiteUsageApp.module.scss";

export interface ILibUsageData {
  LibraryName: string;
  UsedQuotaVideos: number;
  UsedQuotaDocuments: number;
  UsedQuotaVideosLabel: string;
  UsedQuotaDocumentsLabel: string;
  NoOfVideos: number;
  NoOfDocuments: number;
}

const BarChart = props => {
  const data = {
    labels: ["Videos", "Documents"],
    datasets: [
      {
        label: props.libraryname,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [props.videos, props.documents]
      }
    ]
  };

  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, dat) => {
          //converting the tooltip labels on the pie slice to show readable value of the disk spaces for each datapoint
          var readableBytes = "";
          if (tooltipItem.index == 0) {
            readableBytes = toReadableBytes(props.videos);
          } else if (tooltipItem.index == 1) {
            readableBytes = toReadableBytes(props.documents);
          }
          return readableBytes;
        }
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            callback: (label, index, labels) => {
              if (label == "0" || label < 0 || label < 1) return label;

              return toReadableBytes(label);
            }
          }
        }
      ]
    },
    legend: {
      onClick: newLegendClickHandler
    }
  };

  return <HorizontalBar data={data} options={options} />;
};

var newLegendClickHandler = (e, legendItem) => {
  var index = legendItem.datasetIndex;
  return false;
};

export class LibUsageQuota extends React.Component<ILibUsageData, {}> {
  public render(): React.ReactElement<ILibUsageData> {
    return (
      <div>
        <BarChart
          videos={this.props.UsedQuotaVideos}
          documents={this.props.UsedQuotaDocuments}
          videoslabel={this.props.UsedQuotaVideosLabel}
          documentslabel={this.props.UsedQuotaDocumentsLabel}
          libraryname={this.props.LibraryName}
        />
        <br />
        <div className={styles.barChartDesc}>
          No. of Videos: {this.props.NoOfVideos} <br />
          <br />
          No. of Documents: {this.props.NoOfDocuments}
        </div>
      </div>
    );
  }
}
