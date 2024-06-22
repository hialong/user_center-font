declare namespace API {
  type BaseResponseBoolean = {
    message?: string;
    data?: boolean;
    description?: string;
    code?: number;
  };

  type BaseResponseInteger = {
    message?: string;
    data?: number;
    description?: string;
    code?: number;
  };

  type BaseResponseInterfaceInfo = {
    message?: string;
    data?: InterfaceInfo;
    description?: string;
    code?: number;
  };

  type BaseResponseListInterfaceInfoVo = {
    message?: string;
    data?: InterfaceInfoVo[];
    description?: string;
    code?: number;
  };

  type BaseResponseListUser = {
    message?: string;
    data?: User[];
    description?: string;
    code?: number;
  };

  type BaseResponseLong = {
    message?: string;
    data?: number;
    description?: string;
    code?: number;
  };

  type BaseResponseObject = {
    message?: string;
    data?: Record<string, any>;
    description?: string;
    code?: number;
  };

  type BaseResponsePageInfoUser = {
    message?: string;
    data?: PageInfoUser;
    description?: string;
    code?: number;
  };

  type BaseResponsePageInterfaceInfo = {
    message?: string;
    data?: PageInterfaceInfo;
    description?: string;
    code?: number;
  };

  type BaseResponsePageUserInterfaceInfo = {
    message?: string;
    data?: PageUserInterfaceInfo;
    description?: string;
    code?: number;
  };

  type BaseResponseUser = {
    message?: string;
    data?: User;
    description?: string;
    code?: number;
  };

  type BaseResponseUserInterfaceInfo = {
    message?: string;
    data?: UserInterfaceInfo;
    description?: string;
    code?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type deleteUserParams = {
    id: number;
  };

  type getInterfaceInfoByIdParams = {
    id: number;
  };

  type getUserInterfaceInfoByIdParams = {
    id: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceInfo = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParams?: string;
    status?: number;
    operationType?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    flag?: number;
  };

  type InterfaceInfoAddRequest = {
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParams?: string;
    operationType?: string;
  };

  type InterfaceInfoQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParams?: string;
    status?: number;
    operationType?: string;
    userId?: number;
  };

  type InterfaceInfoUpdateRequest = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParams?: string;
    status?: number;
    operationType?: string;
  };

  type InterfaceInfoVo = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestParams?: string;
    status?: number;
    operationType?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    flag?: number;
    totalNum?: number;
  };

  type InvokeRequest = {
    id?: number;
    userRequestParams?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageInfoUser = {
    total?: number;
    list?: User[];
    pageNum?: number;
    pageSize?: number;
    size?: number;
    startRow?: number;
    endRow?: number;
    pages?: number;
    prePage?: number;
    nextPage?: number;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    navigatePages?: number;
    navigatepageNums?: number[];
    navigateFirstPage?: number;
    navigateLastPage?: number;
  };

  type PageInterfaceInfo = {
    records?: InterfaceInfo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageInterfaceInfo;
    searchCount?: PageInterfaceInfo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserInterfaceInfo = {
    records?: UserInterfaceInfo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserInterfaceInfo;
    searchCount?: PageUserInterfaceInfo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type queryUserByPageParams = {
    pageNum: number;
    pageSize: number;
  };

  type queryUserParams = {
    userName: string;
  };

  type User = {
    id?: number;
    userName?: string;
    userAccount?: string;
    avatarUrl?: string;
    gender?: number;
    userPassword?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
    updateTime?: string;
    createTime?: string;
    flag?: number;
    specialCode?: string;
    score?: number;
    accessKey?: string;
    seceretKey?: string;
    extend_3?: string;
  };

  type UserInterfaceInfo = {
    id?: number;
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    flag?: number;
  };

  type UserInterfaceInfoAddRequest = {
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
  };

  type UserInterfaceInfoQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
  };

  type UserInterfaceInfoUpdateRequest = {
    id?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    specialCode?: string;
  };
}
