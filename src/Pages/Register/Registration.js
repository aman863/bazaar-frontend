import React,{useEffect} from 'react';
import './Register.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Button} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { db } from '../../firebase/firestore';
const Register = () => {
	
	const formik = useFormik({
		initialValues: { email: '', fullname: '', brandname: '', Personalprofilelink: '', 
		Brandpagelink:'',Shortdescription:'',Mobilenumber:'',WhatsappNumber:'',Address:'',GSTNumber:'',ProductCategory:''},
		// validationSchema: Yup.object({
		// 	email: Yup.string()
		// 		.required('Sorry the email is required')
		// 		.email('This is not a valid email'),
		// 	fullname: Yup.string()
		// 		.required('Sorry the name is required'),
		// 	brandname: Yup.string()
		// 		.required('Sorry the brandname is required'),
		// 	Personalprofilelink: Yup.string()
		// 		.required('Sorry this is required'),
		// 	Brandpagelink: Yup.string()
		// 		.required('Sorry this is required'),
		// 	Shortdescription: Yup.string()
		// 		.required('Sorry this is required'),
		// 	Mobilenumber: Yup.string()
		// 		.required('Sorry this is required'),
		// 	WhatsappNumber: Yup.string()
		// 		.required('Sorry this is required'),
		// 	Address: Yup.string()
		// 		.required('Sorry this is required'),
		// 	GSTNumber: Yup.string()
		// 		.required('Sorry this is required'),
		// 	position: Yup.string()
		// 		.required('Sorry yo to say samething')
		// }),
		onSubmit: values => {
			db.collection("user").doc(`${formik.values.Mobilenumber}`).set({
				Name:`${formik.values.fullname}`,
				Role:`seller`,
				address:`${formik.values.Address}`,
				brandName:`${formik.values.brandname}`,
				brandProfileLink:`${formik.values.Brandpagelink}`,
				created_at: Date().toLocaleString(),
				description:`${formik.values.Shortdescription}`,
				email:`${formik.values.email}`,
				gstNumber:`${formik.values.GSTNumber}`,
				mobileNumber:`${formik.values.Mobilenumber}`,
				personalProfileLink:`${formik.values.Personalprofilelink}`,
				ProductCategory:`${formik.values.ProductCategory}`,
				WhatsappNumber:`${formik.values.WhatsappNumber}`,

			})
			.then((docRef) => {
				console.log(`${formik.values}`)
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
			
		}
	})
	return (
		<div>
			{/* header start */}
			<section>
				<div className='container'>
					<div className='row mt-4'>
						<div className='col registration-banner'>
							<h2 className='banner-text'>Zoho.</h2>

						</div>
						<div className='col'>

							<div className='container-registration'>
								<div className='row mt-5 pt-5'>
									<div class="d-flex bd-highlight mb-3">
										<div class="me-auto p-2 bd-highlight"><h1 className='fw-bold register-name'>Registration</h1>
											<form className="mt-3" onSubmit={formik.handleSubmit}>
												<div className="form-group">
													<label htmlFor="fullname" className="form-label-reg">Full Name</label>
													<input
														type="text"
														className="form-control-reg"
														name="fullname"
														placeholder="Enter your name"

														{...formik.getFieldProps('fullname')}
													/>
													{formik.errors.fullname && formik.touched.fullname ?
														<Alert severity="error">
															{formik.errors.fullname}
														</Alert>
														: null}

													<label htmlFor="brandname" className="form-label-rg">Brand Name</label>
													<input
														type="text"
														className="form-control-reg"
														name="brandname"
														placeholder="Enter your brandname"
														{...formik.getFieldProps('brandname')}
													/>
													{formik.errors.brandname && formik.touched.brandname ?
														<Alert severity="error">
															{formik.errors.brandname}
														</Alert>
														: null}
													<label htmlFor="Personalprofilelink" className="form-label-reg">Personal profile link</label>
													<input
														type="text"
														className="form-control-reg"
														name="Personalprofilelink"
														placeholder=" Enter your profile link"
														{...formik.getFieldProps('Personalprofilelink')}
													/>
													{formik.errors.Personalprofilelink && formik.touched.Personalprofilelink ?
														<Alert severity="error">
															{formik.errors.Personalprofilelink}
														</Alert>
														: null}

													<label htmlFor="Brandpagelink" className="form-label-reg">Brand page link</label>
													<input
														type="text"
														className="form-control-reg"
														name="Brandpagelink"
														placeholder=" enter your Brand page link"
														{...formik.getFieldProps('Brandpagelink')}
													/>
													{formik.errors.Brandpagelink && formik.touched.Brandpagelink ?
														<Alert severity="error">
															{formik.errors.Brandpagelink}
														</Alert>
														: null}
													<label htmlFor="email" className="form-label-reg">Email</label>
													<input
														type="text"
														className="form-control-reg"
														name="email"
														placeholder=" enter your email"
														{...formik.getFieldProps('email')}
													/>
													{formik.errors.email && formik.touched.email ?
														<Alert severity="error">
															{formik.errors.email}
														</Alert>
														: null}
													<label htmlFor="Shortdescription" className="form-label-reg">Short description</label>
													<input
														type="text"
														className="form-control-reg"
														name="Shortdescription"
														placeholder=" some description"
														{...formik.getFieldProps('Shortdescription')}
													/>
													{formik.errors.Shortdescription && formik.touched.Shortdescription ?
														<Alert severity="error">
															{formik.errors.Shortdescription}
														</Alert>
														: null}
												</div>

												<div className="form-group-right">
													<label htmlFor="Mobilenumber" className="form-label-reg">Mobile number</label>
													<input
														type="text"
														className="form-control-reg"
														name="Mobilenumber"
														placeholder=" enter your mobile number"
														{...formik.getFieldProps('Mobilenumber')}
													/>
													{formik.errors.Mobilenumber && formik.touched.Mobilenumber ?
														<Alert severity="error">
															{formik.errors.Mobilenumber}
														</Alert>
														: null}
													<label htmlFor="WhatsappNumber" className="form-label-reg">Whatsapp Number</label>
													<input
														type="text"
														className="form-control-reg"
														name="WhatsappNumber"
														placeholder=" enter your whatsapp number"
														{...formik.getFieldProps('WhatsappNumber')}
													/>
													{formik.errors.WhatsappNumber && formik.touched.WhatsappNumber ?
														<Alert severity="error">
															{formik.errors.WhatsappNumber}
														</Alert>
														: null}
													<label htmlFor="Address" className="form-label-reg">Address</label>
													<input
														type="text"
														className="form-control-reg"
														name="Address"
														placeholder=" enter your address"
														{...formik.getFieldProps('Address')}
													/>
													{formik.errors.Address && formik.touched.Address ?
														<Alert severity="error">
															{formik.errors.Address}
														</Alert>
														: null}
													<label htmlFor="GSTNumber" className="form-label-reg">GST Number</label>
													<input
														type="text"
														className="form-control-reg"
														name="GSTNumber"
														placeholder=" GST Number"
														{...formik.getFieldProps('GSTNumber')}
													/>
													{formik.errors.GSTNumber && formik.touched.GSTNumber ?
														<Alert severity="error" >
															{formik.errors.GSTNumber}
														</Alert>
														: null}

													<label htmlFor="ProductCategory" className="form-label-reg">Product Category</label>
													<select name="ProductCategory" className="select"
													name="ProductCategory"
													placeholder=" eg. junior developer"
													{...formik.getFieldProps('ProductCategory')}>
														<option value="1">Product Category</option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="4">4</option>
													</select>

												</div>
												<Button
													endIcon={<ArrowForwardIcon />}
													className="button-reg"
													variant="contained"
													type="submit"
													>
													Next Step
												</Button >
											</form>
											<div>
												Already have an account .<a href="google.com">Sign In</a>
											</div>
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