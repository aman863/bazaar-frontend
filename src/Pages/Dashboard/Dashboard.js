import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import { db } from '../../firebase/firestore';
import { Chip } from '@mui/material';
const Dashboard = (props) => {
	const [users, setUsers] = useState('');
	const [userid, setuserid] = useState('');
	const [verified, setVerified] = useState(false);
	const [booking, setbooking] = useState([]);

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
					setbooking(prevState => [...prevState, doc.data()]);
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	}, []);

	const uniqueArray = booking.filter(function(item, pos, self) {
		return self.indexOf(item) == pos;
	})
	return (
		<>
			<div className="dashboard">
				<div className="container-dashboard">
					<div class="row">
						<div class="col-3 col-s-3 menu">
							<h5 className='menu-title' >EduCare</h5>
							<ul>
								<li style={{ backgroundColor: "lightblue" }}>Home</li>
								<li onClick={() => (
									props.history.push(`/bookings/${userid}`)
								)}>Booking</li>
								<li>Profile</li>
							</ul>
						</div>

						<div class="col-6 col-s-9">
							<h1>Welcome back,{`${users}`}</h1>
							<div className='center-box'>
								{verified ?
									<div>
										<table style={{width:"90%"}}>
											
											<tr>
												<th>date</th>
												<th>time</th>
												<th>Status</th>
											</tr>
											
											{uniqueArray.map(function (item, i) {
												return(
												<tr>

													<td key={i}>{item.date}</td>
													<td key={i}>{item.time}</td>
													<td key={i}><Chip label={item.status} variant="outlined" color={item.status==="active"?"success":"warning"} /></td>

												</tr>
												)
											})}

										</table>
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