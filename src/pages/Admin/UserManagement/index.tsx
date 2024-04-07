import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Dropdown, Image, Space, Tag} from 'antd';
import {useRef} from 'react';
import request from 'umi-request';
import {queryUser} from "@/services/ant-design-pro/api";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
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

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    copyable: true,
    ellipsis: true,
    tooltip: '用户名过长会自动收缩',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl}/>
      </div>
    ),
  },

  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: {text: '未知'},
      1: {text: '男',},
      2: {text: '女',},
      9: {text: '武装直升机',},
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '用户积分',
    dataIndex: 'score',
    copyable: true,
  },
  {
    title: '用户邀请码',
    dataIndex: 'specialCode',
    copyable: true,
  },
  {
    title: '用户权限',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {text: '普通用户', status: 'success'},
      1: {
        text: '管理员',
        status: 'Processing',
      },
      9: {
        text: '超级管理员',
        status: 'error',
      },
    },
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: {text: '正常', status: 'success'},
      // 1: {text: '封号',},

    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
  },


  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          {key: 'copy', name: '复制'},
          {key: 'delete', name: '删除'},
        ]}
      />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        // await waitTime(2000);
        const userList = await queryUser();
        return {
          data: userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: {fixed: 'right', disable: true},
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
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined/>}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,

      ]}
    />
  );
};
