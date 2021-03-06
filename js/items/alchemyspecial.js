Items.EquiniumPlus = new TFItem("equin+", "Equinium+");
Items.EquiniumPlus.price = 100;
Items.EquiniumPlus.lDesc = function() { return "a bottle of Equinium+"; }
Items.EquiniumPlus.Short = function() { return "A bottle of Equinium+"; }
Items.EquiniumPlus.Long = function() { return "A bottle of Equinium, potent enough to significantly change your body. The fluid inside is creamy, smelling of male musk."; }
//TODO recipe
Items.EquiniumPlus.recipe = [{it: Items.Equinium, num: 3}, {it: Items.HorseHair}, {it: Items.HorseCum}];
// Effects
Items.EquiniumPlus.PushEffect(TF.ItemEffects.SetEars, {odds: 0.8, race: Race.Horse, str: "equine ears"});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.SetTail, {odds: 0.8, race: Race.Horse, color: Color.brown, str: "a brown, bushy horse tail"});
Items.EquiniumPlus.PushEffect(function(target) {
	var parse = {
		name: target.NameDesc(),
		s: target == player ? "" : "s",
		possessive: target.possessive(),
		Possessive: target.Possessive(),
		multiCockDesc : function() { return target.MultiCockDesc(); }
	};
	var cocks = target.AllCocks();
	// Create new cock
	if(cocks.length == 0) {
		var cock = new Cock(Race.Horse, Color.pink);
		cock.length.base    = 25;
		cock.thickness.base = 7;
		cock.sheath = 1;
		cocks.push(cock);
		Text.Add("[name] grow[s] a huge horsecock!", parse);
		Text.NL();
	}
	else if(TF.SetRaceAll(cocks, Race.Horse)) {
		if(cocks.length > 1)
			Text.Add("All of [possessive] cocks turn into horsecocks!", parse);
		else
			Text.Add("[Possessive] cock turns into a horsecock!", parse);
		Text.NL();
		//Add sheaths
		for(var i = 0; i < cocks.length; i++) {
			var cock = cocks[i];
			cock.sheath = 1;
		}
	}
	var len = false, thk = false;
	for(var i = 0; i < cocks.length; i++) {
		// Base size
		var inc  = cocks[i].length.IncreaseStat(25, 100);
		var inc2 = cocks[i].thickness.IncreaseStat(7, 100);
		if(inc == null)
			inc = cocks[i].length.IncreaseStat(50, 5);
		if(inc2 == null)
			inc2 = cocks[i].thickness.IncreaseStat(12, 1);
		len |= inc;
		thk |= inc2;
	}
	if(len || thk) {
		parse["s"]    = target.NumCocks() > 1 ? "s" : "";
		parse["notS"] = target.NumCocks() > 1 ? "" : "s";
		Text.NL();
		Text.Add("[Possessive] [multiCockDesc] shudder[notS], the stiff dick[s] growing significantly ", parse);
		if(len)
			Text.Add("longer", parse);
		if(len && thk)
			Text.Add(" and ", parse);
		if(thk)
			Text.Add("thicker", parse);
		Text.Add(".", parse);
	}
	Text.Flush();
});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.SetSheath, {odds: 0.8, value: true, num: 2});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.SetBalls, {ideal: 2, count: 2});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.IncStr, {odds: 0.4, ideal: 50, max: 3});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.IncSta, {odds: 0.4, ideal: 50, max: 3});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.DecInt, {odds: 0.2, ideal: 20, max: 1});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.DecDex, {odds: 0.2, ideal: 20, max: 1});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.SetBody, {odds: 0.4, race: Race.Horse, str: "an equine shape"});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.SetFace, {odds: 0.3, race: Race.Horse, str: "a horse-like face"});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.SetArms, {odds: 0.3, race: Race.Horse, str: "furred equine arms"});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.SetLegs, {odds: 0.3, race: Race.Horse, str: "furred equine legs, with hooves"});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.DecFem, {odds: 0.3, ideal: -1, max: .2, male: true});
Items.EquiniumPlus.PushEffect(TF.ItemEffects.IncTone, {odds: 0.3, ideal: 1, max: .1 });
Items.EquiniumPlus.PushEffect(TF.ItemEffects.DecHips, {odds: 0.2, ideal: HipSize.Medium, max: 1});



