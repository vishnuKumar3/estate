import Navbar from "./navbar.js";
import Footer from "./footer.js";
import Card from "./card.js";
import axios from "axios";
import {useState,useEffect} from "react";


//var name={"0":"one","2":"two","3":"three"}

export default function Main(){
	const [data1,datafun]=useState([]);
	const data_fetch=async()=>{
		var res=await axios.get("http://localhost:8000/get_all_estates");
		datafun(res.data);
	}
	useEffect(()=>{
		data_fetch();
		},[])
	return(
		<div id="mainScreen">
			<div id="fixed-navbar">
				<Navbar/>
			</div>
			<div id="body" className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-around lg:flex-wrap">
			{
			data1.map((building)=>(
				<Card details={building}/>
			))			
			}
			</div>
			<Footer/>
		</div>	
	);
}
