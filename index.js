const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const express = require('express');
const axios = require('axios');
const {Telegraf, Scenes, session} = require('telegraf');

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

const sarcasmWizard = new Scenes.WizardScene('sarcasm-wizard',
  (ctx) => {
    ctx.reply("What is the context?");

    //Necessary for store the input
    ctx.scene.session.user = {};

    //Store the telegram user id
    ctx.scene.session.user.userId = ctx.from.id;
    return ctx.wizard.next();
  },
  (ctx) => {
    //Store the entered context
    ctx.scene.session.user.context = ctx.message.text;
    ctx.reply("What is the message you wish to check?");
    return ctx.wizard.next();
  },
  async (ctx) => {

    ctx.scene.session.user.message = ctx.message.text;

    let sarcasmResponse = await getSarcasmResponse(ctx.scene.session.user.context, ctx.scene.session.user.message);
    console.log(sarcasmResponse);
    ctx.reply(sarcasmResponse);

    //Store the user in a separate controller
    // userController.StoreUser(ctx.scene.session.user);
    return ctx.scene.leave(); //<- Leaving a scene will clear the session automatically
  }
);

const offensiveWizard = new Scenes.WizardScene('offensive-wizard',
  (ctx) => {
    ctx.reply("What is the context?");

    //Necessary for store the input
    ctx.scene.session.user = {};

    //Store the telegram user id
    ctx.scene.session.user.userId = ctx.from.id;
    return ctx.wizard.next();
  },
  (ctx) => {
    //Store the entered context
    ctx.scene.session.user.context = ctx.message.text;
    ctx.reply("What is the message you wish to check?");
    return ctx.wizard.next();
  },
  async (ctx) => {

    ctx.scene.session.user.message = ctx.message.text;

    let offensiveResponse = await getOffensiveLanguageResponse(ctx.scene.session.user.context, ctx.scene.session.user.message);
    console.log(offensiveResponse);
    ctx.reply(offensiveResponse);

    //Store the user in a separate controller
    // userController.StoreUser(ctx.scene.session.user);
    return ctx.scene.leave(); //<- Leaving a scene will clear the session automatically
  }
);

const emotionWizard = new Scenes.WizardScene('emotion-wizard',
  (ctx) => {
    ctx.reply("What is the context?");

    //Necessary for store the input
    ctx.scene.session.user = {};

    //Store the telegram user id
    ctx.scene.session.user.userId = ctx.from.id;
    return ctx.wizard.next();
  },
  (ctx) => {
    //Store the entered context
    ctx.scene.session.user.context = ctx.message.text;
    ctx.reply("What is the message you wish to check?");
    return ctx.wizard.next();
  },
  async (ctx) => {

    ctx.scene.session.user.message = ctx.message.text;

    let emotionResponse = await getEmotion(ctx.scene.session.user.context, ctx.scene.session.user.message);
    console.log(emotionResponse);
    ctx.reply(emotionResponse);

    //Store the user in a separate controller
    // userController.StoreUser(ctx.scene.session.user);
    return ctx.scene.leave(); //<- Leaving a scene will clear the session automatically
  }
);

const toneWizard = new Scenes.WizardScene('tone-wizard',
  (ctx) => {
    ctx.reply("What is the context?");

    //Necessary for store the input
    ctx.scene.session.user = {};

    //Store the telegram user id
    ctx.scene.session.user.userId = ctx.from.id;
    return ctx.wizard.next();
  },
  (ctx) => {
    //Store the entered context
    ctx.scene.session.user.context = ctx.message.text;
    ctx.reply("What is the message you wish to check?");
    return ctx.wizard.next();
  },
  async (ctx) => {

    ctx.scene.session.user.message = ctx.message.text;

    let toneResponse = await getTone(ctx.scene.session.user.context, ctx.scene.session.user.message);
    console.log(toneResponse);
    ctx.reply(toneResponse);

    //Store the user in a separate controller
    // userController.StoreUser(ctx.scene.session.user);
    return ctx.scene.leave(); //<- Leaving a scene will clear the session automatically
  }
);

