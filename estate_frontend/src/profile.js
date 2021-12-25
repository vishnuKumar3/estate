export default function Profile(){
	return(
		<div id="profile" className="h-full flex flex-row justify-center items-center pl-2 pr-2 lg:pl-0 lg:pr-0">
			<div id="profileBox" className="w-full 2xl:w-1/2 lg:w-1/2 rounded-lg mt-5 2xl:mt-10 lg:mt-10">
				<div id="profileTop" className="flex flex-col lg:flex-row justify-between lg:justify-around items-center mt-5">
					<img alt="profile" src="tony.jpeg"/>
					<p className="font-medium text-4xl uppercase">Tony stark</p>
				</div>
				<p className="mt-10 font-normal text-2xl">About</p>
				<div id="about" className="font-thin text-md mt-3">
				John.C.Martin, “Introduction to Languages and the Theory of Computation” McGraw-Hill Education, 01- May-2010.Kamala Krithivasan, Rama.R, “Introduction to Formal Languages, Automata Theory andComputation”, Pearson Education India, 01-Sep-2009
				</div>
				<p className="mt-5 font-normal text-2xl">Contact Details</p>
				<div id="contact" className="font-thin text-md mt-3">
				<img alt="phone" src="icons/phone.svg"/><p className="mt-2 mb-1">Phone : 93784797289</p>
				<img alt="email" src="icons/email.svg"/><p className="mt-2">Email : Tony@starkindustries.com</p>
				</div>
			</div>
		</div>
	);
}
