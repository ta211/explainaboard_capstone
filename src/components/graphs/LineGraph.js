import ReactECharts from "echarts-for-react";

export default function LineGraph({
    xAxisData,
    xAxisName,
    yAxisData,
    yAxisName,
    width = "1000px",
}) {
    const option = {
        tooltip: {
            trigger: 'axis',
        },
        xAxis:{
            data: xAxisData,
            name: xAxisName,
            nameLocation: 'middle',
            nameTextStyle: {
                color: "black",
                fontSize: "14px",
                padding: [20, 0, 0, 0],
            },
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
            name: yAxisName,
            nameLocation: 'middle',
            nameTextStyle: {
                color: "black",
                fontSize: "14px",
                padding: [0, 0, 20, 0],
            },
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
            name: yAxisName,
            symbol: 'circle',
            symbolSize: 12,
            data: yAxisData,
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