import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './CartApp.css';

class CartView extends Component {

	constructor(props) {
		super(props);
		this.state = { cart: this.props.cart};
		this.totalPrice = 0;
		this.selectItem = this.selectItem.bind(this);
		this.handleItemClick = this.handleItemClick.bind(this);
		this.updateView = this.updateView.bind(this);
		this.currentItemId = 0;
	}

	handleItemClick(event) {
		var arr = this.state.cart;
		this.totalPrice = 0;
		var item  = arr.find(function (element){
			return element.id == event.target.value;
		});
		this.currentItemId = item.id;
		this.props.selectCallback(item);
		this.forceUpdate();
	}

	updateView(){
		this.totalPrice = 0;
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
			}).catch(error => console.log(error));
	}

	selectItem(id){
		this.currentItemId = id;
		this.totalPrice = 0;
		this.forceUpdate();
	}

	getItemById(id) {
		var arr = this.state.cart;
		var item  = arr.find(function (element){
			return element.id == id;
		});
		return item;
	}

	componentWillMount() {
		this.updateView();
	}

	
	render() {
		this.totalPrice = 0;
		return (
			<div>
				<table><tbody>
					<tr key='headrow'><th> </th><th>Id</th><th>Item</th><th>Quantity</th><th>Price</th></tr>
					{
						this.state.cart.map(((item, index) =>
							<tr className='itemRow' role='row' key={index}>
								<td><input type = 'radio' name = 'selItem' value = {item.id} onClick = {this.handleItemClick} checked={this.currentItemId==item.id}></input></td>
								<td>{item.id}</td>
								<td>{item.name}</td>	
								<td>{item.quantity}</td>
								<td>{item.price}</td>
								
							</tr>
						))
					}
					{
						this.state.cart.map(function(item){
							this.totalPrice = parseInt(item.price) + parseInt(this.totalPrice);
						}, this)
					}
					<tr key = "bottomrow"><th colSpan='4'>Total Cost</th><th>{this.totalPrice}</th></tr>
				</tbody></table> 
			</div>
		);

	
	}

}

CartView.propTypes = {
	cart: PropTypes.arrayOf({
		id: PropTypes.number,
		name: PropTypes.string,
		quantity: PropTypes.number,
		price: PropTypes.number
	  }
	),
	totalPrice: PropTypes.number
};
export default CartView;
