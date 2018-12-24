import React, { Component } from 'react';
import './CartApp.css';

class CartView extends Component {

	constructor(props) {
		super(props);
		this.state = { cart: [] };
	}

	componentDidMount() {
		fetch('http://localhost:3200/cart', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(res => { return res.json(); })
			.then(json => { this.setState({ cart: json });
			});
	}

	render() {
		return (
			<div>
				<table>
					<tr><th>Id</th><th>Item</th><th>Quantity</th></tr>
					{
						this.state.cart.map((item =>
							<tr>
								<td key="{item.id}">{item.id}</td>
								<td key="{item.id}">{item.name}</td>
								<td key="{item.id}">{item.quantity}</td>
							</tr>
						))
					}
				</table>
			</div>
		);

	
	}

	update() {
		this.setState();
	}

}

export default CartView;
