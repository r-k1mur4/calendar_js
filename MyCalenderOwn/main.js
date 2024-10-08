"use strict";

console.clear();

{
  // 今月分の日付を取得

  let year = 2024;
  let month = 9; //10月

  // Func:今月の日付を配列で取得
  // function getCalenderBody() {
  //   // 日付配列の初期化
  //   const dates = [];
  //   // 月末の取得
  //   const lastDate = new Date(year, month + 1, 0).getDate();
  //   for (let i = 1; i <= lastDate; i++) {
  //     // オブジェクトとして管理する　-> 今日や薄文字の判定にかけられる
  //     dates.push({
  //       date: i,
  //       isToday: false,
  //       isDisabled: true,
  //     });
  //   }
  //   console.log(dates);

  // }

  // 月末日を算出する関数
  function getLastDayOfMonth(year, month) {
    // 翌月の0日目 (つまり前月の末日) を指定
    const date = new Date(year, month + 1, 0);
    // 日付だけを返す
    return date.getDate();
  }

  function getCalenderHead() {
    let dates = [];
    // 前月末日
    const d = new Date(year, month, 0).getDate();
    // 前月分が何日分存在するか
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }
  function getCalenderBody() {
    let dates = [];
    // 月末を求める
    const lastDate = getLastDayOfMonth(year, month);

    for (let i = 1; i <= lastDate; i++) {
      // 先月か翌月か、今日か
      dates.push({
        date: i,
        isDisabled: false,
        isToday: false,
      });
    }
    return dates;
  }
  function getCalenderTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  // 全てのカレンダーを統合
  function createCalender() {
    const dates = [...getCalenderHead(), ...getCalenderBody(), ...getCalenderTail()];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
        document.querySelector('tbody').appendChild(tr);
      });
    });
  }

  createCalender();
}
