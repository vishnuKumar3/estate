from database import access_db

db=access_db()
estate=None

if(db.has_graph("estate")):
	estate=db.graph("estate")
else:
	estate=db.create_graph("estate")

estate.traverse(
	start_vertex="user/narayanavishnukumar@gmail.com",
	direction="outbound",
	strategy="bfs"
)

def get_vertex(vertex_name):
	if estate.has_vertex_collection(vertex_name):
		return estate.vertex_collection(vertex_name)
	else:
		return estate.create_vertex_collection(vertex_name)

def get_edge(name,from_vertices,to_vertices):
	if estate.has_edge_definition(name):
		return estate.edge_collection(name)
	else:
		return estate.create_edge_definition(
			edge_collection=name,
			from_vertex_collections=from_vertices,
			to_vertex_collections=to_vertices
		)
#vertices
building=get_vertex("building")
user=get_vertex("user")
profile=get_vertex("profile")
#edges
building_user=get_edge("building_user",["building"],["user"])

