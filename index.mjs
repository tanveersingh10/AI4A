import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
dotenv.config()

const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_API_KEY
})

const openai = new OpenAIApi(configuration)

async function getSarcasm(context, message) {
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

async function getOffensiveLanguage(context, message) {
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

getSarcasm("We were talking about Football", "Wow what a brilliant play by the keeper, letting the ball through his hands and conceding a goal")
    .then(response => console.log(response))
    .catch(err => console.error(err));

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

import TelegramBot from 'node-telegram-bot';

const token = '6245980206:AAGtwV5MSFSYiHqqxRB-JjJdLxgxRo79VAg';
const bot = new TelegramBot(token, { polling: true });

// To store the active command
let activeCommand = null;

// Handle incoming Telegram messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;
  
  // Check if the message is a command
  if (message.startsWith("/")) {
    // Set the active command based on the received command
    activeCommand = message.toLowerCase();
    bot.sendMessage(chatId, `Command '${activeCommand}' received. Please provide the input for the command.`);
  } else {
    // Check if there is an active command
    if (activeCommand) {
      let response;
      
      // Call the corresponding function based on the active command
      switch (activeCommand) {
        case "/sarcasm":
          response = await getSarcasm("", message);
          break;
        case "/offensive":
          response = await getOffensiveLanguage("", message);
          break;
        case "/emotion":
          response = await getEmotion("", message);
          break;
        case "/tone":
          response = await getTone("", message);
          break;
        case "/abstract":
          response = await getAbstract("", message);
          break;
        case "/simplified":
          response = await getSimplified("", message);
          break;
        case "/humour":
          response = await getHumour("", message);
          break;
        // Add more cases for other commands/functions
        default:
          response = "Invalid command.";
          break;
      }
      
      // Send the response back to the user
      bot.sendMessage(chatId, response);
      
      // Reset the active command
      activeCommand = null;
    }
  }
});

