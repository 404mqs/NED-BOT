const Discord = require(`discord.js`);
const moment = require("moment");
const config = require('./config.json');
const client = new Discord.Client({ ws: { intents: 32767 } });
const clientN = require("nekos.life") //requerimos nekos.life
const neko = new clientN()//nuevo cliente de nekos.life
const fetch = require("node-fetch");// npm i node-fetch
const bot = require("espchatbotapi");
const Db = require('megadb')
const bienvenidas = new Db.crearDB('bienvenidas')
const discordTTS = require("discord-tts");
const dinero = new Db.crearDB("Dinero")
const ms = require("ms")
const discordplanes = require("discord-plane")
const pr = require("pretty-ms")
const dbe = require("quick.db")
const dbe2 = require("quick.db")
const warnings = new Db.crearDB('warnings')
const dimgs = require('discordimgs');
const unturnedStats = require('unturned-info-stats');
const Gamedig = require('gamedig');

let repetir = new Map() 


client.commands = new Discord.Collection();
const prefix = config.prefix;



client.on('ready', () => {
    console.log(`Ned bot listo para operar! Con ${client.users.cache.size} usuarios, en ${client.channels.cache.size} canales de ${client.guilds.cache.size} servers.`);
    client.user.setStatus("Online")

    client.user.setActivity(`7 | ✨NED`, { type: 'WATCHING' });
    	
});


client.on('message', async message => {
    if(message.member.roles.cache.find(rol => rol.name === 'Blacklist'))
    {
    return;
    }
	if(message.member.roles.cache.find(rol => rol.name === 'muted'))
    {
    message.delete
	}
    let mencionado = message.mentions.users.first()
    if(!mencionado){return;}
	if (message.author.bot) return;
    if(mencionado.id === client.user.id)
        {
		
	    const embed1 = new Discord.MessageEmbed()
	   .setAuthor("NED", client.user.avatarURL())
	   .setColor("YELLOW")
	   .setFooter("Ned Bot")
	   .setThumbnail("https://jonmgomes.com/wp-content/uploads/2020/03/Liquid-Lightbulb-Animation-V2-800x600-1.gif")
       .setDescription("Hola! Gracias por usar NED BOT. \n Ned es un bot especializado en enviar cosas divertidas para animar tu servidor. \n Para ver la lista de comandos puedes usar `7cmd`.")
        message.channel.send(embed1)	
		
		}
})

client.on('message', async message => {
    if(!repetir.has(message.channel.id)){
repetir.set(message.channel.id, {
mensaje : message.content.toLowerCase(),
contador : 1
})
} else {
let {mensaje, contador} = repetir.get(message.channel.id)
if(mensaje !== message.content.toLowerCase()){

repetir.delete(message.channel.id)
            } else {
repetir.set(message.channel.id, {
                    contador : contador + 1,
                    mensaje : mensaje 
                })
				
}
if(contador > 3){
message.channel.send(mensaje)
	
repetir.delete(message.channel.id)
            }
        }
		
		
		
        if(message.member.roles.cache.find(rol => rol.name === 'Blacklist')){
return;
}
	if(message.member.roles.cache.find(rol => rol.name === 'muted')){
message.delete
	}
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()
    


	
	if(command === ''){
	  const embed1 = new Discord.MessageEmbed()
	   .setAuthor("NED", client.user.avatarURL())
	   .setColor("YELLOW")
	   .setFooter("Ned Bot")
	   .setThumbnail("https://jonmgomes.com/wp-content/uploads/2020/03/Liquid-Lightbulb-Animation-V2-800x600-1.gif")
       .setDescription("Hola! Gracias por usar NED BOT. \n Ned es un bot especializado en enviar cosas divertidas para animar tu servidor. \n Para ver la lista de comandos puedes usar `7cmd`.")
            message.channel.send(embed1)

 }
	

	
	if (command === "perms" ) {
	const elputo = new Discord.MessageEmbed()
	
	.setColor("YELLOW")
	.setThumbnail("https://i.pinimg.com/originals/78/0e/82/780e82a59775c95c72df27c9d8e1bb74.gif")        
	.setTitle("Permisos de MODERACION")
	.setDescription("`GESTIONAR MENSAJES (MANAGE_MESSAGES): warn/unwarn`\n`ADMINISTRADOR (ADMINISTRATOR): clearwarns/setwarns/lock/unlock/blacklist/removeblacklist`\n`BANEAR MIEMBROS (BAN_MEMBERS): ban/softban/unban`\n`KICKEAR MIEMBROS (KICK_MEMBERS): kick`\n`MUTEAR MIEMBROS (MUTE_MEMBERS): mute/tempmute`\n`GESTIONAR SERVIDOR (MANAGE_GUILD): clear`")
	
	
	            message.channel.send(elputo)    

}




	
		if(command === 'bal'){
		const user = message.mentions.users.first() || message.author
        let emoji = "<a:dolar:768550312604336188>"
		if(!dinero.tiene(`${user.id}`)) 
        dinero.establecer(`${user.id}`, 0)
			
		let money = await dinero.obtener(`${user.id}`); 
			
		const embed = new Discord.MessageEmbed()
		.setColor("YELLOW")
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
	    .setTitle((message.author == user)?`Tu dinero, ${user.username}`:`Dinero de ${user.username}`)  
		.setDescription(`Dinero total: $**${money}**  :white_check_mark:`)
					  
		message.channel.send(embed);
		
	     }
  
	  
     
	    		if(command === 'work'){
				let user = message.author
				let tiempo = ms("2h")
				let cd = dbe.fetch(`timer_${message.author.id}`)
				if(Date.now() < cd) {
				let restante = cd  - Date.now()
				let r = pr(restante, {verbose: true}).replace("hours", "Horas").replace("minutes", "Minutos y").replace("seconds", "Segundos"). replace("hour ", "Hora ")
    .replace("minute ", "Minuto ")
				
				const rest = new Discord.MessageEmbed()
				.setDescription(`Aun no puedes volver a usar este comando.\nTiempo restante **${r}**`)
				.setColor("RED")
				message.channel.send(rest)
			    return

                      }
				if(!dinero.tiene(`${user.id}`)) { 
  dinero.establecer(`${user.id}`, 0);}



					Math.floor(Math.random() * (501 - 100)) + 100
	let random = Math.floor(Math.random() * (501 - 100)) + 100
	
	dinero.sumar(`${user.id}`, random)
				
	let money = await dinero.obtener(`${user.id}`); 

	let dolar = ":white_check_mark:"
	
	let trabajos = [`Fuiste a vender unas cosas usadas y ahora tienes ${money} $`,
                `Recibiste tu sueldo y ahora tienes ${money} $`,
                `Repartiste el periodico y ahora tienes ${money} $`,
                `Le cortaste el pasto a tu vecina y ahora tenes ${money} $`,
                `Le arreglaste la tele a tu abuela y te dio dinero. Ahora tenes ${money}$`,
                `Fuiste a vender unas cosas usadas y ganaste ${random} $`]
     let tra = trabajos[Math.floor(Math.random() * trabajos.length)]


     const embed3 = new Discord.MessageEmbed() //creamos otro embed.
  .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`${tra}`)
  .setColor("YELLOW")

  dbe.delete(`timer_${message.author.id}`) //aca eliminamos el coolldown.
  dbe.add(`timer_${message.author.id}`, Date.now() + tiempo) //y acá se lo volvemos a agregar.

  message.channel.send(embed3)


}
	
		if(command === "spy")	{
		let member = ''
        if (message.mentions.users.size > 0) {
            member = await message.mentions.users.first().id
        } else if (message.mentions.users.size === 0 && args[0]) {
            member = client.users.get(args[0]).id
        } else if (message.mentions.users.size === 0 && !args[0]) {
            member = message.author.id
        }
        let seenon = [
            ...client.guilds.cache.filter(guild => guild.members.cache.has(member)).values(),
        ]
            .map((x, index) => index + 1 + ' ' + x.name)
            .join('\n\n')
        let seenonEmbed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setTitle(`He visto a ${client.users.cache.get(member).username} en.....`)
            .setDescription(`**${seenon}**`)
	        .setColor("YELLOW")

        message.channel.send(seenonEmbed)

	
	
		}		
	if(command === "daily")	{
		
	let user = message.author;
    let tiempo = ms("24h") 
    let cd = dbe2.fetch(`time_${message.author.id}`)
	
	
	if(Date.now() < cd) {
    
    let restante = cd  - Date.now()
    let r = pr(restante, {verbose: true}).replace("hours", "Horas").replace("minutes", "Minutos y").replace("seconds", "Segundos"). replace("hour ", "Hora ")
    .replace("minute ", "Minuto ")
    const rest = new Discord.MessageEmbed()
				.setDescription(`Aun no puedes volver a usar este comando.\nTiempo restante **${r}**`)
				.setColor("RED")
				message.channel.send(rest)
   return;
		
	}
		
	dbe2.delete(`time_${message.author.id}`)

	dbe2.add(`time_${message.author.id}`, Date.now() + tiempo)
		
	if(!dinero.tiene(`${user.id}`)) { 
  dinero.establecer(`${user.id}`, 0);}
		
     dinero.sumar(`${user.id}`, 2000)
		
	const rest2 = new Discord.MessageEmbed()
	            .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
				.setDescription(`Recibiste tu recompensa diaria de 2000$`)
				.setColor("YELLOW")
				message.channel.send(rest2)	
		
		
	}
		if(command === 'top'){
			
        let map = dinero.map(false, (dinero, u) => `**Usuario:** ${client.users.cache.get(u)}\n**Dinero:** ${dinero}$\n`)
	    let embed = new Discord.MessageEmbed()
	      .setDescription(await map)
          .setColor("YELLOW")
	      .setTimestamp()
          .setThumbnail("https://cdn.dribbble.com/users/96166/screenshots/1398761/medal.gifL") 
           .setTitle("Top Economia - NED")
         message.channel.send(embed)
			
			}
			
	if(command === 'roulette'){
		
		let user = message.author
		let mor = args[0];
		let gan = mor * 2;
		
		const din = new Discord.MessageEmbed() //creamos un embed
  .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true})) 
  .setDescription("Debes poner una cantidad de dinero para apostar.\nEl mínimo de dinero para apostar es de **100** :white_check_mark:") 
  .setColor("RED")

 if(!mor) return message.channel.send(din)
		
 const minimo = new Discord.MessageEmbed()
 .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
 .setDescription("No puedes apostar menos de **100** :white_check_mark: ")
 .setColor("RED")
 
 if(mor <= 99) return message.channel.send(minimo)
	
 if(!dinero.tiene(`${user.id}`))
   dinero.establecer(`${user.id}`, 0)
		
 let money = await dinero.obtener(`${user.id}`);
 
  if(isNaN(mor)){ 
      const nonum = new Discord.MessageEmbed()
      .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`Solo puedes apostar dinero.`) 
      .setColor("RED")
      message.channel.send(nonum) 

      return; 
  }
 
	if(mor > money){
	const nomo = new Discord.MessageEmbed()
      .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription("No tienes suficiente dinero.") 
      .setColor("RED")
      message.channel.send(nomo)
		
	  return;
		
 }
	   let co = args[1];
	 
	  if(!co){
	   const color = new Discord.MessageEmbed() 
.setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription("Debes elegir un color entre `rojo` o `negro`") 
.setColor("RED")

message.channel.send(color)
		  
}

	else if(co === "rojo" || co === "negro"){ 
 var cro = ["rojo","negro"] 
 var cros = Math.floor(Math.random()*(cro.length)); 
 var crosi = cro[cros]
 if(crosi === "rojo"){ 
if(co === "rojo"){ 

 if(dinero.tiene(`${user.id}`)) 
   dinero.sumar(`${user.id}`, mor) 
	
	const ganaste = new Discord.MessageEmbed() //creamos un embed
  .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`La bola cayó en el color **rojo**\n\nDinero ganado: **${gan}**`)
  .setColor("RED")
		
  return message.channel.send(`<@${message.author.id}>`), message.channel.send(ganaste)
	
	
	}
  if(dinero.tiene(`${user.id}`)) 
   dinero.restar(`${user.id}`, mor)
	
 
	
	const perdiste = new Discord.MessageEmbed() //cremos otro embed
.setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`La bola cayó en el color **rojo**\n\nDinero perdido: **${mor}**`) 
.setColor("RED")

