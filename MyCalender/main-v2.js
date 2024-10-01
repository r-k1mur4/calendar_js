"use strict";

{
  let year = 2020;
  let month = 4; // 5月

  // 関数：先月分の日付を作成
  function getCalenderHead() {
    const dates = [];
    // 先月末日の日付を取得
    const d = new Date(year, month, 0).getDate();
    // 今月１日の曜日を取得
    const n = new Date(year, month, 1).getDay();

    // dから１ずつ引いて先月分の日付を出力
    for (let i = 0; i < n; i++) {
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,

      });
    }
    return dates;

  }


  // 関数：今月分の日付を作成
  function getCalenderBody() {
    const dates = [];　　// date: 日付, day: 曜日
    // 今月の末日を取得
    const lastDate = new Date(year, month + 1, 0).getDate();
    // ループでdatesにpushしていく
    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    return dates;

  }

// 関数：来月分の日付を作成
  function getCalenderTail() {
    const dates = [];
    // 末日を取得
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      })
    }
    return dates;

  }

  // すべての日付を統合する
  function createCalender() {
    const dates = [
      ...getCalenderHead(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];


    // 週ごとの配列を作成
    const weeks = [];
    const weeksCount = dates.length / 7;

    for(let i = 0; i < weeksCount; i++) {
      // 配列weeksにdatesの中身を７日分格納する
      weeks.push(dates.splice(0,7));
    }

    // weeksの各配列への処理
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      // 個々の配列に対して
      week.forEach(date => {
        const td = document.createElement('td');
        // 日付・isToday・isDisabledの指定
        td.textContent = date.date
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }
        tr.appendChild(td);
      });
      // 最後にtbodyに追加（描画完了）
      document.querySelector('tbody').appendChild(tr)
    });

  }

  // 前月ボタンの処理
  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalender();
  })

  // 翌月ボタンの処理
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalender();
  })

  createCalender();

}
