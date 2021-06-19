// 
function sirenia(pack, ePack, social, packTalents, statuses) {
	this.config = pack;
	this.configEffects = ePack;
	this.statusesPack = statuses;
	this.socialPack = social;
	this.talents = null;
	this.talentsPack = packTalents;
	
	this.getTalents = function() {
		if (this.talents === null) {
			this.talents = new talents(this.talentsPack);
		}
		
		return this.talents;
	};
	
	this.getConfig = function() {
		return this.config;
	};
	
	this.getConfigEffects = function() {
		return this.configEffects;
	};
	
	this.getConfigStatus = function() {
		return this.statusesPack;
	};
	
	this.getSocialPack = function() {
		return this.socialPack;
	};
	
	this.getData = function(p, d) {
		var c = this.getConfig(),
			card_id = c[d]['parts'][p]['cards_id'],
			data = c[d]['default']['cards_data']['default'][card_id];
		
		//console.log(card_id);
		
		return data;
	};
	
	this.getDataEffects = function(d, e) {
		var c = this.getConfigEffects(),
			data = c[d]['cards'][e]['effects'];
			
			return data;
	};
	
	this.getEffectID = function(p, d) {
		var c = this.getConfig(),
			effect_id = c[d]['parts'][p]['effect_id'];
			
			return typeof effect_id != "undefined" ? effect_id : false;
	};
	
	this.getSocialDecks = function() {
		var decks = {},
			socialDecks = this.getSocialPack().getDecks(),
			current = 0,
			cardInfo = null;
		
		for (var k = 1; k < 5; k++) {
			decks[k] = {};
			
			if (typeof socialDecks[k] !== "undefined" && typeof socialDecks[k]['parts'] !== "undefined") {
				for (var card in socialDecks[k]['parts']) {
					current = socialDecks[k]['parts'][card]['current_card'] || null;
					
					if (current) {
						cardInfo = socialDecks[k]['parts'][card]['cards']['cards'][current['card']][current['index']];
						
						decks[k][card] = {
							"level": ( cardInfo['grade'] >= 0 && cardInfo['grade'] <= 49 ? cardInfo['grade'] : cardInfo['grade'] < 0 ? 0 : cardInfo['grade'] > 49 ? 49 : 0),
							"gain": cardInfo['gain_level'],
							"max": current['card']
						};
					}
				}
			}
		}
		
		return decks;
	};
	
	this.getStatusLevel = function() {
		if (
			this.getSocialPack().isActiveStatus()
		) {
			return this.getSocialPack().statusLevel();
		}
		
		return -1;
	};
	
	this.getBoostByStatus = function(weapon) {
		var level = this.getStatusLevel(),
			amount = 0;
		
		if (level > -1) {
			var c = this.getConfigStatus();
			var effects = c['effects'][level - 1]['items'];
			
			for (var eff of effects) {
				if (
					eff.resource.indexOf("boss_splash_weapon_") > -1
					&& eff.resource.split("_status_boost")[0].split("weapon_")[1] == weapon
				) {
					amount += parseInt(typeof eff.amount != "undefined" ? eff.amount : 0);
				}
			}
		}
		
		return amount;
	};
	
	this.getWeaponDamage = function(weapon) {
		var selfDecks = this.getSocialDecks(),
			defaultDamages = [100, 200, 300, 100, 200, 600, 1000, 1600, 4000, 8200],
			damage = defaultDamages[weapon] || 0;
			
		for (var deck in selfDecks) {
			for (var part in selfDecks[deck]) {
				if (selfDecks[deck].hasOwnProperty(part)) {
					var card = selfDecks[deck][part];
					
					damage += this.getBoostByCard(deck, part, card['level'], card['max'], card['gain'], weapon);
					damage += this.getBoostByCardEffect(deck, part, card['level'], weapon);
				}
			}
		}
			
		//damage = Math.round(damage);
		//damage = Math.trunc(damage);
		
		damage += parseInt(this.getBoostByTalents(weapon));
		damage += parseInt(this.getBoostByStatus(weapon));
		damage += parseInt(this.getBoostByGuild(weapon));
		
		return damage;
	};
	
	this.getBoostByCardEffect = function(deck, part, level, weapon) {
		var deck_effects_id = this.getEffectID(part, deck),
			amount = 0;
				
		if (deck_effects_id) {
			var effectsCard = this.getDataEffects(deck, deck_effects_id);
			var eList = (typeof effectsCard[level] !== "undefined" && typeof effectsCard[level]['effect'] !== "undefined" ? effectsCard[level]['effect']['items'] : []);
			
			for (var eff of eList) {
				if (
					eff.resource.indexOf("boss_splash_weapon_") > -1
					&& eff.resource.split("_boost")[0].split("weapon_")[1] == weapon
				) {
					amount += (typeof eff.amount != "undefined" ? eff.amount : 0);
				}
			}
		}
		
		return amount;
	};
	
	this.getBoostByCard = function(deck, part, level, card, gain, weapon) {
		var d = this.getData(part, deck),
			j = d[card]['grades'][level],
			amount = 0,
			social = this.getSocialPack();
			
		if (typeof j != "undefined" && typeof j.effect != "undefined") {
			
			for (var k = 0, a = 0, items = j.effect.items; k < items.length; k++) {
				if (items[k].resource.indexOf("boss_splash_weapon_") > -1) {
					var wpn = items[k].resource.split("_boost")[0].split("weapon_")[1];
					
					if (wpn == weapon) {
						if (typeof items[k].amount != "undefined") {
							if (items[k].amount.id == "card_enchant") {
								amount += parseInt( typeof items[k]['amount']['arguments']['weapon_boost'] == "undefined" ? 0 : items[k].amount.arguments.weapon_boost );
							} else amount += items[k].amount;
						}
					}
				}
			}
		
		}
		
		if (gain > 0) {
			if (gain > 10) {
				gain = 10;
			}
			
			var gains = [0, 1, 3, 6, 10, 15, 20, 30, 40, 60, 100];
			
			amount += Math.round((gains[gain] / 100) * amount);
		}
		
		//console.log((strings_ru['decks_' + deck + '_parts_' + part + '_name'] || 'decks_' + deck + '_parts_' + part + '_name') + ' -> boost: ' + amount);
		if (isNaN(amount)) {
			console.log(deck + 'd= ' + part + 'p= ' + level + 'l= ' + card + 'c= ' + gain + 'g= ' + weapon + 'w= ' + amount);
		}
		
		return (!isNaN(amount) ? amount : 0);
	};
	
	this.getBoostByTalents = function(weapon) {
		var talents = this.getTalents().getTalentsDataWhichBoostWpn(weapon),
			amount = 0;
		
		if (talents) {
			for (var index in talents) {
				if (talents.hasOwnProperty(index)) {
					var talent = talents[index];
					var selfTalent = this.getSocialPack().getTalent(talent['index']);
					
					if (!isNaN(selfTalent) && selfTalent > 0) {
						amount += parseInt(selfTalent * talent['amount']);
					}
				}
			}
		}
		
		return parseInt(amount);
	};
	
	this.getBoostByGuild = function(weapon) {
		var boost = {4: 1, 19: 3, 29: 5, 39: 5.5, 49: 6, 59: 6.5},
			guildLevel = this.getSocialPack().getUserGuildLevel(),
			_boost = 0,
			def = [100, 200, 300, 100, 200, 600, 1000, 1600, 4000, 8200];

			for (var level in boost) {
				if (
					boost.hasOwnProperty(level)
					&& level <= guildLevel
				) {
					_boost += parseInt(def[weapon] * boost[level]);
				}
			}
			
			var social = this.getSocialPack().getData();
			
			if (
				typeof social['expiring_resources']['boss_splash_weapon_' + weapon + '_guild_quest_boost'] != "undefined"
				&& social['expiring_resources']['boss_splash_weapon_' + weapon + '_guild_quest_boost']['time'] > ((new Date()).getTime() / 1000)
			) {
				_boost += parseInt(social['expiring_resources']['boss_splash_weapon_' + weapon + '_guild_quest_boost']['amount'] || 0);
			}
			
			return _boost;
	};
};

function talents(cfg) {
	this.pack = cfg;
	
	this.getTalentsDataWhichBoostWpn = function(weapon) {
		var boost = [];
		
		for (var talent in this.pack) {
			var effects = this.pack[talent]['talent_effect']['items'];
			
			for (var item in effects) {
				if (effects.hasOwnProperty(item) && effects[item].resource.indexOf("boss_splash_weapon_") > -1) {
					var wpn = effects[item].resource.split("_boost")[0].split("weapon_")[1];
					
					if (wpn == weapon) {
						boost.push({index: talent, amount: effects[item].amount});
					}
				}
			}
		}
		
		return boost;
	};
}