import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component {

  // Load the API's client and auth2 modules once the component mounted
  componentDidMount() {
    window.gapi.load('client:auth2', this.initClient)
  }

  // Initialze gapi.client one the client and auth2 loaded
  initClient = () => {
    window.gapi.client.init({
      'clientId' : '287522597675-dvgft7kai9b540jbsbg47uddf828l13i.apps.googleusercontent.com',
      'scope': 'email'
    }).then(() => {
      // Initialize getAuthInstance()
      this.auth  = window.gapi.auth2.getAuthInstance();
      // update the isSignedIn State
      this.onAuthChange(this.auth.isSignedIn.get())
      //listen to Auth state change
      this.auth.isSignedIn.listen(this.onAuthChange);
      
    })
  }

  // Change sign State
  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId())
    } else {
      this.props.signOut()
    }
  }

  // SIGN IN METHOD
  OnsignInClick = () => {
    this.auth.signIn()
  }
  // SIGN OUT METHOD
  OnsignOutClick = () => {
    this.auth.signOut()
  }

  // Auth Button
  authButton = () => {
    if(this.props.isSignedIn === null) {
      return <div>Loading..</div>
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.OnsignOutClick} className='bg-red-600 text-slate-50 py-2 px-3 rounded-sm'>Sign Out</button>
      );
    } else {
      return (
        <button onClick={this.OnsignInClick} className='bg-blue-500 text-slate-50 py-2 px-3 rounded-sm'>Sign In</button>
      );
    }
  }

  render() {
    return <div>{this.authButton()}</div>
  }
}
// Get signedIn State from authReducer as a prop
const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn}
}
// connect actions & reducers with GoogleAuth Component
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)