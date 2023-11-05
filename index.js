/* eslint-disable max-len */
const fs = require("fs");
const _ = require("lodash");
const wiki = require("wikipedia");
const convert = require("convert-units");
const { lowerCase } = require("lower-case");
const { capitalCase } = require("change-case");
const extractValues = require("extract-values");
const stringSimilarity = require("string-similarity");
const { upperCaseFirst } = require("upper-case-first");

const cors = require("cors");
const path = require("path");
const axios = require("axios");
const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const compression = require("compression");
const serveStatic = require("serve-static");

/*const pkg = require("./package.json");
const mainChat = require("./intents/Main_Chat.json");
const supportChat = require("./intents/support.json");
const wikipediaChat = require("./intents/wikipedia.json");
const welcomeChat = require("./intents/Default_Welcome.json");
const fallbackChat = require("./intents/Default_Fallback.json");
const unitConverterChat = require("./intents/unit_converter.json");*/

dotenv.config();

const standardRating = 0.6;
const botName = process.env.BOT_NAME || pkg.name;
const developerName = process.env.DEVELOPER_NAME || pkg.author.name;
const developerEmail = process.env.DEVELOPER_EMAIL || pkg.author.email;
const bugReportUrl = process.env.DEVELOPER_NAME || pkg.bugs.url;

//LOCALSTORAGE
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
  localStorage.clear();
}


//EXPRESS
const app = express();
const port = process.env.PORT || 3000;
//app.use(express.json()); // parse the JSON request body
//const HttpError = require("http");

//TELEGRAM BOT
const { Bot, GrammyError } = require("grammy");
//const { Bot, webhookCallback } = require("grammy");
const { Agent } = require("https");

//const { GOOGLE_CLOUD_PROJECT_ID, TELEGRAM_BOT_TOKEN ,GOOGLE_CLOUD_REGION } = process.env;

// Create a bot object
const bot = new Bot(process.env.TELEGRAM_TOKEN);
/*const bot = new Bot(process.env.TELEGRAM_TOKEN, {
  client: {
    // We accept the drawback of webhook replies for typing status.
    canUseWebhookReply: (method) => method === "sendChatAction",
    // Set the local Bot API URL
    apiRoot: process.env.WEBHOOK, //`https://${GOOGLE_CLOUD_REGION}-${GOOGLE_CLOUD_PROJECT_ID}.cloudfunctions.net/${process.env.FUNCTION_TARGET}`
    baseFetchConfig: {
        compress: true,
        agent: new Agent({
            keepAlive: true,
            // Disable Bot API server certificate verification
            rejectUnauthorized: false,
        }),
	},
  },
});*/


bot.command("start", (ctx) => ctx.reply("Hei"));

// Register listeners to handle messages
//bot.on("message:text", (ctx) => ctx.reply("Echo: " + ctx.message.text));

