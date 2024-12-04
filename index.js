const Alexa = require('ask-sdk-core');
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const express = require('express');

// LaunchRequestHandler
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to Rehab Journal. You can say "create a new entry" to get started.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// NewJournalIntentHandler
const NewJournalIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'NewJournalIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Creating a new journal entry. How do you feel?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Please tell me how you feel.')
            .getResponse();
    }
};

// RecordFeelingsIntentHandler
const RecordFeelingsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'RecordFeelingsIntent';
    },
    handle(handlerInput) {
        const feeling = Alexa.getSlotValue(handlerInput.requestEnvelope, 'Feeling');
        const entryDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

        // Save feeling to the database
        journalDatabase[entryDate] = feeling;

        const speakOutput = `Got it. I logged that you're feeling ${feeling} today.`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// InsperationalQuotesIntentHandler
const InsperationalQuotesIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'InsperationalQuotesIntent';
    },
    handle(handlerInput) {
        const quotes = [
            'Keep pushing forward. Every step counts.',
            'You are capable of amazing things.',
            'The best time for new beginnings is now.'
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        return handlerInput.responseBuilder
            .speak(randomQuote)
            .reprompt(randomQuote)
            .getResponse();
    }
};

// HelpMeQuitIntentHandler
const HelpMeQuitIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelpMeQuitIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'When you feel the urge, take a deep breath, go for a walk, or try writing in your journal.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// SkillQuestionIntentHandler
const SkillQuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'SkillQuestionIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can create journal entries, record how you feel, or ask for inspiration.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('What would you like to do?')
            .getResponse();
    }
};

// HelloWorldIntentHandler: Triggered when the user says "Hello".
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
// HelpIntentHandler: Triggered when the user asks for help.
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
              Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// CancelAndStopIntentHandler: Handles both "Cancel" and "Stop" intents, ending the session.
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
              (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};

// FallbackIntentHandler: Triggered when Alexa does not recognize the user's input.
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// SessionEndedRequestHandler: Triggered when the session ends unexpectedly or when the user says "exit" or "quit".
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

// ErrorHandler: Catches any errors in the skill and provides a fallback response.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Skill Builder: The entry point for the Alexa Skill, where all handlers are defined in sequence.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        RecordFeelingsIntentHandler,
        InsperationalQuotesIntentHandler,
        HelpMeQuitIntentHandler,
        SkillQuestionIntentHandler,
        NewJournalIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('sample/journal-skill/v1.0')
    .create();

    const adapter = new ExpressAdapter(skill, false, false);
    const app = express();
    // app.get('/', (request, response) => { response.end('Homepage'); });
    app.use(express.static(__dirname + '/public'));
    app.post('/', adapter.getRequestHandlers());
    exports.app = app;
    // app.listen(3006);

