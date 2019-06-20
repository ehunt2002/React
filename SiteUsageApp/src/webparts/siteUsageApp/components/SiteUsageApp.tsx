import * as React from "react";
import styles from "./SiteUsageApp.module.scss";
import { ISiteUsageAppProps } from "./ISiteUsageAppProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { UsageData, IUsageData } from "../components/UsageData";
import { LibUsageQuota, ILibUsageData } from "../components/LibUsageQuota";
import { toReadableBytes } from "../loc/CustomUtil";

export interface ISPLists {
  value: ISPList[];
}
export interface ISPList {
  Type: string;
  Name: string;
  TotalSize: number;
  LastModified: string;
  Details: {
    Name: string;
    DocumentSize: string;
    VideoSize: string;
    DocumentsCount: number;
    VideosCount: number;
  };
}
export interface ISiteUsageState {
  items: ISPList[];
  SiteUsageDetails: {
    AssignedQuota: number;
    UsedQuota: number;
  };
  LibraryUsageDetails: {
    Name: string;
    DocumentSize: number;
    VideoSize: number;
    DocumentsCount: number;
    VideosCount: number;
  };
}

const SampleTable = props => {
  () => {
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
        {this.state.items.map((item, key) => {
          return (
            <tr key={key}>
              <td>{item.Name}</td>
              <td>
                <div>{item.TotalSize}</div>
                <progress value="11" max="100" />
              </td>
            </tr>
          );
        })}
      </table>
    );
  };
};

export default class SiteUsageApp extends React.Component<
  ISiteUsageAppProps,
  ISiteUsageState