const abstractWizard = new Scenes.WizardScene('abstract-wizard',
  (ctx) => {
    ctx.reply("What is the context?");

    //Necessary for store the input
    ctx.scene.session.user = {};

    //Store the telegram user id
    ctx.scene.session.user.userId = ctx.from.id;
    return ctx.wizard.next();
  },
  (ctx) => {
    //Store the entered context
    ctx.scene.session.user.context = ctx.message.text;
    ctx.reply("What is the message you wish to check?");
    return ctx.wizard.next();
  },
  async (ctx) => {

    ctx.scene.session.user.message = ctx.message.text;

    let abstractResponse = await getAbstract(ctx.scene.session.user.context, ctx.scene.session.user.message);
    console.log(abstractResponse);
    ctx.reply(abstractResponse);

    //Store the user in a separate controller
    // userController.StoreUser(ctx.scene.session.user);
    return ctx.scene.leave(); //<- Leaving a scene will clear the session automatically
  }
);

const simplifyWizard = new Scenes.WizardScene('simplify-wizard',
  (ctx) => {
    ctx.reply("What is the context?");

    //Necessary for store the input
    ctx.scene.session.user = {};

    //Store the telegram user id
    ctx.scene.session.user.userId = ctx.from.id;
    return ctx.wizard.next();
  },
  (ctx) => {
    //Store the entered context
    ctx.scene.session.user.context = ctx.message.text;
    ctx.reply("What is the message you wish to check?");
    return ctx.wizard.next();
  },
  async (ctx) => {

    ctx.scene.session.user.message = ctx.message.text;

    let simplifyResponse = await getSimplified(ctx.scene.session.user.context, ctx.scene.session.user.message);
    console.log(simplifyResponse);
    ctx.reply(simplifyResponse);

    //Store the user in a separate controller
    // userController.StoreUser(ctx.scene.session.user);
    return ctx.scene.leave(); //<- Leaving a scene will clear the session automatically
  }
);

const humourWizard = new Scenes.WizardScene('humour-wizard',
  (ctx) => {
    ctx.reply("What is the context?");

    //Necessary for store the input
    ctx.scene.session.user = {};

    //Store the telegram user id
    ctx.scene.session.user.userId = ctx.from.id;
    return ctx.wizard.next();
  },
  (ctx) => {
    //Store the entered context
    ctx.scene.session.user.context = ctx.message.text;
    ctx.reply("What is the message you wish to check?");
    return ctx.wizard.next();
  },
  async (ctx) => {

    ctx.scene.session.user.message = ctx.message.text;

    let humourResponse = await getHumour(ctx.scene.session.user.context, ctx.scene.session.user.message);
    console.log(humourResponse);
    ctx.reply(humourResponse);

    //Store the user in a separate controller
    // userController.StoreUser(ctx.scene.session.user);
    return ctx.scene.leave(); //<- Leaving a scene will clear the session automatically
  }
);

const stage = new Scenes.Stage(
	[
        sarcasmWizard, offensiveWizard, emotionWizard, toneWizard, abstractWizard, simplifyWizard, humourWizard
	]
)   

bot.use(session()); 

bot.use(stage.middleware()); 

bot.start((ctx) => {
    ctx.reply("Hello " + ctx.from.first_name + "! Welcome! Here are some commands for you to get started\n" + "/sarcasm - detect sarcasm\n/offensive - check if your message is offensive \
                \n/emotion - detect the emotion of the given message\n/tone - detect the tone of the given message\n/abstract - help you understand a message\n/simplify - helps summarise a message\n/humour - detect if the message has any humour intent");
    console.log(ctx.from);
    
})

bot.settings((ctx) => {
    ctx.reply("you have entered settings command ")
} )

bot.command("sarcasm", async (ctx) => {
    try {
        ctx.scene.enter('sarcasm-wizard');
    } catch (error) {
        console.error("Error processing /sarcasm command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("offensive", async (ctx) => {
    try {
        ctx.scene.enter('offensive-wizard');
    } catch (error) {
        console.error("Error processing /offensive command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("emotion", async (ctx) => {
    try{
        ctx.scene.enter('emotion-wizard');
    } catch (error) {
        console.error("Error processing /emotion command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("tone", async (ctx) => {
    try {
        ctx.scene.enter('tone-wizard');
    } catch (error) {
        console.error("Error processing /tone command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("abstract", async (ctx) => {
    try {
        ctx.scene.enter('abstract-wizard');
    } catch (error) {
        console.error("Error processing /abstract command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("simplify", async (ctx) => {
    try {
        ctx.scene.enter('simplify-wizard');
    } catch (error) {
        console.error("Error processing /simplify command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
})

bot.command("humour", async (ctx) => {
    try {
        ctx.scene.enter('humour-wizard');
    } catch (error) {
        console.error("Error processing /humour command:", error);
        ctx.reply("An error occurred while processing the command.");
    }
  });
  


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