//TODO
Items.Tigris = new TFItem("felin+0", "Tigris");
Items.Tigris.price = 100;
Items.Tigris.lDesc = function() { return "a bottle of Tigris"; }
Items.Tigris.Short = function() { return "A bottle of Tigris"; }
Items.Tigris.Long = function() { return "A bottle labeled Tigris, with the picture of a large cat on it. The fluid within is a strange mixture of black and orange."; }
//TODO ingredients
Items.Tigris.recipe = [{it: Items.Felinix}, {it: Items.HairBall}, {it: Items.CatClaw}];
// Effects
Items.Tigris.PushEffect(TF.ItemEffects.SetTongue, {odds: 0.4, race: Race.Feline, str: "rough, cat-like tongue"});
Items.Tigris.PushEffect(TF.ItemEffects.SetBody, {odds: 0.4, race: Race.Tiger, str: "a feline shape, complete with fur"});
Items.Tigris.PushEffect(TF.ItemEffects.SetFace, {odds: 0.3, race: Race.Tiger, str: "a cat-like face"});
Items.Tigris.PushEffect(TF.ItemEffects.SetArms, {odds: 0.3, race: Race.Tiger, str: "furred cat arms, with soft paws"});
Items.Tigris.PushEffect(TF.ItemEffects.SetLegs, {odds: 0.3, race: Race.Tiger, str: "furred cat legs, with soft paws"});
Items.Tigris.PushEffect(TF.ItemEffects.SetCock, {odds: 0.6, race: Race.Tiger, str: "a feline cock"});
Items.Tigris.PushEffect(TF.ItemEffects.SetEars, {odds: 0.6, race: Race.Tiger, str: "fluffy cat ears"});
Items.Tigris.PushEffect(TF.ItemEffects.SetTail, {odds: 0.6, race: Race.Tiger, color: Color.orange, str: "a striped, flexible feline tail"});
Items.Tigris.PushEffect(TF.ItemEffects.IncDex, {odds: 0.3, ideal: 35, max: 2});
Items.Tigris.PushEffect(TF.ItemEffects.IncStr, {odds: 0.5, ideal: 45, max: 2});
Items.Tigris.PushEffect(TF.ItemEffects.IncCha, {odds: 0.3, ideal: 25, max: 2});
Items.Tigris.PushEffect(TF.ItemEffects.IncSta, {odds: 0.2, ideal: 40, max: 2});
Items.Tigris.PushEffect(TF.ItemEffects.DecInt, {odds: 0.1, ideal: 25, max: 1});
Items.Tigris.PushEffect(function(target) {
	var parse = {
		name: target.NameDesc(),
		s: target == player ? "" : "s",
		possessive: target.possessive(),
		Possessive: target.Possessive()
	};
	var cocks = target.AllCocks();
	for(var i = 0; i < cocks.length; i++) {
		var cock = cocks[i];
		if(cock.sheath == 0 && Math.random() < 0.4) {
			parse["cock"] = cock.Short();
			Text.Add("[Possessive] [cock] is encased in a soft, furry sheath!", parse);
			Text.NL();
			cock.sheath = 1;
		}
	}
	Text.Flush();
});
Items.Tigris.PushEffect(TF.ItemEffects.DecFem, {odds: 0.2, ideal: -.7, max: .1, male: true});
Items.Tigris.PushEffect(TF.ItemEffects.IncTone, {odds: 0.2, ideal: .9, max: .1 });
Items.Tigris.PushEffect(TF.ItemEffects.DecHips, {odds: 0.3, ideal: HipSize.Medium, max: 1});
Items.Tigris.PushEffect(TF.ItemEffects.IncCockLen, {odds: 0.4, ideal: 25, max: 2 });
Items.Tigris.PushEffect(TF.ItemEffects.IncCockThk, {odds: 0.4, ideal: 6, max: 1 });