message.channel.send(perdiste)
	
	return;
   }
	 
	 if(crosi === "negro"){
     if(co === "negro"){
	  if(dinero.tiene(`${user.id}`)) 
   dinero.sumar(`${user.id}`, mor)
		 
		 const ganaste2 = new Discord.MessageEmbed()
  .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`La bola cayó en el color **negro**\n\nDinero ganado: **${gan}** `)
  .setColor("RED")
		 
return message.channel.send(ganaste2)
		 
}
		 
    if(dinero.tiene(`${user.id}`)) 
   dinero.restar(`${user.id}`, mor)


const perdiste2 = new Discord.MessageEmbed()
.setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
.setDescription(`La bola cayó en el color **negro**\n\nDinero perdido: **${mor}** `)
.setColor("RED")

message.channel.send(perdiste2)

return; //y es lo mismo que expliqué antes pero con el negro
}

}
  else { //acá ponemos un else 
    const solop = new Discord.MessageEmbed()
    .setAuthor(user.username, message.author.displayAvatarURL({dynamic: true}))
    .setDescription("Solo puedes poner `rojo` o `negro`.") //le decimos al usuario que solo puede elegir entre rojo y negro
    .setColor("RED")

    message.channel.send(solop) //si el usuario puso otra cosa que no sea rojo o negro le enviará el embed

}
		
}
	
	
	if (command === "ban") {
	if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
	
		const sinpermisos = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No cuento con permisos necesarios para banear.")
			
  return message.channel.send(sinpermisos)
}
	
	

if (!message.member.permissions.has('BAN_MEMBERS')) {
	
		const sinpermisos2 = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No cuentas con permisos necesarios para banear.")
	
  return message.channel.send(sinpermisos2)
}	
		
     let persona = message.mentions.members.first() ||  message.guild.members.resolve(args[0])	
                                                       
	if (!persona) {
	
	const sinmencionar = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No has mencionado al usuario que quieres banear.")
	
	return message.channel.send(sinmencionar)
		
	} else if(!persona.bannable){
	
		const sinmencionar = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No puedo banear a esta persona.")	
		
	return message.channel.send(sinmencionar)
		
	const jerarquia = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("Persona de igual rango o mayor que tu.")	
		
    }else if 
	(persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
  return message.channel.send(jerarquia)
}
		
	var razon = args.slice(1).join(' ')
if (!razon) {
  razon = 'Razon no especificada'
}
	
	razon += ``
	
    const baneado = new Discord.MessageEmbed()
   .addField("Usuario Baneado", `${user.username}`)
   .addField("ID Baneado", `ID ${user.id}`)
   .addField("Razón", razon)
   .addField("Adminstrador", `${message.author}`)
   .addField("Canal", message.channel)
   .setImage("https://bestanimations.com/media/hazards/45886907warning-yellow-blinking-sign-animated-gif-3.gif")
   .setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
   .setColor("RED")
   .setThumbnail(client.user.avatarURL())
   message.channel.send(baneado)
	
	message.guild.members.ban(persona, {
  reason: razon
})
  .catch(e => message.reply('Ocurrio un **error** desconocido'))
  .then(() => {
  })
		

	

}
	
	
	if (command === "soporte") {
   	const empped = new Discord.MessageEmbed()
    .setTitle("NED - Soporte")
     .setThumbnail(client.user.avatarURL())
     .setDescription("Ingresa a nuestro Discord si presentas algun problema.")
	
	message.author.send(empped);
	
    message.author.send("https://discord.gg/yPeMYep")
             
         }

	
		if (command === "invitacion") {
   	const empped = new Discord.MessageEmbed()
    .setTitle("NED - Invitacion")
     .setThumbnail(client.user.avatarURL())
     .setDescription("Invita a NED a tu servidor!")
	 .setColor("YELLOW")
	message.author.send(empped);
	message.author.send("https://discord.com/oauth2/authorize?client_id=745619797206892595&scope=bot&permissions=261200")
             
         }
	
	
	if (command === "cmd" ){

const cmd = new Discord.MessageEmbed()
             .setColor("YELLOW")
            .setTitle("__Comandos de NED (7)__")
            .addField(`Informacion ✨`, "`ned` `soporte` `invitacion` `covid`\n`avatar` `serverinfo` `perms` `warnings` `unturnedstats`")
            .addField(`Moderacion ✨`, "`ban` `softban` `unban` `warn`\n`unwarn` `clearwarns` `setwarns` `lock`\n`unlock` `blacklist` `removeblacklist` `mute`\n`tempmute` `kick`")
            .addField(`Utilidades ✨`, "`anuncio` `encuesta` `reverse` `spy` `dm`")
            .addField(`Diversion ✨`, "`skin` `geometrytag` `clyde` `randomwikipedia` \n`roblox` `randomwikihow` `supreme` `infect`\n `slap` `alien` `randomimg` `phcomment`\n`captcha` `logro` `datos` `geometryfont`\n`changemymind` `trumptweet` `tweet` `tts`\n`meme` `videomeme`")
            .addField(`Economia ✨`, "`work` `bal` `roulette` `daily`")
	        .setThumbnail("https://docs.microsoft.com/en-us/windows/uwp/design/motion/images/physical.gif")
	        .setFooter("NED", client.user.avatarURL())

    	message.channel.send(cmd); //Enviamos el embed al canal

}
	
