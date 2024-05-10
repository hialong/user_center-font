import React, { useState } from 'react';
import { Card } from 'antd';
import { useLocation } from 'react-router-dom';
const EmbedWidget = () => {
  const htmlFilePath = '/note/1-项目/用户中心项目/项目部署（阿里云）.html';
  const location = useLocation();
  // 打印当前页面地址
  console.log('Current Path:', location.pathname);
  return (
    <Card title="个人博客，偶尔更新，默认折叠，可以搜索">
      <iframe
        title="个人博客，偶尔更新"
        src={htmlFilePath}
        sandbox="allow-scripts allow-same-origin"
        width="100%"
        height="1000"
      />
    </Card>
  );
};

export default EmbedWidget;
