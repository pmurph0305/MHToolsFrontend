import PHQ9 from './Containers/PHQ9/PHQ9'
import React, { Component } from 'react';
import NavBar from './Components/Navigation/NavBar'
import 'tachyons';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			route: 'phq9'
		}
	}

	onRouteChange = (route) => {
		console.log('state from:', this.state.route);
		console.log('state to:', route);
		this.setState({route: route})
	}
// pa5-ns
	render() {
		return (
			<div className="App">
				<NavBar 
					onRouteChange={this.onRouteChange}
				/>
				{this.state.route === 'phq9'
				? <PHQ9/>
				: <section className="pa2-ns bt black-90 bg-light-gray">
					<h1 className="pa1 ma0">TITLE!</h1>
					<p>HFUDGSF*DSD</p>
				</section>
				}
				{/* <DailyMaintenance/>
					<CBT/>
					<CopingSkills/>
					<History/> */}
			</div>
			
		);
	}
}

export default App;
