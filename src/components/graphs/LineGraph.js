import ReactECharts from 'echarts-for-react';

let accs = [0.4729,0.4729,0.5271,0.6245,0.6751,0.6715,0.6498,0.7004,0.6859,0.6209,0.722,0.5271,0.6173,0.6679,0.722,0.7112,0.6895,0.6823,0.6426,0.5993];
let acc_percentages = []
for (let i=0; i < accs.length; i++) {
  acc_percentages.push(accs[i] * 100)
}
let batch_sizes = [8,32,64,8,16,128,8,16,32,128,64,16,128,32,64,8,16,32,64,128];
let learning_rates = [3.00E-04,3.00E-04,3.00E-04,1.00E-04,1.00E-04,1.00E-04,5.00E-05,5.00E-05,5.00E-05,3.00E-04,5.00E-05,3.00E-04,5.00E-05,1.00E-04,1.00E-04,3.00E-05,3.00E-05,3.00E-05,3.00E-05,3.00E-05]
let names = ["frosty-sweep-6","deft-sweep-8","pretty-sweep-9","eternal-sweep-16","eager-sweep-17","amber-sweep-20","prime-sweep-26","blooming-sweep-27","snowy-sweep-28","jolly-sweep-29","firm-sweep-29","golden-sweep-30","lunar-sweep-30","glamorous-sweep-31","avid-sweep-32","generous-sweep-36","decent-sweep-37","cerulean-sweep-38","light-sweep-39","wobbly-sweep-40"]
let names_no_num = [];
for (let i=0; i < names.length; i++) {
  let name = names[i];
  names_no_num.push(name.split("-")[0]);
}

// Accuracy vs names Summary
let acc_v_names_options = {
  title:{
    left: 'center',
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis:{
    data: names_no_num,
    name: 'Systems',
    axisLabel: {
      rotate: 90,
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
    name: 'Accuracy (%)',
    min: function (value) {
      return Math.round(value.min - 20);
    },
    max: function (value) {
      return Math.round(Math.min(value.max + 20, 100));
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
    id: 'acc',
    name: 'accuracy',
    showSymbol: false,
    data: acc_percentages,
    lineStyle: {
      color: 'rgba(235,107,35,0.8)',
    }
  }],
};

// Accuracy vs Batch Sizes
let sorted_batches = [8, 16, 32, 64, 128];
let avg_acc_percentages = [0, 0, 0, 0, 0];
for (let i=0; i<acc_percentages.length; i++) {
  avg_acc_percentages[Math.log2(batch_sizes[i])-3] += acc_percentages[i];
}
for (let i=0; i<5; i++) {
  avg_acc_percentages[i] /= 4;
}
let acc_v_batchsize_options = {
  title:{
    left: 'center',
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis:{
    data: sorted_batches,
    name: 'Batch Size',
    nameGap: 0,
    nameTextStyle: {
      align: 'right',
      verticalAlign: 'top',
      padding: [30, 0, 0, 0],
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
    name: 'Accuracy (%)',
    min: function (value) {
      return Math.round(value.min - 20);
    },
    max: function (value) {
      return Math.round(Math.min(value.max + 20, 100));
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
    id: 'acc',
    name: 'accuracy',
    showSymbol: false,
    data: avg_acc_percentages,
    lineStyle: {
      color: 'rgba(235,107,35,0.8)',
    }
  }],
};

// Accuracy vs Learning Rates
let sorted_lrs = [3E-5, 5E-5, 1E-4, 3E-4];
let avg_by_lr_acc_percentages = [0, 0, 0, 0];
for (let i=0; i<acc_percentages.length; i++) {
  avg_by_lr_acc_percentages[sorted_lrs.indexOf(learning_rates[i])] += acc_percentages[i];
}
for (let i=0; i<4; i++) {
  avg_by_lr_acc_percentages[i] /= 5;
}
let acc_v_lr_options = {
  title:{
    left: 'center',
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis:{
    data: sorted_lrs,
    name: 'Learning Rates',
    nameGap: 0,
    nameTextStyle: {
      align: 'right',
      verticalAlign: 'top',
      padding: [30, 0, 0, 0],
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
    name: 'Accuracy (%)',
    min: function (value) {
      return Math.round(value.min - 20);
    },
    max: function (value) {
      return Math.round(Math.min(value.max + 20, 100));
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
    id: 'acc',
    name: 'accuracy',
    showSymbol: false,
    data: avg_by_lr_acc_percentages,
    lineStyle: {
      color: 'rgba(235,107,35,0.8)',
    }
  }],
};

export default function LineGraph(props) {
    return (
    <>
        <ReactECharts option={acc_v_names_options} style={{ width: '1000px', margin: '0 auto' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactECharts option={acc_v_batchsize_options} style={{ width: '400px' }} />
            <ReactECharts option={acc_v_lr_options} style={{ width: '400px' }} />
        </div>
    </>
    )
}