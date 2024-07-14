import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
    PointElement,
    LineElement,
    Filler
  } from 'chart.js';
  import { Bar, Doughnut, Pie, Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
  );
  interface BarChartProps{
      horizontal?: boolean;
      title_1:string;
      title_2:string;
      data_1:number[];
      data_2:number[];
      bgColor_1:string;
      bgColor_2:string;
      labels?:string[];
  
  }
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  
  // PIE CHART
  export const BarChart = ({
      horizontal = false,
      labels = months,
      title_1,
      title_2,
      bgColor_1,
      bgColor_2,
      data_1 = [],
      data_2 = [],
  }: BarChartProps) => {
      
  const options:ChartOptions<"bar"> = {
      responsive: true,
       indexAxis:horizontal ? "y" : "x",
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
        },
      },
      scales: {
          x: {
              beginAtZero: true,
              grid:{
                display: false,
              }
            },
          y: {
            beginAtZero: true,
            grid:{
              display: true,
            }
          },
        },
    };
    
  
    const data:ChartData<"bar",number[], string> = {
      labels,
      datasets: [
        {
          label: title_1,
          data: data_1,
          backgroundColor: bgColor_1,
          barThickness: "flex",
          barPercentage: 1,
          categoryPercentage: 0.4,
        },
        {
          label: title_2,
          data: data_2,
          backgroundColor: bgColor_2,
          barThickness: "flex",
          barPercentage: 1,
          categoryPercentage: 0.4,
        },
      ],
    };
    
      return <Bar width={horizontal ? "250%" : ""} options={options} data={data} />;
  }
  
  
  // DOUGHNUT CHART
  interface DoughnutChartProps {
    cutout?: number | string;
    data:number[];
    bgColor:string[];
    labels:string[];
    legends?: boolean;
    offset?: number[];
  }
  
  export const DoughnutChart = ({labels, data,bgColor,cutout,offset} : DoughnutChartProps) => {
    const doughnutData:ChartData<"doughnut", number[], string> = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: bgColor,
          borderWidth:0,
          offset,
        },
      ],
    };
  
    const doughnutOptions:ChartOptions<"doughnut"> = {
    responsive: true,
    plugins:{
      legend: {
        
        display: true,
        position: "bottom",
        labels:{
          padding:25,
        },
      },
    },
    cutout
    };
    return <Doughnut data={doughnutData} options={doughnutOptions}/>
  }
  
  
  // PIE CHART  
    interface PieChartProps {
      labels: string[];
      data:number[];
      bgColor:string[];
      offset?: number[];
    }
    
    export const PieChart = ({data,bgColor,offset,labels} : PieChartProps) => {
      const PieChartData:ChartData<"pie", number[], string> = {
        labels,
        datasets: [
          {
            data,
            backgroundColor: bgColor,
            borderWidth: 1,
            offset,
          },
        ],
      };
    
      const PieChartOptions:ChartOptions<"pie"> = {
      responsive: true,
      plugins:{
        legend: {
          position: "bottom",
          display: true,
        },
      }
      };
    
      return <Pie data={PieChartData} options={PieChartOptions}/>;
  }
  
  interface LineChartProps {
    data: number[];
    label: string;
    backgroundColor: string;
    borderColor: string;
    labels?: string[];
  }
  
  export const LineChart = ({
    data,
    label,
    backgroundColor,
    borderColor,
    labels = months,
  }: LineChartProps) => {
    const options: ChartOptions<"line"> = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: true,
        },
      },
  
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
          },
        },
        x: {
          grid: {
            display: true,
          },
        },
      },
    };
  
    const lineChartData: ChartData<"line", number[], string> = {
      labels,
      datasets: [
        {
          fill: true,
          label,
          data,
          backgroundColor,
          borderColor,
        },
      ],
    };
  
    return <Line options={options} data={lineChartData} />;
  };
    