import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "../pages/Data/TodoList/store/TodoSlice";

// toolkit中configureStore直接简化Redux的开发流程
// 它结合todosReducer并filtersReducer进入了 root reducer 函数，它将处理一个看起来像的 root 状态{todos, filters}
// 它使用 root reducer 创建了一个 Redux 存储
// 它自动添加了thunk中间件
// 它会自动添加更多中间件来检查常见错误，例如意外改变状态
// 它会自动设置 Redux DevTools Extension 连接
// 后续有空看看老的配置方式
export const store = configureStore({
  reducer: {
    todo: TodoSlice,
  },
});
