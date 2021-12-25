//import {Typography} from "@material-ui/core";
import {useEffect} from "react";
/*import axios from "axios";*/
//import Navbar from "./navbar.js";

const fun=async()=>{

		var mainhref=window.location.href;
		/*var key=mainhref.split("/").pop().split("%20").join(" ");*/
		var key=mainhref.split("/").pop();
		var res=await fetch(`http://localhost:8000/get_estate/${key}`);
		res=await res.json();

		document.getElementById("image").src="../"+res["building_image"];
		var snapshots=res["snapshots"];
		var i;
		var data="";
		for(i of snapshots.split(",")){
			data+=`<img id="image" src='../${i}'/>`
			}
		document.getElementById("snapshots").innerHTML=data;
		data="";
		var facility_names=res["facility_details"].split(",");
		res["facilities"].split(",").map((key,index)=>{
			data+=`<div id="icondiv">
				<img id="icon" src="../${key}"/>
				<p>${facility_names[index]}</p>
			</div>`;
			return true;}
			)
		document.getElementById("facilities").innerHTML=data;
		document.getElementById("building").innerHTML=`<p>About Building</p>${res["about_building"]}`;
		document.getElementById("place").innerHTML=`<p>About Place</p>${res["about_place"]}`;
		document.getElementById("pricing").innerHTML=`<p>${res["price_details"]}</p>`;
		document.getElementById("offer_details").innerHTML=res["offer_details"];
		/*await fetch(`http://locahost:8000/get_estate/${key}`).then(res=>res.json()).then(res=>{
			alert(res);
			document.getElementById("image").src=res[key]["building_image"];
			var snapshots=res[key]["snapshots"];
			var i;
			var data="";
			for(i of snapshots){
				data+=`<img id="image" src='${i}'/>`
				}
			document.getElementById("snapshots").innerHTML=data;
			data="";
			Object.entries(res[key]["facilities"]).map(([key,value])=>(
				data+=`<div id="icondiv">
					<img id="icon" src="../icons/${key}.png"/>
					<p>${value}</p>
				</div>`)
				)
			document.getElementById("facilities").innerHTML=data;
			document.getElementById("building").innerHTML=`<p>About Building</p>${res[key]["about_building"]}`;
			document.getElementById("place").innerHTML=`<p>About Place</p>${res[key]["about_place"]}`;
			document.getElementById("pricing").innerHTML=`<p>${res[key]["pricing_details"]}</p>`;
			document.getElementById("offer_details").innerHTML=res[key]["offer_details"];
			
		});*/
	}


const contactAgent=()=>{
	var fields=document.querySelectorAll("#dialog input");
	var textarea=document.querySelector("#dialog textarea");
	var details={}
	details["name"]=fields[0].value;
	details["email"]=fields[1].value;
	details["phone"]=fields[2].value;
	details["address"]=textarea.value;
	fetch("http://localhost:8000/contactAgent",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(details)}).then(response=>response.json()).then(res=>{
	alert(res);
	fields[0].value="";
	fields[1].value="";
	fields[2].value="";
	textarea.value="";
	});
	alert("Sending of details to agent is in progress");
}


const mousefun=(id)=>{
	document.documentElement.scrollTop=document.getElementById(id).offsetTop-70;
}


export default function Detail(){
	useEffect(()=>{
		/*window.addEventListener("scroll",()=>paddingAdjust());*/
		var ar=document.getElementsByClassName("dialog_close");
		var element;
		
		for(element of ar){ 
			element.addEventListener("click",function(){
				document.getElementById("dialog_contact").style.display="none";
			})
		}
		document.getElementById("contact_button").addEventListener("click",function(){
			document.getElementById("dialog_contact").style.display="flex";
		})
		fun();
	})
	return(
		<div id="detailedView" className="lg:pl-5 pl-2 pr-2 flex flex-col justify-start items-start">
			<img id="image" className="w-full" alt="building_image" src=""/>
			<div id="tabview" className="lg:block none lg:visible hidden mt-5 w-full flex flex-row justify-start items-center pl-4 pt-3 pb-3 sticky">
				<button onClick={()=>mousefun("snapshots")}>Snapshots</button>
				<button onClick={()=>mousefun("building")}>About Building</button>
				<button onClick={()=>mousefun("place")}>About Place</button>
				<button onClick={()=>mousefun("heading_facilities")}>Facilities</button>
				<button onClick={()=>mousefun("heading_offer")}>Offer</button>
				<button onClick={()=>mousefun("heading_pricing")}>Pricing</button>
			</div>
			<div id="snapshots" class=" flex flex-row justify-start mt-10 w-full"></div>
			<p id="building" className="mt-5 w-full"></p>
			<p id="place" className="mt-5 w-full"></p>
			<p id="heading_facilities" className="mt-10">Facilities</p>
			<div id="facilities" className="flex flex-row items-center w-full lg:w-2/5 flex-wrap mt-5"></div>
			<div id="offer" className="mt-5">
				<p id="heading_offer" className="mt-3">Offer</p>
				<p id="offer_details" className="mt-5"></p>
			</div>
			<p id="heading_pricing" className="mt-7">Pricing</p>
			<div id="pricing" className="mt-3">
			</div>
			<button id="contact_button" className="mt-5">Contact Agent</button>
			<div id="dialog_contact">
				<div id="dialog" className="pl-5 pt-5 pb-10 w-5/6 lg:w-2/5 bg-white rounded-xl">
					<center id="heading">Contact Agent</center>
					<p className="mt-10">Name:</p>
						<input type="text" placeholder="enter your name"/>
					<p>Email:</p>
						<input type="email" placeholder="enter your email"/>
					<p>Contact:</p>
						<input type="number" minlength="10" maxlength="10" placeholder="enter your contact number"/>
					<p>Address:</p>
						<textarea placeholder="enter your address">
						</textarea>
					<br/>					
						<button onClick={contactAgent} className="mt-8 mr-5 dialog_close">contact</button>
						<button class="dialog_close">close</button>
				</div>
			</div>
		</div>
	);
}
