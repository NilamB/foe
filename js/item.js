

// Namespace that item prototypes are kept in
Items = {};
ItemIds = {};
//Represents the overall category an item falls under.
ItemType = {
	Weapon :0,
	Armor : 1,
	Accessory : 2,
	Potion : 3
};
//Represents a second level of categorization for items.
//TODO Evaluate all of these properties. Many can be refactored out.
ItemSubtype = {
	None      : -1, //TODO Refactor this out later. None is a lazy catch that we shouldn't use :P
	Weapon    : 0,
	TopArmor  : 1,
	BotArmor  : 2,
	FullArmor : 3,
	Accessory : 4,
	Acc1      : 5,
	Acc2      : 6,
	StrapOn   : 7
};

function Item(id, name, type) {
	//Required (An item will always have these)
	this.id     = id;
	this.name   = name;
	this.type  = ItemSubtype.None; //TODO No defaulting to None case. Force
	//Optional (An item might not have these. So check for undefined!)
	this.image  = new Image(); // TODO
	this.price  = 0;
	// Alchemical recipe, an array of {it: Item, num: Number} pairs
	this.recipe = [];
	//function(target)
	this.Use        = null;

	/* 
	 * effect = {
	 * 	 maxHp
	 *   maxSp
	 *   maxLust
	 *   strength
	 *   stamina
	 *   dexterity
	 *   intelligence
	 *   spirit
	 *   libido
	 *   charisma
	 * 
	 *   atkMod
	 *   defMod
	 * }
	 */
	this.effect = {};
	
	ItemIds[id] = this;
}

Item.TypeToStr = function(type) {
	switch(type) {
		case ItemSubtype.Weapon: return "Weapon";
		case ItemSubtype.TopArmor: return
		case ItemSubtype.BotArmor: return
		case ItemSubtype.FullArmor: return "Armor";
		case ItemSubtype.Accessory:
		case ItemSubtype.Acc1:
		case ItemSubtype.Acc2: return "Accessory";
		case ItemSubtype.StrapOn: return "Strapon";
		case ItemSubtype.None:
		default:
			return "Misc";
	}
}

Item.prototype.Type = function() {
	switch(this.type) {
		case ItemSubtype.Weapon: return ItemSubtype.Weapon;
		case ItemSubtype.TopArmor:
		case ItemSubtype.BotArmor:
		case ItemSubtype.FullArmor: return ItemSubtype.FullArmor;
		case ItemSubtype.Accessory:
		case ItemSubtype.Acc1:
		case ItemSubtype.Acc2: return ItemSubtype.Accessory;
		case ItemSubtype.StrapOn: return ItemSubtype.StrapOn;
		case ItemSubtype.None:
		default:
			return ItemSubtype.None;
	}
}

//function(target)
Item.prototype.Equip = function(target) {
	if(this.effect.maxHp)        target.maxHp.bonus         += this.effect.maxHp;
	if(this.effect.maxSp)        target.maxSp.bonus         += this.effect.maxSp;
	if(this.effect.maxLust)      target.maxLust.bonus       += this.effect.maxLust;
	
	if(this.effect.strength)     target.strength.bonus      += this.effect.strength;
	if(this.effect.stamina)      target.stamina.bonus       += this.effect.stamina;
	if(this.effect.dexterity)    target.dexterity.bonus     += this.effect.dexterity;
	if(this.effect.intelligence) target.intelligence.bonus  += this.effect.intelligence;
	if(this.effect.spirit)       target.spirit.bonus        += this.effect.spirit;
	
	if(this.effect.libido)       target.libido.bonus        += this.effect.libido;
	if(this.effect.charisma)     target.charisma.bonus      += this.effect.charisma;
	
	if(this.effect.atkMod)       target.atkMod += this.effect.atkMod;
	if(this.effect.defMod)       target.defMod += this.effect.defMod;
	
	// Elemental attack
	target.elementAtk.Add(new DamageType({
		pSlash   : this.effect.apSlash,
		pBlunt   : this.effect.apBlunt,
		pPierce  : this.effect.apPierce,
		mVoid    : this.effect.amVoid,
		mFire    : this.effect.amFire,
		mIce     : this.effect.amIce,
		mThunder : this.effect.amThunder,
		mEarth   : this.effect.amEarth,
		mWater   : this.effect.amWater,
		mWind    : this.effect.amWind,
		mLight   : this.effect.amLight,
		mDark    : this.effect.amDark,
		mNature  : this.effect.amNature,
		lust     : this.effect.alust
	}));
	
	// Elemental defense
	target.elementDef.Add(new DamageType({
		pSlash   : this.effect.dpSlash,
		pBlunt   : this.effect.dpBlunt,
		pPierce  : this.effect.dpPierce,
		mVoid    : this.effect.dmVoid,
		mFire    : this.effect.dmFire,
		mIce     : this.effect.dmIce,
		mThunder : this.effect.dmThunder,
		mEarth   : this.effect.dmEarth,
		mWater   : this.effect.dmWater,
		mWind    : this.effect.dmWind,
		mLight   : this.effect.dmLight,
		mDark    : this.effect.dmDark,
		mNature  : this.effect.dmNature,
		lust     : this.effect.dlust
	}));
}