if (command === "anuncio") {

let perms = message.member.hasPermission("MANAGE_GUILD");

const embed225 = new Discord.MessageEmbed()
    .setThumbnail(client.user.avatarURL())
    .setTitle("ERROR")
    .setDescription("No tienes permisos para hacer esto.")
    .setColor("RED")

if (!perms) return message.channel.send(embed225)

const questions = [ "**¿Que titulo quieres?**.","**¿Que mensaje quieres?**."]
let titulo;
let authhor = message.author;
let anuncio
for (let i = 0; i < questions.length; i++) {
const question = questions[i];
message.channel.send(question);

let ms = await message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ['time'] });
const msg = ms.array()[0]
if(msg.content.toLowerCase() === "cancel" ) return message.chanel.send(":x: Cancelled");
if (i == 0) titulo = msg.content;
else anuncio = msg.content;
}
message.channel.bulkDelete(5);

let embed33336 = new Discord.MessageEmbed()
	.setThumbnail(client.user.avatarURL())
    .setTitle(titulo)
    .setDescription(anuncio)
    .addField('Anunciado por:', authhor.username)
    .setColor("RANDOM")
message.channel.send(embed33336) 

    }
	

	
	
	
	
	
		if (command === "warnings") {
let Wuser = message.mentions.members.first() 
 let idid = message.guild.name + Wuser.id
let Warns = await warnings.obtener(idid + '.advertencias')
if(!warnings.tiene(idid)){ Warns = 0}
		
const embem = new Discord.MessageEmbed()
.setTitle("Warns de " +`${user.username}`)
.setColor("RED")
.setImage("https://media1.tenor.com/images/d95b083db482b1a20a424ca31ad23736/tenor.gif?itemid=7915371")
.setThumbnail(client.user.avatarURL())
.setDescription("El usuario cuenta con " + Warns + " warns activos.")
message.channel.send(embem)
}
	
	
	
	if (command === "lock" ){
var permisos = message.member.hasPermission("ADMINISTRATOR") 

if(!permisos) return message.channel.send("Not enough permissions.") 
	
		let aceptenmeelcodepls = message.guild.roles.cache.find(rolstaff => rolstaff.name === 'NOMBRE DEL ROL PARA STAFF')

		let alluser = message.guild.roles.cache.find(aus => aus.name === '@everyone')

		if(!message.member.hasPermission("ADMINISTRATOR") )return message.reply(':no_entry_sign: **| No tienes permisos Suficientes!**');

		message.channel.updateOverwrite(alluser, { READ_MESSAGE_HISTORY: false, SEND_MESSAGES: false });

    	message.channel.updateOverwrite(aceptenmeelcodepls, { READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true });

    	const canalblock = new Discord.MessageEmbed() 

        	.setTitle("EL CHAT HA SIDO LOCKEADO.") 
            .setImage("https://static.wixstatic.com/media/ada762_62f8730a74fd48f3a1f64078b6953c97~mv2.gif")
        	.setColor("RED") 

    	message.channel.send(canalblock); 


}
	
if (command == "tempmute") {

   const sinpermisos8 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
    .setDescription("No cuentas con permisos necesarios para mutear.")
    
    
    if(!message.member.hasPermission("MUTE_MEMBERS")) {
   return message.channel.send(sinpermisos8)    }	
	
	
  let tomute = message.mentions.members.first() ||  message.guild.members.resolve(args[0])
  
  const papulince = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setColor("RED")
    .setDescription("El usuario no pudo encontrarse.")
  
  
  if(!tomute) return message.reply(papulince);
	
  let muterole = message.guild.roles.cache.filter(muterole => muterole.name === "muted");	
  
										   
  let mutetime = args[1];
  if(!mutetime) return message.reply("**No se ha especificado el tiempo.**");
  
	tomute.roles.add(muterole);
	
	const empeped2 = new Discord.MessageEmbed()
	.setTitle("Usuario Muteado", `{Wuser}`)
   .addField("ID Muteado", `{tomute}`)
   .addField("Nombre Muteado", `${tomute.username}`)
   .addField("Tiempo de Mute", `${mutetime}`)
   .addField("Adminstrador", `${message.author}`)
   .setImage("https://nameagency.co/assets/uploads/work/mute/name-design-agency-mute-01.gif")
   .setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
   .setColor("RED")
   .setThumbnail(client.user.avatarURL())
	
    client.channels.cache.get('756885529856966757').send(empeped2)
	
  setTimeout(function(){
	  
    tomute.roles.remove(muterole)
	  
	const empeped4 = new Discord.MessageEmbed()  
		.setTitle(`El usuario ${user.username} fue desmuteado.`)
  
message.channel.send(empeped4)
;
  }, ms(mutetime));
	
}
	
if (command == "mute") {
   const sinpermisos8 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
    .setDescription("No cuentas con permisos necesarios para mutear.")
    
    
    if(!message.member.hasPermission("MUTE_MEMBERS")) {
   return message.channel.send(sinpermisos8)    }
	
	
 let tomute = message.mentions.members.first() ||  message.guild.members.resolve(args[0])
 
   const papulince = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setColor("RED")
    .setDescription("El usuario no pudo encontrarse.")
 
  if(!tomute) return message.reply(papulince);	
	
  let muterole = message.guild.roles.cache.filter(muterole => muterole.name === "muted"); 
	tomute.roles.add(muterole);
	const empeped = new Discord.MessageEmbed()
	.setTitle("Usuario Muteado", `${user.username}`)
   .addField("ID Muteado", `ID ${tomute.id}`)
   .addField("Nombre Muteado", `${tomute}`)
   .addField("Tiempo de Mute", `Permanente`)
   .addField("Adminstrador", `${message.author}`)
   .setImage("https://nameagency.co/assets/uploads/work/mute/name-design-agency-mute-01.gif")
   .setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
   .setColor("RED")
   .setThumbnail(client.user.avatarURL())
	
	
message.channel.send(empeped)
}
	
// Con este codigo podras hacer que el BOT envie mensajes por DM a los usuarios que tu desees.
// Los mensajes se haran con EMBED


