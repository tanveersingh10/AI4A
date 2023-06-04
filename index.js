import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-w9yk17sUViGXbSdQ9iDyU2m6",
    apiKey: "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"
})

const openai = new OpenAIApi(configuration)

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

async function getOffensiveLanguageResponse(message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "assistant", content: "Which message do you think might be offensive?" },
            { role: "user", content: `Please explain this to me simply as I have autism. 
                Is this message offensive or hurtful? ${message}` },
        ]
    });

    return chat.data.choices[0].message.content;
}

async function getEmotion(message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
            { role: "assistant", content: "Which message do you think might be offensive?" },
            { role: "user", content: `Please explain this to me simply as I have autism. 
                What is the sentiment or emotion of the following text? ${message}` },
        ]
    });

    return chat.data.choices[0].message.content;
}

async function getTone(message) {
    const chat = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `You are a helpful assistant.`},
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
            { role: "user", content: context ? `Firstly, this is the context of the conversation. ${context}` : ''} ,
            { role: "assistant", content: "Understood. Now, could you please share the message you want me to summarise?" },
            { role: "user", content: `Please summarise this for me as simply as possible, as I have autism. ${message}` },
        ]
    });

    return chat.data.choices[0].message.content;
}

//Tests for you to try 


// getOffensiveLanguageResponse("Go break a leg!")
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

//getSarcasmResponse("We were talking about Football", "Wow what a brilliant play by the keeper, letting the ball through his hands and conceding a goal")
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