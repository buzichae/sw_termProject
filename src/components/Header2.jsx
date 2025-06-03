import "../pages/ReservationPage.css";
import { Link } from 'react-router-dom';

export default function Header2() {
    return(
        <div className="Header">
            <Link to='/reservation' className="Logo">
                reservation
            </Link>
            <div className="logged_button">
                <Link to='/MyReserve' className="myReseve">
                    나의 예약
                </Link>
                <Link to='/logout' className="logout">
                    로그아웃
                </Link>
            </div>
        </div>
    )
}