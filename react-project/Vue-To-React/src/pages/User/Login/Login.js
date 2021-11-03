import style from "./Login.less";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useRef, createContext } from "react";
import LoginInfo from "./LoginInfo/LoginInfo";
import LoginDetail from "./LoginDetail/LoginDetail";

// 兄弟组件通信
export const loginContext = createContext({});
export const { Provider } = loginContext;

function Login() {
  let history = useHistory();

  const [username, setUsername] = useState("默认用户名");
  const [password, setPassword] = useState("123456");

  // 兄弟组件共享数据
  const [loginDetailInfo, setLoginDetailInfo] = useState({
    loginId: "001",
    loginTime: "2021-11-03 12:43:21",
    loginText: "登录日志一",
  });

  // 父组件调用子组件值
  const logininfoRef = useRef(null);
  const getLoginInfo = () => {
    const data = logininfoRef.current.getLoginInfo();
    console.log(JSON.stringify(data));
  };

  function goHome() {
    history.push("/");
  }

  // 通过query的方式，向注册页传递用户名和密码
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

  // 测试路由地址参数传递
  let dataId = "login321";
  function goList() {
    history.push("/list/" + dataId);
  }

  // 刷新完之后参数保存且传输过程加密
  console.log("state打印参数传递" + JSON.stringify(useLocation().state));

  function setUserText(e) {
    setUsername(e.target.value);
  }

  function setPassText(e) {
    setPassword(e.target.value);
  }

  return (
    <div className={style.Login}>
      <button onClick={goHome}>点我回家</button>
      <button onClick={goRegister}>点我去注册页</button>
      <button onClick={goList}>点我去列表页</button>
      <button onClick={goBack}>返回</button>
      登录页
      {/* 属性传值开始 */}
      <div>
        用户名：
        <input type="text" value={username} onInput={setUserText} />
      </div>
      <div>
        密码：
        <input type="text" value={password} onInput={setPassText} />
      </div>
      <Provider value={{ loginDetailInfo, setLoginDetailInfo }}>
        <LoginInfo ref={logininfoRef} username={username} password={password} />
        <LoginDetail />
      </Provider>
      <div>
        <button onClick={getLoginInfo}>获取子组件登录信息</button>
      </div>
      {/* 属性传值结束 */}
    </div>
  );
}

export default Login;
