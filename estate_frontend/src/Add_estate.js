import {useState} from "react";

var count=0;
const fun=(event)=>{
	count++;
	var value=event.target.value;
	var result=check_existed(value,event);
	if(result)
		 alert("already selected");
	else{
		var ele=document.createElement("div");
		ele.style.border="1px solid black";
		ele.style.margin="0px 5px 10px 0px";
		ele.style.borderRadius="5px";
		ele.style.display="flex";
		ele.style.alignItems="center";
		ele.style.padding="5px 20px";
		ele.innerHTML=`<p style="margin-right:10px;">${value}</p><img id="icon_button${count}" style="width:10px;height:10px;cursor:pointer;" src="/icons/cancel.png"/>`;
		event.target.nextSibling.appendChild(ele);
		document.getElementById(`icon_button${count}`).addEventListener("click",function(event){
			document.getElementById(event.target.id).parentNode.remove();
		});
	}
}

const check_existed=(value,event_var)=>{
	var total_ele=event_var.target.nextSibling.children;
	var ele;
	for(ele of total_ele){
		if(ele.children[0].innerHTML===value) return true;
	}
	return false;
}

const submit_fun=()=>{
	var total_ele,ele,text="";
	total_ele=document.getElementsByClassName("input");
	for(ele of total_ele){
		if(ele.tagName.toString()!=="DIV"){
		if(ele.type.toString()!=="checkbox"){
			if(ele.tagName.toString()==="SELECT"){
				if(ele.nextSibling.children.length===0) ele.value="";
			}
			if(ele.value.toString().trim()===""){
				/*alert("Blank field\n"+ele.previousSibling.innerHTML);*/
				document.documentElement.scrollTop=ele.offsetTop-30;
				if(ele.style.animationName.toString()==="red_border"){
					ele.style.animationName="red_border2";
					ele.style.animationDuration="3s";
					}
				else{
					ele.style.animationName="red_border";
					ele.style.animationDuration="3s";
					}
				return;		
			}
		}}
	}
	total_ele=document.getElementById("facilities_text").children;
	for(ele of total_ele){
		text+=ele.children[0].innerHTML+",";
	}
	text=text.slice(0,text.length-1);
	alert(text);
	document.getElementsByName("facilities")[0].value=text;
	text="";
	total_ele=document.getElementById("bhk_text").children;
	for(ele of total_ele){
		text+=ele.children[0].innerHTML+",";
	}
	text=text.slice(0,text.length-1);
	alert(text);
	document.getElementsByName("bhk")[0].value=text;
	alert("details submitted");
	document.getElementById("form").submit();
}

const pageTop=()=>{
	document.getElementById("facilities_text").innerHTML="";
	document.getElementById("bhk_text").innerHTML="";
	document.documentElement.scrollTop=0;
	}

export default function AddEstate(){
	const[checked,checkedfun]=useState(true);
	
	const offer_fun=(event)=>{
		checkedfun(!checked);
		event.target.parentNode.nextSibling.nextSibling.value="";
		if(checked){
			event.target.parentNode.nextSibling.style.display="block";
			event.target.parentNode.nextSibling.nextSibling.style.display="block";
		}
		else{
			event.target.parentNode.nextSibling.style.display="none";
			event.target.parentNode.nextSibling.nextSibling.style.display="none";	
		}
			}

    return(
        <div id="addEstate" className="flex flex-row justify-center pt-10">
            <div id="innerpart" className="pb-10 pl-5 pt-5 mb-5">
                <center id="heading" className="mb-2">Add Estate</center>
		<center><hr className="w-2/5 mb-10"/></center>
		<form id="form" action="http://localhost:8000/add_estate" method="post" enctype="multipart/form-data">
                <p>Building Name:</p>
                	<input className="input" type="text" name="building_name" placeholder="enter building name"/>
                <p>Building Place:</p>
                	<input className="input" type="text" name="building_place" placeholder="enter building place"/>
                <p>Builder Name:</p>
                	<input className="input" type="text" name="builder_name" placeholder="enter builder name"/>
                <p>Builder logo:</p>
                	<input className="input" name="builder_logo" type="file"/>
                <p>Building image:</p>
                	<input className="input" name="building_image" type="file"/>
                <p>Building snapshots:</p>
                	<input classname="input" name="building_snapshots" type="file" multiple/>
		<p>Select no.of bhk</p>
			<select className="input" onChange={(event)=>fun(event)}>
				<option value="1 bhk">one</option>
				<option value="2 bhk">two</option>
				<option value="3 bhk">three</option>
				<option value="4 bhk">four</option>
				<option value="5 bhk">five</option>
				<option value="6 bhk">six</option>
			</select>
		<div className="input flex flex-row flex-wrap mt-3" id="bhk_text"></div>
		<input hidden type="text" name="bhk"/>
                <p>price details:</p>
                	<input className="input" type="text" name="price_details" placeholder="enter about price Ex:1.2L-2.5L"/>
		<p>Select facilities:</p>
			<select className="input" id="facilities" onChange={(event)=>fun(event)}>
				<option value="24*7 security">24*7 security</option>
				<option value="24*7 water">24*7 water</option>
				<option value="24*7 electricity">24*7 electricity</option>
				<option value="swimming pool">swimming pool</option>
				<option value="jogging area">jogging area</option>
			</select>
		<div className="input flex flex-row flex-wrap mt-3" id="facilities_text"></div>
		<input hidden type="text" name="facilities"/>
		<div className="input h-14 flex flex-row items-center">
			<p className="mr-6">
			Is there any offer:
			</p>
			<input className="input w-5 h-5" onChange={offer_fun} type="checkbox"/>
		</div>
		<p style={{animation:"zoom1 1s linear"}} className="hidden">Details about offer:</p>
			<textarea style={{animation:"zoom1 1s linear"}} name="offer_details" className="hidden" placeholder="enter details about offer"></textarea>
		<p>About building</p>
			<textarea className="input" name="about_building" placeholder="enter something about building"></textarea>
		<p>About place of building</p>
			<textarea className="input" name="about_place" placeholder="enter something about place of building"></textarea>
		<br/>
		<button id="submit_button" className="mt-5" type="button" onClick={submit_fun}>submit</button>
		<button id="submit_button" className="ml-5" onClick={pageTop} type="reset">reset</button>
		</form>
            </div>
        </div>
    );
}