if(command === 'dm'){ //Hacemos el comando (esto lo ponen dependiendo de su codigo)
	
let Wuser = message.mentions.members.first() || client.users.resolve(args[0]) //Definimos el receptor del mensaje, se lo podra mencionar o tambien se lo podra llamar por ID
let contenido = args.slice(1).join(' ') //Definimos el contenido que enviaremos al usuario
if (!Wuser) {  // Si el emisor no menciona al usuario o pone alguna ID...
	
	const sinmencionar = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setColor("RED")
	.setDescription("No has mencionado al usuario que quieres enviarle un DM.")	
	
return message.channel.send(sinmencionar) //Se enviara el EMBED de arriba.
	
    }
	
if (!contenido) {	// Si falta el contenido del mensaje...
	
	const content = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setColor("RED")
	.setDescription("No has escrito el contenido del mensaje.")	
	
return message.channel.send(content) // Se enviara el EMBED de arriba.
	
	}

	const carta = new Discord.MessageEmbed()  //Creamos el EMBED del mensaje
	.setTitle(`${message.author.username}` + " te dice:")  //En el titulo dira `El usuario te dice....`
	.setThumbnail(message.author.displayAvatarURL({dynamic: true, size : 1024 })) //Colocamos la foto de perfil del emisor del mensaje
	.setDescription(`${contenido}`) //Ponemos el contenido a enviar
	.setColor("YELLOW") //Color del embed
    .setFooter(`ID ${Wuser.id}`, client.user.avatarURL()) //En el Footer colocaremos la ID del emisor en caso de que el receptor no comparta servidor con el, asi puede responderle si es que lo quiere hacer

	const confirmado = new Discord.MessageEmbed() //Crearemos un embed mas chico que nos dira que el mensaje se esta enviando
    .setDescription("**:white_check_mark: Enviando DM a **" + `${Wuser}` + "...."  ) //Esto lo ponen a gusto
	.setColor("YELLOW") // Color del embed
	
	const block = new Discord.MessageEmbed()  //Creamos EMBED de error. Este sera el mensaje que dira si por alguna razon no se puede enviar el mensaje
	.setTitle("ERROR") //Titulo del Embed
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2") //Thumbnail
    .setColor("RED")			 // Color del embed
	.setDescription("Ocurrio un error desconocido al enviar el DM.\nEs posible que el usuario tenga bloqueado el bot o haya deshabilitado la opcion de mensajes directos.")	//Mensaje del embed

	message.channel.send(confirmado) //Enviamos el embed que dice `Se esta enviando el MD....`
	
	client.users.cache.get(Wuser.id).send(carta) // Obtenemos al usuario a enviar el mensaje y enviamos el embed con el contenido del mensaje
			
	.catch(e => message.reply(block))  // Si sale el error, enviara este mensaje
			
				
    
	
	}

	
if (command === "kick") {
	if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
	
		const sinpermisos = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No cuento con permisos necesarios para banear.")
		
		
  return message.channel.send(sinpermisos)
}
	
	

if (!message.member.permissions.has('KICK_MEMBERS')) {
	
		const sinpermisos2 = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No cuentas con permisos necesarios para kickear.")
	
  return message.channel.send(sinpermisos2)
}	
		
     let persona = message.mentions.members.first() ||  message.guild.members.resolve(args[0])	
                                                       
	if (!persona) {
	
	const sinmencionar = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No has mencionado al usuario que quieres kickear.")
	
	return message.channel.send(sinmencionar)
		
	} else if(!persona.kickable){
	
		const sinmencionar = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No puedo kickear a esta persona.")	
		
	return message.channel.send(sinmencionar)
		
	const jerarquia = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("Persona de igual rango o mayor que tu.")	
		
    }else if 
	(persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
  return message.channel.send(jerarquia)
}
		
	var razon = args.slice(1).join(' ')
if (!razon) {
  razon = 'Razon no especificada'
}
	
	razon += ``
	
    const baneado = new Discord.MessageEmbed()
   .addField("Usuario Kickeado", `${user.username}`)
   .addField("ID Kickeado", `ID ${user.id}`)
   .addField("Razón", razon)
   .addField("Adminstrador", `${message.author}`)
   .addField("Canal", message.channel)
   .setImage("https://bestanimations.com/media/hazards/45886907warning-yellow-blinking-sign-animated-gif-3.gif")
   .setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
   .setColor("RED")
   .setThumbnail(client.user.avatarURL())
message.channel.send(baneado)
	
	persona.kick(persona, {
  reason: razon
})
  .catch(e => message.reply('Ocurrio un **error** desconocido'))
  .then(() => {
  })
		

	

}
	
if (command === "unlock" ){

let aceptenmeelcodepls = message.guild.roles.cache.find(rolstaff => rolstaff.name === 'NOMBRE DEL ROL PARA STAFF')

		let alluser = message.guild.roles.cache.find(aus => aus.name === '@everyone')

		if(!message.member.hasPermission("ADMINISTRATOR") )return message.reply(':no_entry_sign: **| Not Enough Permissions!**');
			
		message.channel.updateOverwrite(alluser, { READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true });

    	message.channel.updateOverwrite(aceptenmeelcodepls, { READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true });

    	const desblockcanal = new Discord.MessageEmbed() 

        	.setTitle("EL CHAT FUE DESBLOQUEADO.") 
            .setImage("https://static.wixstatic.com/media/ada762_62f8730a74fd48f3a1f64078b6953c97~mv2.gif")
        	.setColor('#4bbf5c') 

    	message.channel.send(desblockcanal); 


	}
	
if (command === "blacklist") {
let Wuser = message.mentions.members.first() ||  message.guild.members.resolve(args[0])
    
const sinpermisos2 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
    .setDescription("No cuentas con permisos necesarios para blacklistear.")
    
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
   return message.channel.send(sinpermisos2)    }
    
    
    const baneo8 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
    .setDescription("El usuario no existe.")
    
    
    if(!Wuser) return message.channel.send(baneo8)
    
    const baneo9 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
    .setDescription("El usuario no puede ser blacklisteado.")
    
    if(Wuser === message.author || user.bot) return message.channel.send(baneo9)
    
    let blacklist = message.guild.roles.cache.filter(rol => rol.name === "Blacklist")
    Wuser.roles.add(blacklist)
    
    const blacklist55 = new Discord.MessageEmbed()
    .setTitle(user.tag + ' Fue blacklisteado')
    
message.channel.send(blacklist55)

}	
	
	
if (command === "removeblacklist") {
let Wuser = message.mentions.members.first() ||  message.guild.members.resolve(args[0])
    
const sinpermisos8 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
    .setDescription("No cuentas con permisos necesarios para eliminar las blacklist.")
    
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
   return message.channel.send(sinpermisos8)    }
    
    
    const baneo10 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
    .setDescription("El usuario no existe.")
    
    
    if(!Wuser) return message.channel.send(baneo10)
    
    const baneo11 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
    .setDescription("El usuario no puede ser unblacklisteado.")
    
    if(Wuser === message.author || user.bot) return message.channel.send(baneo11)
    
    let blacklist = message.guild.roles.cache.filter(rol => rol.name === "Blacklist")
    Wuser.roles.remove(blacklist)
    
	const blacklist55 = new Discord.MessageEmbed()
    .setTitle(user.tag + ' Fue unblacklisteado')
    
message.channel.send(blacklist555)
    
}
	
if (command === "unwarn"){
 let Wuser = message.mentions.members.first() ||  message.guild.members.resolve(args[0])
let perms = message.member.hasPermission('MANAGE_MESSAGES')
if(!perms){
const embeds = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
	.setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No tienes permisos para hacer esto.")
    .setColor("RED")
message.channel.send(embeds)
return embeds
}
if(!Wuser){
    const embeddos = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No has mencionado a quien debo warnear.")
    .setColor("RED")
message.channel.send(embeddos)
return embeddos
}
 let idid = message.guild.name + Wuser.id

if(!warnings.tiene(idid)) return;
						  
    let Warns = await warnings.obtener(idid + '.advertencias')
    let razon = args.join(" ") || "Razón sin especificar."
    warnings.restar(idid + '-advertencias', 1,"-")    

    
   const embem = new Discord.MessageEmbed()
.setTitle("Warn removido.")
.setColor("GREEN")
.setImage("https://i.pinimg.com/originals/22/da/c4/22dac42d7eabaa811d69896843c754cb.gif")
.setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
.setDescription(`Se le ha removido 1 warn al usuario a ` + Wuser)
   
message.channel.send(embem)
}
	
	
if (command === "setwarns"){
let Wuser = message.mentions.members.first() 
let perms = message.member.hasPermission('ADMINISTRATOR')
let warns22 = args.slice(22).join(' ')


if(!perms){
const embeds = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No tienes permisos para hacer esto.")
    .setColor("RED")
message.channel.send(embeds)
return embeds
	
}

if(!Wuser){
    const embeddos = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
	.setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No has mencionado al usuario correspondiente.")
    .setColor("RED")
message.channel.send(embeddos)
return embeddos
}
	
let idid = message.guild.name + Wuser.id	
warnings.set(idid + '-advertencias', warns22,"-")	
	
const embeg22 = new Discord.MessageEmbed()
.setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
    .setTitle("Operacion Realizada")
    .setImage("https://www.lansweeper.com/wp-content/uploads/2018/11/local-admin-rights.gif")
    .setDescription("Los warns de " + Wuser +" se establecieron a " + warns22)
    .setColor("BLUE")	
message.channel.send(embeg22)

	
}	
	
