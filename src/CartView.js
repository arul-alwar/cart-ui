import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './CartApp.css';

class CartView extends Component {

	constructor(props) {
		super(props);
		this.state = { cart: this.props.cart };
	}

	componentWillReceiveProps(nextProps) {
		this.setState({cart: nextProps.cart});
	}
	
	componentWillMount() {
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
				
				
				<table><tbody>
					<tr key='headrow'><th>Id</th><th>Item</th><th>Quantity</th></tr>
					{
						this.state.cart.map(((item, index) =>
							<tr className='itemRow' role='row' key={index}>
								<td>{item.id}</td>
								<td>{item.name}</td>	
								<td>{item.quantity}</td>
							</tr>
						))
					}
				</tbody></table> 
			</div>
		);

	
	}

}

CartView.propTypes = {
	cart: PropTypes.arrayOf({
		id: PropTypes.number,
		name: PropTypes.string,
		quantity: PropTypes.number
	  }
	)
};
export default CartView;
