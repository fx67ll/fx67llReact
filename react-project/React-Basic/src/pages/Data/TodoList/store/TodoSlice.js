import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./TodoAPI";

// 定义初始值
const initialState = {
  value: 0,
  states: "complete",
};

// 创建一个异步的action，延迟2秒再添加
// createAsyncThunk接受三个参数：字符串操作type值、payloadCreator回调和options对象
// createAsyncThunk返回一个标准的 Redux thunk 动作创建者。形实转换动作创建者函数将具有用于普通动作创作者pending，fulfilled以及rejected附加为嵌套字段的情况
export const incrementAsync = createAsyncThunk(
  // type 将用于生成额外 Redux 操作类型常量的字符串，表示异步请求的生命周期，pending/fulfilled/rejected
  "counter/fetchCount",
  // payloadCreator 一个回调函数，它应该返回一个包含一些异步逻辑结果的承诺。它也可以同步返回一个值。如果有错误，它应该返回一个被拒绝的承诺
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
  // option 官方示例中没有
);

// 创建切片
export const todoSlice = createSlice({
  // 切片名称
  name: "todo",
  // 切片初始值
  initialState,
  // 减速器枚举
  reducers: {
    // 数字加1的减速器
    increment: (state) => {
      state.value += 1;
    },
    // 数字减1的减速器
    decrement: (state) => {
      state.value -= 1;
    },
    // 通过action中传递的数字参数决定加多少
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // https://redux-toolkit.js.org/api/createslice
  // 用于额外定义的减速器，比如异步请求
  // builder参数是ActionReducerMapBuilder实例
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "complete";
        state.value += action.payload;
      });
  },
});

// 导出切片减速器中定义的actions
// 由于指定的 case reducer 中的参数 extraReducers 旨在引用“外部”操作，因此它们不会在slice.actions
export const { increment, decrement, incrementByAmount } = todoSlice.actions;

// export const selectCount = (state) => state.counter.value;
// 测试了一下箭头函数的老写法，注意state后面的属性是上面减速器的name
export const selectCount = function (state) {
  return state.todo.value;
};

// 逻辑操作，如果是奇数添加（odd奇数，even偶数）
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };
export const incrementIfOdd = function (amount) {
  return function (dispatch, getState) {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    } 
    else {
      console.error("只有数字框是奇数才可以添加输入框的数字！");
    }
  };
};

export default todoSlice.reducer;
