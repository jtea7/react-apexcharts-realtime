import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const testData: [number, number | null][] = [
  [1, null],
  [2, null],
  [3, null],
  [4, null],
  [5, null],
  [6, null],
  [7, null],
  [8, null],
  [9, null],
  [0, null],
  [11, null],
  [12, null],
  [13, null],
  [14, null],
  [15, null],
  [16, null],
  [17, null],
  [18, null],
  [19, null],
  [20, null],
];

export default function LineChart() {
  const [series, setSeries] = useState([
    {
      data: testData,
      //series1.monthDataSeries1.prices,
      // data: [
      //   110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110, 110,
      //   110, 110, 110, 50, 30, 0,
      // ],
    },
  ]);
  const [options] = useState<ApexOptions>({
    chart: {
      id: 'realtime',
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
        easing: 'linear',
        dynamicAnimation: {
          speed: 500,
        },
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 1,
    },

    title: {
      text: 'Fundamental Analysis of Stocks',
      align: 'left',
    },
    //labels: series1.monthDataSeries1.dates,
    xaxis: {
      type: 'numeric',
      tickAmount: 10,
      labels: {
        formatter: (val) => Number(val).toFixed(0) + '초전',
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (val) => val.toFixed(0),
      },
      title: { text: 'Value' },
      // opposite: true,
    },
    legend: {
      horizontalAlign: 'left',
    },
  });

  useEffect(() => {
    const int = setInterval(() => {
      try {
        const dt = [...series[0].data];
        dt.shift();

        const v = Math.random() * (30 - 10) + 10;
        dt.push([20, v]);
        dt.forEach((x, i) => (x[0] = i + 1));
        console.log(dt);
        const newSeries = { ...series[0], data: dt };
        setSeries([newSeries]);
      } catch (e) {
        console.log(e);
      }
    }, 1000);
    return () => {
      clearInterval(int);
    };
  }, [series, setSeries]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
}