bot.on("message:text", async (ctx) => { //Integrate this to the one below (or the other way around)?
  // the message object
  const message = ctx.message; //req.body.message || req.body.edited_message;
  const messageText = ctx.message.text; //req.body.message || req.body.edited_message;
  //console.log(message); //This shows it as json? cool

	
	//From here on this is basically a copy of what is in the SEND ANSWER section. They could be connected if I just knew how.
  let isFallback = false;
  let responseText = null;
  let rating = 0;
  let action = null;
  let answerFromCharacterai = false;

  try {
	let query = decodeURIComponent(messageText).replace(/\s+/g, " ").trim() || "Hello";
	const humanInput = lowerCase(query.replace(/(\?|\.|!)$/gim, ""));
	//console.log("query: "+query);
	let queryHistory = "";
	//localStorage.setItem("queryHistory",null);
	if (localStorage.getItem("queryHistory") != null) {
		queryHistory = localStorage.getItem("queryHistory");
	}
	//If long history, delete oldest line
	if (queryHistory.split(/\r\n|\r|\n/).length > 20) {
		queryHistory.split("\n").slice(2).join("\n"); //This doesn't seem to work...
	}
	//localStorage.setItem("queryHistory",queryHistory+"\nUser: "+query);
	//console.log("query history: "+queryHistory);
	
	action = "main_chat";

	//If no answer from basic chatbot, get answer from CharacterAI.
	answerFromCharacterai = true;
	const CharacterAI = require('node_characterai');
	const characterAI = new CharacterAI();
	await characterAI.authenticateWithToken(process.env.CHARACTERAI_ACCESSTOKEN);// or authenticateAsGuest();
	console.log("Retrieving answer from CharacterAI...");

	const characterId = process.env.CHARACTERAI_ID;
	//Add history to query here
	if (queryHistory!=null) {
		queryWithHistory = "Chat history: ["+queryHistory+"]\n"+query;
	}
	console.log("query: "+queryWithHistory);

	const chat = await characterAI.createOrContinueChat(characterId);
	const response = await chat.sendAndAwaitResponse(query, true); //queryWithHistory

	//localStorage.setItem("queryHistory",queryHistory+"\n{{user}}: "+query+"\n{{char}}: "+response.text);//Add response to history

	//console.log(response.text);
	// use response.text to use it in a string.
	responseText = response.text;
	
	/*if (answerFromCharacterai == false) {
		if (responseText == null) {
		  responseText = _.sample(fallbackChat);
		  isFallback = true;
		} else if (action != "wikipedia") {
		  responseText = responseText
			.replace(/(\[BOT_NAME\])/g, botName)
			.replace(/(\[DEVELOPER_NAME\])/g, developerName)
			.replace(/(\[DEVELOPER_EMAIL\])/g, developerEmail)
			.replace(/(\[BUG_URL\])/g, bugReportUrl);
		}
	}*/
	
	//Save to message history
	localStorage.setItem("queryHistory",queryHistory+"\n{{user}}: "+query+"\n{{char}}: "+responseText);
	
	//Send the answer to Telegram
	//ctx.reply(responseText);
	ctx.reply(responseText, {
		// `reply_to_message_id` specifies the actual reply feature.
		reply_to_message_id: ctx.msg.message_id,
	});
	console.log("Response message sent.");
	
	/*res.json({
	  responseText,
	  query,
	  rating,
	  action,
	  isFallback,
	  similarQuestion,
	});*/
  } catch (error) {
	console.log(error);
	if (error.message.includes("URI")) {
	  res.status(500).send({ error: error.message, code: 500 });
	} else {
	  res.status(500).send({ error: "Internal Server Error!", code: 500 });
	}
  }
});

// Start the bot (using long polling)
bot.start();

//Telegram bot error handling
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
	console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
	console.error("Could not contact Telegram:", e);
  } else {
	console.error("Unknown error:", e);
  }
});


//IF USING WEBHOOKS
//Register a handler for the bot
//app.post("/webhook", webhookCallback(bot, 'express'));

//?
/*app.post(`/api/telegram${process.env.TELEGRAM_TOKEN}`, async (req, res) => {
    const message = req.body.message || req.body.edited_message;
    ...
});*/

//Set webhook for handler in Bot API
//bot.api.setWebhook(process.env.WEBHOOK);




//-----------------------------//
//Remove at least some of this	|
//								|
//								V

/*const notFound = async (req, res) => {
  try {
    const pageNotFoundHtml = await fs.readFileSync(
      path.join(__dirname, "public/404.html"),
      "utf8",
    );
    res.status(404).send(pageNotFoundHtml);
  } catch (err) {
    res.status(404).send("Page Not Found!");
    console.log(err);
  }
};*/


app.use(cors());
app.use(compression());
app.set("json spaces", 4);
app.use("/api/", morgan("tiny"));
/*app.get("/api/question", sendAnswer);
app.get("/api/welcome", sendWelcomeMessage);
app.get("/api/allQuestions", sendAllQuestions);*/
app.use(serveStatic(path.join(__dirname, "public")));
//app.get("*", notFound);

app.listen(port, () => console.log(`app listening on port ${port}!`));
