// 这里是模拟一个异步请求
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: amount,
        }),
      2000
    )
  );
}
