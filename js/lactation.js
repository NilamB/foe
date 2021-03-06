/*
 * Lactation handler
 */

function LactationHandler(entity, storage) {
	this.entity = entity;
	
	var debugName = function() { return entity.name + ".body"; };
	
	this.lactating      = false;
	this.lactationRate  = new Stat(0);
	this.lactationRate.debug = function() { return debugName() + ".lactationRate"; }
	this.milkProduction = new Stat(0);
	this.milkProduction.debug = function() { return debugName() + ".milkProduction"; }
	this.milkCap        = new Stat(0);
	this.milkCap.debug = function() { return debugName() + ".milkCap"; }
	this.milk           = new Stat(0);
	
	if(storage) this.FromStorage(storage);
}

LactationHandler.prototype.ToStorage = function(storage) {
	var storage = {};
	
	storage.lact  = this.lactating ? 1 : 0;
	storage.lactR = this.lactationRate.base;
	storage.milk  = this.milk.base;
	storage.milkP = this.milkProduction.base;
	storage.milkC = this.milkCap.base;

	return storage;
}

LactationHandler.prototype.FromStorage = function(storage) {
	storage = storage || {};
	
	this.lactating           = parseInt(storage.lact) == 1;
	this.lactationRate.base  = parseFloat(storage.lactR) || this.lactationRate.base;
	this.milk.base           = parseFloat(storage.milk)  || this.milk.base;
	this.milkProduction.base = parseFloat(storage.milkP) || this.milkProduction.base;
	this.milkCap.base        = parseFloat(storage.milkC) || this.milkCap.base;
}

LactationHandler.prototype.Lactation = function() {
	var body = this.entity.body;
	if(body.breasts.length == 0)
		return false;
	else
		return this.lactating;
}
LactationHandler.prototype.Milk = function() {
	return this.milk.Get();
}
//TODO Balance
LactationHandler.prototype.MilkCap = function() {
	var body = this.entity.body;
	var cap  = this.milkCap.Get();
	for(var i = 0; i < body.breasts.length; i++) {
		cap += body.breasts[i].Size();
	}
	return cap;
}

//TODO
LactationHandler.prototype.Update = function(hours) {
	var inc = this.milkProduction.Get() * hours;
	if(this.Lactation())
		inc -= this.lactationRate.Get() * hours;
	
	if(inc > 0) {
		this.milk.IncreaseStat(this.MilkCap(), inc, true);
	}
	else if(inc < 0) {
		this.milk.DecreaseStat(0, -inc, true);
	}
	
	if(this.Milk() >= this.MilkCap()) {
		this.entity.MilkFull();
	}
	if(this.Lactation()) {
		if(this.Milk() <= 0)
			this.entity.MilkDrained();
	}
}

LactationHandler.prototype.FillMilk = function(fraction) {
	fraction = fraction || 1;
	this.milk.IncreaseStat(this.MilkCap(), this.MilkCap() * fraction);
}
LactationHandler.prototype.MilkDrained = function() {
	this.lactating = false;
}
LactationHandler.prototype.MilkFull = function() {
	this.lactating = true;
}
