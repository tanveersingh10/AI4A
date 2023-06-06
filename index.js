const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const express = require('express');
const axios = require('axios');
const {Telegraf} = require('telegraf');

const app = express();
app.use(express.json());

const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_API_KEY
})

const openai = new OpenAIApi(configuration)

require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN); 

bot.launch();

bot.start((ctx) => {
    ctx.state.apple = 5;
    ctx.reply(ctx.from.first_name + " You have entered the start command");
    console.log(ctx.from);
    
})

bot.settings((ctx) => {
    ctx.reply("you have entered settings command ")
} )

bot.command("sarcasm", async (ctx) => {
    let input = ctx.message.text.split(";");
    console.log(input);
    let context =input[0];
    let message = input[1];
    console.log(context);
    console.log(message);
    let sarcasmResponse = await getSarcasmResponse(context, message);
    console.log(sarcasmResponse);
    ctx.reply(sarcasmResponse)
})

bot.command("offensive", async (ctx) => {
    let input = ctx.message.text.split(";");
    console.log(input);
    let context =input[0];
    let message = input[1];
    console.log(context);
    console.log(message);
    let sarcasmResponse = await getOffensiveLanguageResponse(context, message);
    console.log(sarcasmResponse);
    ctx.reply(sarcasmResponse)
})

bot.command("emotion", async (ctx) => {
    let input = ctx.message.text.split(";");
    console.log(input);
    let context =input[0];
    let message = input[1];
    console.log(context);
    console.log(message);
    let sarcasmResponse = await getEmotion(context, message);
    console.log(sarcasmResponse);
    ctx.reply(sarcasmResponse)
})

bot.command("tone", async (ctx) => {
    let input = ctx.message.text.split(";");
    console.log(input);
    let context =input[0];
    let message = input[1];
    console.log(context);
    console.log(message);
    let sarcasmResponse = await getTone(context, message);
    console.log(sarcasmResponse);
    ctx.reply(sarcasmResponse)
})

bot.command("abstract", async (ctx) => {
    let input = ctx.message.text.split(";");
    console.log(input);
    let context =input[0];
    let message = input[1];
    console.log(context);
    console.log(message);
    let sarcasmResponse = await getAbstract(context, message);
    console.log(sarcasmResponse);
    ctx.reply(sarcasmResponse)
})

bot.command("simplify", async (ctx) => {
    let input = ctx.message.text.split(";");
    console.log(input);
    let context =input[0];
    let message = input[1];
    console.log(context);
    console.log(message);
    let sarcasmResponse = await getSimplified(context, message);
    console.log(sarcasmResponse);
    ctx.reply(sarcasmResponse)
})

bot.command("humour", async (ctx) => {
    let input = ctx.message.text.split(";");
    console.log(input);
    let context =input[0];
    let message = input[1];
    console.log(context);
    console.log(message);
    let sarcasmResponse = await getHumour(context, message);
    console.log(sarcasmResponse);
    ctx.reply(sarcasmResponse)
})





bot.use()



async function getSarcasmResponse(context, message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''} ,
            { role: "assistant", content: "Understood. Now, could you please share the message you want me to analyze?" },
            { role: "user", content: `Please explain this to me simply as I have autism. 
                Is this message sarcastic ? ${message}` },
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
            { role: "user", content: `Please explain this to me simply as I have autism. 
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
            { role: "user", content: `Please explain this to me simply as I have autism. 
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
            { role: "user", content: `Please explain this to me simply as I have autism. 
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
            { role: "user", content: `Please explain this to me simply as I have autism. 
                What does the following message mean mean? ${message}` },
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
            { role: "user", content: `Please summarise this for me as simply as possible, as I have autism. ${message}` },
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
            { role: "user", content: `Was the following message intended as a joke? Please explain why it is or is not funny. ${message}` },
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