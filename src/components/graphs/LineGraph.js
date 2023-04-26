import ReactECharts from "echarts-for-react";

export default function LineGraph({
    xAxis_data,
    xAxis_name,
    yAxis_data,
    yAxis_name,
    width = "1000px",
}) {
    const option = {
        title:{
            left: 'center',
            text: ''
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis:{
            data: xAxis_data,
            name: xAxis_name,
            axisLabel: {
                // rotate: 90,
            },
            axisLine: {
                show: true,
            },
            axisTick: {
                show: true,
                alignWithLabel: true,
            }
        },
        yAxis:{
            name: yAxis_name,
            min: function (value) {
                return Math.round(Math.max(value.min - 10, 0));
            },
            max: function (value) {
                return Math.round(Math.min(value.max + 10, 100));
            },
            axisLine: {
                show: true,
            }
        },
        grid: {
            // tooltip: {
            //   formatter: '{c}',
            // }
        },
        series:[{
            type: 'line',
            // id: 'acc',
            name: yAxis_name,
            showSymbol: false,
            data: yAxis_data,
            lineStyle: {
                // color: 'rgba(235,107,35,0.8)',
            }
        }],
    };

    return (
        <ReactECharts 
            option={option} 
            style={{width: {width}, margin: '0 auto'}} 
        />
    )
}