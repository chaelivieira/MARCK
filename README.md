# Server Dependencies
## NPM Packages
Make sure that all NPM dependencies are installed with `npm install`!

## Redis 
Ensure that you have redis installed on your system before running the server. Start the redis server in a terminal with the `redis-server` command.

## ImageMagick
This project also uses ImageMagick with the server. The server is set up to work with as many versions as possible, so if installing version 7+, make sure that the legacy commands are also installed so that `convert` is recoginzed.

## Wkhtmltopdf
You must also have wkhtmltopdf installed in order to run the server. You can download the software for your operating system at https://wkhtmltopdf.org/downloads.html

# Running the project

First, you will want to build the production version of the react app by running `npm run build`. This may take a short time. After this, we will also need endpoints from an express server, which you can start by running `npm run exp`. 

Once the express server is live, start the react static server in a new terminal with `serve -s build`. The website can be found at `localhost:5000/`!
