interface leftItemData{
  dayRate:string,
  weekRate:string,
  totals:numString,
  type:'全国'|'管辖客户'
}
interface rightItemData{
  type:"全国"|"管辖客户",
  weekAddRate:string,
  dayAddRate:string,
  todayTotals:numString
}
interface cardData{
  dayRate:string,
  weekRate:string,
  totals:numString,
  weekAddRate:string,
  dayAddRate:string,
  todayTotals:numString,
  type?:"全国"|"管辖客户"
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

