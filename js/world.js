// World template

world = {
	// Prototype initialization
	loc           : {},
	EntityStorage : new Array(),
	SaveSpots     : {}
}

world.Locations = {
	Plains    : 0,
	Forest    : 1,
	Desert    : 2,
	Highlands : 3,
	Lake      : 4
};

world.CurrentLocation = function(loc) {
	loc = loc || party.location;
	
	if     (loc == world.loc.Plains.Crossroads)
		return world.Locations.Plains;
	else if(loc == world.loc.Forest.Outskirts)
		return world.Locations.Forest;
	else if(loc == world.loc.Desert.Drylands)
		return world.Locations.Desert;
	else if(loc == world.loc.Highlands.Hills)
		return world.Locations.Highlands;
	else if(loc == world.loc.Lake.Shore)
		return world.Locations.Lake;
	
	return -1;
}

// Update function (for animations and transitions)
world.Update = function(frametime) {
	/*
	var xDir = 0;
	var yDir = 0;
	
	if(Input.keyinput[LEFT_ARROW])  xDir--;
	if(Input.keyinput[RIGHT_ARROW]) xDir++;
	if(Input.keyinput[UP_ARROW])    yDir--;
	if(Input.keyinput[DOWN_ARROW])  yDir++;
	
	this.x += xDir * frametime * 200;
	this.y += yDir * frametime * 200;
	*/
}

// Update function (for internal game time)
world.TimeStep = function(step) {
	this.time.Inc(step);
	
	for(var i = 0; i < this.EntityStorage.length; i++)
		if(this.EntityStorage[i].Update) this.EntityStorage[i].Update(step);
}

// Update function (for internal game time)
world.StepToHour = function(hour, minute) {
	var step = world.time.TimeToHour(hour, minute);
	
	world.TimeStep(step);

	return step;
}

world.HandleTimers = function() {
	for(var i = 0; i < this.EntityStorage.length; i++) {
		if(this.EntityStorage[i].HandleTimers && this.EntityStorage[i].HandleTimers())
			return true;
	}
	return false;
}
	
// Render function
world.Render = function() {
	
}

//TODO
world.TreeFarDesc = function() {
	return "As always, you can see the immense tree at the center of the island towering in the distance, though you are so far away that the great canopy isn't obscuring the sky above.";
}