Items.InfernumPlus = new TFItem("demon+", "Infernum+");
Items.InfernumPlus.price = 100;
Items.InfernumPlus.lDesc = function() { return "a bottle of Infernum+"; }
Items.InfernumPlus.Short = function() { return "A bottle of Infernum+"; }
Items.InfernumPlus.Long = function() { return "A bottle of extra potent Infernum, with the picture of a large, decidedly male demon on it. The fluid within is a thick black sludge, reeking of corruption."; }
Items.InfernumPlus.recipe = [{it: Items.Infernum}, {it: Items.BlackGem}, {it: Items.DemonSeed, num: 3}];
// Effects
Items.InfernumPlus.PushEffect(function(target) {
	var parse = {
		name: target.NameDesc(),
		s: target == player ? "" : "s",
		possessive: target.possessive(),
		Possessive: target.Possessive(),
		multiCockDesc : function() { return target.MultiCockDesc(); }
	};
	var cocks = target.AllCocks();
	// Create new cock
	if(Math.random() < 0.5 && target.NumCocks() < 5) {
		var cock = new Cock(Race.Demon, Color.red);
		cock.length.base    = 20;
		cock.thickness.base = 4;
		cocks.push(cock);
		Text.Add("[name] grow[s] a demonic cock!", parse);
		Text.NL();
	}
	else if(cocks.length > 0 && TF.SetRaceAll(cocks, Race.Demon)) {
		if(cocks.length > 1)
			Text.Add("All of [possessive] cocks turn into demonic cocks!", parse);
		else
			Text.Add("[Possessive] cock turns into a demonic cock!", parse);
		Text.NL();
	}
	if(cocks.length > 0) {
		var size = false;
		for(var i = 0; i < cocks.length; i++) {
			// Base size
			var inc  = cocks[i].length.IncreaseStat(20, 100);
			var inc2 = cocks[i].thickness.IncreaseStat(4, 100);
			if(inc == null)
				inc  = cocks[i].length.IncreaseStat(30, 2);
			if(inc2 == null)
				inc2 = cocks[i].thickness.IncreaseStat(6, 1);
			if(inc || inc2) size = true;
		}
		if(size) {
			parse["s"]    = target.NumCocks() > 1 ? "s" : "";
			parse["notS"] = target.NumCocks() > 1 ? "" : "s";
			Text.NL();
			Text.Add("[Possessive] [multiCockDesc] shudder[notS], the stiff dick[s] growing significantly longer and thicker.", parse);
		}
	}
	Text.Flush();
});
Items.InfernumPlus.PushEffect(TF.ItemEffects.SetBody, {odds: 0.3, race: Race.Demon, color: Color.red, str: "a fully demonic form"});
Items.InfernumPlus.PushEffect(TF.ItemEffects.SetLegs, {odds: 0.5, race: Race.Demon, color: Color.red, str: "plantigrade, demonic legs with clawed feet"});
Items.InfernumPlus.PushEffect(TF.ItemEffects.SetArms, {odds: 0.5, race: Race.Demon, color: Color.red, str: "demonic arms with clawed hands"});
Items.InfernumPlus.PushEffect(TF.ItemEffects.SetTail, {odds: 0.6, race: Race.Demon, color: Color.red, str: "a red, spaded demon tail"});
Items.InfernumPlus.PushEffect(TF.ItemEffects.SetHorn, {odds: 0.6, race: Race.Demon, color: Color.red, count: 4, str: "a pair of demon horns" });
Items.InfernumPlus.PushEffect(TF.ItemEffects.SetTongue, {odds: 0.6, race: Race.Demon, str: "long and flexible tongue"});
Items.InfernumPlus.PushEffect(TF.ItemEffects.IncSta, {odds: 0.4, ideal: 35, max: 2});
Items.InfernumPlus.PushEffect(TF.ItemEffects.IncDex, {odds: 0.4, ideal: 35, max: 2});
Items.InfernumPlus.PushEffect(TF.ItemEffects.IncInt, {odds: 0.4, ideal: 40, max: 2});
Items.InfernumPlus.PushEffect(TF.ItemEffects.IncLib, {odds: 0.8, ideal: 55, max: 2});
Items.InfernumPlus.PushEffect(TF.ItemEffects.IncFem, {odds: 0.2, ideal: 1, max: .25, female: true});
Items.InfernumPlus.PushEffect(TF.ItemEffects.DecFem, {odds: 0.2, ideal: -1, max: .25, male: true});


