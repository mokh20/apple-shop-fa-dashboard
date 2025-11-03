//  convert digit to persian
export default function toPersianDigits(order) {
  return String(order).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}
