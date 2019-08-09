import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Photos from './components/Photos';
import NotFound from './components/NotFound';
import apiKey from './config';


export default class App extends Component {
	// initialize the state of the App component
	state = {
		search: [],
		dogs: [],
		cats: [],
		birds: [],
		loading: null
	};

	// array of default topics
	defaultImages = ['dogs', 'cats','birds' ];

	// when the App component mounts we fetch data for the 3 default topics
	// and store the responses inside the state of the component with 'setState'
	componentDidMount() {
		for (let i = 0; i < this.defaultImages.length; i++) {
			axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.defaultImages[i]}&per_page=24&format=json&nojsoncallback=1`
				)
				.then((response) => {
					console.log(response);
					this.setState({
						[this.defaultImages[i]]: response.data.photos.photo
					});
				})
				.catch((error) => {
					console.log('Error fetching and parsing the data', error);
				});
		}

		// the following makes sure that if the user refresh the page while
		// visiting the '/search/' route the App still functions as it is supposed to
		// by fetching new data. 'handleFetching' is called passing as argument whatever is
		// after '/search/' in the url
		// App is rendered via Route inside index.js so I can access the 'location' object
		const url = this.props.location.pathname;

		if (url.includes('/search')) {
			let query = url.slice(8);
			this.handleFetching(query);
		}
	}

	// method used to fetch data from the API given a topic (query parameter)
	// we set the state of the component with the new response every time the method is invoked.
	handleFetching = (query) => {
		this.setState({
			loading: true
		});

		axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
			)
			.then((response) => {
				this.setState({
					search: response.data.photos.photo,
					loading: false
				});
			})
			.catch((error) => {
				console.log('error fetching and parsing the data', error);
			});
	};

	render() {
		return (
			<div className="container">
				{/*I render the Header component via Route mainly because I need to access the history object which I will use to push a new url path inside the SearchForm component, otherwise I didn't need to use Route since the Header component will be always visible in the app*/}
				<Route render={({ history }) => <Header handleFetching={this.handleFetching} history={history} />} />
				<Switch>
					{/* Depending on the Route, we render the gallery component with different data passed to it. For our defaults we pass the data we already fetched and stored during componentDidMount,for the /search/ Route we pass whatever data is been fetched and store during the form search,  which updates the 'search' property inside the state object of the component */}
					<Route exact path="/" render={() => <Redirect to="/dogs" />} />
					<Route path="/dogs" render={() => <Photos data={this.state.dogs} results="Dogs" />} />
					<Route path="/cats" render={() => <Photos data={this.state.cats} results="Cats" />} />
					<Route path="/birds" render={() => <Photos data={this.state.birds} results="Birds" />} />
					<Route
						path="/search/:query"
						render={({ match }) =>
							this.state.loading ? (
								<h2> Loading... </h2>
							) : (
								<Photos data={this.state.search} results={match.params.query} match={match} />
							)}
					/>
					<Route component={ NotFound } />
				</Switch>
			</div>
		);
	}
}
