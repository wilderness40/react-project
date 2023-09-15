import React from "react";

function Calender() {

    const makeCalender = (year, month) => {
        const firstDay = new Date(2023,8,1).getDay(); 
        // console.log(firstDay)
        const dateArray = [];
        let nextMonth = 0;
        let day = 1;
        for(let i = 0; i < firstDay; i++){
            dateArray.push(-1)
        }
        while(nextMonth < 2){
            
            if(new Date(2023,8,day).getDate() === 1) nextMonth++;
            // console.log(day)
            // console.log(new Date(2023,8,day).getDate())
            // console.log(nextMonth)
            if(nextMonth < 2) dateArray.push(day);
            day++;
        }
        // console.log(dateArray)
        const weekCount = dateArray.length%7 !== 0 ? Math.floor(dateArray.length / 7) + 1 : dateArray.length / 7;
        const weekCountArray = new Array(weekCount).fill(1).map((a, i) => i);
        // console.log(weekCountArray)

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

    makeCalender()







    return (
        <>
            {/* <table>
                <th>
                    <td>일</td>
                    <td>월</td>
                    <td>화</td>
                    <td>수</td>
                    <td>목</td>
                    <td>금</td>
                    <td>토</td>
                </th>
                <tr>
                    <td>1</td>
                </tr>
            </table> */}
            {makeCalender(2023,9)}
        </>
    )
}

export default Calender