const maxApi = require("max-api");

let currentRule = 30;
let currentRow = [0, 0, 0, 1, 0, 0, 0, 0];

maxApi.post("Script started succesfully");

maxApi.addHandler("changeRule", (key) => {
  currentRule = key;
  maxApi.post(`changed current rule to ${key}`);
});

maxApi.addHandler("seedData", (data) => {
  for (let i = 0; i < data.length; i++) {
    maxApi.post(data[i]);
  }
  currentRow = data;
  maxApi.post(`changed current row to ${data}`);
});

maxApi.addHandler("computeRow", () => {
  compute_new_row(currentRow);
  maxApi.outlet(currentRow);
});

function compute_new_row(row) {
  let a1 = 0;
  let a2 = 0;
  let a3 = 0;
  let a_full;
  let new_index = [];
  let binary_list = int_to_binary(currentRule);

  for (let i = 0; i < row.length; i++) {
    if (row[i - 1] === undefined) {
      a1 = 0;
    } else {
      if (row[i - 1]) {
        a1 = 1;
      } else {
        a1 = 0;
      }
    }

    if (row[i]) {
      a2 = 1;
    } else {
      a2 = 0;
    }

    if (row[i + 1] === undefined) {
      a3 = 0;
    } else {
      if (row[i + 1]) {
        a3 = 1;
      } else {
        a3 = 0;
      }
    }

    a_full = a1.toString() + a2.toString() + a3.toString();
    //creates groups of 3 (i-1, i, i+1) so that tests determining the future state can be run

    switch (a_full) {
      case "111":
        new_index[i] = binary_list[0];
        break;
      case "110":
        new_index[i] = binary_list[1];
        break;
      case "101":
        new_index[i] = binary_list[2];
        break;
      case "100":
        new_index[i] = binary_list[3];
        break;
      case "011":
        new_index[i] = binary_list[4];
        break;
      case "010":
        new_index[i] = binary_list[5];
        break;
      case "001":
        new_index[i] = binary_list[6];
        break;
      case "000":
        new_index[i] = binary_list[7];
        break;
      default:
        maxApi.post("error computing binary index");
      //runs test determining future and places it in new array
    }
  }

  currentRow = new_index;
}

function int_to_binary(inputted_int) {
  let new_binary_list = [];
  while (inputted_int > 0) {
    new_binary_list.push(inputted_int % 2);
    //add remainder of inputted_int to first position of binary_list
    inputted_int = Math.floor(inputted_int / 2);
    //divide inputted_int into 2 for next test
  }
  new_binary_list = new_binary_list.reverse();
  //reverse and show original list

  var addendum = 7 - new_binary_list.length;
  for (let i = 0; i <= addendum; i++) {
    new_binary_list.unshift(0);
  }
  return new_binary_list;
  //add remaining 0's onto original binary_list
}
