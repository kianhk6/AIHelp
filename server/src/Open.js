import OpenAI from 'openai';

class Open {
	
	constructor() {
		this.chat = this.chat.bind(this);
		this.open = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
			chatCompletion: true,
			logLevel: 'info'
		});

	}


	async chat(userContent) {
		return this.open.chat.completions.create({
		  model: 'gpt-3.5-turbo',
		  messages: [
			{ role: 'system', content: 'You are a helpful assistant.' },
			{ role: 'user', content: userContent }
		  ]
		}).then(function(response) {
		  return response.choices[0].message.content;
		}).catch(function(error) {
		  return error;
		});
	  }
}

export { Open };
