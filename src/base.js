import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyD_Y6UIMcSIbiRpAlsKXXOmY21gxeSVJI8",
	authDomain: "blog-2d435.firebaseapp.com",
	databaseURL: "https://blog-2d435.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;