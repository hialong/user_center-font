import React, { useState } from 'react';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';
const EmbedWidget = () => {
  const htmlFilePath = './src/pages/note/1-项目/用户中心项目/项目部署（阿里云）.html';
  const location = useLocation();
  // 打印当前页面地址
  console.log('Current Path:', location.pathname);
  return (
    <Card title="Embedded HTML Widget">
      <iframe
        title="Embedded Page"
        src={htmlFilePath}
        sandbox="allow-scripts allow-same-origin"
        width="100%"
        height="1000"
      />
    </Card>
  );
};

export default EmbedWidget;
