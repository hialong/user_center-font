// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /user/currentUser */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseUser>('/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/deleteUser */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/user/deleteUser', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/login */
export async function userLogin(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUser>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/logout */
export async function userLogOut(options?: { [key: string]: any }) {
  return request<API.BaseResponseInteger>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/query */
export async function queryUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUserParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUser>('/user/query', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/queryByPage */
export async function queryUserByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryUserByPageParams,
  body: API.User,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInfoUser>('/user/queryByPage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/updateUser */
export async function updateUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
