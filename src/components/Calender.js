import React, { useState } from "react";

function Calendar() {
    const [selecDate, setSelctDate] = useState({ 
        year : new Date().getFullYear(), 
        month : new Date().getMonth()
    })

    const makeCalendar = (year, month) => {
        const firstDay = new Date(year,month,1).getDay(); // 1일의 요일을 저장
        // console.log(firstDay)
        const dateArray = []; // 
        let nextMonth = 0;
        let day = 1;
        for(let i = 0; i < firstDay; i++){
            dateArray.push(-1)
        }
        while(nextMonth < 2){
            
            if(new Date(year,month,day).getDate() === 1) nextMonth++;
            // console.log(day)
            // console.log(new Date(2023,8,day).getDate())
            // console.log(nextMonth)
            if(nextMonth < 2) dateArray.push(day);
            day++;
        }
        // console.log(dateArray)
        const weekCount = dateArray.length%7 !== 0 ? Math.floor(dateArray.length / 7) + 1 : dateArray.length / 7;
        const weekCountArray = new Array(weekCount).fill(1).map((a, i) => i);
        console.log(weekCountArray)

        return (
            <table>
                <thead>
                    <tr>
                        <th>일</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                    </tr>
                </thead>
                <tbody>
                    {weekCountArray.map((week, id) => {
                        const innerDate = [];
                        for(let i = 0; i < 7; i++){
                            innerDate.push(dateArray[i+(7*id)])
                        }
                        return (
                            <tr key={id}>{innerDate.map((d, index) => {
                                return (
                                    <td key={index}>{d === -1? '' : d}</td>
                                )
                            })}</tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    const decreaseMonth = () => {
        const year = selecDate.month <= 0 ? selecDate.year - 1 : selecDate.year;
        const month = selecDate.month <= 0 ? 11 : selecDate.month - 1;
        setSelctDate({ year, month })
    }

    const increaseMonth = () => {
        const year = selecDate.month >= 11 ? selecDate.year + 1 : selecDate.year;
        const month = selecDate.month >= 11 ? 0 : selecDate.month + 1;
        setSelctDate({ year, month })
    }

    return (
        <>
            <div>
                <button onClick={decreaseMonth}className='Calendar-btn'>◀</button>
                <span>{`${selecDate.year}년 ${selecDate.month+1}월`}</span>
                <button onClick={increaseMonth} className='Calendar-btn'>▶</button>
            </div>
            {makeCalendar(selecDate.year, selecDate.month)}
        </>
    )
}

export default Calendar