if (command === "clearwarns"){
let Wuser = message.mentions.members.first() ||  message.guild.members.resolve(args[0])
let perms = message.member.hasPermission('ADMINISTRATOR')
if(!perms){
const embeds = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")

    .setTitle("ERROR")
    .setDescription("No tienes permisos para hacer esto.")
    .setColor("RED")
message.channel.send(embeds)
return embeds
	
}

if(!Wuser){
    const embeddos = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
	.setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No has mencionado al usuario correspondiente.")
    .setColor("RED")
message.channel.send(embeddos)
return embeddos

}

let idid = message.guild.name + Wuser.id

if(!warnings.tiene(idid)) return;
let Warns = await warnings.obtener(idid + '.advertencias')
warnings.set(idid + '-advertencias', 0,"-")	
	
const embem2 = new Discord.MessageEmbed()
.setTitle("Warns Limpios.")
.setImage("https://i.pinimg.com/originals/06/b3/74/06b374f1f433324d325b17a56659b43f.gif")
.setColor("GREEN")
.setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
.setDescription("El usuario fue limpiado de Warns.")
   
message.channel.send(embem2)

	
}	
	
	
		if (command === "tts"){

	const voiceChannel = message.member.voice.channel;
	const decir = args.join(' ')
	
	if(!voiceChannel){ 
		
const embed2 = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No te encuentras en ningun canal de voz.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
		
		return message.channel.send(embed2)
	
		
	}	
	if(!decir){ 
		
const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")		
		
		
		return message.channel.send(embed)
	
	}
		
	voiceChannel.join().then(connection => { 
        const stream = discordTTS.getVoiceStream(decir);
		const dispatcher = connection.play(stream);
	    dispatcher.on("finish",()=>voiceChannel.leave())
		
		})
		
		}
	
	
	if (command === "warn"){
 let Wuser = message.mentions.members.first() ||  message.guild.members.resolve(args[0])
let perms = message.member.hasPermission('MANAGE_MESSAGES')
if(!perms){
const embeds = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
	.setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No tienes permisos para hacer esto.")
    .setColor("RED")
message.channel.send(embeds)
return embeds
}
if(!Wuser){
    const embeddos = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
	.setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No has mencionado a quien debo warnear.")
    .setColor("RED")
message.channel.send(embeddos)

return embeddos
}
 let idid = message.guild.name + Wuser.id

if(!warnings.tiene(idid)){
warnings.establecer(idid,{advertencias: 0})
}
    let Warns = await warnings.obtener(idid + '.advertencias')
    let razon = args.join(" ") || "Razón sin especificar."
    warnings.sumar(idid + '-advertencias', 1,"-")    

    
   const embed229 = new Discord.MessageEmbed()
   .addField("Usuario Advertido", `${Wuser}`)
   .addField("ID Advertido", `ID ${Wuser.id}`)
   .addField("Razón", razon)
   .addField("Adminstrador", `${message.author}`)
   .addField("Canal", message.channel)
   .setImage("https://bestanimations.com/media/hazards/45886907warning-yellow-blinking-sign-animated-gif-3.gif")
   .setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
   .setColor("RED")
   .setThumbnail(client.user.avatarURL())


    
message.channel.send(embed229)
 }	
	
	
	
	if (command === "serverinfo") {//Abrimos el comando
    var server = message.guild; //Definimos server
    let guild = message.guild; //Definimos guild
    let verifLevels = [
        "Ningúno",
        "Bajo",
        "Medio",
	]
	
	      region = {
        europe: "Europa :flag_eu:",
        brazil: "Brasil :flag_br: ",
        hongkong: "Hong Kong :flag_hk:",
        japan: "Japón :flag_jp:",
        russia: "Rusia :flag_ru:",
        singapore: "Singapur :flag_sg:",
        southafrica: "Sudáfrica :flag_za:",
        sydney: "Sydney :flag_au:",
        "us-central": "Central US :flag_us:",
        "us-east": "Este US :flag_us:",
        "us-south": "Sur US :flag_us:",
        "us-west": "Oeste US :flag_us:",
        "vip-us-east": "VIP US Este :flag_us:",
        "eu-central": "Europa Central :flag_eu:",
        "eu-west": "Europa Oeste :flag_eu:",
        london: "London :flag_gb:",
        amsterdam: "Amsterdam :flag_nl:",
        india: "India :flag_in:"
      };
		
		const embed = new Discord.MessageEmbed()
		.setThumbnail(message.guild.iconURL({size : 2048, dynamic: true}))
	    .setTitle(server.name, message.guild.iconURL)
        .setDescription(
        `Servidor creado el **${
          guild.createdAt.toDateString().split(" ")[2]
        }/${guild.createdAt.toDateString().split(" ")[1]}/${
          guild.createdAt.toDateString().split(" ")[3]
        }**`)
		.addField(
        "Dueño del Servidor",
        "**" +
          server.owner.user.username +
          "#" +
          server.owner.user.discriminator +
          "**",
        true)
		.addField("ID:", "**" + server.id + "**")
		.addField(`Region:`, `**${region[guild.region]}**`, true)
		.addField("Miembros", "**" + server.memberCount + "**", true)
        .addField(
        "Bots:",
        "**" + guild.members.cache.filter(member => !member.user.bot).size + "**",
        true)
		 .addField("Roles:", "**" + server.roles.cache.size + "**", true)
         .setColor("YELLOW")
        message.channel.send(embed)
		
		}
		
		   if (command === "roblox"){

	let username = args.join(' '); 
			   
			const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
			   
 if(!username) return message.channel.send(embed);
			   

let url = `http://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&Format=Png&username=${username}` 

let avatar = new Discord.MessageEmbed()
.setImage(url)
message.channel.send(avatar);
}
	
	if(command === `avatar`) {
		let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
		
		if (!user) {
		
		const sinmencionar = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No has mencionado al usuario.")
	
	return message.channel.send(sinmencionar)
		
		}
		
		const avatar = new Discord.MessageEmbed()//definimos el embed
.setDescription(`[DESCARGAR](${user.displayAvatarURL({
        format: 'png',
        dynamic: true
    })})`)//Le agregamos una descripción con un link al avatar ya sea animado o estático
.setImage(user.displayAvatarURL({dynamic: true, size : 1024 }))
.setColor("RANDOM")//Ponemos un color random
.setFooter(`Avatar solicitado por: ${message.member.displayName}`);
message.channel.send(avatar)
		
		}
	
	   if (command === "covid"){
	try{
    let res = await require('node-fetch')(`https://corona.lmao.ninja/v2/all?yesterday=false`);
    let data = await res.json();
    let covid = new Discord.MessageEmbed() // En caso de usar v11 debes reemplazar MessageEmbed por RichEmbed
    .setTitle('Covid-19') 
    .addField('Casos', data.cases.toLocaleString(), true) 
    .addField('Casos hoy', data.todayCases.toLocaleString(), true) 
    .addField('Muertes', data.deaths.toLocaleString(), true) 
    .addField('Muertes hoy', data.todayDeaths.toLocaleString(), true) 
    .addField('Condición critica', data.critical.toLocaleString(), true) 
    .addField('Recuperados', data.recovered.toLocaleString(), true) 
    .setColor('FF0000')
	.setThumbnail("https://i.imgur.com/2KzF0G8.jpg");

    message.channel.send(covid)
}catch(e){
message.channel.send('Ha ocurrido un error!') 
}
	   
}
	
	if (command === "softban") {
	if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
	
		const sinpermisos = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No cuento con permisos necesarios para banear.")
		
		
  return message.channel.send(sinpermisos)
}
	
	

