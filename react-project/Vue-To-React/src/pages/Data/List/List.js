import style from "./List.less";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function List() {
  // 如何从路由中解析简单的字符串参数
  // hook中，用useHistory传递params参数，用useLocation接受parmas参数
  let { id: dataId } = useParams();
  console.log(dataId, typeof dataId);

  // 做一个数字加减的案例
  const [count, setCount] = useState(0);
  function addCount() {
    setCount(count + 1);
  }
  function reduceCount() {
    setCount(count - 1);
  }

  // 无法实时修改的input输入值的案例
  let inputTextWrong = "默认值这样写是无法实时修改的";
  function testTextWrong(e) {
    console.log(e.target.value);
    inputTextWrong = e.target.value;
  }

  // 实时修改input输入值的案例，类似vue的双向绑定
  const [inputText, setInputText] = useState("默认值这样写是可以实时修改的");
  let testText = (e) => {
    setInputText(e.target.value);
  };

  // 测试一下副作用钩子，清除方法是return一个清除方法
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      console.log("正在监测鼠标坐标！");
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    document.addEventListener("click", updateMousePosition);
    // 如果不清除的没调用一次会添加一次监听回调，2的n次方bug
    return () => {
      document.removeEventListener("click", updateMousePosition);
    };
  });

  return (
    <div className={style.List}>
      列表页，当前有{count}页
      <br />
      <Link to="/">
        首页
        <br />
      </Link>
      <Link to="/login">
        登录页
        <br />
      </Link>
      <Link to="/register">
        注册页
        <br />
      </Link>
      <button onClick={addCount}>点我加一</button>
      <button onClick={reduceCount}>点我减一</button>
      <div className={style.bigText}>{inputTextWrong}</div>
      <input value={inputTextWrong} onInput={testTextWrong} />
      <div className={style.normalText}>{inputText}</div>
      <input value={inputText} onInput={testText} />
      <p>
        鼠标当前在屏幕上的位置是 ———— X：{position.x},Y：{position.y}
      </p>
    </div>
  );
}

export default List;
