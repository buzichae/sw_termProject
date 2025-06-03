import {useState} from 'react';
import DatePicker from "../components/DatePicker"
import '../pages/ReservationPage.css';
import { useNavigate } from 'react-router-dom';


export default function ReserveContent() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedCapacity, setSelectedCapacity] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const locations = ['창가자리', '안쪽자리', '룸석'];

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [peopleCount, setPeopleCount] = useState("");

    const navigate = useNavigate();

    let existing = [];

    try {
        const stored = localStorage.getItem("reservations");
        existing = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(existing)) {
            existing = []; // 배열이 아닐 경우 초기화
        }
    } catch (error) {
        console.error("localStorage 파싱 오류:", error);
        existing = [];
    }


    const availableTables = {
        창가자리: [2, 6],
        안쪽자리: [2, 4, 6],
        룸석: [4, 6, 8],
    }

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !phone || !cardNumber || !peopleCount) {
            alert("필수 정보를 모두 입력해주세요.");
            return;
        }
        const reservationData = {
            date: date.toLocaleDateString(),
            time,
            location: selectedLocation,
            capacity: selectedCapacity,
            name,
            phone,
            cardNumber,
            peopleCount
        };

        let existing = [];

    try {
        const stored = localStorage.getItem("reservations");
        existing = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(existing)) {
            existing = [];
        }
    } catch (error) {
        console.error("localStorage 파싱 오류:", error);
        existing = [];
    }

    const updated = [...existing, reservationData];
    localStorage.setItem("reservations", JSON.stringify(updated));
        
        alert(`예약완료!\n날짜: ${date}\n시간대: ${time}`);

        navigate("/MyReserve");
    };

    
    
    return (
        <form  className="ReserveContent" onSubmit={handleSubmit}>
            <div className="form_content">
                <div className="left">
                    <div className="selectDateTime">
                        <label>예약하려는 날짜와 시간을 선택해주세요</label>
                        <div className="dateAndTime">
                            <DatePicker 
                                selected={date}
                                onChange={setDate}
                            />
                            <select
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="SelectTime"
                            >
                                <option value="">-- 선택하세요 --</option>
                                <option value="lunch">점심</option>
                                <option value="dinner">저녁</option>
                            </select>
                        </div>
                    </div>

                    <div className="selectTable">
                        <label>원하는 좌석 위치를 선택해주세요</label>
                        <div className='locationButtonGroup'>
                            {locations.map((location) => (
                                <button
                                    key={location}
                                    type="button"
                                    className={`locationButton ${selectedLocation === location ? 'selected' : ''}`}
                                    onClick={() => setSelectedLocation(location)}
                                >
                                    {location}
                                </button>
                            ))}
                        </div>
                        {/* 선택된 유형에 따라 예약 가능한 테이블 선택하도록 */}
                        {selectedLocation && (
                            <div className="capacitySection">
                            <p className="seatLabel">예약가능한 '{selectedLocation}' 테이블입니다.</p>
                            <div className="capacityButtonGroup">
                                {availableTables[selectedLocation].map((cap) => (
                                <button
                                    key={cap}
                                    type="button"
                                    className={`capacityButton ${selectedCapacity === cap ? 'selected' : ''}`}
                                    onClick={() => setSelectedCapacity(cap)}
                                >
                                    {cap}인석
                                </button>
                                ))}
                            </div>
                            </div>
                        )}
                    </div>
                </div>
                

                <div className="right">
                    {date && time && selectedLocation && selectedCapacity && (
                        <div className="input_form">
                            <div className="formRow ">
                                <label>예약 날짜 및 시간</label>
                                <div>{formatDate(date)} {time === 'lunch' ? '점심' : time === 'dinner' ? '저녁' : ''}</div>
                            </div>

                            <div className="formRow ">
                                <label>예약된 자리</label>
                                <div>{`${selectedLocation} ${selectedCapacity}인석`}</div>
                            </div>

                            <div className="formRow ">
                                <label>이름</label>
                                <input 
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="formRow ">
                                <label>전화번호</label>
                                <input 
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />                           
                            </div>

                            <div className="formRow ">
                                <label>카드번호</label>
                                <input 
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                            </div>

                            <div className="formRow ">
                                <label>인원수</label>
                                <input 
                                    type="number"
                                    value={peopleCount}
                                    onChange={(e) => setPeopleCount(e.target.value)}
                                />
                            </div>

                            <button 
                                onClick={handleSubmit}
                                className="submit_btn"
                            >
                                예약하기</button>
                        </div>
                    )}
                </div>
            </div>
        </form>
    )
}