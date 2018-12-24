import React, { Component } from 'react';
import CartView from './CartView';
import CartForm from './CartForm';
import './CartApp.css';

class CartMain extends Component {

	constructor() {
		super();
		this.state = {};
		this.cartView = React.createRef();
	}
    
   
	submitCallBackinParent() {
		this.cartView.setState();
	}

	render() {
		return (
			<table>
				<tr><td colSpan='2'><h2>Shopping Cart Manager</h2></td></tr>
				<tr>
					<td bgcolor="lightblue">
						<div><CartForm submitFunc={this.submitCallBackinParent}/></div>
					</td>
					<td>
						<div><CartView ref={this.cartView}/></div>
					</td></tr>
			</table>);
	}
}

export default CartMain;