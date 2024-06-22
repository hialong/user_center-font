import { topInterfaceInvokeSum } from '@/services/BOSC管理中心/analysisController';
import { PageContainer } from '@ant-design/pro-components';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    topInterfaceInvokeSum().then((res) => {
      console.log('总结', res);
      setData(res);
      setLoading(false);
    });
  }, []);

  //数据处理
  const charData = data.map((item) => {
    return {
      name: item.name,
      value: item.totalNum,
    };
  });

  const option = {
    title: {
      text: '接口分析界面',
      subtext: '前三top',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: charData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return (
    <PageContainer>
      <ReactECharts option={option} showLoading={loading} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
