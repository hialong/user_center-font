import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';
import {GITHUB_LINK} from "@/constant";

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        // 暂时没啥好加的链接
        // {
        //   key: 'Ant Design Pro',
        //   title: 'Ant Design Pro',
        //   href: 'https://pro.ant.design',
        //   blankTarget: true,
        // },
        {
          key: 'github',
          title: <><GithubOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/> hailong github</>,
          href: GITHUB_LINK,
          blankTarget: true,
        },
        // {
        //   key: 'Ant Design',
        //   title: 'Ant Design',
        //   href: 'https://ant.design',
        //   blankTarget: true,
        // },
      ]}
    />
  );
};

export default Footer;
