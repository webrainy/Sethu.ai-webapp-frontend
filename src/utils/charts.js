export const lineChartData = [
  {
    name: "Total Batches",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
  },
  {
    name: "Total Students",
    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
  },
];

export const lineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "light",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#545353",
        fontSize: "12px",
        fontFamily: "Myriad Pro",
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#545353",
        fontSize: "12px",
        fontFamily: "Myriad Pro",
        fontWeight: 300,
      },
    },
  },
  legend: {
    show: true,
    fontFamily: "Myriad Pro",
    fontWeight: 300,
  },
  grid: {
    strokeDashArray: 4,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#00a76f", "#ffab00", "#fb6584"],
  },
  colors: ["#00a76f", "#ffab00", "#fb6584"],
};
