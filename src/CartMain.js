import React, { Component } from 'react';
import CartView from './CartView';
import CartForm from './CartForm';
import './CartApp.css';

class CartMain extends Component {

	constructor() {
		super();
		this.state = {cart: []};
		this.updateView = this.updateView.bind(this);
	}
    
   
	updateView(){
		fetch('http://localhost:3200/cart', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then(
			function(res) { return res.json(); 
			}).then(
			json => { this.setState({ cart: json });
				console.log(JSON.stringify(this.state));
			}).catch(error => console.log(error));
	}

	render() {
		return (
			<table><tbody>
				<tr key='head_row'><td colSpan='2'><h2>Shopping Cart Manager</h2></td></tr>
				<tr key='main_row'>
					<td bgcolor="lightblue">
						<div key='cart_form_div'><CartForm key='cart_form' submitFunc={this.updateView}/></div>
					</td>
					<td>
						<div key='cart_view_div'><CartView key='cart_view' cart={this.state.cart}/></div>
					</td></tr>
			</tbody></table>);
	}
}

export default CartMain;