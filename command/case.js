/*
# Haruka - UserBot
# Copyright (C) 2021 Haruka-Bot Created By ZeeoneOfc
#
# This file is a part of < https://github.com/zeeoneofc/Haruka/ >
# PLease read the GNU Affero General Public License in
# <https://www.github.com/zeeoneofc/Haruka/blob/v1/LICENSE/>.
*/ 

// WhatsApp api
const
	{
		WAConnection ,
		MessageType,
		Presence,
		MessageOptions,
		Mimetype,
		WALocationMessage,
		WA_MESSAGE_STUB_TYPES,
		WA_DEFAULT_EPHEMERAL,
		WAMessageProto,
		ReconnectMode,
		ProxyAgent,
		GroupSettingChange,
		waChatKey,
		relayWAMessage,
		mentionedJid,
		processTime
	} = require("@adiwajshing/baileys")
	
//module exports
const axios = require("axios")
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")  
const crypto = require('crypto')
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI()
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg') 
const figlet = require('figlet')
const fs = require('fs')
const gis = require('g-i-s')
const hx = require('hxz-api')
const ms = require('parse-ms')
const moment = require('moment-timezone')
const request = require('request')
const speed = require('performance-now')
const util = require('util')
const xa = require('xfarr-api')
const yts = require( 'yt-search')
const zee = require('api-alphabot')

//library
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('../lib/functions')
const { fetchJson, kyun, fetchText } = require('../lib/fetcher')
const { color, bgcolor } = require('../lib/color')
const { yta, ytv} = require('../lib/y2mate')
const simple = require('../lib/simple')

