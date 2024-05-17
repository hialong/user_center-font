import CreateModal from '@/components/Common/CreateModal';
import {
  addInterfaceInfo,
  deleteInterfaceInfo,
  listInterfaceInfoByPage,
  offlineInterfaceInfo,
  onlineInterfaceInfo,
  updateInterfaceInfo,
} from '@/services/BOSC管理中心/interfaceInfoController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useRef, useState } from 'react';

/**
 *  offline node
 * @zh-CN 下线
 *
 * @param record
 */
const handleOffline = async (record: API.IdRequest) => {
  const hide = message.loading('下线中');
  if (!record) return true;
  try {
    await offlineInterfaceInfo({
      id: record.id,
    });
    hide();
    message.success('下线接口成功');
    return true;
  } catch (error) {
    hide();
    message.error('offline failed, please try again');
    return false;
  }
};

/**
 *  online node
 * @zh-CN 上线
 *
 * @param record
 */
const handleOnline = async (record: API.IdRequest) => {
  const hide = message.loading('上线中');
  if (!record) return true;
  try {
    await onlineInterfaceInfo({
      id: record.id,
    });
    hide();
    message.success('上线接口成功');
    return true;
  } catch (error) {
    hide();
    message.error('online failed, please try again');
    return false;
  }
};

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<API.InterfaceInfo>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '名称',
    dataIndex: 'name',
    copyable: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '接口名称不能为空',
        },
        {
          max: 50,
          message: '接口名称不能超过50个字符',
        },
      ],
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
    copyable: true,
    tooltip: '过长会自动收缩',
    formItemProps: {
      rules: [{ max: 100, message: '接口描述不能超过100个字符' }],
    },
  },
  {
    title: '请求地址',
    dataIndex: 'url',
    copyable: true,
    tooltip: '过长会自动收缩',
    formItemProps: {
      rules: [{ required: true, message: '请求地址不能为空' }],
    },
  },
  {
    title: '请求头',
    dataIndex: 'requestHeader',
    valueType: 'jsonCode',
  },
  {
    title: '请求参数',
    dataIndex: 'requestParams',
    valueType: 'jsonCode',
  },
  {
    title: '响应头',
    dataIndex: 'responseHeader',
    valueType: 'jsonCode',
  },
  {
    title: '方法',
    dataIndex: 'operationType',
    valueType: 'select',
    valueEnum: {
      GET: { text: 'GET' },
      POST: { text: 'POST' },
      PUT: { text: 'PUT' },
      DELETE: { text: 'DELETE' },
    },
    formItemProps: {
      rules: [{ required: true, message: '请求方法不能为空' }],
    },
  },
  {
    title: '操作人id',
    dataIndex: 'userId',
    copyable: true,
    hideInForm: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    hideInForm: true,
    editable: false,
    valueEnum: {
      1: { text: '开启', status: 'success' },
      0: { text: '关闭', status: 'error' },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    editable: false,
    hideInForm: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'date',
    editable: false,
    hideInForm: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          console.log(action);
          action?.startEditable?.(record.id ?? '');
        }}
      >
        编辑
      </a>,
      record.status === 0 ? (
        <Button
          type="text"
          danger
          key="online"
          onClick={() => {
            handleOnline(record);
            action?.reload(true);
          }}
        >
          上线
        </Button>
      ) : null,
      record.status === 1 ? (
        <Button
          type="text"
          key="offline"
          onClick={() => {
            handleOffline(record);
            action?.reload(true);
          }}
        >
          下线
        </Button>
      ) : null,
      // <TableDropdown
      //     key="actionGroup"
      //     onSelect={() => action?.reload()}
      //     menus={[
      //         // {key: 'delete', name: '删除'},
      //     ]}
      // />,
    ],
  },
];

export default () => {
  // useRef实际上是一个hook。创建一个可变的引用对象，你可以在组件的整个生命周期内访问它，并且每次访问到的都是同一个可变对象。
  const actionRef = useRef<ActionType>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfo({
        ...fields,
      });
      hide();
      message.success('Added successfully');
      actionRef.current?.reload();
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败，' + error.message);
      return false;
    }
  };
  return (
    <PageContainer>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(params, sort, filter);
          // await waitTime(2000);
          const pageInfo = await listInterfaceInfoByPage({
            ...params,
          });

          console.log(pageInfo);
          return {
            data: pageInfo.records,
            total: pageInfo.total,
          };
        }}
        editable={{
          type: 'multiple',
          onSave: async (rowKey, data, row) => {
            const updatedFlag = updateInterfaceInfo(data);
            console.log(updatedFlag);
          },
          onDelete: async (key, currentRow) => {
            await deleteInterfaceInfo({ id: key as number });
            console.log(key, currentRow);
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="interface_info表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              handleModalOpen(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateModal
        colums={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values) => {
          handleAdd(values);
        }}
        visible={createModalOpen}
      />
    </PageContainer>
  );
};
