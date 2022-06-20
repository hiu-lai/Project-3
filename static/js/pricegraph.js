d3.json("/avocado/prices/", function (rawData) {
  console.log(rawData);
  
  var arr = rawData;

  // var cleaned_data = JSON.parse(JSON.stringify(rawData).replace(" ", ""));
  // console.log(cleaned_data);

  // Iterate over array
  arr.forEach(function(e, i) {
    // Iterate over the keys of object
    Object.keys(e).forEach(function(key) {
      
      // Copy the value
      var val = e[key],
        newKey = key.replace(/\s+/g, '_');
      
      // Remove key-value from object
      delete arr[i][key];

      // Add value with new key
      arr[i][newKey] = val;
    });
  });

  console.log(arr);

  const parsingData = (arr) => {
    const result = {};

    arr.forEach(
      ({State, Average_Avocado_Price_Year, Total_Units}) => {
        if (result[State]) {
          result[State].push({
            x: Average_Avocado_Price_Year,
            y: Total_Units / 1000,
          });
        } else {
          result[State] = [
            {
              x: Average_Avocado_Price_Year,
              y: Total_Units / 1000,
            },
          ];
        }
      }
    );

    return result;
  };

  DataOfArr = parsingData(arr);

  console.log(DataOfArr);

  console.log(Object.keys(DataOfArr));

  console.log(DataOfArr[`${Object.keys(DataOfArr)[0]}`]);

  console.log(DataOfArr[`${Object.keys(DataOfArr)[1]}`]);

  console.log(DataOfArr[`${Object.keys(DataOfArr)[2]}`]);

  const data = {
    //labels: Year,
    datasets: [
      {
        label: `${Object.keys(DataOfArr)[0]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[0]}`],
        backgroundColor: "rgba(190, 224, 24, 0.8)",
      },
      {
        label: `${Object.keys(DataOfArr)[1]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[1]}`],
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[2]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[2]}`],
        backgroundColor: "rgba(255, 169, 20, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[3]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[3]}`],
        backgroundColor: "rgba(157, 34, 53, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[4]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[4]}`],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[5]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[5]}`],
        backgroundColor: "rgba(154, 262, 235, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[6]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[6]}`],
        backgroundColor: "rgba(201, 203, 207, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[7]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[7]}`],
        backgroundColor: "rgba(163, 212, 224, 0.5)",
      }, 
      {
        label: `${Object.keys(DataOfArr)[8]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[8]}`],
        backgroundColor: "rgba(170, 212, 125, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[9]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[9]}`],
        backgroundColor: "rgba(6, 214, 140, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[10]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[10]}`],
        backgroundColor: "rgba(133, 251, 251, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[11]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[11]}`],
        backgroundColor: "rgba(183, 33, 78, 0.5)",
      },
      {
        label: `${Object.keys(DataOfArr)[12]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[12]}`],
        backgroundColor: "rgba(222, 147, 236, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[13]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[13]}`],
        backgroundColor: "rgba(245, 167, 125, 0.5))",
      }, {
        label: `${Object.keys(DataOfArr)[14]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[14]}`],
        backgroundColor: "rgba(48, 198, 5, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[15]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[15]}`],
        backgroundColor: "rgba(108, 45, 25, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[16]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[16]}`],
        backgroundColor: "rgba(171, 58, 161, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[17]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[17]}`],
        backgroundColor: "rgba(74, 8, 118, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[18]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[18]}`],
        backgroundColor: "rgba(219, 74, 169, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[19]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[19]}`],
        backgroundColor: "rgba(196, 175, 149, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[20]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[20]}`],
        backgroundColor: "rgba(240, 138, 104, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[21]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[21]}`],
        backgroundColor: "rgba(155, 34, 114, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[22]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[22]}`],
        backgroundColor: "rgba(192, 175, 50, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[23]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[23]}`],
        backgroundColor: "rgba(233, 141, 13, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[24]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[24]}`],
        backgroundColor: "rgba(214, 3, 182, 0.5)",
      }, {
        label: `${Object.keys(DataOfArr)[25]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[25]}`],
        backgroundColor: "rgba(148, 4, 222, 0.5)",
      },{
        label: `${Object.keys(DataOfArr)[26]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[26]}`],
        backgroundColor: "rgba(53, 215, 132, 0.5)",
      },{
        label: `${Object.keys(DataOfArr)[27]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[27]}`],
        backgroundColor: "rgba(213, 202, 22, 0.5)",
      },{
        label: `${Object.keys(DataOfArr)[28]}`,
        data: DataOfArr[`${Object.keys(DataOfArr)[28]}`],
        backgroundColor: "rgba(223, 245, 139, 0.5)",
      },
    ],
  };

  // config
  const config = {
    type: "scatter",
    data,
    options: {
      plugins: {
        legend: {
          position: 'bottom'
          }
      },
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: {
            display: true,
            text: "Average Price Per Year ($USD)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Total Units ('000)",
          },
        },
      },
    },
  };

  // render init block
  const myChart = new Chart(document.getElementById("scatterChart"), config);
});
