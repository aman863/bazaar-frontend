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
		<div className='row mt-5 pt-5'>
		<div class="d-flex bd-highlight mb-3">
  <div class="me-auto p-2 bd-highlight"><h1 className='fw-bold register-name'>Registration</h1>

  </div>
  <div class="p-2 bd-highlight"><button className='btn btn-primary rounded-pill'>EN</button>
  <button className='btn btn-secondary rounded-pill ms-2'><i className="fas fa-bars "></i></button>
  </div>
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