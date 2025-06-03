import { useEffect, useState } from 'react';

import '../pages/MyPage.css';

export default function MyReserve() {

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("reservations");
        try {
            const parsed = stored ? JSON.parse(stored) : [];
            setReservations(Array.isArray(parsed) ? parsed : []);
        }
        catch (err) {
            console.error("로컬스토리지 파싱 오류:", err);
            setReservations([]);
        }
    }, []);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("reservations")) || [];

        // 날짜 기준으로 내림차순 정렬
        const sorted = stored.sort((a, b) => new Date(b.date) - new Date(a.date));

        setReservations(sorted);
    }, []);


    const handleDelete = (indexToDelete) => {
        const updated = reservations.filter((_, i) => i !== indexToDelete);
        setReservations(updated);
        localStorage.setItem("reservations", JSON.stringify(updated));
    };

    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
    };


    return (
        <div className="MyReserve">
            <label>나의 예약 정보</label>
            {reservations.length === 0 ? (
                <p className="noReserve">예약 정보가 없습니다.<br/>상단의 로고를 눌러 예약을 진행해보세요!</p>
            ) : (
                <table className="reservationTable">
          <thead>
            <tr>
              <th>날짜</th>
              <th>시간</th>
              <th>위치</th>
              <th>좌석</th>
              <th>예약자</th>
              <th>전화번호</th>
              <th>인원수</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, index) => (
                <tr key={index}>
                    <td>{formatDate(res.date)}</td>
                    <td>{res.time === "lunch" ? "점심" : "저녁"}</td>
                    <td>{res.location}</td>
                    <td>{res.capacity}인석</td>
                    <td>{res.name}</td>
                    <td>{res.phone}</td>
                    <td>{res.peopleCount}명</td>
                    <td>
                    <button
                        className="deleteButton"
                        onClick={() => handleDelete(index)}
                    >
                        예약취소
                    </button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
            )}
        </div>
    )
}