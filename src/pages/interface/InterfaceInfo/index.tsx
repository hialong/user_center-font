import { listInterfaceInfoByPage } from '@/services/BOSC管理中心/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

const InterfaceInfo: React.FC = () => {
  const [initLoading] = useState(true);
  const [loading] = useState(false);
  const [total, setTotal] = useState<number>();
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  /**
   * 获取数据list
   * @param record
   * @constructor
   */
  const loadData = async (current = 1, pageSize = 10) => {
    const hide = message.loading('请求中');
    try {
      const res = await listInterfaceInfoByPage({
        current,
        pageSize,
      });
      setList(res?.records ?? []);
      setTotal(res?.total ?? 0);
      hide();
      message.success('请求成功');
    } catch (error) {
      hide();
      message.error('reqeust failed, please try again');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title="在线接口开放平台">
      <List
        className="my-list"
        itemLayout="horizontal"
        loadMore={loading}
        dataSource={list}
        renderItem={(item) => {
          // 跳转地址
          const apiLink = `/interface/interface_detial/${item.id}`;
          return (
            <List.Item
              actions={[
                <a key={item.id} href={apiLink}>
                  详情
                </a>,
              ]}
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          );
        }}
        pagination={{
          showTotal: (total) => `共 ${total} 条`,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange(page: number | undefined, pageSize: number | undefined) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default InterfaceInfo;
