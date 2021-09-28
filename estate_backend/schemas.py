from pydantic import BaseModel,EmailStr

class contactAgent(BaseModel):
	name:str
	email:str
	phone:int
	address:str

class user_details(BaseModel):
	username:str
	password:str

class forgot_password_details(BaseModel):
	username:str
	password:str
	otp:int
	
	
