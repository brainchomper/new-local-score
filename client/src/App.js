import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import SideBar from "./pages/SideBar";
import Login from "./pages/Login.js";
import ProductFeed from "./pages/ProductFeed";
import TeamPage from './pages/TeamPage';
import Landing from './components/Landing';
import Account from './pages/Account.js';
import TransactionPage from "./pages/TransactionPage";
import BoardingSurvey from "./components/BoardingSurvey"
import Register from "./components/Auth/Register";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage"
import Logout from "./pages/Logout"

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			LoggedIn: false,
			collapsed: false,
			FirstName: "",
			LastName: "",
			userID: "",
			Picture: '',

		};
		this.handleNavbarClick = this.handleNavbarClick.bind(this);
		this.handleTogglerClick = this.handleTogglerClick.bind(this);
		this.updateUserState = this.updateUserState.bind(this);
	}

	updateUserState = (auth, fname, lname, userID, picUrl) => {
		const that = this;
		console.log(auth, fname, lname, userID, picUrl)
		console.log("updating the things")
		console.log(this.state);
		that.setState({
			LoggedIn: auth,
			FirstName: fname,
			LastName: lname,
			userID: userID,
			Picture: picUrl
		});
	}

	handleTogglerClick() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	handleNavbarClick() {
		this.setState({
			collapsed: false
		});
	}

	render() {
		const collapsed = this.state.collapsed;
		const overlay = <div id="sidenav-overlay" style={{ backgroundColor: 'transparent' }} onClick={this.handleNavbarClick} />
		return (


			<React.Fragment>
				<SideBar props={this.state} />
				<Router>
					<Switch props={this.state}>
						<Route exact path="/" render={() => <Landing props={this.state} propFn={this.updateUserState} />} />
						<Route exact path="/welcome" render={() => <Account props={this.state} propFn={this.updateUserState} />} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/team" component={TeamPage} />
						<Route exact path="/login" render={() => < Login props={this.state} propFn={this.updateUserState} />} />
						<Route exact path="/products" render={() => < ProductFeed props={this.state} propFn={this.updateUserState} />} />
						<Route exact path="/account" render={() => < Account props={this.state} propFn={this.updateUserState} />} />
						<Route exact path="/new-product" render={() => < BoardingSurvey props={this.state} propFn={this.updateUserState} />} />
						<Route exact path="/transactions" render={() => < TransactionPage props={this.state} propFn={this.updateUserState} />} />
						<Route path="/product-history/:productid" component = {HistoryPage} />
						<Route path ="/logout" render ={()=> <Logout propFn = {this.updateUserState} /> } />
					</Switch>
				</Router>
			</React.Fragment>



		);
	}
}

export default App;
