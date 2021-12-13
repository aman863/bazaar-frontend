import initializeAuthentication from '../Firebase/firebase.init';
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { useState } from 'react';

//initialize firebase
initializeAuthentication();


const UseFirebase = () => {

	//take error
	const [error, setError] = useState('');

	const auth = getAuth();

	//sign in using phone
	const signInWithPhone = (phone) => {
		const phoneNumber = phone;
const appVerifier = window.recaptchaVerifier;
signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      // Error; SMS not sent
		setError(error);
      // ...
    });


console.log(phone);
	}


	  return {
		  signInWithPhone,
		  error,
	  }
};

export default UseFirebase;