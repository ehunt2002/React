export const toReadableBytes = bytes => {
  if (bytes == 0) {
    return "0";
  }
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  var sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  return parseInt((bytes / Math.pow(1024, i)).toFixed(2)) * 1 + " " + sizes[i];
};
