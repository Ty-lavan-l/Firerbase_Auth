
import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyCK4eTayCu5zeEb6zfRvaDng9PrjJbGaqE",
  authDomain: "fir-auth-b5826.firebaseapp.com"
})


class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        <>
  <main>
    <section className="glass">
      <div className="dashboard">
        <div className="user">
          <h3>Registration Page</h3>
          <p>Pro Member</p>
        </div>
        <div className="links">
        {this.state.isSignedIn ? (
          <span>
           <h1>Success</h1>
           <button type="button" class="button1"  onClick={() => firebase.auth().signOut()}>SignOut!</button>
          </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
        </div>
        <div className="pro">
          <h2>Join pro for free games.</h2>
          <img src="./controller.png" alt="" />          
        </div>
      </div>
      <div className="games">
        
      {this.state.isSignedIn ? (
          <span>
            <div className='success'>Successfully Signed In!</div>
            <button type="button" class="button"  onClick={() => firebase.auth().signOut()}>SignOut!</button>
            <h2 className='userName'>Welcome {firebase.auth().currentUser.displayName}</h2>
            <img className='center'
              alt="profile"
              src={firebase.auth().currentUser.photoURL}
            />
          </span>
        ) : (
         <div>
           <form>
            <label htmlFor="fname">Email or Phone :</label><br />
            <input type="text" id="fname" placeholder="Enter Your Email" /><br /><br />
            <label htmlFor="lname">Password :</label><br />
            <input type="text" id="lname" placeholder="Enter Your Password" /><br /><br />
            <button type="button" class="button">Login</button>
          </form>
         </div>
        )}
      </div >
    </section>
    
  </main>
  <div className="circle1" />
  <div className="circle2" />
</>
      </div>
    )
  }
}

export default App