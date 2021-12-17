import React,{useEffect,useState} from 'react';
import './Dashboard.css'
import { db } from '../../firebase/firestore';

const Dashboard = (props) => {
	// useEffect(() => {
	// 	db.collection("user").get().then((querySnapshot) => {
	// 		querySnapshot.forEach((doc) => {
	// 			console.log(`${doc.id} => ${doc.data()}`);
	// 		});
	// 	});props.match.params.id
	// });
	const [users, setUsers] = useState('');

	db.collection("user").where("mobileNumber", "==", props.match.params.id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
			setUsers(doc.data().Name)
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


	return (
		<>
			<div className="dashboard">
			<div className="container-dashboard">
				<div class="row">
					<div class="col-3 col-s-3 menu">
						<ul>
							<li>Home</li>
							<li>Booking</li>
							<li>Profile</li>
						</ul>
					</div>

					<div class="col-6 col-s-9">

							<h1>Welcome back,{`${users}`} </h1>
						<div className='center-box'>
							<p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.</p>
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