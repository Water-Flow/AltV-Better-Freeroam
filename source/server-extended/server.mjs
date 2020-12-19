import * as alt from "alt";

const markersToLoad = [],
	callbacks = [],
	registeredCallbacks = new Set;
alt.on("GlobalSystems:PlayerReady", e =>
{
	if (markersToLoad.length >= 1)
		for (var r = 0; r < markersToLoad.length; r++) alt.emitClient(e, "createLocalMarker", markersToLoad[r].markerType, markersToLoad[r].pos,
		{
			x: 0,
			y: 0,
			z: 0
		},
		{
			x: 0,
			y: 0,
			z: 0
		}, markersToLoad[r].markerScale, markersToLoad[r].exitMarkerColor, markersToLoad[r].enterMarkerColor, !1, markersToLoad[r].markerRange, void 0)
}), alt.on("entityEnterColshape", (e, r) =>
{
	if (e.emitter && e.enterEventName)
	{
		if (!(e.isEnterClientside && e.isPlayerOnly && r instanceof alt.Player)) return e.isPlayerOnly && r instanceof alt.Player ? (console.log("Called server-side event."), void alt.emit(e.enterEventName, r)) : void alt.emit(e.enterEventName, r);
		alt.emitClient(r, e.enterEventName)
	}
}), alt.on("entityLeaveColshape", (e, r) =>
{
	e.emitter && null != e.exitEventName && null != e.exitEventName && (e.isExitClientside && e.isPlayerOnly && r instanceof alt.Player ? alt.emitClient(r, e.exitEventName) : (e.isPlayerOnly && alt.Player, alt.emit(e.exitEventName, r)))
});
export function ColshapeEmitter(e, r, o, t, a, i, n, l, d = !1, s = !1, c = !0)
{
	var m = new alt.ColshapeCylinder(e.x, e.y, e.z, l, n.z);
	m.emitter = !0, m.isPlayerOnly = c, m.exitEventName = o, m.enterEventName = r, m.isEnterClientside = d, m.isExitClientside = s, m.markerType = t, m.enterMarkerColor = a, m.exitMarkerColor = i, m.markerScale = n, m.markerRange = l, markersToLoad.push(m)
}
export function SetupExportsForPlayer(e)
{
	if (void 0 === e) throw new Error("SetupExportsForPlayer => player is undefined.");
	e.forwardVector = (r =>
	{
		SetupCallback(e, "getForwardVector", void 0, e =>
		{
			r(e)
		})
	}), e.isNearPos = ((r, o) =>
	{
		if (void 0 === r || void 0 === o) throw new Error("isNearPos => pos or range is undefined");
		return Distance(e.pos, r) <= o
	}), e.createLocalBlip = ((r, o, t, a, i, n, l) =>
	{
		if (void 0 === r || void 0 === o || void 0 === t || void 0 === a) throw new Error("createLocalBlip => One or more parameters is undefined.");
		alt.emitClient(e, "createLocalBlip", r, o, t, a, i, n, l)
	}), e.deleteLocalBlip = (r =>
	{
		if (void 0 === r) throw new Error("deleteLocalBlip => uniqueID is undefined.");
		alt.emitClient(e, "deleteLocalBlip", r)
	}), e.createLocalMarker = ((r, o, t, a, i, n, l, d, s, c) =>
	{
		if (void 0 === r || void 0 === o || void 0 === i || void 0 === n || void 0 === l || void 0 === s) throw new Error("createLocalMarker => One or more parameters is undefined.");
		alt.emitClient(e, "createLocalMarker", r, o, t, a, i, n, l, d, s, c)
	}), e.deleteLocalMarker = (r =>
	{
		if (void 0 === r) throw new Error("deleteLocalMarker => uniqueID is undefined.");
		alt.emitClient(e, "deleteLocalMarker", r)
	}), e.showNotification = ((r, o, t, a) =>
	{
		if (void 0 === r || void 0 === o || void 0 === t || void 0 === a) throw new Error("showNotification => One or more parameters is undefined.");
		alt.emitClient(e, "showNotification", r, o, t, a)
	}), e.freeze = (r =>
	{
		alt.emitClient(e, "freezePlayer", r)
	}), e.fadeScreen = ((r, o) =>
	{
		if (void 0 === o) throw new Error("fadeScreen => state or timeInMS is undefined.");
		alt.emitClient(e, "fadeOutScreen", r, o)
	}), e.blurScreen = ((r, o) =>
	{
		if (void 0 === o) throw new Error("blurScreen => state or timeInMS is undefined.");
		alt.emitClient(e, "blurOutScreen", r, o)
	}), e.showCursor = (r =>
	{
		alt.emitClient(e, "showCursor", r)
	}), e.showHelpText = ((r, o) =>
	{
		if (void 0 === r || void 0 === o) throw new Error("showHelpText => text or timeInMS is undefined.");
		alt.emitClient(e, "displayHelpText", r, o)
	}), e.showSubtitle = ((r, o) =>
	{
		if (void 0 === r || void 0 === o) throw new Error("showSubtitle => text or timeInMS is undefined.");
		alt.emitClient(e, "displaySubtitle", r, o)
	}), e.showLoading = ((r, o, t, a) =>
	{
		if (void 0 === r || void 0 === o) throw new Error("showLoading => One or more parameters is undefined.");
		alt.emitClient(e, "showLoading", r, o, t, a)
	})
}
export function GetGroundZFrom3DCoord(e, r, o)
{
	if (void 0 === e || void 0 === r) throw new Error("GetGroundZFrom3DCoord => player or pos is undefined.");
	SetupCallback(e, "getGroundZFrom3DCoord", r, e =>
	{
		0 == e[0] && o(void 0), o(e[1])
	})
}
export function AddVector3(e, r)
{
	if (void 0 === e || void 0 === r) throw new Error("AddVector => vector1 or vector2 is undefined");
	return {
		x: e.x + r.x,
		y: e.y + r.y,
		z: e.z + r.z
	}
}
export function SubVector3(e, r)
{
	if (void 0 === e || void 0 === r) throw new Error("AddVector => vector1 or vector2 is undefined");
	return {
		x: e.x - r.x,
		y: e.y - r.y,
		z: e.z - r.z
	}
}
export function GetRandomColor()
{
	return {
		r: Math.floor(255 * Math.random()) + 1,
		g: Math.floor(255 * Math.random()) + 1,
		b: Math.floor(255 * Math.random()) + 1
	}
}
export function GetPlayersInRange(e, r)
{
	if (void 0 === e || void 0 === r) throw new Error("GetPlayersInRange => pos or range is undefined");
	var o = [];
	return alt.Player.all.forEach(t =>
	{
		Distance(e, t.pos) > r || o.push(t)
	}), o
}
export function Distance(e, r)
{
	if (void 0 === e || void 0 === r) throw new Error("AddVector => vector1 or vector2 is undefined");
	return Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2) + Math.pow(e.z - r.z, 2))
}
export function RandomPosAround(e, r)
{
	if (void 0 === e || void 0 === r) throw new Error("RandomPosAround => pos or range is undefined");
	return {
		x: e.x + Math.random() * (2 * r) - r,
		y: e.y + Math.random() * (2 * r) - r,
		z: e.z
	}
}
export function DisplayAboveHead(e, r, o, t, a = 255, i = 255, n = 255, l = 255)
{
	if (void 0 === r || o <= 0) throw new Error("DisplayAboveHead => message or timeInMS is undefined.");
	var d = GetPlayersInRange(e.pos, t);
	for (const t of d) t !== e && alt.emitClient(t, "displayMessageAboveHead", e, r, o, a, i, n, l)
}
async function SetupCallback(e, r, o, t)
{
	ClientsideCall(e, r, o, e =>
	{
		t(e)
	})
}
async function ClientsideCall(e, r, o, t)
{
	if (void 0 === e) throw new Error("ClientsideCall => Player is undefined.");
	if (void 0 === r) throw new Error("ClientsideCall => eventName is undefined.");
	alt.emitClient(e, r, o), callbacks.push(
	{
		player: e,
		eventName: r,
		startTime: Date.now(),
		completed: !1,
		callback: t
	}), registeredCallbacks.has(r) || (registeredCallbacks.add(r), alt.onClient(r, (e, o) =>
	{
		let t = -1;
		for (var a = 0; a < callbacks.length; a++)
			if (callbacks[a].player === e || callbacks[a].eventName === r)
			{
				t = a;
				break
			} t <= -1 || (callbacks[a].callback(o), callbacks[a].completed = !0)
	}))
}
setInterval(() =>
{
	for (var e = 0, r = callbacks.length; r--;) callbacks[r].completed ? (callbacks.splice(r, 1), e += 1) : callbacks[r].startTime + 1e4 < Date.now() && (callbacks.splice(r, 1), e += 1);
	e <= 0 || console.log(`===> Extended: Cleaned up ${e}`)
}, 5e3);