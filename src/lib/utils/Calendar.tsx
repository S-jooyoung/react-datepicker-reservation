import { min, parse } from "date-fns";

export const handleReservationList = (reservationList: string[] | undefined) => {
  const splitReservationList = reservationList?.map((reservation) => reservation.split("_"));
  const parseReservationList: { [key: string]: string } = {};

  splitReservationList?.map((splitReservation) => {
    if (parseReservationList[splitReservation[0]]) parseReservationList[splitReservation[0]] = "ALL";
    else parseReservationList[splitReservation[0]] = splitReservation[1];
  });

  const reservationAllList = Object.keys(parseReservationList).filter((key) => parseReservationList[key] === "ALL");
  const reservationPmList = Object.keys(parseReservationList).filter((key) => parseReservationList[key] === "PM");

  const parseReservationAllList = reservationAllList.map((key) => parse(key, "yyyyMMdd", new Date()));
  const parseReservationPmList = reservationPmList.map((key) => parse(key, "yyyyMMdd", new Date()));

  return [parseReservationAllList, parseReservationPmList];
};

export const verifyOnlyPossibleCheckout = (startDate: Date | null, parseReservationPmList: Date[]) => {
  if (startDate && isInArray(parseReservationPmList, startDate)) return true;
  return false;
};

export const verifyAll = (startDate: Date | null, endDate: Date | null, parseReservationPmList: Date[]) => {
  if (verifyOnlyPossibleCheckout(startDate, parseReservationPmList)) {
    console.log("체크아웃만 가능한 날짜입니다.");
    return [];
  }
  return [startDate, endDate];
};

export const countHoliday = (DayOfInterval: Date[], parseHoliday: Date[]): number => {
  return DayOfInterval?.filter((item) => isInArray(parseHoliday, item) || convertDayOfTheWeek(item) === "일" || convertDayOfTheWeek(item) === "토").length;
};

export const handleMaxDate = (parseReservationAllList: Date[], currentDateList: (Date | null)[]) => {
  const maxDateList: (Date | undefined)[] = [];

  parseReservationAllList.map((reservation) => {
    if ((currentDateList[0] as Date) > reservation) return;
    maxDateList.push(reservation);
  });

  if (currentDateList[1] !== null || maxDateList.length < 1) return;

  return min(maxDateList as Date[]);
};

export const convertDateToColor = (parseReservationPmList: Date[], date: Date) => {
  if (isInArray(parseReservationPmList, date)) return "checkout";

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