Items.Nagazm = new TFItem("naga0", "Nagazm");
Items.Nagazm.price = 7;
Items.Nagazm.lDesc = function() { return "a bottle of Nagazm"; }
Items.Nagazm.Short = function() { return "A bottle of Nagazm"; }
Items.Nagazm.Long  = function() { return "A bottle with a pink, bubbly liquid, labeled Nagasm. It has the picture of a snake on it."; }
Items.Nagazm.recipe = [{it: Items.SnakeOil}, {it: Items.SnakeFang}, {it: Items.SnakeSkin}];
// Effects
Items.Nagazm.PushEffect(function(target) {
	var parse = {
		Poss : target.Possessive(),
		legsDesc : function() { return target.LegsDesc(); },
		s : target.body.legs.count > 1 ? "" : "s"
	};
	
	if(Math.random() < 0.4) {
		if(target.body.legs.count != 0 && target.body.legs.race != Race.Snake) {
			TF.ItemEffects.RemTail(target, {count: -1});
			
			Text.Add("[Poss] [legsDesc] turn[s] into a long serpentine tail!", parse);
			Text.NL();
			
			target.body.legs.count = 0;
			target.body.legs.race  = Race.Snake;
		}
	}
	Text.Flush();
});
Items.Nagazm.PushEffect(TF.ItemEffects.RemBalls, {odds: 0.5, ideal: 0, count: 2});
Items.Nagazm.PushEffect(function(target) {
	var parse = { Name: target.NameDesc(), s: target.plural() ? "" : "s" };
	
	if (Math.random() < 0.5) {
		var vags  = target.AllVags();
		var cocks = target.AllCocks();
		if (vags.length < 1 && !target.HasBalls()) {
			vags.push(new Vagina());
			parse["vag"] = vags[0].Short();
			Text.Add("[Name] grow[s] a brand new [vag]!", parse);
			Text.NL();
		}
		else if (cocks.length < 1) {
			cocks.push(new Cock());
			parse["cock"] = cocks[0].Short();
			Text.Add("[Name] grow[s] a brand new [cock]!", parse);
			Text.NL();
		}
	}
	Text.Flush();
});
Items.Nagazm.PushEffect(function(target) {
	// TODO: Race check like in Lacertium? What race are Naga penises?
	// TODO: Other prerequisites? No testicles? Hermaphroditism?
	var cocks = target.AllCocks();
	if(cocks.length == 1 && Math.random() < 0.1) {
		var parse = { Poss: target.Possessive(), cockDesc: cocks[0].Short()};
		cocks.push(cocks[0].Clone());
		Text.Add("[Poss] [cockDesc] splits in two identical dicks!", parse);
		Text.NL();
		Text.Flush();
	}
});
// TODO: Naga eyes? From descr in scenes: "faintly glowing" "vivid, angular magenta eyes"
// TODO: Snake tongue? "a long, forked tongue"
Items.Nagazm.PushEffect(TF.ItemEffects.SetTongue, {odds: 0.4, race: Race.Snake, str: "long, serpentine tongue"});
Items.Nagazm.PushEffect(TF.ItemEffects.SetEars, {odds: 0.4, race: Race.Elf, str: "elongated, pointy ears"});
Items.Nagazm.PushEffect(TF.ItemEffects.SetSheath, {odds: 0.4, value: false, num: 1});
Items.Nagazm.PushEffect(TF.ItemEffects.IncLib, {odds: 0.5, ideal: 40, max: 1});
Items.Nagazm.PushEffect(TF.ItemEffects.IncCha, {odds: 0.4, ideal: 40, max: 1});
Items.Nagazm.PushEffect(TF.ItemEffects.IncDex, {odds: 0.4, ideal: 30, max: 1});
Items.Nagazm.PushEffect(TF.ItemEffects.IncSpi, {odds: 0.4, ideal: 30, max: 1});
Items.Nagazm.PushEffect(TF.ItemEffects.DecStr, {odds: 0.2, ideal: 20, max: 1});
Items.Nagazm.PushEffect(TF.ItemEffects.DecSta, {odds: 0.2, ideal: 20, max: 1});
Items.Nagazm.PushEffect(TF.ItemEffects.IncFem, {odds: 0.3, ideal: .9, max: .1});
Items.Nagazm.PushEffect(TF.ItemEffects.IncHips, {odds: 0.3, ideal: HipSize.VeryWide, max: 2});
Items.Nagazm.PushEffect(TF.ItemEffects.IncBreastSize, {odds: 0.6, ideal: 26, max: 2, female: true });
Items.Nagazm.PushEffect(TF.ItemEffects.IncCockLen, {odds: 0.6, ideal: 30, max: 3 });
Items.Nagazm.PushEffect(TF.ItemEffects.IncCockThk, {odds: 0.6, ideal: 8, max: 1 });


