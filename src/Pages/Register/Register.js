import React from 'react';
import './Register.css';
import firebase from '../../firebase/firebase';


class Register extends React.Component {
	handleChange = (e) =>{
		const {name, value} = e.target
		this.setState({
			[name]: value,
		  })
	  }
	  state = {
        stage:1,
    }
	  configureCaptcha = () =>{
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
		// this.setState({stage:0})
		const appVerifier = window.recaptchaVerifier;
		firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
			  // SMS sent. Prompt user to type the code from the message, then sign the
			  // user in with confirmationResult.confirm(code).
			  window.confirmationResult = confirmationResult;
			  console.log("OTP has been sent")
			  this.setState({
				stage:0
			})
			  // ...
			}).catch((error) => {
			  // Error; SMS not sent
			  // ...
			  console.log(error)
			});
	  }
	  onSubmitOTP = (e) =>{
		e.preventDefault()
		const code = this.state.otp
		console.log(code)
		window.confirmationResult.confirm(code).then((result) => {
		  // User signed in successfully.
		  const user = result.user;
		  console.log(JSON.stringify(user))
		  alert("User is verified")
		  // ...
		}).catch((error) => {
			console.log("error")
		});
	  }
	render() {
	return (
		<div>
			{/* header start */}
			<section>
				<div className='container'>
					<div className='row mt-4'>
						<div className='col registration-banner'>
							<h2 className='banner-text'>Zoho.</h2>
							<p className='banner-paragraph text-muted'> A central hub where teams can work, plan and achieve amazing things together </p>
						</div>
						<div className='col'>

  <div className='container'>
  <div className='d-flex justify-content-end'>
						<p className="dropdown-toggle language-text " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
						English(USA)
					</p>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<li><p className="dropdown-item" href="#">Menu item</p></li>
						<li><p className="dropdown-item" href="#">Menu item</p></li>
  </ul>
						</div>
<div className='input-field-info'>
<h5 className='text-uppercase text-black-50 fw-bold mt-5 pt-5'>Start for free</h5>
  <h1 className='fw-bold'>Sign Up to Zoho.</h1>

<div className='input-field-registration'>
	{this.state.stage===1?
<form onSubmit={this.onSignInSubmit}>
<div id="sign-in-button"></div>
  <div className="mb-3">
    <label htmlFor="exampleInputText1" className="form-label fw-bold ">Please Enter Your Phone Number</label>
    <input  name="mobile" type="number" className="form-control p-3 input-field-border-radius" id="exampleInputText1" required onChange={this.handleChange}/>
  </div>
  <button type="submit" className="btn btn-primary p-3 w-100 input-field-border-radius">Send Otp</button>
  </form>
  :<form onSubmit={this.onSubmitOTP}>
  <div className="mb-3">
    <label htmlFor="exampleInputText1" className="form-label fw-bold ">Please Enter OTP</label>
    <input required onChange={this.handleChange} name="otp" type="number" className="form-control p-3 input-field-border-radius" id="exampleInputText1"/>
  </div>
  <button type="submit" className="btn btn-primary p-3 w-100 input-field-border-radius">Create an account</button>
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