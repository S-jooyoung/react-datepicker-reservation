import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import type { Locale } from "date-fns";
import { useMediaQuery } from "react-responsive";

type CustomDateProps = {
  startDate: Date | null;
  endDate: Date | null;
  handleChange: (dates: (Date | null)[]) => void;
  locale: Locale;
  convertDateToStr: (date: Date) => string;
};

export default function CustomDate({ startDate, endDate, handleChange, locale, convertDateToStr }: CustomDateProps) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  return (
    <>
      <DatePicker
        withPortal
        selectsRange
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        locale={locale}
        monthsShown={isDesktop ? 2 : 1}
        showPopperArrow={false}
        dateFormat="yyyyMMdd"
        shouldCloseOnSelect={false}
        popperPlacement="auto"
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth, customHeaderCount }) => (
          <div>
            {new Date() > monthDate || customHeaderCount === 1 ? (
              ""
            ) : (
              <button aria-label="Previous Month" className="react-datepicker__navigation react-datepicker__navigation--previous" onClick={decreaseMonth}>
                <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous" />
              </button>
            )}
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString("ko", {
                month: "long",
                year: "numeric",
              })}
            </span>
            {customHeaderCount === 1 || !isDesktop ? (
              <button aria-label="Next Month" className="react-datepicker__navigation react-datepicker__navigation--next" onClick={increaseMonth}>
                <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next" />
              </button>
            ) : (
              " "
            )}
          </div>
        )}>
        <div className="flex justify-center flex-col m-auto min-[900px]:w-1/2">
          <div className="flex mt-6 justify-center h-6">
            {startDate && endDate ? (
              <div className="flex w-full justify-around">
                <div className="w-full text-sm m-2">
                  <p className="m-0 text-xs text-gray-500">체크인</p>
                  <p className="m-0 text-sm">{convertDateToStr(startDate as Date)}</p>
                </div>
                <div className="w-full text-sm m-2">
                  <p className="m-0 text-xs text-gray-500">체크아웃</p>
                  <p className="m-0 text-sm">{convertDateToStr(endDate as Date)}</p>
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-around">
                <div className="w-full text-sm m-2">
                  <p className="m-0 text-xs text-gray-500">체크인</p>
                  <p className="m-0 text-sm">날짜 추가</p>
                </div>
                <span className="w-full text-sm m-2">
                  <p className="m-0 text-xs text-gray-500">체크아웃</p>
                  <p className="m-0 text-sm">날짜 추가</p>
                </span>
              </div>
            )}
          </div>
          <div className="mt-7 flex">
            <div className="w-2/4 m-2">
              <button className="bg-gray-500 px-10 py-2 rounded-lg">
                <span className="text-lg text-white">취소</span>
              </button>
            </div>
            <div className="w-2/4 m-2">
              <button className="bg-indigo-500 px-10 py-2 rounded-lg">
                <span className="text-lg text-white">예약</span>
              </button>
            </div>
          </div>
        </div>
      </DatePicker>
    </>
  );
}
