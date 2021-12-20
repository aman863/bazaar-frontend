import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import { db } from '../../firebase/firestore';
import { Chip } from '@mui/material';
const Dashboard = (props) => {
	const [users, setUsers] = useState('');
	const [userid, setuserid] = useState('');
	const [verified, setVerified] = useState(null);
	const [booking, setbooking] = useState([]);

	useEffect(() => {

		db.collection("user").doc(props.match.params.id)
			.get()
			.then((querySnapshot) => {
			
					// doc.data() is never undefined for query doc snapshots
					// console.log(doc.id, " => ", doc.data());
					if(querySnapshot.data().Name.indexOf(' ')===-1){
						setUsers(querySnapshot.data().Name)
					}else{
						setUsers(querySnapshot.data().Name.substr(0,querySnapshot.data().Name.indexOf(' ')))
					}
					setuserid(props.match.params.id)
					if (querySnapshot.data().verified) {
						setVerified(true)
						
					}else{
						setVerified(false)
					}
				
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
							<h5 className='menu-title' >AIBA</h5>
							<ul>
								<li style={{ backgroundColor: "lightblue" }}>Home</li>
								<li onClick={() => (
									props.history.push(`/bookings/${userid}`)
								)}>Booking</li>
								<li>Profile</li>
							</ul>
						</div>

						<div class="col-6 col-s-9">
							<h2>Welcome back,</h2>
							<h2>{`${users}`} &#128075;</h2>
							<div className='center-box'>
								{verified ?
									<div>
										<table style={{width:"90%"}}>
											
											<tr>
												<th>Date</th>
												<th>Time</th>
												<th>Status</th>
											</tr>

											<tbody >
											{uniqueArray.map(function (item, i) {
												return(
													<tr key={item.date}>

													<td >{item.date}</td>
													<td >{(item.time<=11) ?
													`${item.time} :00 am`
													:  (item.time==12)?
													`${item.time} :00 pm`
													: (item.time===0) ?
														"00:00 am"
													: `${item.time-12} :00 pm`
												}</td>
													<td ><Chip label={item.status.charAt(0).toUpperCase() + item.status.slice(1)} variant="outlined" color={item.status==="active"?"success":"warning"} /></td>

												</tr>
												)
											})}
											</tbody>

										</table>
									</div>
									: verified===null ?
									null
									: <div className='verification'><span>Your application is yet to be approved by the Admin. Please check again later :</span>&#128516;</div>}
							</div>
						</div>
											
						<div class="col-9 col-s-12">
							<div class="aside">
								
							</div>
						</div>
					</div>


				</div>
			</div>
		</>
	);
};

export default Dashboard;