//json
const antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _registered = JSON.parse(fs.readFileSync('./database/user/registered.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const premium = JSON.parse(fs.readFileSync('./database/user/premium.json'))

const tebakgambar = JSON.parse(fs.readFileSync('./database/game/tebakgambar.json'))

//settings
const setting = JSON.parse(fs.readFileSync('./settings/config.json'))
let {
	ownername,
	ownernumber,
	botname,
	session_name
	} = setting
let thumbnail = fs.readFileSync(setting.thumbnail)
let limitawal = setting.limit.free

/*
# language
# available now [ind]
*/
const  { ind } = require(`./help`)
lang = ind 

//times
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')

//start script
			async function starts() {
				const haruka = new WAConnection()
				haruka.version = [2, 2143, 3]  //jika ada update dari WhatsApp web silahkan ubah
				haruka.logger.level = 'warn'
				console.log(color(figlet.textSync('Haruka-Bot', {
					font: 'Standard',
					horizontalLayout: 'default',
					vertivalLayout: 'default',
					whitespaceBreak: false
					}), 'skyblue'))
				haruka.on('qr', () => {
					console.log(color('[','white'), color('!','red'), color(']','white'), color('SCAN QR MASK 15 SECONDS, AND SUBSCRIBE YOUTUBE ZEEONE OFC'))
					})
			fs.existsSync(`./settings/${session_name}`) && haruka.loadAuthInfo(`./settings/${session_name}`)
			haruka.on('connecting', () => {
				console.log('|\x1b[1;32m TRM \x1b[1;37m|', color('Connecting...', 'yellow'))
				})
			haruka.on('open', () => {
				console.log('|\x1b[1;32m TRM \x1b[1;37m|', color('Connected', 'yellow'))
			})
			await haruka.connect({timeoutMs: 30*1000})
			fs.writeFileSync(`./settings/${session_name}`, JSON.stringify(haruka.base64EncodedAuthInfo(), null, '\t'))

					
//greetings
				haruka.on('group-participants-update', async(anu) => {
					try {
						const sendButLoc = async (id, text1, desc1, gam1, but = [], options = {}) => {
							const mediaxxaaaa = await haruka.prepareMessage(id, gam1, MessageType.location, {thumbnail: gam1})
							var mhan = mediaxxaaaa.message["ephemeralMessage"] ? mediaxxaaaa.message.ephemeralMessage : mediaxxaaaa
							const buttonMessages = {
								locationMessage: mhan.message.locationMessage,
								contentText: text1,
								footerText: desc1,
								buttons: but,
								headerType: 6
								}
							haruka.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
						}
						const mdata = await haruka.groupMetadata(anu.jid)
						console.log(anu)
						num = anu.participants[0]
						let v = haruka.contacts[num] || { notify: num.replace(/@.+/, "") };
						anu_user = v.vname || v.notify || num.split("@")[0];
						try {
							ppmem = await haruka.getProfilePicture(num);
							} catch (e) {
								ppmem = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
								}
						try {
							ppgc = await haruka.getProfilePicture(anu.jid);
							} catch (e) {
								ppgc = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
								}
						let ppmem2 = await getBuffer(ppmem)
						let ppgc2 = await getBuffer(ppgc)
						let gakloo = [{
										"buttonId": `.owner`,
										"buttonText": {
											"displayText": "Welcome 👋"
											},
										"type": "RESPONSE"
										}]
						if (anu.action == 'add') {
							await sendButLoc(mdata.id, `Welcome @${num.split('@')[0]} to ${mdata.subject}` + '\n' + lang.welcome(), `Welcome Message By ${ownername}`,ppmem2, [{"buttonId": `.owner`,"buttonText": {"displayText": "Welcome 🤗"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
						} else if (anu.action == 'remove') {
							await sendButLoc(mdata.id, `Goodbye @${num.split('@')[0]}\n⌯ָ   ֙Leave from group:\n${mdata.subject}` + '\n' + lang.leave(), `Leave Message By ${ownername}`,ppmem2, [{"buttonId": `.owner`,"buttonText": {"displayText": "Bye 🤲"},"type": "RESPONSE"}], {contextInfo: { mentionedJid: [num]}})
						}
				} catch (e) {
					console.log('Error : %s', color(e, 'red'))
					}
				})
				
				haruka.on('chat-update', async (mek) => {
					try {
						if (!mek.hasNewMessage) return
						 mek = mek.messages.all()[0]
						if (!mek.message) return
						if (mek.key && mek.key.remoteJid == 'status@broadcast') return
						if (mek.key.fromMe) return
						mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
						const content = JSON.stringify(mek.message)
						const from = mek.key.remoteJid
						const type = Object.keys(mek.message)[0]
						const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
						const wita = moment(Date.now()).tz('Asia/Makassar').locale('id').format('HH:mm:ss z')
						const wit = moment(Date.now()).tz('Asia/Jayapura').locale('id').format('HH:mm:ss z')
						const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
						var prefix = /^[°•π÷×¶∆£¢€¥®™✓|~zZ+×_*!#$%^&./\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓|~+×_*!#$,|`÷?;:%%^&./\\©^]/gi) : '#'
						body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == "buttonsResponseMessage") && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
						var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
						const manti = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
						budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
						const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
						const arg = budy.slice(command.length + 2, budy.length)
						const args = body.trim().split(/ +/).slice(1)
						const q = args.join(' ')
						const runtime = process.uptime()   
						const isCmd = body.startsWith(prefix)
						const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = haruka.user.phone
						const botNumber = haruka.user.jid
						const ownerNumber = [`${ownernumber}@s.whatsapp.net`] 
						const isGroup = from.endsWith('@g.us')
						const totalchat = await haruka.chats.all()
						const sender = mek.key.fromMe ? haruka.user.jid : isGroup ? mek.participant : mek.key.remoteJid
						const isOwner = mek.key.fromMe ? haruka.user.jid : ownerNumber.includes(sender)
						const conts = mek.key.fromMe ? haruka.user.jid : haruka.contacts[sender] || { notify: jid.replace(/@.+/, '') }
						const pushname = mek.key.fromMe ? haruka.user.name : conts.notify || conts.vname || conts.name || '-'
						
						//apaya
						const isAntiLink = isGroup ? antilink.includes(from) : false
						
						const groupMetadata = isGroup ? await haruka.groupMetadata(from) : ''
						const groupName = isGroup ? groupMetadata.subject : ''
						const groupId = isGroup ? groupMetadata.jid : ''
						const groupMembers = isGroup ? groupMetadata.participants : ''
						const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
						const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
						const isGroupAdmins = groupAdmins.includes(sender) || false
						
			//fake reply
			let ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net",   "remoteJid": "6289523258649-1604595598@g.us"  }, "message": {orderMessage: {itemCount: 2021,status: 200, thumbnail: thumbnail, surface: 200, message: `${botname} 🏟️\nBy ${ownername}`, orderTitle: 'zeeoneofc', sellerJid: '0@s.whatsapp.net'}},sendEphemeral: true}
      	  let fdoc = {key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `© ${ownername}`,jpegThumbnail: thumbnail}}}
   	     let fvn = {key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: { "audioMessage": {"mimetype":"audio/ogg; codecs=opus","seconds":99999,"ptt": "true"}} } 
	        let fgif = {key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {})},message: {"videoMessage": { "title":`© ${ownername}`, "h": `Hmm`,'seconds': '99999', 'gifPlayback': 'true', 'caption': `${botname} 🏟️\nBy ${ownername}`, 'jpegThumbnail': thumbnail}}}
			let fgclink = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": "P", "caption": `© ${botname}`, 'jpegThumbnail': thumbnail}}}
			let fgclink2 = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "m","groupName": "P", "caption": `© ${botname}`, 'jpegThumbnail': thumbnail}}}
			let fvideo = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289643739077-1613049930@g.us" } : {}) },message: { "videoMessage": { "title":`© ${ownername}`, "h": `Hmm`,'seconds': '99999', 'caption': `© ${ownername}`, 'jpegThumbnail': thumbnail}}}
			let floc = {contextInfo: {"forwardingScore":999,"isForwarded":true,'stanzaId': 'B826873620DD5947E683E3ABE663F263', 'participant':`0@s.whatsapp.net`, 'remoteJid': '6283136505591-1614953337@g.us', 'quotedMessage': {"locationMessage": {"degreesLatitude": 41.893714904785156, "degreesLongitude": -87.63370513916016, "name": botname , 'jpegThumbnail':thumbnail}}}}
			let fkontak = { key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: `6283136505591-1614953337@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `© ${ownername}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${ownername},;;;\nFN:${ownername},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': thumbnail, thumbnail: thumbnail,sendEphemeral: true}}}
		
			const addRegisteredUser = (userid, sender, time, serials) => {
				const obj = { id: userid, name: sender, time: time, serial: serials }
				_registered.push(obj)
				fs.writeFileSync('./database/user/registered.json', JSON.stringify(_registered))
			}
			const createSerial = (size) => {
				return crypto.randomBytes(size).toString('hex').slice(0, size)
			}
			
			const checkRegisteredUser = (sender) => {
				let status = false
				Object.keys(_registered).forEach((i) => {
					if (_registered[i].id === sender) {
						status = true
						}
					})
				return status
			}
			
			const checkLimit = (sender) => {
				let found = false
				for (let lmt of _limit) {
					if (lmt.id === sender) {
						let limitCounts = limitawal - lmt.limit
						if (limitCounts <= 0) return haruka.sendMessage(from,`Limit kamu sudah habis`, text,{ quoted: mek})
						haruka.sendMessage(from, lang.limitcount(isPremium, limitCounts), text, { quoted : mek})
						found = true
					}
				}
					if (found === false) {
						let obj = { id: sender, limit: 1 }
						_limit.push(obj)
						fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
						haruka.sendMessage(from, lang.limitcount(isPremium, limitCounts), text, { quoted : mek})
						}
					}
			const isLimit = (sender) =>{ 
				let position = false
				for (let i of _limit) {
					if (i.id === sender) {
						let limits = i.limit
						if (limits >= limitawal ) {
							position = true
							haruka.sendMessage(from, lang.limitend(pushname), text, {quoted: mek})
							return true
						} else {
							_limit
							position = true
						return false
						}
					}
				}
				if (position === false) {
					const obj = { id: sender, limit: 0 }
					_limit.push(obj)
					fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit))
					return false
					}
				}
				
				const limitAdd = (sender) => {
					if (isOwner && isPremium) {return false;}
					let position = false
					Object.keys(_limit).forEach((i) => {
						if (_limit[i].id == sender) {
							position = i
							}
						})
				if (position !== false) {
					_limit[position].limit += 1
					fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
					}
				}
						
			//function
			const reply = (teks) => {
				haruka.sendMessage(from, teks, text, { quoted: mek, thumbnail: thumbnail})
			}
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? haruka.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : haruka.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
			}
		    const sleep = async (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms));
			}
			const sendMess = (hehe, teks) => {
				haruka.sendMessage(hehe, teks, text)
			}
			
			const sendStickerFromUrl = async(to, url) => {
                var names = Date.now() / 10000;
                var download = function (uri, filename, callback) {
                    request.head(uri, function (err, res, body) {
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                download(url, './sticker' + names + '.png', async function () {
                    console.log('selesai');
                    let filess = './sticker' + names + '.png'
                    let asw = './sticker' + names + '.webp'
                    exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                        let media = fs.readFileSync(asw)
                        haruka.sendMessage(to, media, MessageType.sticker,{quoted:mek})
                        fs.unlinkSync(filess)
                        fs.unlinkSync(asw)
                    });
                });
            }
			const sendMediaURL = async(to, url, text="", mids=[]) =>{
				if(mids.length > 0){
					text = normalizeMention(to, text, mids)
					}
					const fn = Date.now() / 10000;
					const filename = fn.toString()
					let mime = ""
					var download = function (uri, filename, callback) {
						request.head(uri, function (err, res, body) {
							mime = res.headers['content-type']
							request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
							});
							};
							download(url, filename, async function () {
								console.log('done');
								let media = fs.readFileSync(filename)
								let type = mime.split("/")[0]+"Message"
								if(mime === "image/gif"){
									type = MessageType.video
									mime = Mimetype.gif
									}
									if(mime.split("/")[0] === "audio"){
										mime = Mimetype.mp4Audio
										}
										haruka.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
										fs.unlinkSync(filename)
									});
								} 
			async function sendFileFromUrl(from, url, caption, mek, men) {
				let mime = '';
				let res = await axios.head(url)
				mime = res.headers['content-type']
				let type = mime.split("/")[0]+"Message"
				if(mime === "image/gif"){
					type = MessageType.video
					mime = Mimetype.gif
					}
				if(mime === "application/pdf"){
					type = MessageType.document
					mime = Mimetype.pdf
					}
				if(mime.split("/")[0] === "audio"){
					mime = Mimetype.mp4Audio
					}
					return haruka.sendMessage(from, await getBuffer(url), type, {caption: caption, quoted: mek, thumbnail: Buffer.alloc(0), mimetype: mime, contextInfo: {"mentionedJid": men ? men : []}})
				}
				
				// send message button
				const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
					const buttonMessage = {
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 1,
						};
						haruka.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options);
					};
				const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
					them = gam1
					mediaxxaa = await haruka.prepareMessage(id, them, MessageType.location, {thumbnail: them})
					locmhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa
					const buttonMessages = {
						locationMessage: locmhan.message.locationMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 6
						}
						haruka.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
						}
				const sendButVideo = async(id, text1, desc1, vid1, but = [], options = {}) => {
					them = vid1
					mediaxxaa = await haruka.prepareMessage(id, them, MessageType.video)
					vimhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa
					const buttonMessages = {
						videoMessage: vimhan.message.videoMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 5
						}
						haruka.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
						}
				const sendButImage = async(id, text1, desc1, vid1, but = [], options = {}) => {
					them = vid1
					mediaxxaa = await haruka.prepareMessage(id, them, MessageType.image, {thumbnail: Buffer.alloc(0)})
					imgmhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa
					const buttonMessages = {
						imageMessage: imgmhan.message.imageMessage,
						contentText: text1,
						footerText: desc1,
						buttons: but,
						headerType: 4
						}
					haruka.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
				}
				
				// antilink
                if (manti.includes("://chat.whatsapp.com/")){
		        if (!isGroup) return
		        if (!isAntiLink) return
		        if (isGroupAdmins) return
		        var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		        await haruka.sendMessage(from, `Hmm maap nih gua kick, dilarang share link di group ini`, text , {quoted: mek})
		        haruka.groupRemove(from, [kic]).catch((e)=>{reply(`Bot Harus Jadi Admin`)})
		        }
			//game 
			if (tebakgambar.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = tebakgambar[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    sendButMessage(from, "Selamat Jawaban kamu benar!", `� ${ownername}`, [{"buttonId": `.tebakgambar`,"buttonText": {"displayText": "Tebak Gambar"},"type": "RESPONSE"}], {quoted : mek})
                    delete tebakgambar[sender.split('@')[0]]
                    fs.writeFileSync("./database/game/tebakgambar.json", JSON.stringify(tebakgambar))
                } else {
                    reply("Jawaban Salah!")
                }
            }
			colors = ['red', 'pink', 'white', 'black', 'blue', 'yellow', 'green']
			const isHaruka = checkRegisteredUser(sender)
			const isPremium = premium.includes(sender) || isOwner
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')			 			  
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
			//console termux
			console.log(chalk.black(chalk.bgWhite('| MSG |')), time, chalk.black(chalk.bgBlue(budy || command)), 'from', color(pushname), 'args :', color(args.length), 'in', chalk.green(groupName? groupName : 'Private chat'))
		
