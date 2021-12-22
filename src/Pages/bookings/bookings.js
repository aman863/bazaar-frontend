import React, { useState, useEffect } from "react";
import './bookings.css';
// import InfoIcon from '@mui/icons-material/Info';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { db } from "../../firebase/firestore";
// import { internal_resolveProps } from "@mui/utils";
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors'

const Bookings = (props) => {
  let currentDate = new Date();
  let maxd = new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000));
  currentDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  maxd = `${maxd.getFullYear()}-${maxd.getMonth() + 1}-${maxd.getDate()}`;

  const [userid, setuserid] = useState('');
  const [verified, setVerified] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [slotStatus, setSlotStatus] = useState('slots premium-slots')
  const [bookingSlotArray, setbookingSlotArray] = useState([]);
  const [userName, setUserName] = useState('');
  db.collection("user").doc(props.match.params.id)
    .get()
    .then((querySnapshot) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setUserName(querySnapshot.data().Name);
      setuserid(props.match.params.id)
      if (querySnapshot.data().verified) {
        setVerified(true)
      } else {
        setVerified(false)
      }

    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });

  useEffect(() => {
    console.log(bookingSlotArray);
  }, [bookingSlotArray])


  const pad = (n) => {
    return (n < 10) ? ("0" + n) : `${n}`;
  }


  const createCollection = (dateID) => {
    let result = [];
    let index = 0;
    let nowHour = 0;
    // let nowHour = new Date().getHours();  
    for (let i = 0; i < 24; i++) {
      // console.log(i);
      result.push(pad(i));
    }
    console.log('result', result);
    return new Promise((resolve, reject) => {
      for (; index < result.length; index++) {
        let doc = result[index];
        db.collection('availableSlots').doc('AIBA-1').collection(dateID).doc(doc).set({
          quantity: 4
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
            reject(err);
          })
      }
      if (index === result.length) {
        db.collection('availableSlots')
          .doc('AIBA-1')
          .collection(dateID)
          .get()
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      }
    })

  }


  const dateFetch = (dateID) => {
    let slots = [];
    console.log('dateID', dateID);
    db.collection('availableSlots')
      .doc('AIBA-1')
      .collection(dateID)
      .get()
      .then(response => {
        console.log('in date fetch');
        console.log(response);
        if (!response) {
          console.log('create collection being called');
          createCollection(dateID)
            .then(response => {
              slots = [];
              response.forEach(document => {
                let value = document.data().quantity;
                if (value > 0)
                  slots.push({ id: document.id, value: document.data().quantity, statusClass: 'slots premium-slots', status: false });
                else
                  slots.push({ id: document.id, value: document.data().quantity, statusClass: 'slots regular-slots', status: false });
              })
              setbookingSlotArray(slots);
            })
            .catch(err => console.log(err));
        }
        else {
          console.log('create collection not being called');
          slots = [];
          response.forEach(document => {
            let value = document.data().quantity;
            if (value > 0)
              slots.push({ id: document.id, value: document.data().quantity, statusClass: 'slots premium-slots', status: false });
            else
              slots.push({ id: document.id, value: document.data().quantity, statusClass: 'slots regular-slots', status: false });
          })
          setbookingSlotArray(slots);
        }
      })
      .catch(err => {
        console.log('err');
      })
  }

  const reverse = (s) => {
    const rev = s.split("-").reverse().join("-");
    return rev;
  }

  const dateChangeHandler = (e) => {
    e.preventDefault();
    let revDate = reverse(e.target.value);
    setBookingDate(revDate);
    dateFetch(revDate);
  }

  const toggleStatus = (id) => {
    let index = bookingSlotArray.findIndex(ele => ele.id === id)
    let newArray = [...bookingSlotArray];
    let newStatusClass = "";
    let newStatus = false;
    if (newArray[index].statusClass === 'slots premium-slots') {
      newStatus = true;
      newStatusClass = 'slots prime-slots';
    }
    if (newArray[index].statusClass === 'slots prime-slots')
      newStatusClass = 'slots premium-slots';
    newArray.map(ele => {
      if (ele.value > 0)
        ele.statusClass = 'slots premium-slots'
    })
    newArray[index].statusClass = newStatusClass;
    newArray[index].status = newStatus
    setbookingSlotArray(newArray);
  }

  const updateBooking = () => {
    let bookingID = bookingSlotArray.filter(ele => ele.status).map(ele => { return ele });
    bookingID.map(data => {
      db.collection('user').doc(userid).collection('bookings').add({
        date: bookingDate,
        status: 'active',
        time: data.id
      })
        .then(res => {
          db.collection('availableSlots')
            .doc('AIBA-1')
            .collection(bookingDate)
            .doc(data.id)
            .update({
              quantity: data.value - 1
            })
        })
        .then(res => {
          db.collection('booking').doc('AIBA-1').collection(bookingDate).doc(data.id).get()
        })
        .then(res => {
          // console.log(res);
          if (res) {
            let record = res.data();
            if (record && record.hasOwnProperty('ids')) {
              let includes = record.ids.includes(userid);
              if (!includes)
                db.collection('booking').doc('AIBA-1').collection(bookingDate).doc(data.id).set({
                  ids: [...res, userid]
                })
            }
          }
          else {
            db.collection('booking').doc('AIBA-1').collection(bookingDate).doc(data.id).set({
              ids: [userid]
            })
          }
        })
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    })
  }

  return (

    <>
      <div className="dashboard">
        <div className="container-dashboard">
          <div class="row">
            <div class="col-3 col-s-3 menu">
              <h5 className='menu-title' >AIBA</h5>
              <ul>
                <li onClick={() => (
                  props.history.push(`/dashboard/${userid}`)
                )}>Home</li>
                <li style={{ backgroundColor: "lightblue" }}>Booking</li>
                <li>Profile</li>
              </ul>
            </div>

            <div class="col-6 col-s-9">

              <h1>Bookings</h1>
              <div className='center-box'>
                {verified ?
                  <>
                    <div className="gap">

                    </div>
                    <div className="Bookings-container">
                      <p>Select a day</p>
                      <input type="date" id="date-picker" onChange={dateChangeHandler} min={currentDate} max={maxd} />
                      <p>Choose one of the available timeslots</p>
                      {
                        bookingSlotArray.map(ele => {
                          // console.log('ele',ele);
                          if (ele.value > 0)
                            return (<span onClick={() => toggleStatus(ele.id)} className={ele.statusClass}>{ele.id + ":00"}</span>)
                          else if (ele.value === 0)
                            return (<span className={ele.statusClass}>{ele.id + ":00"}</span>)
                        })
                      }
                    </div>
                    {/* <div className="info">
                                <p><InfoIcon color="primary" /> info about available timeslots</p>
                                <ul className="info-ul">
                                    <li>Regular slots <p>Free</p></li>
                                    <li style={{ color: "green" }}>Premium slots <InfoOutlinedIcon  /> <p>INR 134</p></li>
                                    <li style={{ color: "blueviolet" }}>Prime slots <InfoOutlinedIcon  /> <p>INR 254</p></li>
                                </ul>
                            </div> */}
                    <div className="submit">
                      {
                        bookingDate === '' ?
                          <button className="notSaveButton" onClick={() => updateBooking()}>Save and continue</button>
                          :
                          <Link to={'/dashboard/' + userid}><button className="saveButton" onClick={() => updateBooking()}>Save and continue</button></Link>

                      }
                    </div>
                  </>
                  : verified === null ?
                    null
                    : <div className='verification'><span>Your application is yet to be approved by the Admin. Please check again later :</span>&#128516;</div>}
              </div>
            </div>

            <div class="col-9 col-s-12">
              <div class="aside">
                <div className='avatar_container'>
                  <Avatar
                    className='avatar'
                    sx={{ bgcolor: deepPurple[400], width: 56, height: 56 }}
                  >{userName.substr(0, 1)}</Avatar>
                  <p>{userName}</p>
                </div>
                <Calendar className="calender"
                />
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )

}
export default Bookings