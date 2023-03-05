import { ko } from "date-fns/locale";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { convertDateToStr, convertDateToColor, handleReservationList, isInArray, handleMaxDate } from "@/lib/utils";
import Date from "@/components/presenter/Date";

export default function Home() {
  const reservationList = ["20230411_PM", "20230412_AM", "20230412_PM", "20230413_AM"];
  const [dateRange, setDateRange] = useState<(Date | null)[]>([]);
  const [startDate, endDate] = dateRange;
  const [maxDate, setMaxDate] = useState<Date>();
  const [parseReservationAllList, parseReservationPmList] = handleReservationList(reservationList);

  const handleChange = (dates: (Date | null)[]) => {
    if (dates[0] && isInArray(parseReservationPmList, dates[0])) {
      alert("체크아웃만 가능한 날짜 입니다.");
      setDateRange([null, null]);
    } else {
      setDateRange(dates);
    }

    setMaxDate(handleMaxDate(parseReservationAllList, dates));
  };

  return (
    <>
      <div className="m-auto flex w-full h-full justify-center items-center">
        <div className="flex justify-center items-center rounded-xl relative">
          <Image src={"/sample-house.jpg"} width={600} height={600} alt={"sample-house"} />
          <div className="absolute bottom-0 bg-[rgba(0,0,0,.5)] w-full h-16">
            <div className="absolute bg-indigo-500 px-5 py-1 rounded-lg right-5 top-4">
              <Date
                startDate={startDate}
                endDate={endDate}
                maxDate={maxDate}
                handleChange={handleChange}
                locale={ko}
                parseReservationPmList={parseReservationPmList}
                parseReservationAllList={parseReservationAllList}
                convertDateToColor={(date: Date) => convertDateToColor(parseReservationPmList, date)}
                convertDateToStr={(date: Date) => convertDateToStr(date)}
              />
              <p className="items-center text-white">예약하기</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
