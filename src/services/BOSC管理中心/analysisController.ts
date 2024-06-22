// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 此处后端没有提供注释 GET /analysis/top/interface/invokeSum */
export async function topInterfaceInvokeSum(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoVo>('/analysis/top/interface/invokeSum', {
    method: 'GET',
    ...(options || {}),
  });
}
