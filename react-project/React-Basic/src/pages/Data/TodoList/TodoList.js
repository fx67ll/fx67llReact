import style from "./TodoList.less";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./store/TodoSlice";

function TodoList() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
  const incrementValue = Number(incrementAmount) || 0;
  const history = useHistory();

  function goHome() {
    history.go(-1);
  }
  return (
    <div className={style.TodoList}>
      <div className={style.TodoTitle} onClick={goHome}>
        TodoList
      </div>
      {/* 官方示例的演示部分 */}
      <div className={style.TodoOfficialContent}>
        {/* 加减按钮和显示的数字 */}
        <div className={style.row}>
          {/* 用于屏幕阅读器(Screen Reader)，帮助残障人士更好的阅读网页 */}
          <button
            className={style.button}
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <span className={style.value}>{count}</span>
          <button
            className={style.button}
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>
        <div className={style.row}>
          <input
            type="text"
            className={style.textbox}
            aria-label="Set increment amount"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
          <button
            className={style.button}
            aria-label="Increment value By Amount"
            onClick={() => dispatch(incrementByAmount(incrementValue))}
          >
            Add From Input
          </button>
          <button
            className={style.asyncButton}
            aria-label="Increment value Async"
            onClick={() => dispatch(incrementAsync(incrementValue))}
          >
            Add Async
          </button>
          <button
            className={style.button}
            aria-label="Increment value If Odd"
            onClick={() => dispatch(incrementIfOdd(incrementValue))}
          >
            Add If Odd
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
