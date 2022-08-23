# The Dave Foley for 509 Campaign API

### A server-side web application that provides authorization, authentication, routing, template rendering, data modeling and validation, and CRUD access to a MongoDB Atlas database mainly by acting as a REST API for the campaign's front-end website. 
## As an API
#### - Users who access the campaign's front-end website are able to enter their contact infromation which is then submitted via a POST request to the API from the client.
#### - The form data (which will have already been through some validation on the client) will received additional validation and sanitization. 
####  -The form data will then be securely stored in the Atlas database.

## Template View Access
#### -Campaign adminstrators are given access to the protected route's template views, which act as a secondary client. 
#### -Admin access allows for full CRUD capablities to the database collection that stores form data

## Security and Authorization
#### -An already created username and password for admin access is stored in the database (password is hashed with BCRYPT). 
#### -Passport is used to validate login credentials and admin user is provided with a Javascript Web Token (stored as cookie) after login. 
#### -All routes the require JWT token, except for the route that creates non-admin users. This route remains unprotected since it needs to accomodate the POST request from the client-side form
