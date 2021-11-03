import style from "./LoginDetail.less";
import { useContext } from "react";
import { loginContext } from "../Login";

function LoginDetail() {
  const { loginDetailInfo, setLoginDetailInfo } = useContext(loginContext);
  function setInput(e) {
    const targetobject = Object.assign({}, loginDetailInfo, {
      loginText: e.target.value,
    });
    setLoginDetailInfo(targetobject);
  }
  return (
    <div className={style.LoginDetail}>
      <div>登录详细信息</div>
      <div>登录ID：{loginDetailInfo.loginId}</div>
      <div>登录时间：{loginDetailInfo.loginTime}</div>
      <input type="text" value={loginDetailInfo.loginText} onInput={setInput} />
    </div>
  );
}
export default LoginDetail;
