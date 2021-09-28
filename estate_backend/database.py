from arango import ArangoClient

db_username="root"
db_password="arangodb"
db_name="Estate"


def access_db():
	host=ArangoClient(hosts="http://localhost:8529")
	main_db=host.db("_system",username=db_username,password=db_password)
	db=None
	try:	
		db=main_db.create_database(db_name)
		db=host.db(db_name,username=db_username,password=db_password)
	except Exception as e:
		db=host.db(db_name,username=db_username,password=db_password)

	finally:
		return db
		

