import {Typography,Button} from "@material-ui/core";
//import {Link} from "react-router-dom";

export default function Card(props){
	var details=props.details;
	return(
		<div id="card" className="mt-10 mb-5 rounded-lg">
			<img id="building" alt="building" src={details["building_image"]}/>
			<div className="flex flex-col pl-5 pr-5 pt-2 h-1/2">
				<div id="company" className="flex flex-row justify-between items-center">
					<Typography variant="h5">
						{details["building_name"]}
					</Typography>
					<img id="avatar" alt="logo" src={details["builder_logo"]}/>
				</div>
				<div id="details" className="flex flex-col justify-between">
					<p className="text-gray-600">{details["builder_name"]}</p>
					<p>{details["bhk"]}</p>
					<p>{details["building_place"]}</p>
					<p><b>{details["price_details"]}</b> onwards</p>
				</div>
				<div id="actions" className="flex flex-row justify-between items-center">
					<Button href={"/detailedCard/"+details["_key"]} style={{marginLeft:"-8px"}}><p className="text-lg" id="more">Click here to know more</p></Button>
					{details["offer_yn"]?<div id="offer">%offer</div>:<div></div>}
				</div>
			</div>
		</div>
	);
}
