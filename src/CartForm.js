import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './CartApp.css';

class CartForm extends Component {

	constructor(props) {
		super(props);
		this.currentItem = {id: props.selectedItem.id, name: props.selectedItem.name, quantity: props.selectedItem.quantity, price: props.selectedItem.price};
		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleIdBlur = this.handleIdBlur.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.updateForm = this.updateForm.bind(this);

	}
	


	updateForm(item){
		this.currentItem = {id: item.id, name: item.name, quantity: item.quantity, price: item.price};
		this.forceUpdate();
	}


	handleIdChange(event) {
		this.currentItem.id = event.target.value;
		this.props.itemInView(event.target.value);
		this.forceUpdate();
	}

	handleIdBlur(event) {
		var item = this.props.getItem(event.target.value);
		this.updateForm(item);
	}

	handleNameChange(event) {
		this.currentItem.name = event.target.value;
		this.forceUpdate();
	}

	handleQuantityChange(event) {
		this.currentItem.quantity = event.target.value;
		this.forceUpdate();
	}

	handlePriceChange(event){
		this.currentItem.price = event.target.value;
		this.forceUpdate();
	}

	handleAdd(event) {
		let request = require('request');
		let options = {
			method: 'post',
			body: this.currentItem,
			json: true,
			url: 'http://localhost:3200/cart'
		};
		request(options, function (err, _res, _body) {
			if (err) { throw err; }
			this.props.submitFunc();
		}.bind(this));
		event.preventDefault();
		
	}

	handleRemove(event) {
		let request = require('request');
		let urlString = 'http://localhost:3200/cart/';
		urlString += this.currentItem.id;
		let options = {
			method: 'delete',
			body: this.currentItem,
			json: true,
			url: urlString
		};
		request(options, function (err, _res, _body) {
			if (err) { throw err; }
			this.props.submitFunc();
		}.bind(this));
		event.preventDefault();
	}



	handleUpdate(event) {
		let request = require('request');
		let urlString = 'http://localhost:3200/cart/';
		urlString += this.currentItem.id;
		let options = {
			method: 'patch',
			body: this.currentItem,
			json: true,
			url: urlString
		};
		request(urlString, options, function (err, _res, _body) {
			if (err) { throw err; }
			this.props.submitFunc();
		}.bind(this));
		event.preventDefault();
	}


	render() {
		return (
			<form >
				<table><tbody>
					<tr>
						<th>Id</th><td colSpan='2'><input type="text" value={this.currentItem.id} onChange={this.handleIdChange} onBlur={this.handleIdBlur}/></td>
					</tr><tr>
						<th>Name</th><td colSpan='2'><input type="text" value={this.currentItem.name} onChange={this.handleNameChange} /></td>
					</tr><tr>
						<th>Quantity</th><td colSpan='2'><input type="text" value={this.currentItem.quantity} onChange={this.handleQuantityChange} /></td>
					</tr><tr>
						<th>Price</th><td colSpan='2'><input type="text" value={this.currentItem.price} onChange={this.handlePriceChange} /></td>
					</tr><tr>
						<td><button onClick={this.handleAdd}>Add</button></td>
						<td><button onClick={this.handleRemove}>Remove</button></td>
						<td><button onClick={this.handleUpdate}>Update</button></td>
					</tr>
				</tbody></table>
			</form>
		);
	}

}

CartForm.propTypes = {
	submitFunc: PropTypes.func,
	itemInView: PropTypes.func
};
export default CartForm;