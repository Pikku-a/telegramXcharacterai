<div align="center">
	<img src="images/telegramxcharacterai-logo-round.png">
	<h3>CharacterAI Telegram bot</h3>
</div>

## About 

A Telegram bot that can be used to talk with CharacterAI characters. It's self hosted.

## Warning

This is unnofficial, so there might be a possibility that your CharacterAI account gets banned if you use this.

## Notes
**To do**
- Make it possible to login and choose the character using the bot
- Fix webhooks stuff

**Helpful links:**
- https://www.npmjs.com/package/node_characterai
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
    TELEGRAM_TOKEN="telegram bot token from @botfather"
    CHARACTERAI_ID="character ai id that you can get from the last part of the url when in the chat"
    CHARACTERAI_ACCESSTOKEN="See: How to find characterAI access token"
    WEBHOOKS="Doesn't work currently so ignore it"
    ```
4. Start Server
    ```sh
    npm start
    ```

**How to find CharacterAI access token**

- Open the Character.AI website in your browser (https://old.character.ai)
- Open the developer tools (F12, Ctrl+Shift+I, or Cmd+J)
- Go to the Storage section and click on Local Storage
- Look for the char_token key
- Open the object, right click on value and copy your session token.
Don't share the access code to anyone.

In the new version it's more difficult to find: Go to network tab, try to click any of the AI character, then find anything that says plus.character.ai and you'll find the token in the request authorization header.

## Credit

I built this on top of this [javascript-chatbot](https://github.com/devXprite/javascript-chatbot) by
DevXprite - 2022, Licensed MIT.

However, the project has changed a lot and there is not much code left from that.
