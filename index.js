const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const express = require('express');
const axios = require('axios');
const {Telegraf} = require('telegraf');

const app = express();
app.use(express.json());

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}`;
const URI = `/webhook/${process.env.TELEGRAM_API_TOKEN}`
const WEBHOOK_URL = 'https://0a64-111-65-45-108.ngrok-free.app' +   URI

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
}

app.post(URI, async (req, res) => {
    console.log(req.body);
    return res.send();
})

app.listen(5001, async () => {
    console.log('app running on port 5001');
    await init();
})

const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_API_KEY
})

const openai = new OpenAIApi(configuration)

require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN); 

bot.launch();


bot.start((ctx) => {
    ctx.reply("Hi " + ctx.from.first_name + " Welcome to SocialGPT! Please type /help to look at our available fucntions");
    console.log(ctx.from);
})

bot.help((ctx) => {
    ctx.reply("To use our functions, provide the command <space> context <semicolon> and the message you wish to analyse");
    ctx.reply("for example: you could say /sarcasm we are talking about football; the keeper is so good he let in 5 goals");
    ctx.reply("the available functions are /sarcasm, /offensive, /emotion, /tone, /abstract, /simplify, /humour, /appropriate");
})

bot.command("sarcasm", async (ctx) => {
    try {
        let input = ctx.message.text.split(";");
        console.log(input);
        let context =input[0];
        let message = input[1];
        console.log(context);
        console.log(message);
        let sarcasmResponse = await getSarcasmResponse(context, message);
        console.log(sarcasmResponse);
        ctx.reply(sarcasmResponse);
    } catch (error) {
        console.error("Error processing /sarcasm command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("offensive", async (ctx) => {
    try {
        let input = ctx.message.text.split(";");
        console.log(input);
        let context =input[0];
        let message = input[1];
        console.log(context);
        console.log(message);
        let offensiveResponse = await getOffensiveLanguageResponse(context, message);
        console.log(offensiveResponse);
        ctx.reply(offensiveResponse);
    } catch (error) {
        console.error("Error processing /offensive command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("emotion", async (ctx) => {
    try{
        let input = ctx.message.text.split(";");
        console.log(input);
        let context =input[0];
        let message = input[1];
        console.log(context);
        console.log(message);
        let emotionResponse = await getEmotion(context, message);
        console.log(emotionResponse);
        ctx.reply(emotionResponse);
    } catch (error) {
        console.error("Error processing /emotion command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("tone", async (ctx) => {
    try {
        let input = ctx.message.text.split(";");
        console.log(input);
        let context =input[0];
        let message = input[1];
        console.log(context);
        console.log(message);
        let toneResponse = await getTone(context, message);
        console.log(toneResponse);
        ctx.reply(toneResponse);
    } catch (error) {
        console.error("Error processing /tone command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("abstract", async (ctx) => {
    try {
        let input = ctx.message.text.split(";");
        console.log(input);
        let context =input[0];
        let message = input[1];
        console.log(context);
        console.log(message);
        let abstractResponse = await getAbstract(context, message);
        console.log(abstractResponse);
        ctx.reply(abstractResponse);
    } catch (error) {
        console.error("Error processing /abstract command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("simplify", async (ctx) => {
    try {
        let input = ctx.message.text.split(";");
        console.log(input);
        let context =input[0];
        let message = input[1];
        console.log(context);
        console.log(message);
        let simplifyResponse = await getSimplified(context, message);
        console.log(simplifyResponse);
        ctx.reply(simplifyResponse);
    } catch (error) {
        console.error("Error processing /simplify command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("humour", async (ctx) => {
    try {
        let input = ctx.message.text.split(";");
        console.log(input);
        let context = input[0];
        let message = input[1];
        console.log(context);
        console.log(message);
        let humourResponse = await getHumour(context, message);
        console.log(humourResponse);
        ctx.reply(humourResponse);
    } catch (error) {
        console.error("Error processing /humour command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
  });
  
bot.command("appropriate", async (ctx) => {
    try {
        let input = ctx.message.text.split(";");
        console.log(input);
        let context =input[0];
        let message = input[1];
        console.log(context);
        console.log(message);
        let appropriateResponse = await getAppropriate(context, message);
        console.log(appropriateResponse);
        ctx.reply(appropriateResponse);
    } catch (error) {
        console.error("Error processing /offensive command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.use()


async function getSarcasmResponse(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''} ,
            { role: "assistant", content: "Understood. Now, could you please share the message you want me to analyze?" },
            { role: "user", content: `Please explain this to me simply as I have trouble understanding people due to my disability.
                Is this message sarcastic ? ${message}. Explain very simply and use examples if needed.` },
        ]
    });

    return chat.data.choices[0].message.content;
}

async function getOffensiveLanguageResponse(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''} ,
            { role: "assistant", content: "Which message do you think might be offensive?" },
            { role: "user", content: `Please explain this to me simply as I have trouble understanding people due to my disability.
                Is this message offensive or hurtful? ${message}` },
        ]
    });

    return chat.data.choices[0].message.content;
}

async function getEmotion(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''},
            { role: "assistant", content: "Which message do you think might be offensive?" },
            { role: "user", content: `Please explain this to me simply as I have trouble understanding people due to my disability.
                What is the sentiment or emotion of the following text? ${message}` },
        ]
    });

    return chat.data.choices[0].message.content;
}

async function getTone(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''},
            { role: "assistant", content: "Which message do you think might be offensive?" },
            { role: "user", content: `Please explain this to me simply as I have trouble understanding people due to my disability.
                What is the tone of the following text? ${message}` },
        ]
    });

    return chat.data.choices[0].message.content;
}


async function getAbstract(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''} ,
            { role: "assistant", content: "Understood. Now, could you please share the message you want me to analyze?" },
            { role: "user", content: `Please explain this to me simply as I have trouble understanding people due to my disability.
                What does the following message mean? ${message}` },
        ]
    });

    return chat.data.choices[0].message.content;
}

async function getSimplified(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''},
            { role: "assistant", content: "Understood. Now, could you please share the message you want me to summarise?" },
            { role: "user", content: `Please summarise this for me as simply as possible, as I have trouble understanding people due to my disability. ${message}. Use simple vocabulary.` },
        ]
    });

    return chat.data.choices[0].message.content;
}

async function getHumour(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''},
            { role: "assistant", content: "Understood. Now, could you please share the message you want me to summarise?" },
            { role: "user", content: `Please explain this simply as I have trouble understanding people due to my disability. Was the following message intended as a joke? Please explain why it is or is not funny. ${message}` },
        ]
    });

    return chat.data.choices[0].message.content;
}

async function getAppropriate(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''},
            { role: "assistant", content: "Understood. Now, could you please share the message you want me to summarise?" },
            { role: "user", content: `Please explain to me simply as I have trouble understanding people due to my disability.. I want to send this message. ${message} 
            Is the message appropriate for this situation? If not, please 
            help me to paraphrase it.` },
        ]
    });

    return chat.data.choices[0].message.content;
}

//Tests for you to try 


// getOffensiveLanguageResponse("Go break a leg!")
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// getSarcasmResponse("We were talking about Football", "Wow what a brilliant play by the keeper, letting the ball through his hands and conceding a goal")
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// getSarcasmResponse('', 'Yeahhh, I\'m sure THAT is the right answer')
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// getSarcasmResponse('', 'Well duh')
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// getAbstract("talking about the weather", "it's cats and dogs right now")
//     .then(response => console.log(response))
//     .catch(err=> console.log(err));

// getSimplified("", "Despite the fact that the sky was inordinately and persistently overcast with a kaleidoscope of dark, brooding clouds, which gave the impression that the heavens were feeling decidedly under the weather, there was a dogged determination in his heart to maintain the aura of a jubilant sunflower, unfailingly turning his cheerful visage towards the direction of the imagined sun.")
//     .then(response => console.log(response))
//    .catch(err=> console.log(err));

// getEmotion("I can't believe this is happening again. What could i possibly do now?")
//     .then(response => console.log(response))
//     .catch(err => console.log(err))