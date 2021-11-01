import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./router/router.js";
import reportWebVitals from "./reportWebVitals";

function renderDom() {
  // StrictMode 是一个用以标记出应用中潜在问题的工具
  // 就像Fragment，StrictMode不会渲染任何真实的UI
  // 它为其后代元素触发额外的检查和警告
  // 严格模式检查只在开发模式下运行，不会与生产模式冲突
  // 优点：https://www.jianshu.com/p/978bcea8fcb9
  ReactDOM.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
renderDom();
// setInterval(renderDom, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
