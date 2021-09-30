import {Typography,Button,useTheme,useMediaQuery,Drawer} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Login from "./login.js";
import Signup from "./signup.js";
import {useEffect, useState,useContext} from "react";
import {Logincontext} from "./index.js";
import axios from "axios";

const logout=async ()=>{
	var result=await axios.get("http://localhost:8000/security/logout");
	if(result.data.status_code===200) {
			alert(result.data.detail);
			var d=new Date();
			d.setTime(d.getTime()-60*1000);
			document.cookie="Authorization=;expires="+d.toUTCString();
			return true;
			}
	else{ alert(result.data.detail);return false;}
}

const Desktop=()=>{
	const {check,setCheck}=useContext(Logincontext);
	return(
		<div className="flex flex-row justify-around items-center" id="navbar-desktop">
			<Typography variant="h4">Logo</Typography>
			<div className="flex flex-row justify-end" id="navbar-center">
				{/*<Button color="primary">Buy</Button>*/}
				<Button href="/addEstate" color="primary">Add Estate</Button>
				{/*<Button color="primary">Sell</Button>*/}
			</div>
			{check?
			<div className="flex flex-row justify-around" id="navbar-right">
				<Button onKeyDown={()=>{
					logout().then((res)=>{
					if(res) setCheck(!check);
				})}} className="login_button" disbaleElevation>Logout</Button>
				<Button className="signup_button" disableElevation>SignUp</Button>
			</div>:
			<div className="flex flex-row justify-around" id="navbar-right">
				<Button className="login_button" disbaleElevation>Login</Button>
				<Button className="signup_button" disableElevation>SignUp</Button>
			</div>
			}
		</div>
	);
}

const MobileView=()=>{
	const [open_var,check]=useState(false);
	return(
		<div className="flex flex-row items-center" id="navbar-mobile">
			<Button onClick={()=>check(true)} color="primary"><MenuIcon/></Button>
			<div className="flex flex-row justify-between w-full h-full items-center">
				<Typography variant="h4">Logo</Typography>				
				<div className="h-full flex flex-row w-1/2 mr-5 justify-end items-center">
					<Button className="login_button" disbaleElevation>Login</Button>
					<Button className="signup_button" disableElevation>SignUp</Button>				
				</div>
			</div>
			<Drawer className="flex flex-col items-start" anchor='left' open={open_var} onClose={()=>check(false)}>
				<div style={{width:"200px"}}>
				<div className="flex flex-row-reverse">
				<Button onClick={()=>check(false)}><ChevronLeftIcon/></Button>
				</div>
				<br/>
				{/*<Button className="w-full" color="primary">Buy</Button>*/}
				<Button href="/addEstate" className="w-full" color="primary">Add Estate</Button>
				{/*<Button className="w-full" color="primary">Sell</Button>*/}				
				</div>
			</Drawer>
		</div>		
	);
	}

export default function Navbar(){
	useEffect(()=>{
		document.getElementById("login_close_button").addEventListener("click",function(){
			document.getElementById("login").style.display="none";
		});
		var ar=document.getElementsByClassName("login_button");
		var element;
		for(element of ar){
			element.addEventListener("click",function(){
				document.getElementById("login").style.display="flex";
			})
		}
		document.getElementById("signup_close_button").addEventListener("click",function(){
			document.getElementById("signup").style.display="none";
		});
		ar=[]
		ar=document.getElementsByClassName("signup_button");
		for(element of ar){
			element.addEventListener("click",function(){
				document.getElementById("signup").style.display="flex";
			})
		}
	})
	const theme=useTheme();
	const mobile=useMediaQuery(theme.breakpoints.up("md"));
	return(
		<div id="navbar">
		{mobile?<Desktop/>:<MobileView/>}
		<Login />
		<Signup/>
		</div>
	);
}



