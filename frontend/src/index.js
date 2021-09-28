import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/tailwind.css'
import './styles/style.css';
import "./styles/add_estate.css";
import Navbar from "./navbar.js";
import Footer from "./footer.js";
import Main from "./mainScreen.js";
import Card from "./card.js";
import DetailedCard from "./detailedCard.js";
import Signup from "./signup.js";
import Login from "./login.js";
import AddEstate from "./Add_estate.js";
import {BrowserRouter,Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

function Index(){
	return(
		<BrowserRouter>
			<Route exact path="/" component={Main}/>
			<Route path="/navbar" component={Navbar}/>
			<Route path="/footer" component={Footer}/>
			<Route path="/card" component={Card}/>
			<Route path="/detailedCard/*" component={DetailedCard}/>
			<Route path="/signup" component={Signup}/>
			<Route path="/login" component={Login}/>
			<Route path="/addEstate" component={AddEstate}/>
		</BrowserRouter>
	);
	}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
