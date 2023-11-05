<div id="top"></div>

<div align="center">
    <img src="public/src/images/profile-pic.avif" style="border-radius:50%;width:100px;height:auto;">
    <h3>CharacterAI Telegram bot</h3>
</div>


## About 

With this Telegram bot you can talk to CharacterAI characters. Self hosted.

## To do
- Simplify the code and remove unnecessary things
- Add better comments
- Automatically remove history sometimes, or delete one entry when it's over a certain number
- Improve this readme
- Limit who can use the bot?
- Make it possible to choose the character while using the bot
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
   git clone https://github.com/Pikku-a/telegramXcharacterai
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
   CHARACTERAI_ACCESSTOKEN=""
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

I built this on top of this: https://github.com/devXprite/javascript-chatbot

This readme is copied and edited too.
