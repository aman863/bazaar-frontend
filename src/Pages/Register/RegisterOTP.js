import React from 'react';
import './Register.css';

const Register = () => {


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
<form onSubmit={handleLoginSubmit()}>
  <div className="mb-3">
    <label htmlFor="exampleInputText1" className="form-label fw-bold ">Please Enter Your Phone Number</label>
    <input onChange={handleOnChange()} name="phone" type="text" className="form-control p-3 input-field-border-radius" id="exampleInputText1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputText1" className="form-label fw-bold ">Please Enter OTP</label>
    <input onChange={handleOnChange()} name="OTP" type="text" className="form-control p-3 input-field-border-radius" id="exampleInputText1"/>
  </div>
  <button type="submit" className="btn btn-primary p-3 w-100 input-field-border-radius">Create an account</button>
  </form>
</div>
</div>
  </div>
						</div>

					</div>
				</div>
			</section>
		</div>
	);
};

export default Register;