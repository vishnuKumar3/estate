import axios from "axios"

const Api_integration=async ()=>{
		var username=document.getElementById("signup_user").value;
		var password=document.getElementById("signup_password").value;
		var retyped_password=document.getElementById("signup_retyped_password").value;
		if(password===retyped_password){
			var res=username.match(/^[\w\W]+@\w+/g);
			if(res!=null){
				await axios({
					method:"post",
					url:"http://localhost:8000/security/signup",
					headers:{"Content-Type":"application/json"},
					data:{
						"username":username,
						"password":password
					}
				}).then(
					(res)=>{
						alert(res.data.detail);
					}
				)
			}
			else alert("invalid email");
			}
		else{
			alert("actual and retyped password must be same");
		}
	}

export default function Signup(){
	return(
		<div id="signup" className="fixed w-full h-full flex flex-row justify-center items-center">
			<div id="signup_dialog" className="pt-5 pl-5 pb-10 bg-white rounded-xl w-5/6 lg:w-1/3">
				<center id="heading"><p>Signup</p></center>
				<p className="mt-10">Email:</p>
				<input type="email" id="signup_user" placeholder="enter your email"/>
				<p>Password:</p>
				<input type="password" id="signup_password" placeholder="enter your password"/><br/>
				<p>confirm Password:</p>
				<input type="password" id="signup_retyped_password" placeholder="retype the password"/><br/>
				<button onClick={Api_integration} className="mt-5 mr-5">signup</button>
				<button id="signup_close_button">close</button>
			</div>
		</div>
	);
}
