"use strict";

{
  const year = 2020;
  const month = 4; // 5月

  // 先月分の配列をつくる関数
  function getCalenderHead() {
    const dates = [];
    //
    const d = new Date(year, month, 0).getDate();
    // 先月分の日付が何個あるか
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    console.log(dates);
  }

  // 来月分の配列をつくる関数
  function getCalenderTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 0; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    console.log(dates);

  }

  // getCalenderHead();
  getCalenderTail();

  // function getCalenderBody() {
  //   const dates = []; // date: 日付, day: 曜日
  //   const lastDate = new Date(year, month + 1, 0).getDate();

  //   for (let i = 0; i < lastDate; i++) {
  //     // dates.push(i);
  //     dates.push({
  //       date: i,
  //       isToday: false,
  //       isDisabled: false,
  //     })
  //   }

  //   console.log(dates);
  // }

  // getCalenderBody();
}
