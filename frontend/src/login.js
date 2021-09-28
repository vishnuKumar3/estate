import axios from "axios";

const Api_integration=async ()=>{
		var username=document.getElementById("user").value;
		var password=document.getElementById("password").value;
		var res=username.match(/^[\w\W]+@\w+/g);
		if(res!=null){
			await axios({
				method:"post",
				url:"http://localhost:8000/security/login",
				data:{
					"username":username,
					"password":password
				}
			}).then(
				(res)=>{
					alert(res.data.detail);
					document.cookie="Authorization="+res.data.key;
				}
			)
		}
		else alert("invalid email");
	}
	
const Api_integration2=async ()=>{
		var user_email=document.getElementById("email").value;
		await axios({
			method:"post",
			url:"http://localhost:8000/security/forgot_password_otp",
			data:user_email.toString()
		}).then((res)=>
			{
				alert(res.data.detail);
				if(res.data.status_code==200){
					document.getElementById("recover_password_dialog").style.display="block";
					document.getElementById("forgot_password_dialog").style.display="none";
				}
			}
		);
	}

const Api_integration3=async()=>{
		alert("hello");
		var details=document.querySelectorAll("#recover_password_dialog .input");
		alert(details);
		var username=details[0].value;
		var otp=details[1].value;
		var password=details[2].value;
		var retyped_password=details[3].value;
		alert(username+" "+password);
		if(password===retyped_password){
			alert(password);
			await axios({
				method:"post",
				url:"http://localhost:8000/security/forgot_password",
				headers:{"Content-Type":"application/json"},
				data:{
					"username":username,
					"password":password,
					"otp":otp
				}			
			}).then(
				(res)=>{alert(res.data.detail);}
				)
					}
		else alert("actual and retypes password must be same");
	}


const hide_fun=(ele1,ele2)=>{
		document.getElementById(ele1).style.display="block";
		document.getElementById(ele2).style.display="none";
	}

export default function Signup(){
	return(
		<div id="login" className="fixed w-full h-full flex flex-row justify-center items-center">
			<div id="login_dialog" className="pt-5 pl-5 pr-5 pb-10 bg-white rounded-xl w-5/6 lg:w-1/3">
				<center id="heading"><p>Login</p></center>
				<p className="mt-10">Email:</p>
				<input type="email" id="user" placeholder="enter your email"/>
				<p>Password:</p>
				<input type="password" id="password" placeholder="enter your password"/><br/>
				<button onClick={Api_integration} className="mt-5 mr-5">login</button>
				<button id="login_close_button">close</button><br/><br/>
				<p onClick={()=>{hide_fun("forgot_password_dialog","login_dialog")}} className="cursor-pointer underline">Forgot password</p>
			</div>
			<div id="forgot_password_dialog" className="w-5/6 lg:w-1/3 pt-5 pl-5 pr-5 pb-10 bg-white rounded-xl">
				<div className="flex flex-row items-center">
				<p className="cursor-pointer underline mr-10" onClick={()=>{hide_fun("login_dialog","forgot_password_dialog")}}>back</p>
				<center id="heading"><p>Forgot Password</p></center>
				</div>
				<p className="mt-10">Email:</p>				
				<input type="email" id="email" placeholder="enter your email"/><br/>
				<button onClick={Api_integration2} className="mr-5 mt-3">submit</button>
			</div>
			<div id="recover_password_dialog" className="w-5/6 lg:w-1/3 pt-5 pl-5 pr-5 pb-10 bg-white rounded-xl">
				<div className="flex flex-row items-center">
					<p onClick={()=>{hide_fun("forgot_password_dialog","recover_password_dialog")}} className="mr-10 underline cursor-pointer">back</p>
					<center id="heading"><p>Recover password</p></center>
				</div>
				<p className="mt-10">Email:</p>
				<input type="text" className="input" placeholder="enter email"/>
				<p>Otp:</p>
				<input type="number" className="input" placeholder="enter otp" maxlength="6"/>
				<p>Password:</p>
				<input type="password" className="input" placeholder="enter password"/>
				<p>Retype Password:</p>
				<input type="password" className="input" placeholder="retype password"/><br/>
				<button onClick={Api_integration3} className="mt-3">submit</button>
				<p onClick={()=>{hide_fun("forgot_password_dialog","recover_password_dialog")}} className="underline cursor-pointer mt-5">Resend otp</p>
			</div>
		</div>
	);
}
