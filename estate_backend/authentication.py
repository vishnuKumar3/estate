from fastapi import APIRouter,Body,status,Depends,Request,status,Query,UploadFile,File
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from datetime import datetime
from jose import jwt
import random
from fastapi_mail import MessageSchema,FastMail,ConnectionConfig

#manual_imports
from database import access_db
from collection import (user)
from schemas import (user_details,forgot_password_details)

conn=ConnectionConfig(
MAIL_FROM="narayanavishnukumarnvk@gmail.com",
MAIL_USERNAME="narayanavishnukumarnvk",
MAIL_PASSWORD="kumar321",
MAIL_PORT=587,
MAIL_SERVER="smtp.gmail.com",
MAIL_TLS=True,
MAIL_SSL=False
)

security_router=APIRouter()
key="ab79b54f3584c091b8f9b1e1c2b26a1c42e010162b8777ee01a97b2c4795178a"
Algorithm="HS256"
pwd_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

@security_router.get("/current_user")
def get_current_user(request:Request):
	try:
		result=jwt.decode(request.cookies.get("Authorization"),key,algorithms=[Algorithm])
		return JSONResponse({
			"status_code":status.HTTP_200_OK,
			"detail":result
			})
	except Exception as e:
		return JSONResponse({
			"status_code":status.HTTP_404_NOT_FOUND,
			"detail":"user not signed in"
			})


@security_router.post("/login")
def login(user_credentials:user_details=Body(...)):
	credentials=user_credentials.__dict__
	username=credentials["username"]
	password=credentials["password"]
	if(user.has(username)):
		user_details=user.get(username)
		if(pwd_context.verify(password,user_details["hash"])):
			store_details={"username":username}
			token=jwt.encode(store_details,key,Algorithm)
			response=JSONResponse({
				"status_code":status.HTTP_200_OK,
				"detail":"successfully logged in",
				"key":token
				})
			response.set_cookie(key="Authorization",value=token)	
			return response
		else:
			return JSONResponse({
				"status_code":status.HTTP_401_UNAUTHORIZED,
				"detail":"password is incorrect"
				})
	else:
		return JSONResponse({
			"status_code":status.HTTP_404_NOT_FOUND,
			"detail":"user not found"
			})

@security_router.post("/forgot_password_otp")
async def forgot_password_otp(email:str=Body(...)):
	if(user.has(email)):
		otp=random.randint(100000,999999)
		details=user.get(email)
		details["otp_hash"]=pwd_context.hash(str(otp));
		user.update(details)
		template=f"""
				<b>Hi there</b>
				<p>Your otp for recovery password is <b>{otp}</b></p>
				<p>Don't share this with anyone</p>
				<h2 style='margin-top:50px'>Thank You</h2>
				<h3>Team Real Estate</h3>
			"""
		html=f"""
Hi there,

Your otp for recovery password is {otp}
Don't share this with anyone

Thank You
Team Real Estate
			"""
		message=MessageSchema(
			subject="Estate:otp to recover password",
			recipients=[email],
			body=html,
			subtype="text"#here html not working correctly(sending double msgs at single time).So to send mail single time we are using text format
		)
		try:
			fm=FastMail(conn)
			await fm.send_message(message)
			return JSONResponse({
				"status_code":status.HTTP_200_OK,
				"detail":"otp sent"
			})
		except Exception as e:
			return JSONResponse({
				"status_code":status.HTTP_503_SERVICE_UNAVAILABLE,
				"detail":"please make sure active internet connection"
			})

	else:
		return JSONResponse({
			"status_code":status.HTTP_404_NOT_FOUND,
			"detail":"user not found"
		})
	



@security_router.post("/forgot_password")
def forgot_password(user_credentials:forgot_password_details=Body(...)):
	credentials=user_credentials.__dict__
	username=credentials["username"]
	password=credentials["password"]
	otp=credentials["otp"]
	if(user.has(username)):
		details=user.get(username)
		if(pwd_context.verify(str(otp),details["otp_hash"])):
			details["otp_hash"]=""
			details["hash"]=pwd_context.hash(password)
			user.update(details)
			return JSONResponse({
				"status_code":status.HTTP_200_OK,
				"detail":"user credentails successfully updated"
			})
		else:
			return JSONResponse({
				'status_code':status.HTTP_401_UNAUTHORIZED,
				'detail':"otp incorrect"
			})
	else:
		return JSONResponse({
			"status_code":status.HTTP_404_NOT_FOUND,
			"detail":"user not found"
		})


@security_router.post("/signup")
def signup(user_credentials:user_details=Body(...)):
	credentials=user_credentials.__dict__
	username=credentials["username"]
	if(not user.has(username)):
		password=pwd_context.hash(credentials["password"])
		user.insert({
			"_key":username,
			"hash":password,
			"created_at":str(datetime.now())
		})
		return JSONResponse({
			"status_code":status.HTTP_200_OK,
			"detail":"successfully added user"
			})
	else:
		return JSONResponse({
			"status_code":status.HTTP_302_FOUND,
			"detail":"user already exist"
			})
	


@security_router.get("/logout")
def logout():
	try:
		response=JSONResponse({
			"status_code":status.HTTP_200_OK,
			"detail":"successfully logged out"
			})
		response.delete_cookie(key="Authorization")
		return response
	except:
		return JSONResponse({
			"status_code":status.HTTP_400_BAD_REQUEST,
			"detail":"already logged out"
			})
	
	
	

