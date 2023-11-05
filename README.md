<div id="top"></div>

<div align="center">
    <p>A Simple & Powerful chatbot in JavaScript.</p>
    <img src="public/src/images/profile-pic.avif" style="border-radius:50%;width:100px;height:auto;">
    <h3>Assistentti</h3>
	<p>A Telegram bot virtual assistant. Tämä versio on suomenkielinen assistentti.</p>
</div>


## About 

This is a simple and Powerful chatbot in nodejs. It's also linked to wikipedia's API and very easy to customize with JSON.
Originally copied from: https://github.com/devXprite/javascript-chatbot
I also linked it to CharacterAI and made it a telegram bot.

This branch (assistentti) is a Telegram bot virtual assistant. It speaks primarly Finnish, but it understands english too (and probably other languages, but some things don't work in all of them).

Branch *pikkua-tan* is a customer service bot I made to answer questions related to stuff I make. However, it isn't good enough yet.

## To do
- Simplify the code and remove unnecessary things
- Add better comments
- Add different language version of the json files
- Automatically remove history sometimes, or delete one entry when it's over a certain number
- Improve this readme
- Limit who can use the bot
- Add possibility to connect it to other AI than characterAI
- Change {{char}} to process.env.BOT_NAME?

## Notes

Helpful links:
- https://www.npmjs.com/package/node_characterai
- https://github.com/realcoloride/node_characterai/issues/10
- https://grammy.dev/


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* NodeJs
* npm

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Pikku-a/assistentti
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Rename `example.env` to `.env` and edit it:
   ```sh 
   BOT_NAME="Bot Name"
   DEVELOPER_NAME="Your Name"
   DEVELOPER_EMAIL="Your Email"
   BUG_REPORT_URL="Your URL"
   TELEGRAM_TOKEN="telegram bot token from @botfather"
   CHARACTERAI_ID="character ai id that you can get from the last part of the url when in the chat"
   ```
4. Start Server
   ```sh
   npm start
   ```

<!-- Scripts EXAMPLES -->
### Available Scripts

*In the project directory, you can run*:

- `npm run dev`

   Runs the app in the development mode.  
   Open http://localhost:3000 to view it in your browser.

- `npm run lint`

   Check for errors in your code.

- `npm run lint:fix`

   Fix auto fixable problems.

<!-- Deploy  -->
## Deploy

Click this button to configure your Project and deploy it to Vercel.  
  
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FdevXprite%2Fjavascript-chatbot)

## Credit

Some chat intents were taken from **Dialogflow's [Small talk](https://dialogflow.cloud.google.com/#/agent/small-talk-bfie/intents)**.

I built this on top of this: https://github.com/devXprite/javascript-chatbot

This readme is copied and edited too.
