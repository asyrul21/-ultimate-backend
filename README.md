# -ultimate-backend

# Endpoints

1. GET content/ => get all contents

2. POST content/ => create new content
   
   req.body should have: 
   - *key
   - *title
   - sub
   - *category
   - subcategory
   - imagesFolderPath
   - dataFilePath
   - link
   - *likes

3. PUT content/:key/like => add 1 like

4. PUT content/:key/edit => edit whole content object
   
   req.body should contain any of the replaced values
   
5. DELETE content/:key => remove content

6. POST login/ => Log In
   
   req.body should have: 
   - name
   - password
7. GET login/check => check if admin is logged in

8. POST login/register => Add new admin
   
   req.body should have: 
   - name
   - password

9. GET logout/ => Log out

# References

1. Hiding mongodb user login details when deploying

https://stackoverflow.com/questions/25090524/hide-mongodb-password-using-heroku-so-i-can-also-push-to-public-repo-on-github

2. Error : Performing an update on the path '_id' would modify the immutable field '_id'

https://stackoverflow.com/questions/56350530/performing-an-update-on-the-path-id-would-modify-the-immutable-field-id

3. Types of req parameter passing
 - req.query => ?name=Ahmad
 - req.params => /:id/
 - req.body => pass in the x-www-form-urlencoded body

