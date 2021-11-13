# Skybook Feedback
A Skapp where writers can upload their book or story on Skynet and receive feedback from the community

- Live Site - https://1005sg4a412di24lq2vcaqv6rhaoi83qmrcvhladn2e386eo331sv70.siasky.net/#/
- Demo - https://youtu.be/iDwazBdOc5Q

## Features
- User can login with MySky
- Writers can create their story or book
- User can comment on the writers's story or book

## Technologies
- React
- semantic-ui
- MySky
- SkyDB

## Running the Skapp on local host
**Important: Using MySky on Brave does not work**

- Clone or download this repository
- Run `npm i` to install the dependencies
- Create a file called 'config.js' on the src folder and add the following code
```
export const seedphase = "your words";
```
- Run `npm start` to start the Skapp

## Deploying to Skynet
Change `const client = new SkynetClient(portal);` to `const client = new SkynetClient();`