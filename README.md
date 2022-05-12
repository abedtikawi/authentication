# Backend platform that allow the user to authenticate based on Node.js using Express.js

># Express JS Authentication Requirement


	 Users should be able to sign up with unique emails only.
		- Upon successful signup, dispatch email of registration.
		
	 Users should be able to login with the registered email & password.
	 
	 If a user has attempted 5 login attempts , on the 5th attempt:
		- Lock user account
		- Dispatch account locked
		
	 If a user has attempted 0<LOGIN_ATTEMPTS<5 , and successfully logs in:
		- Reset login attempts back to 0.
		- Dispatch email of successful login.

---
# Endpoints
- Signup
	- User is allowed to enter his email , password , name and surname.
	- User is not allowed to enter an existing email.
	- User is not allowed to enter a non-email format.
	- User is not allowed any empty parameter.
	- After a succesfull registration, an email will be dispatched to the provided email.
	
	- Restrictions: 
		- email ( string , required )
   		- password ( string , required , minimum length : 4 )
   		- name ( string , required , minimum length : 1 )
   		- surname ( string , required , minimum length : 1 )

- Signin
	- User is allowed to enter his email and password
	- User is not allowed to enter any empty field
	- User is not allowed to login with wrong credentials
	- Upon successfull registration , an email will be dispatched to the provided email.
	- Restrictions:
		- email ( string , required )
   		- password ( string , required , minimum length : 4 )
   		- if user exceeded number of attempts ( 5 ) , an email will be dispatched to the provided email and email will be locked
> To test the Endpoints, please refer to the postman link:
> [Authentication](https://www.getpostman.com/collections/9a30036430c593b52aca)
---
# Install Dependencies
## Modules
```bash
> npm install
```
## Start server in development mode
```bash
> npm run dev 
```

## Start server in production mode
```bash
> npm run start
```

## Directory and Folder Structure
---
	### A Top-level directory Folder layout
	..
	..
	├── bin
	|   ├──	www							# Server Configuration
	|
	├── controllers						
	|	|
	|	|
	|	├── users						# Endpoints
	|		├──sigin.js		
	|		├──signup.js
	|
	|
	├── docs							# Documentation( apiDocs )
	├── config							# Logger Configuration
	├── common							# Common types between files
	|	...
	|	 |						
	|	 ├── responses.index.js					# Centralized file for status codes & messages
	|
	|
	├── helpers							# Email wrapper & helper functions
	|
	├── middlewares							# Joi Central Validation
	|
	├── models							# MongoDB Model
	|
	├── routes
	|	..		
	|	├── index.js						# Router file with routes and middlewares
	|	├── routes.js						# Controllers with their handlers
	|
	├── schemas							# Joi schemas used for validation
	├── app.js							# Server Entry File

---

## For Further Documentation, Please refer to the apiDocs found in index.html

---

    ### A Top-level directory layout for the location of docs using apiDocs
    ...
    ...
    ├── docs                   # Documentation folder (apiDocs)
    |      |
    |      └── index.html      # More descriptive documentation regarding routes <<<
    |
    ├── controllers
    ├── middlewares
    ├── node_modules
    ...

---







---

> ## API Design Users Endpoints
>
> | Route Type | Route           | Params                                                              | Response                |
> | ---------- | --------------- | ------------------------------------------------------------------- | ----------------------- |
> | POST       | /users/signin    | email & password                                                    | message & data |
> | POST       | /users/signup | email & password & name & surname                    | message & data|
---


