import React from 'react';

// const deployAddr = "https://obscure-everglades-16133.herokuapp.com";

// const Signin = ({onRouteChange}) => {
class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail:'',
			signInPassword:''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}	
	
	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		// console.log(this.state);
		/*fetch('http://localhost:3000/signin',{*/
		/*fetch(`${deployAddr}/signin`,{*/
		fetch('https://obscure-everglades-16133.herokuapp.com/signin',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			/*if(data === 'success'){*/
			if(data.id){
				this.props.loadUser(data);
				this.props.onRouteChange('home')
			} else {
				alert("Wrong user or password");
			}
		})
	}

	render() {
		const { onRouteChange } = this.props;
		const key = document.onkeypress= (key) => {if(key.which === 13) {this.onSubmitSignIn()}};
		return (
		<article className="br3 ba dark-gray b--white-80 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 white">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			     <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black b--white-30 hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        onChange={this.onEmailChange}
			        />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black b--white-30 hover-white w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password"
			        	onChange={this.onPasswordChange}
		        	/>
			      </div>
			      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
			    </fieldset>
			    <div className="">
			      <input 
			      	/*onClick={() => onRouteChange('home')}*/
			      	onClick={this.onSubmitSignIn}
			      	className="b ph3 pv2 b--white-80 white input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" 
			      	value="Sign in"
			      />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick={() => onRouteChange('Register')} className="f6 link dim white db ">register</p>
			      <a href="#0" className="f6 link dim white db">Forgot your password?</a>
			    </div>
			  </div>
			</main>
		</article>
		);
	}
}

export default Signin;