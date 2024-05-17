import {
  getInterfaceInfoById,
  invokeInterfaceInfo,
} from '@/services/BOSC管理中心/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Divider, Form, Input, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const InterfaceInfo: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeData, setInvokeData] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState<boolean>(false);
  const params: any = useParams();
  /**
   * 获取数据单个
   * @param record
   * @constructor
   */
  const loadData = async (id: number) => {
    if (!id) {
      message.error('接口id不能为空');
      return;
    }
    const hide = message.loading('请求中');
    try {
      const res = await getInterfaceInfoById({
        id,
      });
      setData(res);
      hide();
      message.success('请求成功');
    } catch (error) {
      hide();
      message.error('reqeust failed, please try again');
    }
  };

  useEffect(() => {
    loadData(Number(params.id));
  }, []);

  const onFinish = async (values: any) => {
    console.log(values);
    if (!params.id) {
      message.error('接口id不能为空');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfo({
        id: params.id,
        ...values,
      });
      setInvokeData(res);
      setInvokeLoading(false);
    } catch (error) {
      setInvokeLoading(false);
      message.error('reqeust failed, please try again');
    }
  };
  return (
    <PageContainer title="在线接口开放平台">
      <Card>
        <Descriptions title={data?.name} column={1} extra={<Button danger>调用</Button>}>
          <Descriptions.Item label="方法">{data?.operationType}</Descriptions.Item>
          <Descriptions.Item label="地址">{data?.url}</Descriptions.Item>
          <Descriptions.Item label="描述">{data?.description}</Descriptions.Item>
          <Descriptions.Item label="请求头">{data?.requestHeader}</Descriptions.Item>
          <Descriptions.Item label="响应头">{data?.responseHeader}</Descriptions.Item>
          <Descriptions.Item label="请求参数">{data?.requestParams}</Descriptions.Item>
          <Descriptions.Item label="状态">{data?.status === 0 ? '正常' : '关闭'}</Descriptions.Item>
          <Descriptions.Item label="创建者">{data?.userId}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {moment(data?.createTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {moment(data?.updateTime).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {/*todo 后续根据请求的不同仿照swagger进行样式修改*/}
      <Divider />
      <Card title={'调用接口'}>
        <Form
          name="invoke"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="vertical"
        >
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type={'primary'} htmlType={'submit'}>
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title={'返回结果'} loading={invokeLoading}>
        {invokeData}
      </Card>
    </PageContainer>
  );
};

export default InterfaceInfo;
