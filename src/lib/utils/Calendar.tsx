import { addMonths, min, parse, setDate } from "date-fns";

export const countHoliday = (DayOfInterval: Date[], parseHoliday: Date[]): number => {
  return DayOfInterval?.filter((item) => isInArray(parseHoliday, item) || convertDayOfTheWeek(item) === "일" || convertDayOfTheWeek(item) === "토").length;
};

export const handleMaxDate = (parsereservationAllList: Date[], currentDateList: (Date | null)[], ownershipInfo: boolean | undefined, permitOwnerDate: number, permitGuestDate: number) => {
  const maxDateList: (Date | undefined)[] = [];

  parsereservationAllList.map((reservation) => {
    if ((currentDateList[0] as Date) > reservation) return;
    maxDateList.push(reservation);
  });

  if (currentDateList[1] !== null || maxDateList.length < 1) return addMonths(setDate(new Date(), 0), ownershipInfo ? permitOwnerDate : permitGuestDate);

  return min(maxDateList as Date[]);
};

export const convertDateColor = (parsereservationPmList: Date[], date: Date, holiday: string[] | undefined) => {
  const dayName = convertDayOfTheWeek(date);
  const parseHoliday = holiday?.map((key) => parse(key, "yyyyMMdd", new Date()));

  if (isInArray(parsereservationPmList, date)) return "checkout";

  if (isInArray(parseHoliday, date) || ((dayName === "일" || dayName === "토") && date > new Date())) return "holiday";

  return "";
};

export const convertDateToStr = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = convertDayOfTheWeek(date);

  return `${year}년 ${month}월 ${day}일 ${dayName}요일`;
};

export const isInArray = (array: Date[] | undefined, value: Date): boolean => {
  return !!array?.find((item) => item.getTime() === value.getTime());
};

export const convertDayOfTheWeek = (date: Date) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[date.getDay()];
};
