/*import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';useTheme*/
import {Typography,Button} from "@material-ui/core";

const Desktop=()=>{
	return(
		<div id="footer-desktop" className="text-black lg:text-white">
			<div className="flex flex-col justify-around items-center lg:items-start lg:flex-row lg:justify-between">
				<div className="w-10/12 lg:w-5/12">
					<Typography variant="h4">
						About Us
					</Typography>
					<p className="mt-5 text-md">
						Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit ametipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit ametipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit ametipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet
					</p>
				</div>
				<div className="w-full mt-10 lg:mt-0 lg:w-1/2 flex flex-col items-center text-black">
					<Typography variant="h4">
						Quick Links
					</Typography>
					<div className="flex flex-col items-center lg:items-start mt-5">
						<Button>How it Works</Button>
						<Button>Faq's</Button>
						<Button>Terms & conditions</Button>
						<Button>Privacy policy</Button>					
					</div>
				</div>
			</div>
			<div className="mt-10 flex flex-col justify-around items-center lg:flex-row lg:justify-between">
				<div className="w-full justify-center lg:w-1/2 flex lg:justify-start">
					<div className="text-center">
					<Typography variant="h4">
						Contact us on
					</Typography>
					<p className="mt-5">contactus@domain.com</p>
					<p>Address</p>
					<p>Address</p>
					<p>Address</p>
					<p>Address</p>
					</div>
				</div>
				<div className="w-full pb-14 mt-10 lg:mt-0 lg:pb-0 lg:w-1/2 flex flex-col items-center justify-center">

					<Typography variant="h4">
						Stay in touch
					</Typography>		
					<div className="flex flex-row lg:justify-between justify-around w-10/12 lg:w-2/5 mt-5">
						<Button><i class="fab fa-instagram" id="icon"></i></Button>
						<Button><i class="fab fa-facebook" id="icon"></i></Button>
						<Button><i class="fab fa-linkedin" id="icon"></i></Button>
						<Button><i class="fab fa-twitter" id="icon"></i></Button>
					</div>
				</div>
			</div>
		</div>
	);
}

/*const Mobile=()=>{
	return(
		<div id="footer-mobile">
		</div>
	);
}*/


export default function Footer(){
	//const theme=useTheme()
	//const mobile=useMediaQuery(theme.breakpoints.up("md"));
	return(
		<div id="footer">
			<Desktop/>
		</div>
	);
}
