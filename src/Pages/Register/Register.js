import React from 'react';
import './Register.css';
import firebase from '../../firebase/firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Redirect } from "react-router-dom";
import { db } from '../../firebase/firestore';
class Register extends React.Component {
	handleChange = (e) => {
		const { name, value } = e.target
		this.setState({
			[name]: value,
		})
	}
	state = {
		stage: 1,
		loading: 1,
		redirect: false,
		user:"not found"
	}
	configureCaptcha = () => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
			'size': 'invisible',
			'callback': (response) => {
				// reCAPTCHA solved, allow signInWithPhoneNumber.
				this.onSignInSubmit();
				console.log("Recaptca varified")
			},
			defaultCountry: "IN"
		});
	}
	onSignInSubmit = (e) => {
		e.preventDefault()
		this.configureCaptcha()
		const phoneNumber = "+91" + this.state.mobile
		console.log(phoneNumber)
		this.setState({ loading: 0 })
		const appVerifier = window.recaptchaVerifier;
		firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
				console.log("OTP has been sent")
				this.setState({
					stage: 0,
					loading: 1
				})
				// ...
			}).catch((error) => {
				// Error; SMS not sent
				// ...
				console.log(error)
			});
	}
	onSubmitOTP = (e) => {
		e.preventDefault()
		const code = this.state.otp
		console.log(code)
		window.confirmationResult.confirm(code).then((result) => {
			// User signed in successfully.
			// const user = result.user;
			// console.log(JSON.stringify(user))
			this.setState({ redirect: true })
			db.collection("user").doc(this.state.mobile)
				.get()
				.then((querySnapshot) => {
					// console.log(querySnapshot.data())
					if(querySnapshot.data()){
						console.log("kkkkkkk");
						this.setState({user :"found"})
						
					}else{

					}
				})
				.catch((error) => {
					console.log("Error getting documents: ", error);
				});

			// ...
		}).catch((error) => {
			console.log(error)
		});
	}
	
	render() {
		const { redirect } = this.state;

		if (redirect) {
				if(this.state.user==='found'){
					return <Redirect to={`/dashboard/${this.state.mobile}`} />;
				}
				else{
					return <Redirect to={`/registration`} />;
				}

		}
		return (
			<div>
				{/* header start */}
				<section>
					<div className='container'>
						<div className='row mt-4'>
							<div className='col registration-banner'>
								<h2 className='banner-text'>AIBA</h2>
					
							</div>
							<div className='col'>

								<div className='container'>

									<div className='input-field-info'>
										<h3 className='text-black fw-bold mt-5 pt-5'>Stand Out,</h3>
										<h1 className='fw-bold'>Sell live.</h1>

										<div className='input-field-registration'>
											{this.state.stage === 1 ?
												<form onSubmit={this.onSignInSubmit}>
													<div id="sign-in-button"></div>
													<div className="mb-3">
														<label htmlFor="exampleInputText1" className="form-label fw-bold ">Please Enter Your Phone Number</label>
														<input name="mobile" type="number" className="form-control p-3 input-field-border-radius" id="exampleInputText1" required onChange={this.handleChange} />
													</div>
													{this.state.loading === 0 ?
														
														<Box sx={{ display: 'flex' }} className="loader" >
															<CircularProgress className='loader' />
														</Box>
														
														: null
													}
													<button type="submit" className="btn btn-primary p-3 w-100 input-field-border-radius">Send Otp</button>
												</form>
												:
												<form onSubmit={this.onSubmitOTP}>
													<div className="mb-3">
														<label htmlFor="exampleInputText1" className="form-label fw-bold ">Please Enter OTP</label>
														<input required onChange={this.handleChange} name="otp" type="number" className="form-control p-3 input-field-border-radius" id="exampleInputText1" />
													</div>
													<button type="submit" className="btn btn-primary p-3 w-100 input-field-border-radius">Login</button>
												</form>
											}
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</section>
			</div>
		);
	}
};

export default Register;