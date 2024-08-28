import ACCESS_ENUM from "@/constants/access/accessEnum";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser,
    canAdmin: currentUser && currentUser.userRole === ACCESS_ENUM.ADMIN,
  };
}
