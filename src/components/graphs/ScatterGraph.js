import ReactECharts from "echarts-for-react";

function shouldRotateLabel(labels) {
    let total = 0;
    let max = 0;
    for (let i = 0; i < labels.length; i++) {
        const currLen = labels[i].length;
        total += currLen
        if (currLen > max) {
            max = currLen;
        }
    }
    if (total > 30) return true;
    if (max > 30/labels.length) return true;
    return false;
}

export default function ScatterGraph({
    xAxisData, // list of x-axis data in each categories (e.g. category = system)
    xAxisName, // just a name
    yAxisData, // list of y-axis data in each categories
    yAxisName, // just a name
    categories, // list of category names
    selectedCategories,
    width = "1000px",
}) {
    const xIsLabels = typeof xAxisData[0] === "object";

    function getSeriesData(categoryName, categoryID) {
        const thisXAxisData = xAxisData[categoryID];
        const thisYAxisData = yAxisData[categoryID];
        let data;
        if (xIsLabels) {
            data = thisXAxisData.map((xVal, seriesID) => [xVal, thisYAxisData[seriesID]]);
        } else {
            data = [[thisXAxisData, thisYAxisData]];
        }
        console.log(data);
        return {
            name: categoryName,
            symbolSize: 12,
            data: data,
            type: 'scatter',
        }
    }

    let legendSelected = {};
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        legendSelected[cat] = selectedCategories.indexOf(cat) != -1;
    }

    const option = {
        tooltip: {
            trigger: 'item',
        },
        xAxis: {
            name: xIsLabels && shouldRotateLabel(xAxisData) ? "" : xAxisName,
            nameLocation: 'middle',
            nameTextStyle: {
                color: "black",
                fontSize: "14px",
                padding: [20, 0, 0, 0],
            },
            ...xIsLabels && {data: xAxisData[0]},
            ...xIsLabels && shouldRotateLabel(xAxisData) && {
                axisLabel: {
                    interval: 0,
                    margin: 20,
                    width: 150,
                    rotate: 30,
                    overflow: 'break',
                }
            }
        },
        yAxis: {
            name: yAxisName,
            nameLocation: 'middle',
            nameTextStyle: {
                color: "black",
                fontSize: "14px",
                padding: [0, 0, 20, 0],
            },
            splitLine: false,
            axisTick: false,
            min: function (value) {
                return Math.round(Math.max(value.min - 10, 0));
            },
            max: function (value) {
                return Math.round(Math.min(value.max + 10, 100));
            },
        },
        legend: {
            top: 0,
            selected: legendSelected,
            icon: 'path://m 8 0 h 12 a 1 1 0 0 1 0 10 h -12 a 1 1 0 0 1 0 -10',
        },
        ...xIsLabels && shouldRotateLabel(xAxisData) && {grid: {
            left: "100px",
            bottom:"100px",
        }},
        series: categories.map(getSeriesData),
    };

    console.log(option);
    return (
        <ReactECharts 
            option={option} 
            style={{width: {width}, margin: '0 auto'}} 
        />
    )
}