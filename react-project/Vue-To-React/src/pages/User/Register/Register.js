import style from "./Register.less";
import { useHistory, useLocation } from "react-router-dom";

function Register() {
  let history = useHistory();
  let dataId = "register123";
  
  function goHome() {
    history.push("/");
  }

  // 通过state的方式，向登录页传递新的用户名和密码
  function goLogin() {
    history.push({
      pathname: "/login",
      state: {
        newUsername: "wensandaoshi",
        newPassword: "654321",
      },
    });
  }

  function goBack() {
    history.go(-1);
  }
  function goList() {
    history.push("/list/" + dataId);
  }

  // 刷新完之后query参数会消失
  console.log(JSON.stringify(useLocation().query));

  return (
    <div className={style.Register}>
      <button onClick={goHome}>点我回家</button>
      <button onClick={goLogin}>点我去登录页</button>
      <button onClick={goList}>点我去列表页</button>
      <button onClick={goBack}>返回</button>
      注册页
    </div>
  );
}

export default Register;
