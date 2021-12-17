import React from "react";
import './bookings.css';
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const Bookings = () => (

    <>
        <div className="dashboard">
            <div className="container-dashboard">
                <div class="row">
                    <div class="col-3 col-s-3 menu">
                        <ul>
                            <li>Home</li>
                            <li style={{ backgroundColor: "lightblue" }}>Booking</li>
                            <li>Profile</li>
                        </ul>
                    </div>

                    <div class="col-6 col-s-9">

                        <h1>Bookings</h1>
                        <div className='center-box'>
                            <div className="gap">

                            </div>
                            <div className="Bookings-container">
                                <p>Select a day</p>
                                <input type="date" id="date-picker" />
                                <p>Choose one of the available timeslots</p>
                                <span className="slots regular-slots">12:00</span>
                                <span className="slots regular-slots">12:30</span>
                                <span className="slots regular-slots">13:00</span>
                                <span className="slots regular-slots">13:30</span>
                                <span className="slots prime-slots">14:00</span>
                                <span className="slots prime-slots">14:30</span>
                                <span className="slots prime-slots">15:00</span>
                                <span className="slots prime-slots">15:30</span>
                                <span className="slots premium-slots">16:00</span>
                                <span className="slots premium-slots">16:30</span>
                                <span className="slots premium-slots">17:00</span>
                                <span className="slots premium-slots">17:30</span>
                            </div>
                            <div className="info">
                                <p><InfoIcon color="primary" /> info about available timeslots</p>
                                <ul className="info-ul">
                                    <li>Regular slots <p>Free</p></li>
                                    <li style={{ color: "green" }}>Premium slots <InfoOutlinedIcon  /> <p>INR 134</p></li>
                                    <li style={{ color: "blueviolet" }}>Prime slots <InfoOutlinedIcon  /> <p>INR 254</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-9 col-s-12">
                        <div class="aside">
                            {/* <h2>What?</h2>
                            <p>Chania is a city on the island of Crete.</p>
                            <h2>Where?</h2>
                            <p>Crete is a Greek island in the Mediterranean Sea.</p>
                            <h2>How?</h2>
                            <p>You can reach Chania airport from all over Europe.</p> */}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </>
)

export default Bookings