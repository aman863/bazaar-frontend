import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import { db } from '../../firebase/firestore';

const Dashboard = (props) => {
	const [users, setUsers] = useState('');
	const [userid, setuserid] = useState('');
	const [verified, setVerified] = useState(false);
	const [bookingsDate, setbookingsDate] = useState('')
	const [bookingsStatus, setbookingsStatus] = useState('')
	const [bookingsTime, setbookingsTime] = useState('')
	const bookings=[];
	useEffect(() => {

		db.collection("user").where("mobileNumber", "==", props.match.params.id)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					// console.log(doc.id, " => ", doc.data());
					setUsers(doc.data().Name)
					setuserid(doc.data().mobileNumber)
					if (doc.data().verified) {
						setVerified(true)
					}
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});

		db.collection("user").doc(props.match.params.id).collection("bookings")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					// setbookingsDate(doc.data().date)
					// setbookingsStatus(doc.data().status)
					// setbookingsTime(doc.data().time)
					bookings.push(doc.data())
					// console.log(bookings)
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	},[]);


	return (
		<>
			<div className="dashboard">
				<div className="container-dashboard">
					<div class="row">
						<div class="col-3 col-s-3 menu">
							<ul>
								<li style={{ backgroundColor: "lightblue" }}>Home</li>
								<li onClick={() => (
									props.history.push(`/bookings/${userid}`)
								)}>Booking</li>
								<li>Profile</li>
							</ul>
						</div>

						<div class="col-6 col-s-9">

								{console.log(bookings)}
							<h1>Welcome back,{`${users}`}</h1>
							<div className='center-box'>
								{verified ?
									<div>

									llllllllllllll
									</div>
									: <h3>varification under processing</h3>}
							</div>
						</div>

						<div class="col-9 col-s-12">
							<div class="aside">
								<h2>What?</h2>
								<p>Chania is a city on the island of Crete.</p>
								<h2>Where?</h2>
								<p>Crete is a Greek island in the Mediterranean Sea.</p>
								<h2>How?</h2>
								<p>You can reach Chania airport from all over Europe.</p>
							</div>
						</div>
					</div>


				</div>
			</div>
		</>
	);
};

export default Dashboard;