if (!message.member.permissions.has('BAN_MEMBERS')) {
	
		const sinpermisos2 = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No cuentas con permisos necesarios para banear.")
	
  return message.channel.send(sinpermisos2)
}	
		
     let persona = message.mentions.members.first() ||  message.guild.members.resolve(args[0])	
                                                       
	if (!persona) {
	
	const sinmencionar = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No has mencionado al usuario que quieres banear.")
	
	return message.channel.send(sinmencionar)
		
	} else if(!persona.bannable){
	
		const sinmencionar = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No puedo banear a esta persona.")	
		
	return message.channel.send(sinmencionar)
		
	const jerarquia = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("Persona de igual rango o mayor que tu.")	
		
    }else if 
	(persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
  return message.channel.send(jerarquia)
}
		
	var razon = args.slice(1).join(' ')
if (!razon) {
  razon = 'Razon no especificada'
}
	
	razon += ``
	
    const baneado = new Discord.MessageEmbed()
   .addField("Usuario SoftBaneado", `${user.username}`)
   .addField("ID SoftBaneado", `ID ${user.id}`)
   .addField("Razón", razon)
   .addField("Adminstrador", `${message.author}`)
   .addField("Canal", message.channel)
   .setImage("https://bestanimations.com/media/hazards/45886907warning-yellow-blinking-sign-animated-gif-3.gif")
   .setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
   .setColor("RED")
   .setThumbnail(client.user.avatarURL())
client.channels.cache.get('756885529856966757').send(baneado)
	
	message.guild.members.ban(persona, {
  reason: razon,
  days: 7
}) 
   message.guild.members.unban(persona.id)
  
  
		

	

}	
		
	
if (command === "unban") {
if(!message.member.hasPermission("BAN_MEMBERS")) {
const sinpermisos2 = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No cuentas con permisos necesarios para desbanear.")
	
  return message.channel.send(sinpermisos2)	
	

}

if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
const sinpermisos4 = new Discord.MessageEmbed()
	.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No cuento con permisos necesarios para banear.")
  return message.channel.send(sinpermisos5)	

}
	
let userID = args[0]
message.guild.fetchBans().then(bans=> {

const baneo = new Discord.MessageEmbed()
.setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("No hay baneos en este servidor.")

if(bans.size == 0) return message.channel.send(baneo)

	let bUser = bans.find(b => b.user.id == userID)
	
	const baneo2 = new Discord.MessageEmbed()
    .setTitle("ERROR")
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setColor("RED")
	.setDescription("El usuario no existe.")
	
	if(!bUser) return message.channel.send(baneo2)
	
	 const baneado = new Discord.MessageEmbed()
   .addField("Usuario Desbaneado", `${user.username}`)
   .addField("ID Desbaneado", `ID ${user.id}`)
   .addField("Gestor", `${message.author}`)
   .setThumbnail("https://images.emojiterra.com/twitter/v13.0/512px/2705.png")
   .setColor("GREEN")
   .setImage("https://www.neoteo.com/wp-content/uploads/2014/05/kermit.gif")
   .setThumbnail(client.user.avatarURL())
client.channels.cache.get('756885529856966757').send(baneado)
	 
     message.guild.members.unban(bUser.user)
	})
	}
	
    if (command === "geometrytag"){  //Creamos el comando (esto lo adaptan a su codigo)
message.delete()	
let char = ["gatekeeper", "gatekeeper.dark", "keymaster", "keymaster.huh", "keymaster.scared", "keymaster.scream", "monster", "monster.eyes", "potbor", "potbor.annoyed", "potbor.huh", "potbor.mad", "potbor.right", "potbor.talk", "potbor.tired", "scratch", "scratch.annoyed", "scratch.huh", "scratch.mad", "scratch.right", "scratch.talk", "shopkeeper", "shopkeeper.annoyed", "spooky"]    //Estos son todos los iconos que pueden tener los mensajes.

let color = ["blue", "brown", "purple", "aqua", "green", "grey", "orange", "pink", "red"] //Estos son todos los colores que se pueden usar en los mensajes
	
let captura = char[Math.floor(char.length * Math.random())];  //Utilizaremos esta funcion para que el icono sea aleatorio y no salga siempre el mismo
let colorize = color[Math.floor(color.length * Math.random())]; //Utilizaremos esta funcion para que el color sea aleatorio y no salga siempre el mismo


let autor = message.author;  //Definimos autor
	
let txt = args.join('%20'); //Esto es importante, ya que sino no podremos utilizar espacios en los tag
		
const embed2 = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun nombre.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")		
	
if (!txt) return message.channel.send(embed2)
	
let attachment = `https://gdcolon.com/tools/gdtextbox/img/${txt}?${colorize}=purple&name=${autor.username}&char=${captura}`	 //Attachment

const embed = new Discord.MessageEmbed()  //Creamos embed para enviar el attachment (Esto no es obligatorio, tambien se puede enviar el mensaje sin embed, pero yo prefiero hacerlo asi)
  .setImage(attachment);  //Colocamos la imagen

message.channel.send(embed)    //Enviamos embed

}
	
