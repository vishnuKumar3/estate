from fastapi import FastAPI,Body,Path,Query,Form,status,UploadFile,File
from typing import List,Optional
from datetime import date,datetime,time
from fastapi.responses import JSONResponse,HTMLResponse
from arango import ArangoClient
from fastapi_mail import FastMail,ConnectionConfig,MessageSchema
from fastapi.middleware.cors import CORSMiddleware
import shutil

#manual_imports
from schemas import contactAgent
from database import access_db
from collection import building
from authentication import (security_router)

app = FastAPI()

app.include_router(
	security_router,
	prefix="/security",
	tags=["security"]
	)

origins = [
    "*"
]

db=access_db()


conn=ConnectionConfig(
MAIL_FROM="narayanavishnukumarnvk@gmail.com",
MAIL_USERNAME="narayanavishnukumarnvk@gmail.com",
MAIL_PASSWORD="kumar321",
MAIL_PORT=587,
MAIL_SERVER="smtp.gmail.com",
MAIL_TLS=True,
MAIL_SSL=False
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/add_estate",tags=["Estate"],response_class=HTMLResponse)
def add_estate(
	building_name:str=Form(...),building_place:str=Form(...),builder_name:str=Form(...),builder_logo:UploadFile=File(...),
	building_image:UploadFile=File(...),building_snapshots:List[UploadFile]=File(...),bhk:str=Form(...),
	price_details:str=Form(...),facilities:str=Form(...),offer_details:Optional[str]=Form("empty"),about_building=Form(...),
	about_place=Form(...)
	):
	facilities_src={"24*7 security":"icons/security.png","24*7 water":"icons/water.png",
	"24*7 electricity":"icons/power.png","swimming pool":"icons/pool.png","jogging area":"icons/pool.png"}
	facility=""
	facility_details=""
	for i in facilities.split(","):
		facility+=facilities_src[i]+","
		facility_details+=i+","
	facility=facility[0:len(facility)-1]
	facility_details=facility_details[0:len(facility_details)-1]
	#extracting all snapshots
	snapshots=""
	for i in building_snapshots:
		snapshots+="images/"+i.filename+","
	snapshots=snapshots.strip()
	snapshots=snapshots[0:len(snapshots)-1]
	#copying images to destination
	building_snapshots.extend([builder_logo,building_image])
	for i in building_snapshots:
		with open(f"../frontend/public/images/{i.filename}","wb") as newfile:
			shutil.copyfileobj(i.file,newfile)
	#offer existed or not
	offer_yn=True
	if len(offer_details.strip())==0:
		offer_yn=False
	building.insert({
		"building_name":building_name,
		"building_place":building_place,
		"builder_name":builder_name,
		"builder_logo":"images/"+builder_logo.filename,
		"building_image":"images/"+building_image.filename,
		"bhk":bhk,
		"facilities":facility,
		"facility_details":facility_details,
		"snapshots":snapshots,
		"price_details":price_details,
		"offer_yn":offer_yn,
		"offer_details":offer_details,
		"about_building":about_building,
		"about_place":about_place,
		"created_at":str(datetime.now())
	})
	return '''
		<html>
		<script>
		window.onload=funciton(){
			window.history.back();}
		</script>
		</html>	
		'''


@app.get("/get_all_estates",tags=["Estate"])
def get_all_estates():
	building_list=[]
	for i in building:
		building_list.append(i)
	return building_list

@app.get("/get_estate/{key}",tags=["Estate"])
def get_estate(key:str=Path(...)):
	print(f"KEY OS GIVEN KSIJJKS  IIS {key}")
	return building[key]


@app.post("/contactAgent",tags=["Contact"])
async def contact_agent(contactDetails:contactAgent):
	contact=contactDetails.__dict__
	html=f"<center><h1 style='color:blue;'>CLIENT DETAILS</h1></center><p>Name:{contact['name']}</p><p>Email:{contact['email']}</p><p>contact number:{contact['phone']}</p><p>Address:{contact['address']}</p><h2 style='margin-top:50px'>Thank You</h2><h3>Team Real Estate</h3>"
	msg=MessageSchema(
		subject="real estate client",
		recipients=["narayanavishnukumar@gmail.com"],
		body=html,
		subtype="html"	
	)
	fm=FastMail(conn)
	await fm.send_message(msg)
	return "details sent"


