const JALALI_MONTHS = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const EN_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function toJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const g_d_no = 365 * (gy - 1600) + Math.floor((gy - 1600 + 3) / 4) - Math.floor((gy - 1600 + 99) / 100) + Math.floor((gy - 1600 + 399) / 400);
  const gMonthDays = [0,31,59+(gy%4===0&&(gy%100!==0||gy%400===0)?1:0),90+(gy%4===0&&(gy%100!==0||gy%400===0)?1:0),120,151,181,212,243,273,304,334];
  const jDayNo = g_d_no + gMonthDays[gm - 1] + gd - 1 - 79;
  const jNp = Math.floor(jDayNo / 12053);
  let rem = jDayNo % 12053;
  let jy = 979 + 33 * jNp + 4 * Math.floor(rem / 1461);
  rem %= 1461;
  if (rem >= 366) { jy += Math.floor((rem - 1) / 365); rem = (rem - 1) % 365; }
  const jmd = [31,31,31,31,31,31,30,30,30,30,30,29];
  let jm = 0;
  while (jm < 11 && rem >= jmd[jm]) { rem -= jmd[jm]; jm++; }
  return [jy, jm + 1, rem + 1];
}

function toPersianNums(n: number): string {
  return n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
}

export function formatDate(isoDate: string, locale: 'fa' | 'en'): string {
  const [gy, gm, gd] = isoDate.split('-').map(Number);
  if (locale === 'fa') {
    const [jy, jm, jd] = toJalali(gy, gm, gd);
    return `${toPersianNums(jd)} ${JALALI_MONTHS[jm - 1]} ${toPersianNums(jy)}`;
  }
  return `${EN_MONTHS[gm - 1]} ${gd}, ${gy}`;
}
