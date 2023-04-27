import ReactECharts from "echarts-for-react";

export default function ScatterGraph({
    xAxisData, // list of x-axis data in each categories
    xAxisName, // just a name
    yAxisData, // list of x-axis data in each categories
    yAxisName, // just a name
    categories, // list of category names
    selectedCategories,
    width = "1000px",
}) {
    function getSeriesData(categoryName, seriesID) {
        const thisXAxisData = xAxisData[seriesID];
        const thisYAxisData = yAxisData[seriesID];
        let data;
        if (thisXAxisData.type == 'Object') {
            data = thisXAxisData.map((xVal, id) => [xVal, thisYAxisData[id]]);
        } else {
            data = [[thisXAxisData, thisYAxisData]];
        }
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
            trigger: 'axis',
        },
        xAxis: {
            name: xAxisName,
        },
        yAxis: {
            name: yAxisName,
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
        series: categories.map(getSeriesData),
    };

    console.log(option, selectedCategories);

    return (
        <ReactECharts 
            option={option} 
            style={{width: {width}, margin: '0 auto'}} 
        />
    )
}