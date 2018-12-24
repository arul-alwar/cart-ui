import React, { Component } from 'react';
import './CartApp.css';

class CartForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id:'',
			name: '',
			quantity: ''
		};

		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleQuantityChange = this.handleQuantityChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleRemove = this.handleRemove.bind(this);

	}

	handleIdChange(event) {
		this.setState({ id: event.target.value});
	}

	handleNameChange(event) {
		this.setState({ name: event.target.value});
	}

	handleQuantityChange(event) {
		this.setState({ quantity: event.target.value});
	}
    
	handleAdd(event) {
		var request = require('request');
		var options = {
			method: 'post',
			body: this.state,
			json: true,
			url: 'http://localhost:3200/cart'
		};
		request(options, function (err, res, body) {
			if (err) { throw err;	}
		});
    
		this.props.submitFunc();
		event.preventDefault();
	}
    
	handleRemove(event) {
		var request = require('request');
        var item = this.state;
		var urlString = 'http://localhost:3200/cart/';
		urlString+=item.id;
		var options = {
			method: 'delete',
			body: item,
			json: true,
			url: urlString
		};
		request(options, function (err, res, body) {
			if (err) { throw err;	}
		});
		this.props.submitFunc();
		event.preventDefault();
	}

	handleUpdate(event) {
		var request = require('request');
		var item = this.state;
		var urlString = 'http://localhost:3200/cart/';
		urlString+=item.id;
		var options = {
			method: 'patch',
			body: item,
			json: true,
			url: urlString
		};
		request(options, function (err, res, body) {
			if (err) { throw err;	}
		});
		this.props.submitFunc();
		event.preventDefault();
	}

    
	render() {
		return (
			<form >
				<table>
					<tr>
						<th>Id</th><td colSpan='2'><input type="text" value={this.state.value0} onChange={this.handleIdChange} /></td>
					</tr><tr>
						<th>Name</th><td colSpan='2'><input type="text" value={this.state.value1} onChange={this.handleNameChange} /></td>
					</tr><tr>
						<th>Quantity</th><td colSpan='2'><input type="text" value={this.state.value2} onChange={this.handleQuantityChange} /></td>
					</tr><tr>
						<td><button onClick={this.handleAdd}>Add</button></td> 
						<td><button onClick={this.handleRemove}>Remove</button></td>
						<td><button onClick={this.handleUpdate}>Update</button></td>
					</tr>
				</table>
			</form>
		);
	}

}

export default CartForm;