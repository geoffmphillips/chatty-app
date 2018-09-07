Chatty
=====================

A simple chat app made with ReactJS. Each user is assigned a color for their username. When a user submits a url for an image, the image is displayed instead of text. A websocket server is set up in a sub-directory.

### Final Product

[cats!](https://github.com/geoffmphillips/chatty-app/blob/master/docs/cat.png)

Send pictures of cats to your friends! The image resizes based on screen view size.

[colors!](https://github.com/geoffmphillips/chatty-app/blob/master/docs/colors.png)

Username colors are persistant through name changes and consistent across clients.

### Getting Started

Clone the app and an use ```npm install``` to download dependencies. You'll need to do this in both the Chatty app's directory and the websocket server's directory. Separately get both the Chatty app and the websocket server running with ```npm start```. You'll need two terminals open for this!

### Dependencies

###### Chatty App Dependencies

* React
* Webpack
* React-DOM
* Express
* ws
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

###### Websocket Server Dependencies

* Express
* ws
* uuid