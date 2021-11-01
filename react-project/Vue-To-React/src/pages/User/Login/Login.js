import style from "./Login.less";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  let dataId = "login321";
  function goHome() {
    history.push("/");
  }
  function goRegister() {
    history.push({
      pathname: "/register",
      query: {
        username: "fx67ll",
        password: "123456",
      },
    });
  }
  function goBack() {
    history.go(-1);
  }
  function goList() {
    history.push("/list/" + dataId);
  }
  return (
    <div className={style.Login}>
      <button onClick={goHome}>点我回家</button>
      <button onClick={goRegister}>点我去注册页</button>
      <button onClick={goList}>点我去列表页</button>
      <button onClick={goBack}>返回</button>
      登录页
    </div>
  );
}

export default Login;
