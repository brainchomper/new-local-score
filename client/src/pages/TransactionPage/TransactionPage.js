import React from 'react';
import { Card, Button, CardBody, CardTitle, InputNumeric, Container } from 'mdbreact';
import UserAutoSearch from "../../components/UserAutoSearch";
import ProductAutoSearch from "../../components/ProductAutoSearch";
import "./TransactionPage.css";
import { localCheck } from '../../utils/LocalStorage';

// import {localCheck} from "../../utils/LocalStorage"
const axios = require('axios');



class TransactionPage extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.cLogState = this.cLogState.bind(this);
		this.updateCustomer = this.updateCustomer.bind(this);
		this.updateProduct = this.updateProduct.bind(this);
		this.submitTxn = this.submitTxn.bind(this);
		this.lockPrice = this.lockPrice.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.updateParentState = props.propFn.bind(this);
		this.updateParentLogin = this.updateParentLogin.bind(this);

		this.clearTxn = this.clearTxn.bind(this);
		this.state = {
			CustomerLock: false,
			ProductLock: false,
			PriceLock: false,
			Price: 10,
			Customer: "",
			Product: "",
			Party1: ""
		};
	}

	updateParentLogin = (FirstName, LastName, Picture, _id) => {
		this.updateParentState(true, FirstName, LastName, _id, Picture)
	}

	componentDidMount(){
		localCheck(({ fn, ln, p, id }) => {
			this.setState(
				{
					FirstName: fn,
					LastName: ln,
					Picture: p,
					userID: id,
				}, this.updateParentLogin( fn, ln, p, id)
			)
		})
	}

	cLogState() {
		console.log("the state is currently:");
		console.log(this.state)
	}

	clearTxn () {
		this.setState({
			CustomerLock: false,
			ProductLock: false,
			PriceLock: false,
			Price: 10,
			Customer: "",
			Product: "",
			Party1: ""
		})
	}

	lockPrice = () => {
		let obj = !this.state.PriceLock
		this.setState({
			PriceLock: obj
		})
	}

	updateCustomer = (thing, thing2) => {
		console.log("updating the customer", thing, thing2)
		this.setState({
			Party1: thing2,
			Customer: thing,
			CustomerLock: true
		})
	};

	updateProduct = (thing) => {
		console.log("updating the product", thing)
		this.setState({
			Product: thing,
			ProductLock: true
		})
	}

	handleInputChange = event => {
		// Getting the value and name of the input which triggered the change
		const { name, value } = event.target;

		// Updating the input's state
		this.setState({
			[name]: value
		});
	};

	submitTxn() {
		// destructure
		console.log(this.state)
		const { Price, Customer, Product, ProductLock, CustomerLock, PriceLock, Party1 } = this.state;
		//check if the user has locked in their product and customer and price
		if (ProductLock && CustomerLock && PriceLock) {
			// run the api query to post the transaction
			const newTxn = {
				Party1: Party1,
				Party2: Customer,
				ProductID: Product,
				Price: Price
			}

			return axios
				.post("/api/transactions/new_transaction", { newTxn })
				.then(results => { this.clearTxn })
		}
		else {
			return console.log("not everything is locked yet")
		}

	}

	render() {
		return (
			<Container className="">
				<div className="row mx-auto">
					<div className="col mt-4">
						<Card className="text-center ">
							<CardBody className="">
								<CardTitle className=" text-center">Create New Transaction</CardTitle>
								<hr />
								<div className="row text-center">
									<div className="col">
										<h4>Select User</h4>
										<UserAutoSearch updateCustomer={this.updateCustomer} userId={this.state.Party1} />
									</div>
									<div className="col">
										<h4>Select Product</h4>

										<ProductAutoSearch updateProduct={this.updateProduct} />
									</div>
								</div>
								<div className="row text-center">
									<div className="col-4 text-center"></div>
									<div className="col-4 text-center">
										<h4 className="text-center">Item Price $</h4>
										<InputNumeric name="Price" precision={2} value={this.state.Price} step={0.01} className="mb-2" color="success" />
										<Button color="deep-orange" rounded onClick={this.lockPrice}>Lock in Price</Button>
									</div></div>
								<div className="col-4 text-center"></div>

								<div className="col-4">

								</div>
								<Button block size="lg" color="success" rounded onClick={this.submitTxn}>Submit New Transaction</Button>

								{/* <Button block color="success" size="lg" onClick={this.submitTxn}>Submit New Transaction</Button> */}
							</CardBody>

						</Card>
					</div>
				</div>
			</Container>


		);
	}
}
export default TransactionPage;