if (command === "trumptweet"){
let txt = args.join('%20'); 

const embed2 = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun nombre.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")	
	
if (!txt) return message.channel.send(embed2)
	
	
let attachment = new Discord.MessageAttachment(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${txt}&raw=1`,'logo.png')


message.channel.send(attachment)	

}
// Este comando nos permitira enviar tweets con nuestro nombre de Discord
// El nombre que se vera en los tweets sera el que nosotros tenemos en discord, pero la imagen sera del usuario de twitter real con nuestro nombre ya que simulara que las personas con nuestro nombre estan enviando tweets
	
// Recomiendo mucho la API de nekobot para hacer esta clase de comandos
	
	
if (command === "tweet"){  //Hacemos el comando, dependiendo de su codigo lo hacen como lo tengan

message.delete() //Con esto borraremos el mensaje del comando, lo pueden quitar si quieren
	
let txt = args.join('%20'); //Definimos los args.
	
const embed2 = new Discord.MessageEmbed() //EMBED DE ERROR
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")	
	

if (!txt) return message.channel.send(embed2) //Si no hay argumentos se enviara esto

	
let autor = message.author; //Definiremos autor

let attachment = new Discord.MessageAttachment(`https://nekobot.xyz/api/imagegen?type=tweet&username=${autor.username}&text=${txt}&raw=1`,'logo.png') //Creamos el attachment reemplazando los valores por el nombre del autor y los argumentos por el texto


message.channel.send(attachment)	// Enviamos el attachment

} // Fin

if (command === "meme"){	
message.channel.send({ files :  [dimgs.randomMemeImagen()] })

	}

if (command === "videomeme"){	
message.channel.send({ files :  [dimgs.randomMemeVideo()] })

	}
	
  	if(command === 'avion'){
		message.channel.send({ files : [discordplanes.randomAvion()] })	
		
}
	
	
	
if (command === "changemymind"){
let txt = args.join('%20'); 
	
const embed2 = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun nombre.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
	
if (!txt) return message.channel.send(embed2)


let attachment = `https://nekobot.xyz/api/imagegen?type=changemymind&text=${txt}&raw=1`

const embed = new Discord.MessageEmbed()
  .setImage(attachment)
  .setColor("RANDOM")


message.channel.send(embed)	
}	


	if (command === "skin"){
let txt = args.join('%20'); 	
let attachment = `	https://minecraftskinstealer.com/api/v1/skin/render/fullbody/${txt}/1000`

const embed2 = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado el nombre de la skin de Minecraft.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
if (!txt) return message.channel.send(embed2)


const embed = new Discord.MessageEmbed()
  .setImage(attachment);


message.channel.send(embed)	
}

if (command === "datos"){
	
let txt = encodeURIComponent(args.join(" ")); 
	
const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
if (!txt) return message.channel.send(embed)	
let attachment = new Discord.MessageAttachment(`https://api.alexflipnote.dev/facts?text=${txt}`,'logo.png')
	
message.channel.send(attachment)
	
}
	
if (command === "logro"){
	
let txt = encodeURIComponent(args.join(" ")); 
	
const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
if (!txt) return message.channel.send(embed)
	
let attachment = new Discord.MessageAttachment(`https://api.alexflipnote.dev/achievement?text=${txt}`,'logo.png')
	
message.channel.send(attachment)
	
}	
	
if (command === "clyde"){
let txt = args.join('%20'); 
	
const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
if (!txt) return message.channel.send(embed)
	
let attachment = new Discord.MessageAttachment(`https://nekobot.xyz/api/imagegen?type=clyde&text=${txt}&raw=1`,'logo.png')

message.channel.send(attachment)	
}		
	
    
    if(command === 'ned'){
           const embed1 = new Discord.MessageEmbed()
            .setAuthor("NED", client.user.avatarURL())
            .setThumbnail(client.user.avatarURL())
            .addField("Developer", `**MQS#7816**`)
            .addField("Servers", ` ${client.guilds.cache.size}`)
            .addField("Usuarios", ` ${client.users.cache.size}`)
            .addField("Ram", ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
            .addField("Lenguaje", " JavaScript")
            .setColor(`YELLOW`)
            .addField("Libreria", " Discord.js v12.2.0")
            message.channel.send(embed1)
     }
	
	
    if(command === 'randomwikipedia'){
    let wiki = new Discord.MessageEmbed()
        .setColor("RANDOM")
      .setTitle(`RANDOM WIKIPEDIA`)
        .setDescription("[¡Random Wikipedia!](http://es.wikipedia.org/wiki/Special:Random)")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wikipedia_svg_logo.svg/1024px-Wikipedia_svg_logo.svg.png")
        

message.channel.send(wiki)
        
      }
	
	if(command === 'randomwikihow'){
    let wikihow = new Discord.MessageEmbed()
        .setColor("random")
        .setTitle(`RANDOM WIKIHOW`)
        .setDescription("[¡Random WikiHow!](https://es.wikihow.com/Especial:Randomizer)")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/4/4c/WikiHow_logo_-_primary_2014.png")
       
         message.channel.send(wikihow)
        
      }

		
	if (command === "captcha"){
message.delete()
	
let txt = args.join(" "); 

const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
if (!txt) return message.channel.send(embed)
let attachment = new Discord.MessageAttachment(`https://api.alexflipnote.dev/captcha?text=${txt}`,'imagen.png')
	
message.channel.send(attachment)
}
	
	if (command === "phcomment"){ //Creamos el comando (esto lo adaptan a su codigo, claro)

message.delete() //Esto es opcional. Es para borrar el mensaje que nosotros coloquemos como comando. si no lo quieren, borrenlo

let txt = args.join('%20');  //Argumentos 

const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
if (!txt) return message.channel.send(embed)	
let autor = message.author; //Definimos autor

let attachment = new Discord.MessageAttachment(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${message.author.displayAvatarURL()}&text=${txt}&username=${autor.username}&raw=1`,'logo.png') //Pedimos la imagen

message.channel.send(attachment)	//La enviamos

}
	
	
    if(command === 'geometryfont'){
     let texto = args.join(''); // Reemplazar los espacios por %20 para que sea compatible con la "api"
    let attachment = new Discord.MessageAttachment(`https://gdcolon.com/tools/gdlogo/img/${texto}`, 'logo.png') //Creando la imagen        
const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
if (!texto) return message.channel.send(embed)  
		
message.channel.send(attachment) 
        
        }
	
	    if(command === 'reverse'){
let texto = args.join(' ');
const embed = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
if (!texto) return message.channel.send(embed) 
			

if(message.deletable) message.delete();
			
			
const embed2 = new Discord.MessageEmbed()
.setTitle(args.join(" ").split("").reverse().join(""), { disableMentions: 'everyone' })
.setColor(`YELLOW`)
			
			
			
return message.channel.send(embed2)
	
		
		}
       if(command === 'supreme'){
   const Discord = require("discord.js")//lo de siempre

let txt = encodeURIComponent(args.join(" ")); //https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/encodeURIComponent

let link = `https://api.alexflipnote.dev/supreme?text=${txt}`;
		   
const embed2 = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun argumento.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	
if (!txt) return message.channel.send(embed2)   
		   
let embed = new Discord.MessageEmbed()//creamos el embed
  .setImage(link);
  message.channel.send(embed);//enviamos el embed
      
  }
	if(command === 'randomimg'){
	const Discord = require('discord.js');//declaramos en una variable el modulo de discord.js
    const fetch = require('node-fetch')//declaramos en una variable el modulo que vamos a usar para hacer la peticion http en este caso usare node-fetch
    const req = await fetch('https://source.unsplash.com/random')//hacemos la peticion http 
    const res = await req.buffer()//almecenamos en buffer la peticion http
    const attachament = new Discord.MessageAttachment(res)//usamos el constructor del MessageAttachamet y le pasamos el buffer
    message.channel.send(attachament)

	}
	
    if(command === 'unturnedinfo'){
		
	  let id = args.join(' ');
	  
	  if(!id) return message.channel.send(`ERROR`)

		
	  unturnedStats.load({
      key: '',
	  id: id 
		  
	  
		 
	  }).then(r => {
	  
	   var stats = r.body.playerstats.stats	  
	   console.log(stats[0])
		  
	   const embed = new Discord.MessageEmbed()
	   .setTitle(`__Unturned Info Stats__ 🛎️`)
	   .setColor(`#FF4828`)
	   .setThumbnail(`https://steamuserimages-a.akamaihd.net/ugc/710778524325769986/703DBE408736D406D3392738EF9EE6A28951734A/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true`)
	   .setDescription(`**User: ` + id +`**`)
	   .addField(`Normal Zombie Killed 🔪`, stats[0].value, true)
	   .addField(`Player Kill 🔪`, stats[1].value, true)
	   .addField(`Items Found 🔎`, stats[2].value, true)
	   .addField(`Experience Found ✨`, stats[4].value, true)
       .addField(`Mega Zombies Killed 🔪`, stats[5].value, true)
	   .addField(`Deaths 💀`, stats[6].value, true)
	   .addField(`Animal Killed 🦍`, stats[7].value, true)
	   .addField(`Shot Accuracy 🔫`, stats[11].value, true)
	   .addField(`Accuracy Hit 🔫`, stats[12].value, true)
	   .addField(`Distrance Travelled in Vehicles 🚗`, stats[15].value, true)
	   .addField(`Distance Travelled in Foot 🚶🏻`, stats[14].value, true)
	   .addField(`Headshots 🔫`, stats[13].value, true)
	   .setFooter("NED", client.user.avatarURL())


	   
	   
	   message.channel.send(embed)
		  
		  
    }).catch(e => console.error(e));
    
		
			}
	
		if(command === 'server'){

	const Gamedig = require('gamedig');
   Gamedig.query({
    type: 'unturned',
    host: '45.235.98.24',
	port: '25444'
}).then((state) => {
    console.log(state);
	
	const embed = new Discord.MessageEmbed()
	.setTitle(state.name)
	.setColor(`YELLOW`)
	.setDescription(state.raw.rules.Browser_Desc_Full_Line_0)
	.setThumbnail(state.raw.rules.Browser_Icon)
	.addField(`Mapa`, state.map, true)
	.addField(`Jugadores`, state.raw.numplayers, true)
	.addField(`Version`, state.raw.rules.unturned, true)
	.addField(`Jugadores`, state.bots.name)
	.addField(`Ping`, state.ping, true)
	   
	 message.channel.send(embed)
	   
}).catch((error) => {
    console.log("Server is offline");
});

	
	
	}
	
         if(command === 'unturnedstats'){
		
	  let id = args.join(' ');
	  
	
		  
	  const embed2 = new Discord.MessageEmbed()
      .setTitle(`ERROR`)
      .setDescription(`No has colocado ningun ID64.`)
      .setColor(`RED`)
      .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")	  
		  
		  
		  
	    if(!id) return message.channel.send(embed2)

		
	  unturnedStats.load({
      key: 'C07C1173208D23652E53B13E1B586666',
	  id: id 
		  
	  		
	  }).then(r => {
	  
	   var stats = r.body.playerstats.stats	  
	   console.log(stats[0])
		  
	   const embed = new Discord.MessageEmbed()
	   .setTitle(`__Unturned - Player Info__ 🛎️`)
	   .setColor(`#FF4828`)
	   .setThumbnail(`https://steamuserimages-a.akamaihd.net/ugc/710778524325769986/703DBE408736D406D3392738EF9EE6A28951734A/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true`)
	   .setDescription(`**🗨 ID del Usuario Solicitado: ` + id +`**`)
	   .addField(`Zombies Asesinados 🔪`, stats[0].value, true)
	   .addField(`Jugadores Asesinados 🔪`, stats[1].value, true)
	   .addField(`Items Encontrados 🔎`, stats[2].value, true)
	   .addField(`Experiencia Obtenida ✨`, stats[4].value, true)
       .addField(`Mega Zombies Asesinados 🔪`, stats[5].value, true)
	   .addField(`Muertes 💀`, stats[6].value, true)
	   .addField(`Animales Asesinados 🦍`, stats[7].value, true)
	   .addField(`Precisión de Disparo 🔫`, stats[11].value, true)
	   .addField(`Precision de Golpe 🔫`, stats[12].value, true)
	   .addField(`Distancia Recorrida en Vehiculos 🚗`, stats[15].value, true)
	   .addField(`Distancia Recorrida a Pie 🚶🏻`, stats[14].value, true)
	   .addField(`Disparos a la cabeza 🔫`, stats[13].value, true)
	   .setFooter("NED", client.user.avatarURL())


	   
	   
	   message.channel.send(embed)
		  
		  
    })
    
		
			}
 	
	



if(command === 'slap') {
let mencion = message.mentions.members.first() 

const embed2 = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun nombre.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")

	



if(!mencion) return message.channel.send(embed2) //si no hay mencionado retorna.
  neko.sfw.slap().then(neko => {
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`${message.member.displayName} cacheteo a ${mencion.displayName}`)
.setImage(neko.url) //url es el unico dato del JSON, asi que lo pedimos
message.channel.send(embed) //lo enviamos :3
 })
 }	
	
	
if (command === "infect") {
  

    let usuariomencionado = message.mentions.users.first();
	
	const embed2 = new Discord.MessageEmbed()
.setTitle(`ERROR`)
.setDescription(`No has colocado ningun nombre.`)
.setColor(`RED`)
.setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
	
	
	
if(!usuariomencionado) return message.channel.send(embed2)
	
	
    let elementos = [ `https://i.imgur.com/XAVNWHV.gif`, `https://media.giphy.com/media/IbmS6XKR5fTVchlxcN/giphy.gif`, `https://media.giphy.com/media/l4FGo3IonE0SdQYeY/giphy.gif`,`https://media.giphy.com/media/Yq8KGWBPEIZjHyhzgG/giphy.gif`];//Puedes agregar mas gifs aqui o imagenes
let captura = elementos[Math.floor(elementos.length * Math.random())];


  
const embed = new Discord.MessageEmbed() 
            .setColor(0xFA5C65)
.setDescription(`** ${message.author} Ha contagiado con Coronavirus a ${message.mentions.users.first()}**`)
            .setImage(captura)

            message.channel.send(embed);      

  
  
  }
	
if(command === 'alien'){
	
	           let aliens = [ `https://media.giphy.com/media/YGIpIZjgxL68w/giphy.gif`, `https://media.giphy.com/media/l0MYx2rhu3WL5fUd2/giphy.gif`, `https://media.giphy.com/media/xTiTnBSIn7vTqCDKJW/giphy.gif`, `https://media.giphy.com/media/26hisVHpbBwfcfKus/giphy.gif`, `https://media.giphy.com/media/RIevsoxqXHTtkHUFXp/giphy.gif`   ];
	
	
	            let random = aliens[Math.floor(aliens.length * Math.random())]
		        const alien = new Discord.MessageEmbed()
				.setColor("GREEN")
				.setDescription(`** Un ALIEN del Area 51 vino a llevarse a ${message.author}!**`)
				.setImage(random)

			       message.channel.send(alien);      
 
						  
            }
if(command === "setbienvenidas") {

let perms = message.member.hasPermission('MANAGE_MESSAGES')
if(!perms){
const embeds = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
	.setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No tienes permisos para hacer esto.")
    .setColor("RED")
message.channel.send(embeds)

}

let canal = message.mentions.channels.first()
if(!canal) return message.channel.send("No se ha mencionado canal")
	
bienvenidas.establecer(`${message.guild.id}`, `${canal.id}`);

message.channel.send(`Canal ${canal.name} establecido correctamente`)	

}
	

if (command === "encuesta" ){  //Aca sera donde ejecutemos el comando
  
    if(!args) return message.channel.send('Agrege una pregunta para la encuesta.')  //Aca dira, si no agregamos una pregunta al if
 
  const embed = new Discord.MessageEmbed() //Mensaje que enviara
       .setTitle('Encuesta:')
	   .setThumbnail(client.user.avatarURL())
       .setDescription('**'+args.join(' ')+'**\n▔▔▔▔▔▔▔▔▔▔▔')
       .addField('Opcion 1', '👍 Si')
       .addField('Opcion 2', '👎 No')
       .setColor("YELLOW")
       .setTimestamp()
 
  message.channel.send(embed) //Para reacionar(pueden cambiar los emojis)
  .then(m => {
         m.react("👍");
         m.react("👎");
 
   });
    }
	
if(command === "setnedtalk") {

let perms = message.member.hasPermission('MANAGE_MESSAGES')
if(!perms){
const embeds = new Discord.MessageEmbed()
    .setThumbnail("https://weakwifisolutions.com/wp-content/uploads/2019/08/error-red-cross-1.png?ezimgfmt=rs:372x372/rscb2/ng:webp/ngcb2")
    .setTitle("ERROR")
	.setImage("https://media1.tenor.com/images/70ce41310f8a9c2a84e97b57198015d9/tenor.gif")
    .setDescription("No tienes permisos para hacer esto.")
    .setColor("RED")
message.channel.send(embeds)

}

let canal = message.mentions.channels.first()
if(!canal) return message.channel.send("No se ha mencionado canal")
	
nedtalk.establecer(`${message.guild.id}`, `${canal.id}`);

message.channel.send(`Canal ${canal.name} establecido correctamente`)	

}
	


	})


