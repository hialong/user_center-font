// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
    return request<API.CurrentUser>('/user/currentUser', {
        method: 'GET',
        ...(options || {}),
    });
}
/** 查询用户 GET /api/currentUser */
export async function queryUser(options?: { [key: string]: any }) {
    return request<API.CurrentUser>('/user/query', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 分页查询用户 GET /api/queryUserByPage */
export async function queryUserByPage(body:API.CommonUserByPage,options?: { [key: string]: any }) {
    return request<API.CommonUserByPage>('/user/queryByPage', {
        method: 'Post',
        ...(options || {}),
        data:{
           ...body.user
        },
        params:{
            pageSize: body.pageSize,
            pageNum: body.pageNum
        }
    });
}

/** 更新用户信息 POST /api/user/updateUser */
export async function updateUser(body:API.CurrentUser,options?: { [key: string]: any }){
    return request<Boolean>('/user/updateUser', {
        method:'Post',
        ...(options || {}),
        data:{
            ...body
        }
    });
}

/** 删除用户信息 POST /api/user/deleteUser */
export async function deleteUser(id:number,options?: { [key: string]: any }){
    return request<Boolean>('/user/deleteUser', {
        method:'Post',
        ...(options || {}),
        params:{
            id
        }
    });
}
/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/user/logout', {
        method: 'POST',
        ...(options || {}),
    });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
    return request<API.RegisterResult>('/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
    return request<API.NoticeIconList>('/api/notices', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
    params: {
        // query
        /** 当前的页码 */
        current?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request<API.RuleList>('/api/rule', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
    return request<API.RuleListItem>('/api/rule', {
        method: 'POST',
        data: {
            method: 'update',
            ...(options || {}),
        }
    });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
    return request<API.RuleListItem>('/api/rule', {
        method: 'POST',
        data: {
            method: 'post',
            ...(options || {}),
        }
    });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/rule', {
        method: 'POST',
        data: {
            method: 'delete',
            ...(options || {}),
        }
    });
}
