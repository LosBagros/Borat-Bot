const {Client,Attachment,MessageEmbed, Util} = require('discord.js');
const bot = new Client();

const cheerio = require('cheerio');

const request = require('request');


const token = 'token';

const prefix = '!wow ';



bot.on('ready', () => {
  console.log('Borat bot is online!');
  bot.user.setActivity('!wow', { type: 'PLAYING' })
})

bot.on('guildCreate', guild => {
	const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
	channel.send({embed: {
		color: 0x0099ff,
	  title: 'Very nice!',
	  url: 'https://boratbot.tk/',
	  description: 'Jak se máš? \n I am Borat, Kazakhstans best journalist. I like to play Ping Pong :ping_pong:, Sunbathe, Disco Dance and travel to capital city and watch ladies while they make toilet.',
	  }})
	});


bot.on('message', msg => {
	if (msg.content === '!wow help') {
	  msg.reply({embed: {
		color: 0x0099ff,
	  title: 'Bot Borat - Help',
	  url: 'https://boratbot.tk/',
	  description: '**Commands:** \n `!wow borat` - Send random image with borat \n `ping` - Play ping pong :ping_pong: \n `!wow invite` - Invite **me** to your server.  \n \n More commands coming soon...  \n **Made by LosBagros#0802 :ok_hand:**',
    }})
  }
  });

bot.on('message', msg => {
  if (msg.content === '!wow') {
    msg.reply({embed: {
      color: 0x0099ff,
	title: 'Bot Borat - Help',
	url: 'https://boratbot.tk/',
	description: '**Commands:** \n `!wow borat` - Send random image with borat \n `ping` - Play ping pong :ping_pong: \n `!wow invite` - Invite **me** to your server.  \n \n More commands coming soon...  \n **Made by LosBagros#0802 :ok_hand:**',
    }})
}
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
  msg.reply(':ping_pong: pong! ');
  }
  });


bot.on('message', message => {

  let args = message.content.substring(prefix.length).split(" ");

  switch (args[0]) {
      case 'borat':
      image(message);

      break;
  }

});

function image(message){

  var options = {
	  url: "http://results.dogpile.com/serp?qc=images&q=" + "borat",
      method: "GET",
      headers: {
          "Accept": "text/html",
          "User-Agent": "Chrome"
      }
  };





  request(options, function(error, response, responseBody) {
      if (error) {
          return;
      }


      $ = cheerio.load(responseBody);


      var links = $(".image a.link");

      var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
     
      console.log(urls);

      if (!urls.length) {
         
          return;
      }

      // Send result
      message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
  });


}

bot.on('message', msg => {
	if (msg.content === '!wow invite') {
		msg.author.send({embed: {
			color: 0x0099ff,
		  title: 'Invite Borat to your server',
		  url: 'https://boratbot.tk/',
		  description: 'More info here https://boratbot.tk/ \n Invite **Borat** https://boratbot.tk/invite.php/ \n Join to **Borat Community** https://boratbot.tk/community.php/ ',
		  }})
  }
  });





bot.login(token);
