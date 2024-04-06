/**
 * @see https://umijs.org/docs/max/access#access
 * */
// 管理员的权限
const adminList = [1,9]
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && adminList.includes(currentUser.userRole),
  };
}
