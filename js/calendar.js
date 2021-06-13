const dayList = ['日', '月', '火', '水', '木', '金', '土'];

// 今月の情報
const date = new Date(); // 本日の日付をインスタンス化。Date()の引数は(年,月-1,日)。Date(2021,5,0)だと2021年5月30日。Date(2021,5,2)だと2021年6月2日。
let year = date.getFullYear(); // 本日の年を取得。
let month = date.getMonth() + 1; // getMonth()は1月が0, 2月が1みたいになってるので今月を表すには+1する。

// カレンダー表示数の設定
const config = {
  show: 3,
}

// main関数
showCalendar(year, month);
document.querySelector('#prev').addEventListener('click', moveCalendar);
document.querySelector('#refresh').addEventListener('click', moveCalendar);
document.querySelector('#next').addEventListener('click', moveCalendar);
document.addEventListener('click', showAlert);


// カレンダー複数回表示関数
function showCalendar (year, month) {
  for (i_show = 0; i_show < config.show; i_show++) {
    let calendarHtml = createCalendar(year, month);
    let sec = document.createElement('section');
    sec.innerHTML = calendarHtml;
    document.querySelector('#calendar').appendChild(sec);

    month++;
    if (month > 12) {
      year++;
      month = 1;
    }
  }
}

// ひと月分のカレンダー生成関数
function createCalendar (year, month) {
  const startDate = new Date(year, month - 1, 1); // 今月の最初の日をインスタンス化。
  const startDay = startDate.getDay(); //曜日の番号を取得(例えば火曜日なら0:日,1:月,2:火なので2)。dayList[startDay]で'火'を表示。
  const endDate = new Date(year, month, 0); // 今月の末日をインスタンス化。
  const endDayCount = endDate.getDate(); // 今月の末日を取得。

  // 前月の情報
  const lastMonthEndDate = new Date(year, month - 1, 0); // 前月の末日をインスタンス化。
  const lastMonthEndDayCount = lastMonthEndDate.getDate(); // 前月の末日を取得。

  // 初期化
  let dayCount = 1; // 日にちのカウント(初期値は1日の1)
  let calendarHtml = ''; // HTMLを組み立てる変数

  // カレンダーの見出し作成(年/月)
  calendarHtml += '<h1>' + year + '/' + month + '</h1>';

  // カレンダーの表作成
  calendarHtml += '<table>';

  // 曜日の行を作成
  calendarHtml += '<tr class="day-header">';
  for (let i_day = 0; i_day < dayList.length; i_day++) {
    calendarHtml += '<th>' + dayList[i_day] + '</th>'
  }
  calendarHtml += '</tr>';

  for (let i_week = 0; i_week < 5; i_week++) {
    calendarHtml += '<tr>';

    for (let i_day = 0; i_day < dayList.length; i_day++) {
      if (i_week == 0 && i_day < startDay) {
        // (1)1行目で1日の曜日の前
        let num = lastMonthEndDayCount - startDay + i_day + 1;
        calendarHtml += '<td class="is-disabled">' + num + '</td>';
      } else if (dayCount > endDayCount) {
        // (3)末尾の日付を超えた
        let num = dayCount - endDayCount;
        calendarHtml += '<td class="is-disabled">' + num + '</td>';
        dayCount++;
      } else {
        // (2)当月の日付
        let num = dayCount;
        // calendarHtml += '<td>' + num + '</td>';
        calendarHtml += `<td class="calendar_td" data-date="${year}/${month}/${dayCount}">${num}</td>`;
        dayCount++;
      }
    }
    calendarHtml += '</tr>';
  }
  calendarHtml += '</table>';

  return calendarHtml;
}

// 前月,当月,翌月の移動ボタン関数
function moveCalendar (e) {
  document.querySelector('#calendar').innerHTML = '';

  // 月を戻す
  if (e.target.id === 'prev') {
    month--;

    if (month < 1) {
      year--;
      month = 12;
    }
  }

  // 当月にリセット
  if (e.target.id === 'refresh') {
    year = date.getFullYear();
    month = date.getMonth() + 1;
  }

  // 月を進める
  if (e.target.id === 'next') {
    month++;

    if (month > 12) {
      year++;
      month = 1;
    }
  }

  // year, monthを更新したものでカレンダーを再描画
  showCalendar(year, month);

}

// クリックした日付をアラート表示する
function showAlert (e) {
  if (e.target.classList.contains('calendar_td')) {
    alert('クリックした日付は' + e.target.dataset.date + 'です');
  }
}
