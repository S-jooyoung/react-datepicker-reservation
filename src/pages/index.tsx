import Date from "@/components/presenter/Date";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { convertDateToStr } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [dateRange, setDateRange] = useState<(Date | null)[]>([]);
  const [startDate, endDate] = dateRange;
  const [maxDate, setMaxDate] = useState<Date>();

  const handleChange = (dates: (Date | null)[]) => {
    setDateRange(dates);
  };

  return (
    <>
      <div className="m-auto flex w-full h-full justify-center items-center">
        <Link className="flex justify-center items-center rounded-xl relative" href={""}>
          <Image src={"/sample-house.jpg"} width={600} height={600} alt={"sample-house"} />
          <div className="absolute bottom-0 bg-[rgba(0,0,0,.5)] w-full h-16">
            <button className="absolute bg-indigo-500 px-5 py-1 rounded-lg right-5 top-4">
              <Date startDate={startDate} endDate={endDate} handleChange={handleChange} locale={ko} convertDateToStr={(date: Date) => convertDateToStr(date)} />
              <p className="items-center text-white">예약하기</p>
            </button>
          </div>
        </Link>
      </div>
    </>
  );
}
