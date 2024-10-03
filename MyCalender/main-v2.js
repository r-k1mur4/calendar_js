"use strict";
console.clear;
{

  // 今日の日付で作成
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); // 5月

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
    const dates = [];// date: 日付, day: 曜日
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

    // 今日を太字にする
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
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

  // 更新前のカレンダーを削除
  function clearCalender() {
    const tbody =  document.querySelector('tbody');

    while (tbody.firstChild) {
     tbody.removeChild(tbody.firstChild)
    }
  }

  //  タイトルの書き換え
  function renderTitle() {
  const title = `${year}/${String(month + 1).padStart(2, '0')}`;
  document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      // スプレッド構文で広げる
      ...getCalenderHead(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];


    // 週ごとの配列を作成(HTMLに描画するため)
    const weeks = [];
    const weeksCount = dates.length / 7;

    for(let i = 0; i < weeksCount; i++) {
      // 配列weeksにdatesの中身を７日分ずつ格納する
      weeks.push(dates.splice(0,7));
    }

    // weeksの各配列（１週間分ずつ）への処理
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      // 日付に対して
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
      // 処理したweekをtbodyに追加
      document.querySelector('tbody').appendChild(tr)
    });
  }

  // すべての日付を統合する
  function createCalender() {

    clearCalender();
    renderTitle();
    renderWeeks();


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
  // Todayボタンの処理
  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();
    createCalender();
  })

  createCalender();

}
