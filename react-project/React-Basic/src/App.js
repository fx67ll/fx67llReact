import logo from "./logo.svg";
import "./App.css";
import { useHistory } from "react-router-dom";

function App(props) {
  let dataId = "home000";

  const styleTest = {
    fontSize: 100,
    color: "#91ffff",
  };

  const htmlArr = [
    <span key="0" onClick={goLogin}>
      Hello{" "}
    </span>,
    <span key="1" onClick={goResiter}>
      World{" "}
    </span>,
    <span key="2" onClick={goList}>
      !{" "}
    </span>,
  ];

  let history = useHistory();

  function goLogin() {
    history.push("/login");
  }

  function goResiter() {
    history.push("/register");
  }

  function goList() {
    history.push("/list/" + dataId);
  }

  function goTodoList(){
    history.push("/TodoList");
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span style={styleTest} onClick={goTodoList}>Hello World!</span>{" "}
        {new Date().toLocaleTimeString()}
        {htmlArr}
      </header>
    </div>
  );
}

export default App;
