interface leftItemData{
  dayRate:number,
  weekRate:number,
  totals:numString,
  type:'全国'|'管辖客户'
  [key:string]:any
}
interface rightItemData{
  type:"全国"|"管辖客户",
  weekAddRate:number,
  dayAddRate:number,
  todayTotals:number
  [key:string]:any
}
interface cardData{
  leftItemData,
  rightItemData
}
interface topCardData{
  leftData:cardData,
  rightData:cardData
}
interface getStatisticsResType{
  areaTotals:numString
  dayAddAreaRate:number
  dayAddRate:number
  dayAreaRate:number
  dayRate:number
  todayAreaTotals:number
  todayTotals:number
  totals:numString
  weekAddAreaRate:number
  weekAddRate:number
  weekAreaRate:number
  weekRate:number
}