Items.Taurico = new TFItem("taur0", "Taurico");
Items.Taurico.price = 7;
Items.Taurico.lDesc = function() { return "a bottle of Taurico"; }
Items.Taurico.Short = function() { return "A bottle of Taurico"; }
Items.Taurico.Long  = function() { return "A bottle filled with a strange, jelly-like substance. It has a picture of a centaur on it."; }
Items.Taurico.recipe = [{it: Items.HorseShoe}, {it: Items.CanisRoot}, {it: Items.Ramshorn}];
// Effects
Items.Taurico.PushEffect(function(target) {
	var parse = {
		Poss : target.Possessive(),
		legsDesc : function() { return target.LegsDesc(); },
		race : function() { return target.body.legs.race.qShort(); },
		s : target.body.legs.count > 1 ? "" : "s"
	};
	
	if(Math.random() < 1.0) { //TODO
		if(target.body.legs.count <= 4) {
			target.body.legs.count = 4;
			
			var scenes = new EncounterTable();
			scenes.AddEnc(function() {
				target.body.legs.race = Race.Horse;
			}, 2.0, function() { return true; });
			scenes.AddEnc(function() {
				target.body.legs.race = Race.Wolf;
			}, 1.0, function() { return true; });
			scenes.AddEnc(function() {
				target.body.legs.race = Race.Sheep;
			}, 1.0, function() { return true; });
			scenes.Get();
			
			Text.Add("[Poss] lower body morphs until it has four [race] legs!", parse);
		}
	}
	Text.Flush();
});


Items.Androgyn = new TFItem("trap0", "Androgyn");
Items.Androgyn.price = 25;
Items.Androgyn.lDesc = function() { return "a bottle of Androgyn"; }
Items.Androgyn.Short = function() { return "A bottle of Androgyn"; }
Items.Androgyn.Long  = function() { return "A bottle containing a sparkling pink fluid. It’s glowing slightly."; }
Items.Androgyn.recipe = [{it: Items.Testos}, {it: Items.Estros}, {it: Items.SpringWater}];
// Effects
Items.Androgyn.PushEffect(TF.ItemEffects.IdealFem, {odds: 0.8, minRange: -.1, maxRange: .3, max: .3});
Items.Androgyn.PushEffect(TF.ItemEffects.DecTone, {odds: 0.8, ideal: 0, max: .3 });
Items.Androgyn.PushEffect(TF.ItemEffects.IdealHips, {odds: 0.2, ideal: HipSize.Medium-1, max: 3});
Items.Androgyn.PushEffect(TF.ItemEffects.SetIdealBreastSize, {odds: 0.6, ideal: 3, max: 5});
Items.Androgyn.PushEffect(TF.ItemEffects.DecCockLen, {odds: 0.8, ideal: 10, max: 4 });
Items.Androgyn.PushEffect(TF.ItemEffects.DecCockThk, {odds: 0.8, ideal: 3, max: 2 });
Items.Androgyn.PushEffect(TF.ItemEffects.DecBallSize, {odds: 0.8, ideal: 1, max: 4 });