> {
  public constructor(props: ISiteUsageAppProps, state: ISiteUsageState) {
    super(props);
    this.clickedFunction = this.clickedFunction.bind(this);
    this.state = {
      items: [
        {
          Type: "",
          Name: "",
          TotalSize: 0,
          LastModified: "",
          Details: {
            Name: "",
            DocumentSize: "",
            VideoSize: "",
            DocumentsCount: 0,
            VideosCount: 0
          }
        }
      ],
      SiteUsageDetails: {
        AssignedQuota: 0,
        UsedQuota: 0
      },
      LibraryUsageDetails: {
        Name: "",
        DocumentSize: 0,
        VideoSize: 0,
        DocumentsCount: 0,
        VideosCount: 0
      }
    };
  }

  public componentDidMount() {
    var reactHandler = this;

    this.getSiteUsageData().then(response =>
      reactHandler.setState({
        SiteUsageDetails: {
          UsedQuota: response.d.Usage.Storage,
          AssignedQuota:
            response.d.Usage.Storage / response.d.Usage.StoragePercentageUsed
        }
      })
    );

    this.getSiteLibraryData().then(response =>
      reactHandler.setState({
        items: response,
        LibraryUsageDetails: {
          Name: response[0].Details.Name,
          DocumentSize: response[0].Details.DocumentSize,
          VideoSize: response[0].Details.VideoSize,
          DocumentsCount: response[0].Details.DocumentsCount,
          VideosCount: response[0].Details.VideosCount
        }
      })
    );

    /*
    reactHandler.setState({
      items: [
        {
          Type: "List",
          Name: "Announcements",
          TotalSize: 125829120,
          LastModified: "20 Jan, 2019",
          Details: {
            Name: "Announcements",
            DocumentSize: "691200",
            VideoSize: "357366",
            DocumentsCount: 330,
            VideosCount: 110
          }
        },
        {
          Type: "Library",
          Name: "SPFX",
          TotalSize: 1073741824,
          LastModified: "23 Feb, 2019",
          Details: {
            Name: "SPFX",
            DocumentSize: "691200",
            VideoSize: "357366",
            DocumentsCount: 530,
            VideosCount: 510
          }
        },
        {
          Type: "List",
          Name: "Announcements",
          TotalSize: 0,
          LastModified: "20 Jan, 2019",
          Details: {
            Name: "Announcements",
            DocumentSize: "0",
            VideoSize: "0",
            DocumentsCount: 330,
            VideosCount: 150
          }
        }
      ],
      SiteUsageDetails: {
        AssignedQuota: 10737418240,
        UsedQuota: 478645670
      },
      LibraryUsageDetails: {
        Name: "Announcements - Consumption",
        DocumentSize: 0,
        VideoSize: 0,
        DocumentsCount: 330,
        VideosCount: 110
      }
    });*/
  }
  public render(): React.ReactElement<ISiteUsageAppProps> {
    return (
      <div>
        <div className={styles.mainGrid} dir="ltr">
          <div className={styles.mainGridrow}>
            <div className={styles.mainGridcol2}>
              <h3>
                Total Site Quota:
                {toReadableBytes(this.state.SiteUsageDetails.AssignedQuota)}
              </h3>
              <UsageData
                AssignedQuota={this.state.SiteUsageDetails.AssignedQuota}
                UsedQuota={this.state.SiteUsageDetails.UsedQuota}
                AssignedLabelText={toReadableBytes(
                  this.state.SiteUsageDetails.AssignedQuota
                )}
                UsedLabelText={toReadableBytes(
                  this.state.SiteUsageDetails.UsedQuota
                )}
              />
            </div>
            <div className={styles.mainGridcol2}>
              <h3>Library Usage Details</h3>
              <LibUsageQuota
                NoOfDocuments={this.state.LibraryUsageDetails.DocumentsCount}
                NoOfVideos={this.state.LibraryUsageDetails.VideosCount}
                LibraryName={this.state.LibraryUsageDetails.Name}
                UsedQuotaVideos={this.state.LibraryUsageDetails.VideoSize}
                UsedQuotaVideosLabel={toReadableBytes(
                  this.state.LibraryUsageDetails.VideoSize
                )}
                UsedQuotaDocuments={this.state.LibraryUsageDetails.DocumentSize}
                UsedQuotaDocumentsLabel={toReadableBytes(
                  this.state.LibraryUsageDetails.DocumentSize
                )}
              />
            </div>
          </div>
          <div className={styles.mainGridrow}>
            <div className={styles.mainGridTable}>
              <h3>Quota Consumed - by Library</h3>
              {this.GetTable()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  GetTable() {
    return (
      <table className={styles.customers}>
        <tr>
          <th>Library Name</th>
          <th colSpan={2}>Space Used per Site Quota</th>
          <th>Site Quota</th>
        </tr>
        {this.state.items.map((item, key) => {
          return (
            <tr key={key} onClick={() => this.clickedFunction(item.Details)}>
              <td>{item.Name}</td>
              <td>
                <progress
                  value={item.TotalSize}
                  max={this.state.SiteUsageDetails.AssignedQuota}
                />
              </td>
              <td>
                <div className={styles.progressBar}>
                  {toReadableBytes(item.TotalSize)}
                </div>
              </td>
              <td>
                {toReadableBytes(this.state.SiteUsageDetails.AssignedQuota)}
              </td>
            </tr>
          );
        })}
      </table>
    );
  }

  public clickedFunction(val) {
    var reactHandler = this;
    reactHandler.setState({
      LibraryUsageDetails: {
        Name: val.Name + " - Consumption",
        DocumentSize: val.DocumentSize,
        VideoSize: val.VideoSize,
        DocumentsCount: val.DocumentsCount,
        VideosCount: val.VideosCount
      }
    });
  }

  async getSiteLibraryData() {
    var allLibraryDetails = new Array();
    var propUrl =
      this.props.siteurl +
      "/_api/Web/Lists?$select=Title,DocumentTemplateUrl&$filter=BaseTemplate%20eq%20101%20and%20hidden%20eq%20false";
    var propRequest = new Request(propUrl, {
      method: "GET",
      headers: {
        Accept: "application/json; odata=verbose"
      }
    });
    var listsData;
    var docPropPromise = function() {
      return new Promise((resolve, reject) => {
        fetch(propRequest)
          .then(function(resultData) {
            resultData.json().then(function(res) {
              listsData = res;
              resolve();
            });
          })
          .catch(function(err) {
            console.log(err);
            reject();
          });
      });
    };
    var testdata;
    var templateURLToReplace = "/Forms";
    await docPropPromise();
    var i = 0;

    for (i = 0; i < listsData.d.results.length; i++) {
      var listTitle = listsData.d.results[i].Title;

      if (listsData.d.results[i].DocumentTemplateUrl != null) {
        var serverRelativeURL = "/sites/DEV/";
        var libraryTempalteUrl = listsData.d.results[i].DocumentTemplateUrl;
        var index = libraryTempalteUrl.lastIndexOf("/");
        var templateName = libraryTempalteUrl.substring(
          index,
          libraryTempalteUrl.length
        );
        var tempvar = libraryTempalteUrl.replace(
          templateURLToReplace + templateName,
          ""
        );

        var libraryName = tempvar.replace(serverRelativeURL, "");

        var filesRequest = new Request(
          this.props.siteurl +
            "/_api/Web/GetFolderByServerRelativeUrl('" +
            serverRelativeURL +
            "/" +
            libraryName +
            "')?$expand=Folders,Files,Title",
          {
            method: "GET",
            headers: {
              Accept: "application/json; odata=verbose"
            }
          }
        );
        var listAllFiles;

        var filesRequestPromise = function() {
          return new Promise((resolve, reject) => {
            fetch(filesRequest)
              .then(function(resultData) {
                resultData.json().then(function(res) {
                  listAllFiles = res;
                  testdata = listAllFiles;
                  resolve();
                });
              })
              .catch(function(err) {
                console.log(err);
                reject();
              });
          });
        };
        await filesRequestPromise();
        var librarySize = 0;
        var documentSize = 0;
        var videoSize = 0;
        var documentsCount = 0;
        var videosCount = 0;
        if (listAllFiles.d.Files.results.length) {
          var j = 0;
          for (j = 0; j < listAllFiles.d.Files.results.length; j++) {
            librarySize += Number(listAllFiles.d.Files.results[j].Length);
            if (listAllFiles.d.Files.results[j].Name.endsWith("mp4")) {
              videoSize += Number(listAllFiles.d.Files.results[j].Length);
              videosCount++;
            } else {
              documentSize += Number(listAllFiles.d.Files.results[j].Length);
              documentsCount++;
            }
          }
        }
        var libraryDetails = {
          Name: listTitle,
          TotalSize: librarySize,
          Details: {
            Name: listTitle,
            DocumentSize: documentSize,
            VideoSize: videoSize,
            DocumentsCount: documentsCount,
            VideosCount: videosCount
          }
        };
        allLibraryDetails.push(libraryDetails);
      }
    }
    return allLibraryDetails;
  }

  async getSiteUsageData() {
    var siteData;
    var reactHandler = this;
    var siteUsageURL = this.props.siteurl + "/_api/site/usage";
    var siteUsageRequest = new Request(siteUsageURL, {
      method: "GET",
      headers: {
        Accept: "application/json; odata=verbose"
      }
    });

    var siteUsagePromise = function() {
      return new Promise((resolve, reject) => {
        fetch(siteUsageRequest)
          .then(function(resultData) {
            resultData.json().then(function(res) {
              siteData = res;
              resolve();
            });
          })
          .catch(function(err) {
            console.log(err);
            reject();
          });
      });
    };
    await siteUsagePromise();
    return siteData;
  }
}
