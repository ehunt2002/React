export function addNumber(number) {
  return {
    type: "ADD",
    payload: number
  };
}

export function subtractNumber(number) {
  return {
    type: "SUBTRACT",
    payload: number
  };
}

export function grabJsonFeed() {
  return dispatch => {
    fetch("https://jsonplaceholder.typicode.com/todos/2")
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(function(error) {
        console.log("Caught the exception: ", error);
      });
  };
}