//colong aja bang, ingat jgn asal colong ntr sc lu error
switch (command) {
case 'menu': case 'help': case 'haruka':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
				sendButLocation(from, lang.menu(prefix, salam, pushname), '© ' + ownername, thumbnail, [{buttonId: '.owner', buttonText: {displayText: 'Owner'}, type: 1},{buttonId: '.infobot', buttonText:{displayText: 'Infobot'}, type: 1}], {quoted: mek})
				break
case 'infobot':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			reply('Update bot selanjutnya silahkan cek YouTube zeeone ofc')
break
case 'owner':{
	if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
		const ownerContact = [ownernumber, "", "", "", "", "", "", "", "", "", "" , "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
		let ini_list = []
		for (let i of ownerContact.map(v => v + '@s.whatsapp.net')) {
			const vname = haruka.contacts[i] != undefined ? haruka.contacts[i].vname || haruka.contacts[i].notify : undefined
			ini_list.push({
				"displayName": `${ownername}`,
				"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${vname}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
				})
				}
				hehe = await haruka.sendMessage(from, {
					"displayName": `${ini_list.length} kontak`,
					"contacts": ini_list 
					}, 'contactsArrayMessage', { quoted: mek })
					haruka.sendMessage(from, `Nih Kak Contact Owner Ku, Cuma Sv Nomor Cewe Ya 🤝`, text, {quoted: hehe})
				}
			break
case 'sticker':case 'stiker':case 'stickergif':case 'stikergif':case 'sgif':case 's':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
			const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			const media = await haruka.downloadAndSaveMediaMessage(encmedia)
			ran = getRandom('.webp')
			await ffmpeg(`./${media}`)
			.input(media)
			.on('start', function (cmd) {
				console.log(`Started : ${cmd}`)
				})
				.on('error', function (err) {
					console.log(`Error : ${err}`)
					fs.unlinkSync(media)
					reply('Eror')
					})
			.on('end', function () {
				console.log('Finish')
				haruka.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
				fs.unlinkSync(media)
				fs.unlinkSync(ran)
				})
				.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
				.toFormat('webp')
				.save(ran)
				} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
				const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
				const media = await haruka.downloadAndSaveMediaMessage(encmedia)
				ran = getRandom('.webp')
				await ffmpeg(`./${media}`)
				.inputFormat(media.split('.')[1])
				.on('start', function (cmd) {
					console.log(`Started : ${cmd}`)
					})
					.on('error', function (err) {
						console.log(`Error : ${err}`)
						fs.unlinkSync(media)
						tipe = media.endsWith('.mp4') ? 'video' : 'gif'
						reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
						})
						.on('end', function () {
							console.log('Finish')
							haruka.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
							fs.unlinkSync(media)
							fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else  {
								reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim\nDurasi sticker video 1-9 detik...`)
							}
					await limitAdd(sender)
             break
					
// download fix by zeeone
case 'ig': case 'igdl': 
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
	if (!q) return reply('Linknya?')
	if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply(mess.errorLink)
	let urlnya = q
	hx.igdl(urlnya)
	.then(async(result) => {
		for(let i of result.medias){
			if(i.url.includes('mp4')){
				let link = await getBuffer(i.url)
                    haruka.sendMessage(from,link,video,{thumbnail: Buffer.alloc(0), quoted: mek,caption: `Instagram •  ${i.type}`})
                } else {
                    let link = await getBuffer(i.url)
                    haruka.sendMessage(from,link,image,{thumbnail: Buffer.alloc(0), quoted: mek,caption: `Instagram • ${i.type}`})                  
                }
            }
            }).catch((err) => reply(`🤲 Server eror`))
            await limitAdd(sender)
             break
case 'tiktok':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
sendButLocation(from, 'Silahkan pilih media yang ingin kamu download', '© ' + ownername, thumbnail, [{buttonId: `.tiktokwm ${q}`, buttonText: {displayText: 'WM'}, type: 1},{buttonId: `.tiktoknowm ${q}`, buttonText:{displayText: 'NOWM'}, type: 1},{buttonId: `.tiktokmusic ${q}`, buttonText:{displayText: 'AUDIO'}, type: 1}], {quoted: mek})
						await limitAdd(sender)
             break
case 'tiktoknowm':   
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!q) return reply('Linknya?')
			if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply('Invalid link')
			reply(lang.wait())
			let nowem = q
			hx.ttdownloader(nowem)
			.then(result => {
				const { wm, nowm, audio } = result
				axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
				.then(async (a) => {
					me = `*Link* : ${a.data}`
					noweem = await getBuffer(nowm)
					haruka.sendMessage(from,noweem , MessageType.document, {mimetype: 'video/mp4',filename: `Tiktok Download.mp4`,quoted: mek})
					})
				}).catch((err) => reply(`Link tidak valid`))
			await limitAdd(sender)
             break 
case 'tiktokwm':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!q) return reply('Linknya?')
			if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply('Invalid link')
			reply(lang.wait())
			let wem = args.join(' ')
			hx.ttdownloader(wem)
			.then(result => {
				const { wm, nowm, audio } = result
				axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
				.then(async (a) => {
					me = `*Link* : ${a.data}`
					weem = await getBuffer(wm)
					haruka.sendMessage(from,weem , MessageType.document, {mimetype: 'video/mp4',filename: `Tiktok Wm.mp4`,quoted: mek})
					})
				}).catch((err) => reply(`Link tidak valid`))
			await limitAdd(sender)
             break 
case 'tiktokmusic': case 'tiktokaudio':  
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!q) return reply('Linknya?')
			if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply('Invalid Link')
			reply(lang.wait())
			let audi = q
			hx.ttdownloader(audi)
			.then(result => {
				const { wm, nowm, audio } = result
				axios.get(`https://tinyurl.com/api-create.php?url=${audio}`)
				.then(async (a) => {
					audnha = await getBuffer(audio)
					haruka.sendMessage(from,audnha , MessageType.document, {mimetype: 'audio/mp4',filename: `Tiktok Music.mp3`,quoted: mek})
					})
				}).catch((err) => reply(`Link tidak valid`))
			await limitAdd(sender)
             break
case 'pinterest': 
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if(!q) return reply('Masukkan query')
            async function pinterestSearch(query) {
                    return new Promise((resolve, reject) => {
                        fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`, {
                            "headers": {
                                "accept": "application/json, text/javascript, */*, q=0.01",
                                "accept-language": "en-US,en;q=0.9",
                                "cache-control": "no-cache",
                                "pragma": "no-cache",
                                "sec-fetch-dest": "empty",
                                "sec-fetch-mode": "cors",
                                "sec-fetch-site": "same-origin",
                                "sec-gpc": "1",
                                "x-app-version": "9a236a4",
                                "x-pinterest-appstate": "active",
                                "x-requested-with": "XMLHttpRequest"
                            },
                            "referrer": "https://www.pinterest.com/",
                            "referrerPolicy": "origin",
                            "body": null,
                            "method": "GET",
                            "mode": "cors"
                        }).then((res) => res.json())
                            .then((json) => {
                                const generatepin = json.resource_response.data.results[Math.floor(Math.random() * (json.resource_response.data.results.length))]
                                var result = [];
                                result.push({
                                    link: generatepin.images.orig.url
                                })
                                resolve(result)
                            }).catch(reject)
                    })
                }

                const pinterest = (query) => new Promise((resolve, reject) => {
                    pinterestSearch(query).then((data) => {
                        resolve({
                            status: 200,
                            image: data[0].link
                        })
                    }).catch(reject)
                })

                pinterest(q).then(async(res) => {
                	let we = await getBuffer(res.image)
              	  sendButImage(from,  lang.ok() , `© ${ownername}`,we, [{"buttonId": `.pinterest ${q}`,"buttonText": {"displayText": "Next"},"type": "RESPONSE"}], {thumbnail: Buffer.alloc(0), quoted: mek})
                   }).catch(async(err) => {
                    reply('Terjadi kesalahan')
                })
                await limitAdd(sender)
             break
case 'play': case 'song':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (args.length === 0) return reply(`Kirim perintah *${prefix}play* _Judul lagu_`)
			var srch = args.join(' ')
			aramas = await yts(srch);
			aramat = aramas.all 
			var mulaikah = aramat[0].url
			try {
				xa.Youtube(mulaikah).then(async (data) => {
					if (Number(data.medias[7].formattedSize) >= 100000) return sendMediaURL(from, thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
						const captions = `*---- 「 PLAY MUSIC 」----*
						
• Title : ${aramas.videos[0].title}
• ID : ${aramas.videos[0].videoId}
• Upload : ${aramas.videos[0].ago}
• Size : ${data.medias[7].formattedSize}
• Views: ${aramas.videos[0].views} 
• Duration : ${aramas.videos[0].timestamp}
• Url : ${aramas.videos[0].url}`
var thumbyt = await getBuffer(aramas.videos[0].thumbnail)
sendButLocation(from, captions, '© ' + ownername, thumbyt, [{buttonId: `.ytmp4 ${mulaikah}`, buttonText: {displayText: 'Video'}, type: 1},{buttonId: `.ytmp3 ${mulaikah}`, buttonText:{displayText: 'Audio'}, type: 1}], {quoted: mek})
						})
				} catch (err) {
					reply('Terjadi kesalahan')
					}
			await limitAdd(sender)
             break
case 'ytmp3': 
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (args.length === 0) return reply(`Kirim perintah *${prefix}ytmp3* _Url YouTube_`)
			if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link tidak valid!')
			var mulaikah = args.join(' ')
			await reply(lang.wait())
                xa.Youtube(mulaikah).then(async (data) => {
                    let txt = `*----「 YOUTUBE MP3 」----*\n\n`
                    txt += `*• Quality :* ${data.medias[7].quality}\n`
                    txt += `*• Type :* ${data.medias[7].extension}\n`
                    txt += `*• Size :* ${data.medias[7].formattedSize}\n`
                    txt += `*• Url Source :* ${data.url}\n\n`
                    txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
                    sendFileFromUrl(from, data.thumbnail, txt, mek)
                    sendFileFromUrl(from, data.medias[7].url, '', mek)
                    })
                .catch((err) => {
                    reply(lang.err())
                })
                await limitAdd(sender)
             break
case 'ytmp4': 
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (args.length === 0) return reply(`Kirim perintah *${prefix}ytmp3* _Url YouTube_`)
			if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link tidak valid!')
			var mulaikah = args.join(' ')
			xa.Youtube(mulaikah).then(async (data) => {
                    let txt = `*----「 YOUTUBE VIDEO 」----*\n\n`
                    txt += `*• Quality :* ${data.medias[1].quality}\n`
                    txt += `*• Type :* ${data.medias[1].extension}\n`
                    txt += `*• Size :* ${data.medias[1].formattedSize}\n`
                    txt += `*• Url Source :* ${data.url}\n\n`
                    txt += `*Mohon tunggu sebentar kak, sedang proses pengiriman...*`
                    sendFileFromUrl(from, data.thumbnail, txt, mek)
                    sendFileFromUrl(from, data.medias[1].url, lang.ok(), mek)
                    }).catch((err) => {
                    reply(lang.err())
                })
                await limitAdd(sender)
             break
//group
case 'daftar': case 'verify': case 'verif':
			if (isHaruka) return  reply(lang.regis())
			try {
					ppregis = await haruka.getProfilePicture(sender)
				} catch {
					ppregis = 'https://i.ibb.co/rvsVF3r/5012fbb87660.png'
				}
			const serialUser = createSerial(20)
			await addRegisteredUser(sender, pushname, time, serialUser)
			await sendButImage(from, lang.daftar(sender, pushname, time, serialUser, _registered), `© ${botname}`,await getBuffer(ppregis), [{buttonId: '.menu',buttonText: {displayText: `MENU`,},type: 1,}], {thumbnail: Buffer.alloc(0), quoted : mek})
break
case 'antilink':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			if (!isBotGroupAdmins) return reply(lang.adminB())
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('Telah di aktifkan sebelumnya')
						antilink.push(from)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply(`✅ Berhasil mengaktifkan ${command}`)
					} else if (Number(args[0]) === 0) {
						if (!isAntiLink) return reply('Udh mati')
						var ini = anti.botLangsexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./database/group/antilink.json', JSON.stringify(antilink))
						reply(`✅ Berhasil mematikan ${command}`)
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break					
case 'leave':
			if (!isGroup) return reply(lang.group())
			if (!isOwner) return reply(lang.owner(botname))
			setTimeout( () => {
			haruka.groupLeave(from) 
			}, 2000)
			setTimeout( () => {
			haruka.sendMessage(from, 'Sayonara👋', text)
			}, 0)
			break
case 'hidetag':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			var value = q
			var group = await haruka.groupMetadata(from)
			var member = group['participants']
			var mem = []
			member.map( async adm => {
			mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
			})
			var options = {
			text: value,
			contextInfo: { mentionedJid: mem },
			quoted: mek
			}
			haruka.sendMessage(from, options, text)
			break
case 'linkgrup':case 'linkgroup': case 'linkgc':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			linkgc = await haruka.groupInviteCode(from)
			yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
			haruka.sendMessage(from, yeh, text, { quoted: mek })
			break  
case 'tagall':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			members_id = []
			taga = (args.length > 1) ? body.slice(8).trim() : ''
			taga += '\n\n'
			for (let mem of groupMembers) {
				taga += `➸ @${mem.jid.split('@')[0]}\n`
				members_id.push(mem.jid)
			}
			mentions(taga, members_id, true)
			break 
case 'setname':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			if (!isBotGroupAdmins) return reply(lang.adminB())
					await haruka.groupUpdateSubject(from, `${q}`)
					haruka.sendMessage(from, `Sukses Mengubah Nama Grup Menjadi ${q}`, text, { quoted: mek })
			break          
case 'setdesc': case 'setdesk':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			if (!isBotGroupAdmins) return reply(lang.adminB())
					await haruka.groupUpdateDescription(from, `${q}`)
					haruka.sendMessage(from, `Sukses Mengubah Desk Grup Menjadi ${q}`, text, { quoted: mek })
			break   
case 'kick':
if (!isHaruka) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{buttonId: '.daftar',buttonText: {displayText: `Daftar`,},type: 1,}], {quoted: fgif});
			if (!isGroup) return reply(lang.group())
			if (!isGroupAdmins) return reply(lang.admin(groupName))
			if (!isBotGroupAdmins) return reply(lang.adminB())
			if(!q)return reply(`*Format salah!*\n\n*Example : ${prefix + command} @tag*`)
			var kickya = q.split('@')[1] + '@s.whatsapp.net'
			await haruka.groupRemove(from, [kickya])
			reply(`Succses kick target!`)
break
case 'bc': case 'broadcast':
			if (!isOwner) return reply(lang.owner(botname))
			if (args.length === 0) return reply(`Kirim perintah *${prefix + command}* text`)
			var bcnya = await haruka.chats.all()
			if (isMedia && !mek.message.videoMessage || isQuotedImage) {
			var  bcnya2 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
			var bcnya3 = await haruka.downloadMediaMessage(bcnya2)
					for (let _ of bcnya) {
						haruka.sendMessage(_.jid, bcnya3, image, { caption: `*----「  BROADCAST 」----*\n\n${q}` })
						}
						reply('Sukses broadcast')
					} else {
						for (let _ of bcnya) {
							haruka.sendMessage(_.jid, `*----「  BROADCAST 」----*\n\n${q}`)
						}
						reply('Sukses broadcast')
					}
					break               
		default:
if (budy.startsWith('>')){
try {
	if (!isOwner) return reply(lang.owner(botname))
return haruka.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: mek})
} catch(err) {
e = String(err)
reply(e)
}
}  
if (budy.startsWith('$')){
if (!isOwner) return reply(lang.owner(botname))
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`HarukaBot :~ ${err}`)
if (stdout) {
reply(stdout)
}
})
}
if (budy.startsWith('=>')){
if (!isOwner) return reply(lang.owner(botname))
var konsol = budy.slice(3)
Return = (sul) => {
var sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined){
bang = util.format(sul)
}
return reply(bang)
}
try {
reply(util.format(eval(`;(async () => { ${konsol} })()`)))
console.log('\x1b[1;31m~\x1b[1;37m>', '[', '\x1b[1;32m EXC \x1b[1;37m', ']', time, color("=>", "green"), 'from', color(pushname), 'args :', color(args.length))
} catch(e){
reply(String(e))
}
}                                               	
              }   
 //gua enc, biar nanti bisa di jual klo dah bnyk fimtur
function _0x2e63d2(_0x3c5726,_0x5ac36f,_0x4c9aa7,_0x385611){return _0x29d5(_0x5ac36f- -0x2f5,_0x385611);}(function(_0x3cd940,_0x577ce7){const _0x52fb66=_0x3cd940();function _0x39ee1a(_0x5cdab6,_0x4f7f16,_0x34658c,_0x18c58f){return _0x29d5(_0x5cdab6-0xae,_0x34658c);}function _0x5b01dd(_0x3c500e,_0x158b2f,_0xd75efc,_0x4145b4){return _0x29d5(_0x4145b4-0x1e,_0xd75efc);}while(!![]){try{const _0x3ebb20=-parseInt(_0x39ee1a(0x1d8,0x20b,0x1aa,0x1e4))/(-0x178b+0x1*-0x21e6+0x3972)+-parseInt(_0x39ee1a(0x177,0x1a7,0x154,0x14d))/(-0x1be7+-0x10d2*-0x1+0xb17)+-parseInt(_0x39ee1a(0x19b,0x1b8,0x1c4,0x1c4))/(0xbdd+-0x1ea1+-0x1*-0x12c7)*(parseInt(_0x39ee1a(0x190,0x158,0x18a,0x187))/(0x179e*-0x1+0x99a+0xe08*0x1))+parseInt(_0x5b01dd(0x101,0x15d,0x12d,0x130))/(-0x24*-0x9d+-0xc2d*0x1+-0x2e*0x37)+parseInt(_0x5b01dd(0x14a,0x117,0x148,0x112))/(-0xfa5+0x7*-0x47+0x119c)+parseInt(_0x39ee1a(0x1a8,0x179,0x1cf,0x197))/(0x47*-0x49+-0x1*-0x1871+0x61*-0xb)+parseInt(_0x5b01dd(0xe9,0x154,0x14b,0x11f))/(-0x64c+-0x99f*0x1+0xff3);if(_0x3ebb20===_0x577ce7)break;else _0x52fb66['push'](_0x52fb66['shift']());}catch(_0x369035){_0x52fb66['push'](_0x52fb66['shift']());}}}(_0x3495,0x2*0x11fb0+-0x1278c*-0x5+-0x1*0x4ca06));function _0x29d5(_0x3080b7,_0x4cd220){const _0x1fa85a=_0x3495();return _0x29d5=function(_0x30c924,_0x32227d){_0x30c924=_0x30c924-(-0x2*-0xff1+-0x5*-0x2a5+-0x2c5b);let _0x398f43=_0x1fa85a[_0x30c924];if(_0x29d5['WcVkUF']===undefined){var _0x4ecd96=function(_0x2a68f1){const _0x43996f='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x5b32b2='',_0x50e896='';for(let _0x150def=0xfd0+-0x19c1+0x9f1,_0x1aa3d2,_0x5eb786,_0x2e0542=-0x964+0x1ab8+-0x4*0x455;_0x5eb786=_0x2a68f1['charAt'](_0x2e0542++);~_0x5eb786&&(_0x1aa3d2=_0x150def%(-0x13*-0x12d+0x2*0xc95+0x1*-0x2f7d)?_0x1aa3d2*(-0x274*-0x2+-0x2046+-0x5*-0x586)+_0x5eb786:_0x5eb786,_0x150def++%(0x4*-0x38d+0x26ad*0x1+0x3*-0x827))?_0x5b32b2+=String['fromCharCode'](0x9b*-0x13+0x6fc+0x584&_0x1aa3d2>>(-(-0x1*0x18a7+-0x4*0x45c+0x2a19)*_0x150def&-0x224b+0x6ac+-0x7*-0x3f3)):0x1345+0x4d*-0x2e+-0x56f){_0x5eb786=_0x43996f['indexOf'](_0x5eb786);}for(let _0x3e6afb=0xfe8+0xa59+-0x1a41,_0x1ac168=_0x5b32b2['length'];_0x3e6afb<_0x1ac168;_0x3e6afb++){_0x50e896+='%'+('00'+_0x5b32b2['charCodeAt'](_0x3e6afb)['toString'](0x138e+-0x498+-0x2*0x773))['slice'](-(0x2572+0x31*-0xb3+0x1*-0x32d));}return decodeURIComponent(_0x50e896);};_0x29d5['QUsIrV']=_0x4ecd96,_0x3080b7=arguments,_0x29d5['WcVkUF']=!![];}const _0x5b3007=_0x1fa85a[0xc3e*-0x2+-0x90e+0x218a],_0x23cfc3=_0x30c924+_0x5b3007,_0x15bc4c=_0x3080b7[_0x23cfc3];return!_0x15bc4c?(_0x398f43=_0x29d5['QUsIrV'](_0x398f43),_0x3080b7[_0x23cfc3]=_0x398f43):_0x398f43=_0x15bc4c,_0x398f43;},_0x29d5(_0x3080b7,_0x4cd220);}function _0x3495(){const _0x1a4b7e=['BIbvBNr1AYbwzq','odaWntHqwxfHBui','Dhn0AwTLCG','DgvIywTNyw1Iyq','idOQia','C291BMrJBg91za','BMDPCMLTyw4UlG','ndKXmdKYyMXeEgXv','zM9YBwf0DgvKuW','igXPBMSGrMfJzq','C2vUze1LC3nHzW','zxH0zw5ZAw9U','sMf3ywjHBIa','z2D1ihnLyMvUDa','ntu0mdiZmMH0ALfcDW','BgLUAYbgywnLyG','A2DHBwjHCI5QCW','BwvKAwfZ','zMiUD2f0y2G','rMfJzwjVB2S','kUkaOIbvCMWGidOQ','DxjS','z2v0','DgH1BwjUywLS','q29UDg9OoIa','kUkaOIbfEhqGoIOG','vgvSzxn0AwnRzq','rgfMDgfY','AxPL','yNv0Dg9Uswq','igXPBMSGu291BG','mZK5mZeWvu5Uv2PN','DgHLBG','yNv0Dg9Uvgv4Da','zYbIzxjSyw5NCW','zhvYyxrPB24','Dc5Tzs9HzgrZDa','Dc5Tzq','l2DHBwuVDgvIyq','D3jPDgvgAwXLuW','sxr1igj1A2fUia','oIOG','EvPoAuS','CxvHBgL0Eq','zMfJzwjVB2S','D2fPDa','y2fWDgLVBG','ELDQAuS','z3HPCee','tKrdte9vrcbetW','AMf3ywjHBG','DgL0Bgu','ywLUyw4GAgfIAq','zMfJzwjVB2TKBa','cGPuAw1LB3v0ia','mZqWodDMthLMz20','kUkaOIbuExbLidOQ','Aw1Hz2uVD2vICa','C3rPy2TLCNbHyW','BgvUz3rO','Bg9N','oIaXmJaUmdaGCW','BwLTzxr5Cgu','qNvRyw4GBgLUAW','kUkaOIbuAxrSzsa6','s2XPAYbcDxr0BW','ls0QcGO','rxHHBxbSzsa6ia','zxj0Eq','rLfyyMW','v2fRDhuGCgvYBq','zgLZCgXHEvrLEa','BM9YzwDPCW','q2XVDwq','rvHtBwK','nJu0nde4uwnitLvx','zMfJzwjVB2SUyW','DhLWzq','lI9KyxrHyMfZzq','kUkaOIbeDxjHDgLV','y0HRAxq','ihbYB3nLCYbWzq','zwnVBMrZ','CMLMEq','icPODhrWCZOVlW','De53CwG','z3jVDxa','CxvVDgvK','Aw1Hz2vZ','whjLufi','v05mt0feiooaJs0T','AwnRzxjZl2DLzq','CgvYBwfPBMfUia','Ew5J','AgfZt3DUuhjVCa','te9brevsiooaJs0T','DwqUy29T','wfPxuem','zMjKBa','kUkaOIbrDwfSAxr5','mteZmtq0me1jA1rfyq','CMvWBgfJzq','Aw5JBhvKzxm','Dw5N','EwfUzYbZzwrHBG','u291BMrdBg91za','ihrLBgvNCMfTia','yxvKAw8VBxa0','C3rYAw5NAwz5','C3bSAxq','BIa6kIa','m0zJsw9Ota','C3rPA2vY','kUkaOIbtAxPLieHe','twfZAwGGywrHia','lMrHzNrHCG','z1PtCg0'];_0x3495=function(){return _0x1a4b7e;};return _0x3495();}function _0x3bf0b4(_0x4018eb,_0x20f67c,_0x24eb38,_0x5a6d22){return _0x29d5(_0x20f67c- -0x104,_0x4018eb);}switch(command){case _0x3bf0b4(0x46,0x1b,0x1f,0x9):case'fb':case _0x3bf0b4(-0x45,-0x24,-0x2e,-0x24):case _0x2e63d2(-0x1c6,-0x1cd,-0x197,-0x19b):const _0x4f8fcb={};_0x4f8fcb[_0x3bf0b4(-0x4c,-0x3f,-0x62,-0x28)+'t']=_0x2e63d2(-0x1dc,-0x1e7,-0x203,-0x1c0);const _0x53e444={};_0x53e444[_0x2e63d2(-0x1d8,-0x1e5,-0x210,-0x1b7)]=_0x3bf0b4(-0x1d,-0x13,0xa,-0x11),_0x53e444[_0x2e63d2(-0x1bd,-0x1e1,-0x1fa,-0x20e)]=_0x4f8fcb,_0x53e444[_0x2e63d2(-0x249,-0x22a,-0x262,-0x20f)]=0x1;const _0x2986b5={};_0x2986b5['quoted']=fgif;if(!isHaruka)return sendButMessage(from,lang['noregis'](pushname),_0x3bf0b4(-0x4,0x30,0x2a,0x5f)+_0x3bf0b4(-0x15,-0x11,0x21,0x28)+_0x3bf0b4(-0x3e,-0x33,-0x2f,-0xf),[_0x53e444],_0x2986b5);if(!q)return reply('Example\x20:\x20'+(prefix+command)+(_0x2e63d2(-0x1c0,-0x1f9,-0x211,-0x1db)+'book'));if(!q[_0x3bf0b4(-0x3b,-0x20,-0x12,-0x25)](_0x2e63d2(-0x24f,-0x22b,-0x257,-0x25d)+'om')&&!q[_0x3bf0b4(-0x42,-0x20,-0x1b,-0x26)](_0x3bf0b4(0x2d,0x1,-0xb,-0x2)))return reply(_0x3bf0b4(-0x22,0x17,-0x1a,0x4)+_0x2e63d2(-0x1cc,-0x1f3,-0x1de,-0x22c)+'ook');await reply(lang['wait']()),zee[_0x2e63d2(-0x1ba,-0x1ef,-0x228,-0x1fd)](''+q)[_0x2e63d2(-0x1f6,-0x1e2,-0x1f0,-0x1b6)](async _0x33fb79=>{const _0x11b34d={'EXSmi':function(_0x1792a8,_0x3a7b6e){return _0x1792a8(_0x3a7b6e);}};function _0x227af4(_0x5a093b,_0x543ac3,_0x2301be,_0x4314b7){return _0x2e63d2(_0x5a093b-0xdf,_0x4314b7-0x5b8,_0x2301be-0x1c7,_0x5a093b);}let _0x58b2cc='*----「\x20FAC'+'EBOOK\x20DOWN'+_0x227af4(0x3bb,0x3bd,0x399,0x3a0)+_0x359a16(0x68,0x22,0x3b,0x33);_0x58b2cc+=_0x359a16(0xa3,0xd2,0xae,0xd0)+'*\x20'+_0x33fb79[_0x227af4(0x3d4,0x3e8,0x3e5,0x3e9)]+'\x0a',_0x58b2cc+=_0x359a16(0x95,0xa8,0xa6,0xd2)+'\x20'+_0x33fb79['medias'][0x1*0xc7f+-0x7*-0x234+-0x1beb][_0x359a16(0x53,0x6e,0x79,0xa7)]+'\x0a',_0x58b2cc+=_0x227af4(0x3cd,0x395,0x3d8,0x3a4)+_0x227af4(0x3c9,0x394,0x38f,0x3ba)+_0x33fb79[_0x227af4(0x3a9,0x3be,0x3d2,0x3c7)][-0xc9f+-0x1*0xa6d+0xb86*0x2]['quality']+'\x0a',_0x58b2cc+=_0x227af4(0x3c7,0x3dd,0x3df,0x3b2)+_0x359a16(0x5c,0x65,0x97,0x95)+_0x33fb79[_0x227af4(0x3cc,0x3c5,0x3fb,0x3c7)][0xe09+0x3fb+-0x1203]['formattedS'+_0x359a16(0xb5,0xbc,0x8a,0x59)]+'\x0a',_0x58b2cc+='*•\x20Url\x20:*\x20'+_0x33fb79[_0x227af4(0x3fc,0x397,0x3ae,0x3cb)];let _0x123c92=await _0x11b34d[_0x227af4(0x376,0x386,0x35c,0x38b)](getBuffer,_0x33fb79[_0x227af4(0x396,0x3cc,0x3d5,0x3c7)][0x5a5+0x8b1+-0xe55]['url']);const _0x531840={};_0x531840[_0x359a16(0x81,0xb6,0xac,0xd9)]='video/mp4',_0x531840[_0x359a16(0x48,0x8b,0x50,0x32)]=mek,_0x531840['caption']=_0x58b2cc;function _0x359a16(_0x3d3977,_0x46d5c4,_0x56e013,_0xaa6d73){return _0x3bf0b4(_0xaa6d73,_0x56e013-0x7f,_0x56e013-0x1da,_0xaa6d73-0xbc);}haruka[_0x359a16(0x9b,0xaa,0x78,0x4f)+'e'](from,_0x123c92,video,_0x531840);}),await limitAdd(sender);break;case _0x3bf0b4(0x12,-0xc,-0x28,0x20):const _0x5ae492={};_0x5ae492[_0x3bf0b4(-0x68,-0x3f,-0x11,-0x5c)+'t']=_0x2e63d2(-0x212,-0x1e7,-0x1d3,-0x208);const _0x578ad4={};_0x578ad4[_0x3bf0b4(0x7,0xc,0x25,0xe)]='.daftar',_0x578ad4['buttonText']=_0x5ae492,_0x578ad4[_0x2e63d2(-0x249,-0x22a,-0x250,-0x217)]=0x1;const _0x4023c4={};_0x4023c4[_0x3bf0b4(-0x2c,-0x2f,-0x1b,-0x47)]=fgif;if(!isHaruka)return sendButMessage(from,lang[_0x2e63d2(-0x214,-0x22f,-0x204,-0x236)](pushname),_0x3bf0b4(-0x6,0x30,0x3e,0xe)+'n\x20Untuk\x20Ve'+_0x2e63d2(-0x22e,-0x224,-0x1f3,-0x21c),[_0x578ad4],_0x4023c4);if(!q)return reply(_0x2e63d2(-0x263,-0x234,-0x243,-0x23e)+(prefix+command)+(_0x2e63d2(-0x202,-0x1e4,-0x206,-0x1cf)+'dCloud'));if(!q[_0x3bf0b4(-0x35,-0x20,0x0,-0x4)]('m.soundclo'+_0x3bf0b4(-0xb,-0x26,0x14,-0x52)))return reply(_0x2e63d2(-0x1a0,-0x1da,-0x1b2,-0x209)+'link\x20Sound'+_0x2e63d2(-0x228,-0x22e,-0x229,-0x218));await reply(lang[_0x3bf0b4(0x33,0x1c,0x3d,0x21)]()),zee[_0x3bf0b4(-0x4c,-0x1d,-0x3d,-0x2)](''+q)[_0x3bf0b4(-0xf,0xf,-0x23,0x1c)](async _0x2a4523=>{const _0x5a291f={'yZNiK':function(_0x373e8d,_0x2851ac,_0x26a735,_0x9bf424,_0x43b1e0){return _0x373e8d(_0x2851ac,_0x26a735,_0x9bf424,_0x43b1e0);},'tNwqh':function(_0x44620d,_0x574eab){return _0x44620d(_0x574eab);},'duGKB':_0x1c3d6d(-0x1aa,-0x18e,-0x155,-0x17e)};let _0x21a7cc='*----「\x20SOU'+_0x1c3d6d(-0x14b,-0x153,-0x16d,-0x178)+_0x20f704(-0x255,-0x21c,-0x27e,-0x253)+'--*\x0a\x0a';function _0x1c3d6d(_0x49a8dd,_0x3f5126,_0x3951bc,_0x2db170){return _0x3bf0b4(_0x2db170,_0x3f5126- -0x173,_0x3951bc-0x1e6,_0x2db170-0x0);}_0x21a7cc+=_0x20f704(-0x1d6,-0x1e8,-0x1d1,-0x1f8)+'*\x20'+_0x2a4523['title']+'\x0a',_0x21a7cc+=_0x20f704(-0x256,-0x266,-0x277,-0x25e)+_0x20f704(-0x256,-0x26f,-0x23f,-0x23f)+_0x2a4523[_0x1c3d6d(-0x13a,-0x161,-0x197,-0x12d)]+'\x0a',_0x21a7cc+='*•\x20Quality'+_0x20f704(-0x241,-0x240,-0x222,-0x234)+_0x2a4523[_0x20f704(-0x244,-0x1ff,-0x235,-0x227)][0x2e3+-0xc02*0x1+-0x49*-0x20][_0x1c3d6d(-0x120,-0x159,-0x183,-0x178)]+'\x0a',_0x21a7cc+=_0x20f704(-0x237,-0x204,-0x1f8,-0x21f)+_0x2a4523[_0x1c3d6d(-0x157,-0x173,-0x13b,-0x14d)][0x1fc7*-0x1+0x11fb+-0x4*-0x373][_0x1c3d6d(-0x17a,-0x179,-0x1ac,-0x1b0)]+'\x0a',_0x21a7cc+='*•\x20Size\x20:*'+'\x20'+_0x2a4523['medias'][0xb5*0x16+-0x8c0+0x43*-0x1a][_0x20f704(-0x205,-0x240,-0x251,-0x230)+_0x20f704(-0x217,-0x1ff,-0x1ee,-0x21c)]+'\x0a',_0x21a7cc+=_0x20f704(-0x21b,-0x24e,-0x23e,-0x224)+'\x20'+_0x2a4523[_0x20f704(-0x225,-0x22d,-0x216,-0x223)]+'\x0a\x0a';function _0x20f704(_0x1c3821,_0x8bbbd4,_0x224f73,_0x200f1a){return _0x2e63d2(_0x1c3821-0x6c,_0x200f1a- -0x36,_0x224f73-0x7d,_0x1c3821);}_0x21a7cc+='*Mohon\x20tun'+_0x20f704(-0x253,-0x216,-0x1fc,-0x22b)+'ar,\x20sedang'+_0x1c3d6d(-0x19b,-0x1a8,-0x1c5,-0x16f)+_0x1c3d6d(-0x190,-0x17e,-0x1aa,-0x17f)+'.*',_0x5a291f[_0x1c3d6d(-0x157,-0x15a,-0x187,-0x142)](sendFileFromUrl,from,_0x2a4523[_0x20f704(-0x21c,-0x209,-0x220,-0x221)],_0x21a7cc,mek),haruka['sendMessag'+'e'](from,await _0x5a291f[_0x20f704(-0x28e,-0x256,-0x249,-0x258)](getBuffer,_0x2a4523['medias'][0x686*0x1+-0x25ff+0x7*0x47f][_0x20f704(-0x1f0,-0x23b,-0x21f,-0x223)]),audio,{'quoted':mek,'mimetype':_0x5a291f['duGKB']});});break;case'telesticke'+'r':case _0x2e63d2(-0x1f1,-0x200,-0x23a,-0x1e9):{const _0x55cb3a={};_0x55cb3a[_0x3bf0b4(-0x4e,-0x3f,-0x21,-0x8)+'t']=_0x2e63d2(-0x216,-0x1e7,-0x213,-0x21d);const _0x1f6169={};_0x1f6169[_0x2e63d2(-0x1ed,-0x1e5,-0x21f,-0x1d5)]='.daftar',_0x1f6169[_0x2e63d2(-0x203,-0x1e1,-0x1ee,-0x1d3)]=_0x55cb3a,_0x1f6169['type']=0x1;const _0x222162={};_0x222162[_0x2e63d2(-0x1f8,-0x220,-0x20c,-0x24e)]=fgif;if(!isHaruka)return sendButMessage(from,lang[_0x3bf0b4(-0x49,-0x3e,-0x4a,-0x62)](pushname),_0x3bf0b4(0xe,0x30,0x15,0x3d)+_0x3bf0b4(-0x3c,-0x11,-0xa,0xe)+'rify',[_0x1f6169],_0x222162);if(!isGroup)return reply(lang[_0x2e63d2(-0x241,-0x221,-0x1ef,-0x25a)]());if(!q)return reply(_0x3bf0b4(0x1a,0x7,-0x5,-0x14)+(prefix+command)+(_0x2e63d2(-0x1eb,-0x223,-0x23b,-0x225)+_0x2e63d2(-0x1d3,-0x1de,-0x1e1,-0x20f)+_0x3bf0b4(-0x36,-0x2b,-0x8,-0x54)+_0x2e63d2(-0x1e7,-0x1c8,-0x1e3,-0x1f8)+'k*'));if(!q[_0x2e63d2(-0x205,-0x211,-0x1e7,-0x20e)](_0x2e63d2(-0x1c0,-0x1dd,-0x1fb,-0x1e5)))return reply(_0x3bf0b4(0x36,0x2e,0x16,0xe)+_0x3bf0b4(-0x15,-0x1c,-0x6,-0x4e)+_0x2e63d2(-0x241,-0x207,-0x22f,-0x1d3));var telestc=await zee[_0x2e63d2(-0x1c5,-0x1e8,-0x1fb,-0x200)+'r'](''+q);await reply(lang['wait']());for(let i=-0x2b6*-0xe+0x3f*0x72+0x11*-0x3e2;i<(telestc[_0x3bf0b4(0x2,0x2a,0x13,0x49)]<-0x3d*0x71+-0x2039+0x3b30?telestc['length']:-0x591*0x7+0x1*0x641+0x20c0);i++){const _0x4d4a17={};_0x4d4a17[_0x2e63d2(-0x1fb,-0x1c4,-0x1d2,-0x1a6)]=_0x3bf0b4(0x51,0x28,0x53,0x17),_0x4d4a17[_0x3bf0b4(-0x4a,-0x2f,-0x57,-0x3)]=mek,haruka[_0x2e63d2(-0x1cd,-0x1f8,-0x1d5,-0x1d0)+'e'](from,await getBuffer(telestc[i][_0x3bf0b4(0x16,0x4,0x3d,-0xd)]),sticker,_0x4d4a17);}}break;case'tebakgamba'+'r':const _0x326e56={};_0x326e56[_0x3bf0b4(-0x70,-0x3f,-0x36,-0x3a)+'t']=_0x3bf0b4(0x3e,0xa,-0x8,-0x2b);const _0x451e6c={};_0x451e6c[_0x2e63d2(-0x21e,-0x1e5,-0x200,-0x20e)]=_0x3bf0b4(-0x49,-0x13,-0x14,-0x1),_0x451e6c[_0x3bf0b4(0x42,0x10,-0x1c,0x41)]=_0x326e56,_0x451e6c[_0x2e63d2(-0x235,-0x22a,-0x1f7,-0x1f6)]=0x1;const _0x4b4184={};_0x4b4184[_0x3bf0b4(-0x22,-0x2f,-0x2f,-0x21)]=fgif;if(!isHaruka)return sendButMessage(from,lang[_0x2e63d2(-0x22e,-0x22f,-0x20a,-0x24e)](pushname),_0x3bf0b4(0x67,0x30,0x13,0x21)+_0x3bf0b4(-0x6,-0x11,-0x4b,0x2)+_0x2e63d2(-0x1f5,-0x224,-0x1fa,-0x21a),[_0x451e6c],_0x4b4184);if(!isGroup)return reply(lang['group']());if(tebakgambar['hasOwnProp'+_0x3bf0b4(-0x18,-0x42,-0x76,-0x6d)](sender[_0x3bf0b4(-0x4a,-0x19,-0x4e,-0x12)]('@')[-0x3*-0x841+-0x10d8+-0x7eb]))return reply(_0x2e63d2(-0x212,-0x205,-0x201,-0x23d)+_0x3bf0b4(-0x31,-0x2a,-0x28,-0x29)+_0x2e63d2(-0x230,-0x20f,-0x1df,-0x242)+_0x2e63d2(-0x1ce,-0x1e0,-0x1ec,-0x1f0)+_0x3bf0b4(-0x47,-0x1f,0x19,-0x37));hx[_0x2e63d2(-0x21c,-0x1ff,-0x1d9,-0x1f8)+'r']()[_0x2e63d2(-0x1c3,-0x1e2,-0x1d2,-0x210)](async _0x24c25e=>{const _0x427a99={'FQXbl':function(_0x5131cf,_0xace2ae){return _0x5131cf(_0xace2ae);},'zWjiK':_0xf94b00(-0x19d,-0x186,-0x19a,-0x179)+_0xf94b00(-0x12b,-0x182,-0x14d,-0x187)+_0x4cb6de(-0x293,-0x275,-0x287,-0x25e)+'on','mHrJd':_0x4cb6de(-0x26d,-0x238,-0x29d,-0x239)+_0x4cb6de(-0x266,-0x297,-0x257,-0x242)+_0xf94b00(-0x15c,-0x1b7,-0x196,-0x17a),'XZWPC':function(_0x3ff3a0,_0xf864b0){return _0x3ff3a0+_0xf864b0;},'gZSpm':_0xf94b00(-0x1a3,-0x1c5,-0x1a2,-0x18d)+_0xf94b00(-0x122,-0x179,-0x13f,-0x14f)+'s','cHkit':'*Jawaban\x20:'+'*'};function _0xf94b00(_0xf5de8,_0x1621ce,_0x53748e,_0x47d245){return _0x3bf0b4(_0x1621ce,_0x53748e- -0x162,_0x53748e-0x168,_0x47d245-0x1ab);}tebakya=await _0x427a99[_0x4cb6de(-0x2d3,-0x2c1,-0x2cf,-0x2ff)](getBuffer,_0x24c25e[-0x218f+-0x90a+0x2a99]['image']),jawaban=''+_0x24c25e[-0x1dd8+-0x2350+-0x1*-0x4128][_0x4cb6de(-0x271,-0x27d,-0x275,-0x25e)][_0xf94b00(-0x15d,-0x170,-0x183,-0x198)](_0xf94b00(-0x15a,-0x136,-0x167,-0x130),''),tebakgambar[sender[_0xf94b00(-0x189,-0x144,-0x17b,-0x187)]('@')[-0x4*-0x184+-0x2*-0x121c+-0x3d8*0xb]]=jawaban['toLowerCas'+'e']();function _0x4cb6de(_0x264766,_0x1ae85f,_0x1f9573,_0x14736c){return _0x2e63d2(_0x264766-0xbe,_0x264766- -0xa1,_0x1f9573-0x137,_0x1f9573);}fs[_0x4cb6de(-0x27c,-0x29f,-0x242,-0x25d)+_0x4cb6de(-0x2bb,-0x29e,-0x2e8,-0x28c)](_0x427a99[_0x4cb6de(-0x274,-0x24e,-0x23d,-0x240)],JSON[_0x4cb6de(-0x2ac,-0x2e7,-0x2c8,-0x28c)](tebakgambar)),console[_0xf94b00(-0x14a,-0x130,-0x137,-0x12d)](jawaban);const _0x516334={};_0x516334[_0x4cb6de(-0x2c1,-0x2e4,-0x2df,-0x2a9)]=mek,_0x516334[_0xf94b00(-0x13c,-0x178,-0x145,-0x15d)]=_0x427a99['mHrJd'],haruka[_0x4cb6de(-0x299,-0x2b1,-0x2b5,-0x2c8)+'e'](from,tebakya,image,_0x516334),await sleep(0x5a5*-0x21+0x852e+0x209d7);if(tebakgambar[_0xf94b00(-0x1ac,-0x171,-0x18a,-0x1c4)+_0x4cb6de(-0x2d4,-0x29d,-0x2b2,-0x2e5)](sender[_0x4cb6de(-0x2ab,-0x2ae,-0x29a,-0x27e)]('@')[-0x151d+0x140b+-0x2*-0x89])){const _0x44d0db={};_0x44d0db[_0xf94b00(-0x1c4,-0x181,-0x191,-0x1b0)]=mek,haruka[_0xf94b00(-0x146,-0x14f,-0x169,-0x16d)+'e'](from,_0x427a99[_0x4cb6de(-0x2b7,-0x2da,-0x2d8,-0x2a7)](_0x427a99[_0xf94b00(-0x19c,-0x1bb,-0x187,-0x1a5)](_0x427a99[_0x4cb6de(-0x2b7,-0x2bb,-0x2ea,-0x2ca)](_0x427a99[_0x4cb6de(-0x2b7,-0x281,-0x281,-0x2ab)](_0x427a99[_0x4cb6de(-0x2a4,-0x2b7,-0x276,-0x2cd)],'\x0a\x0a')+_0x427a99[_0x4cb6de(-0x2c8,-0x2fa,-0x2fb,-0x2a4)],'\x0a'),'_')+jawaban,'_'),text,_0x44d0db),delete tebakgambar[sender['split']('@')[0x1*0xe98+0x1c60+-0x2af8]],fs[_0xf94b00(-0x146,-0x185,-0x14c,-0x116)+_0xf94b00(-0x1c5,-0x1a7,-0x18b,-0x1c2)](_0x427a99[_0xf94b00(-0x13b,-0x164,-0x144,-0x165)],JSON[_0xf94b00(-0x186,-0x1a6,-0x17c,-0x15e)](tebakgambar));}});break;case'semoji':case'emoji':const _0x5a5fb7={};_0x5a5fb7['displayTex'+'t']=_0x3bf0b4(-0x30,0xa,0x2d,0x0);const _0x261e07={};_0x261e07[_0x2e63d2(-0x1b4,-0x1e5,-0x1f8,-0x1ed)]=_0x2e63d2(-0x20c,-0x204,-0x1ce,-0x232),_0x261e07[_0x3bf0b4(-0x2a,0x10,-0x27,0x4)]=_0x5a5fb7,_0x261e07[_0x3bf0b4(-0x55,-0x39,-0x2a,-0x3c)]=0x1;const _0x2bedef={};_0x2bedef[_0x2e63d2(-0x243,-0x220,-0x253,-0x224)]=fgif;if(!isHaruka)return sendButMessage(from,lang[_0x3bf0b4(-0x21,-0x3e,-0x63,-0x4)](pushname),_0x2e63d2(-0x188,-0x1c1,-0x198,-0x1ed)+_0x3bf0b4(-0x28,-0x11,-0x3e,-0x29)+'rify',[_0x261e07],_0x2bedef);if(!isGroup)return reply(lang[_0x3bf0b4(-0x5e,-0x30,-0x4c,0x0)]());if(!q)return reply('emojinya?');qes=args['join']('\x20'),reply(lang[_0x3bf0b4(0xf,0x1c,0x2a,-0x12)]()),emoji[_0x3bf0b4(-0x4,0x5,0x7,0x5)](''+qes)['then'](async _0x22efb4=>{const _0x2494f0={'XrePR':function(_0x5b3546,_0x3d0a0e,_0x2510d5){return _0x5b3546(_0x3d0a0e,_0x2510d5);},'gxipA':function(_0x38fb50,_0x24316c){return _0x38fb50(_0x24316c);}};function _0x12e7c7(_0x711bca,_0x56bf23,_0x49a155,_0xfafadf){return _0x3bf0b4(_0xfafadf,_0x711bca-0xf4,_0x49a155-0x110,_0xfafadf-0x1a2);}teks=''+_0x22efb4[_0x19e77e(-0x188,-0x1b7,-0x183,-0x178)][-0x2*-0xcbf+0x1*-0x1517+-0x463][_0x12e7c7(0xf8,0xe0,0xc8,0x106)];function _0x19e77e(_0x555b54,_0x39df17,_0x1ea0bd,_0x8285a1){return _0x2e63d2(_0x555b54-0x140,_0x555b54-0x97,_0x1ea0bd-0xfd,_0x39df17);}console[_0x12e7c7(0x11f,0xed,0x126,0x11a)](teks),_0x2494f0[_0x19e77e(-0x187,-0x1b0,-0x1b7,-0x15c)](sendStickerFromUrl,from,''+teks),await _0x2494f0[_0x19e77e(-0x13b,-0x12d,-0x10c,-0x110)](limitAdd,sender);});break;}
		} catch (e) {
			console.log('Emror : %s', color(e, 'white'))
		}
	})
}
starts() 