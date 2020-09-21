#API Public Routes Documentation 

This API documentation only lists the public routes that the clients can access, there are some other routes defined in this project, but they are for others API implementations purposes only. 

Parameters in the routes are in italic and preceded by ‘:’ 

##Registration

**POST** /register/*:email*/*:password*/ 

Description: Let the client create an account in database 

##Login 

**POST** /login/*:email*/*:password*/ 

**POST** /login/oauth2/check/*:email*/ 

Description: Let the client login with email and password or with oauth2 

##Logout 

**POST** /logout/*:email*/ 

Description: Let the client logout his session 

##Services 

**GET** /services/*:email*/ 

Description: Get all the services with their respective actions/reactions and tells the client to which services the user is connected 

**POST** /services/subscribe/*:email*/*:service_id*/ 

Description: Let a user subscribe to a service thanks to its unique id 

**POST** /services/unsubscribe/*:email*/*:service_id*/ 

Description: Let a user unsubscribe from a service thanks to its unique id 

##Areas 

**POST** /area/add/*:email*/*:action_id*/*:action_param*/*:reaction_id*/*:reaction_param*/ 

Let the user create an area with the unique ids of both action and reaction plus their parameters 

**POST** /area/remove/*:email*/*:action_id*/*:action_param*/*:reaction_id*/*:reaction_param*/ 

Let the user remove an existing area by specifying the unique ids and parameter of the area 

**GET** /area/*:email*/ 

Let the client get all the current user’s areas with their parameters 

##About.json

**GET** /about.json 

Let the client get the about.json file that describes the services and actions/reactions implemented in the project