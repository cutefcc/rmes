import { useImmer } from '@mmfcc/hooks';
import { memo, useEffect, useState } from 'react';
import * as echarts from 'echarts';

function Home() {
  useEffect(() => {
    let chartDom = document.getElementById('main1');
    let myChart = echarts.init(chartDom);
    let option;

    option = {
      //   title: {
      //     text: '气站得分图',
      //   },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['XX气站1得分', 'XX气站2得分', 'XX气站3得分', 'XX气站4得分', 'XX气站5得分'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'XX气站1得分',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'XX气站2得分',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'XX气站3得分',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'XX气站4得分',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'XX气站5得分',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    option && myChart.setOption(option);
    // 2

    var chartDom2 = document.getElementById('main2');
    var myChart2 = echarts.init(chartDom2);
    var option2;

    option2 = {
      xAxis: {
        type: 'category',
        data: ['气站1', '气站2', '气站3', '气站4', '气站5', '气站6', '气站7'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };

    option2 && myChart2.setOption(option2);
    // 3
    var chartDom3 = document.getElementById('main3');
    var myChart3 = echarts.init(chartDom3);
    var option3;

    option3 = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          //   name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: '油站1' },
            { value: 735, name: '油站2' },
            { value: 580, name: '油站3' },
            { value: 484, name: '油站4' },
            { value: 300, name: '油站5' },
          ],
        },
      ],
    };

    option3 && myChart3.setOption(option3);
  }, []);
  return (
    <>
      <div id="main1" style={{ width: '400px', height: '400px', display: 'inline-block' }}></div>
      <div id="main2" style={{ width: '400px', height: '400px', display: 'inline-block' }}></div>
      <div id="main3" style={{ width: '400px', height: '400px', display: 'inline-block' }}></div>
    </>
  );
}
export default memo(Home);
