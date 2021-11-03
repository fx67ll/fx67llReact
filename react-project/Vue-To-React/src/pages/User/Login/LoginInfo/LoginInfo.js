import style from "./LoginInfo.less";
import { forwardRef, useImperativeHandle, useContext } from "react";
import { loginContext } from "../Login";

const data = {
  username: "子组件登录名",
  password: "子组件登录密码654323321",
};

function LoginInfo(props, ref) {
  const { loginDetailInfo, setLoginDetailInfo } = useContext(loginContext);

  useImperativeHandle(ref, () => ({
    getLoginInfo: () => {
      return data;
    },
  }));

  function updateLoginDetailInfo() {
    const targetObject = Object.assign({}, loginDetailInfo, {
      loginText: "这里成功修改了`LoginDetail`组件中的值！！！",
    });
    setLoginDetailInfo(targetObject);
  }

  return (
    <div className={style.LoginInfo}>
      <div>用户名：{props.username}</div>
      <div>密码：{props.password}</div>
      <div>登录详细信息：{loginDetailInfo.loginText}</div>
      <button onClick={updateLoginDetailInfo}>点我修改兄弟的值</button>
    </div>
  );
}

const LoginInfoFR = forwardRef(LoginInfo);

export default LoginInfoFR;