client.on("guildMemberAdd", async member => {
var server = member.guild;

let canal = await bienvenidas.obtener(server.id)
if(!canal) return;
let canal_x = client.channels.resolve(canal)
let elementos = [`https://media1.tenor.com/images/5b8626bc2bd5a65d22f2278f57e6ee75/tenor.gif?itemid=12622027`];

let captura = elementos[Math.floor(elementos.length * Math.random())];

const embed = new Discord.MessageEmbed()
.setTitle(`Un nuevo miembro ha llegado a ${member.guild.name}!`)
.setDescription(`Bienvenido ${member.user} al servidor. Pasala bien!`)
.setImage(captura)
.setColor("RANDOM")

canal_x.send(embed)
})

client.on("guildCreate", async guild => {
    
guild.channels.create('🤖⌞ɴᴇᴅᴛᴀʟᴋ⌝');

    
Blacklist = await guild.roles.create ({
	
	data: {
	
	name: "Blacklist",
    color: "#2f3136",
	permissions: [0]
     }

	})

muterole = await guild.roles.create ({
	
		data: {

        name: "muted",
        color: "#000000",
        permissions:[0]
			}
      })
   guild.channels.cache.forEach(async (channel) => {      
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
	})
		})
		

	})     
     
     
      
	  
client.on('message', async message => {  
        if(message.member.roles.cache.find(rol => rol.name === 'Blacklist')){
return;
}
	if(message.member.roles.cache.find(rol => rol.name === 'muted')){
message.delete
	}
	  if(!message.channel.name == "🤖⌞ɴᴇᴅᴛᴀʟᴋ⌝") return;
      const args = message.content
   if(message.author.bot) return;
let canal = client.channels.cache.filter(c => c.name == "🤖⌞ɴᴇᴅᴛᴀʟᴋ⌝");


if(message.channel.name == "🤖⌞ɴᴇᴅᴛᴀʟᴋ⌝"){

 bot.hablar(args, 0).then(respuesta => {   

message.channel.send(respuesta);
    
   

             })
         }

    })

	


client.login(config.token); //get












	
 // destro