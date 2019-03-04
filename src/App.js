import CBT from './Containers/CBT/CBT'
import DailyMaintenance from './Containers/DailyMaintenance/DailyMaintenance'
import NavBar from './Components/Navigation/NavBar'
import PHQ9 from './Containers/PHQ9/PHQ9'
import React, { Component } from 'react';
import 'tachyons';
import './App.css';

const serverURL = 'http://localhost:3001'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			route: 'phq9',
			user_id: 1,
			phq9_result: ''
		}
	}

	onRouteChange = (route) => {
		console.log('state from:', this.state.route);
		console.log('state to:', route);
		this.setState({route: route})
	}

	onSubmitPHQ9 = (data) => {
		let score = data.reduce((acc, cur, i) => i < 9 ? acc + cur : acc);
		fetch(serverURL+'/phq9/'+this.state.user_id, {
			method: 'POST',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				id: this.state.user_id,
				scores: data,
				score: score,
			})
		})
			.then(response => response.json())
			.then(response => this.setState({phq9_result: response}))
			.catch(err => console.log(err));
	}

// pa5-ns
	render() {
		return (
			<div className="App">
				<NavBar 
					onRouteChange={this.onRouteChange}
				/>
				{this.state.route === 'phq9'
				? <PHQ9
					onSubmitPHQ9={this.onSubmitPHQ9}
					submissionResult={this.state.phq9_result}
					/>
				: this.state.route === 'cbt'
				? <CBT/>
				: this.state.route === 'dm'
				? <DailyMaintenance/>
				:<section className="pa2-ns bt black-90 bg-light-gray">
					<h1 className="pa1 ma0">TITLE!</h1>
					<p>Temporary text</p>
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