Item.prototype.sDesc = function() { return this.name; }
Item.prototype.lDesc = function() { return this.name; }
Item.prototype.Short = function() { return this.name; }
Item.prototype.Long = function()  { return this.name; }

// Used as entrypoint for PC/Party (active selection)
Item.prototype.OnSelect = function(inv, encounter, caster, backPrompt) {
	var item = this;
	// TODO: Buttons (use portraits for target?)
	if(this.targetMode == TargetMode.Self) {
		this.UseCombat(inv, encounter, caster);
	}
	else if(this.targetMode == TargetMode.Ally) {
		var target = new Array();
		for(var i=0,j=party.members.length; i<j; i++){
			var t = party.members[i];
			if(t.Incapacitated()) continue;
			target.push({
			  	nameStr : t.name,
			  	func    : function(t) {
			  		item.UseCombat(inv, encounter, caster, t);
			  	},
			  	enabled : true,
			  	obj     : t
			});
		};
		
		Gui.SetButtonsFromList(target, true, backPrompt);
	}
	else if(this.targetMode == TargetMode.AllyNotSelf) {
		var target = new Array();
		for(var i=0,j=party.members.length; i<j; i++){
			var t = party.members[i];
			// Skip self
			if(t == caster) continue;
			if(t.Incapacitated()) continue;
			target.push({
			  	nameStr : t.name,
			  	func    : function(t) {
			  		item.UseCombat(inv, encounter, caster, t);
			  	},
			  	enabled : true,
			  	obj     : t
			});
		};
		
		Gui.SetButtonsFromList(target, true, backPrompt);
	}
	else if(this.targetMode == TargetMode.AllyFallen) {
		var target = new Array();
		for(var i=0,j=party.members.length; i<j; i++){
			var t = party.members[i];
			// Skip self (as you are obviously not fallen)
			if(t == caster) continue;
			if(!t.Incapacitated()) continue;
			target.push({
			  	nameStr : t.name,
			  	func    : function(t) {
			  		item.UseCombat(inv, encounter, caster, t);
			  	},
			  	enabled : true,
			  	obj     : t
			});
		};
		
		Gui.SetButtonsFromList(target, true, backPrompt);
	}
	else if(this.targetMode == TargetMode.Enemy) {
		var enemies = encounter.enemy.members;
		var target = new Array();
		for(var i=0,j=enemies.length; i<j; i++){
			var t = enemies[i];
			if(t.Incapacitated()) continue;
			target.push({
			  	nameStr : t.name,
			  	func    : function(t) {
			  		item.UseCombat(inv, encounter, caster, t);
			  	},
			  	enabled : true,
			  	obj     : t
			});
		};
		
		Gui.SetButtonsFromList(target, true, backPrompt);
	}
	else if(this.targetMode == TargetMode.Party) {
		this.UseCombat(inv, encounter, caster, party);
	}
	else if(this.targetMode == TargetMode.Enemies) {
		this.UseCombat(inv, encounter, caster, encounter.enemy);
	}
	// Fallback
	else
		encounter.CombatTick();
}

//TODO Possibly reformat items array to just contain items instead of [{it:item, num:x}], so this function be can made a generic Array.prototype.sortByProp for sorting any array of objects by prop.
function compareItemByProp(p){
	return function(a,b){
		return (a.it[p] > b.it[p]) ? 1 : (a.it[p] < b.it[p]) ? -1 : 0;
	}
}