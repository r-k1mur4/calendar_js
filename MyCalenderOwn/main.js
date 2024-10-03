"use strict";

console.clear();

{
  // 今月分の日付を取得

  let year = 2024;
  let month = 9; //10月

  // Func:今月の日付を配列で取得
  function getCalenderBody() {
    // 日付配列の初期化
    const dates = [];
    // 月末の取得
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      // オブジェクトとして管理する　-> 今日や薄文字の判定にかけられる
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    console.log(dates);

  }




  getCalenderBody();
}
