import React, { Component } from 'react';
import CartView from './CartView';
import CartForm from './CartForm';
import './CartApp.css';

class CartMain extends Component {

	constructor() {
		super();
		this.state = {cart: []};
		this.updateView = this.updateView.bind(this);
		this.formRef = React.createRef();
		this.viewRef = React.createRef();
		this.selectedItem= {id: 0, name: '', quantity: 0,price: 0};
		this.updateForm = this.updateForm.bind(this);
		this.selectItemInView = this.selectItemInView.bind(this);
		this.getItemById = this.getItemById.bind(this);
	}
    
   
	updateView(){
		this.viewRef.current.updateView();
	}

	updateForm(item){
		this.selectedItem = item;
		this.formRef.current.updateForm(item);
	}

	selectItemInView(id){
		this.viewRef.current.selectItem(id);
	}

	getItemById(id) {
		var item = this.viewRef.current.getItemById(id);
		return item;
	}

	render() {
		return (
			<table><tbody>
				<tr key='head_row'><td colSpan='2'><h2>Shopping Cart Manager</h2></td></tr>
				<tr key='main_row'>
					<td bgcolor="lightblue">
						<div key='cart_form_div'><CartForm key='cart_form' ref = {this.formRef} submitFunc={this.updateView} selectedItem = {this.selectedItem} itemInView = {this.selectItemInView} getItem = {this.getItemById}/></div>
					</td>
					<td>
						<div key='cart_view_div'><CartView key='cart_view' ref = {this.viewRef} cart={this.state.cart} selectCallback = {this.updateForm}/></div>
					</td></tr>
			</tbody></table>);
	}
}

export default CartMain;