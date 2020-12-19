$(() =>
{
	$("#speedometer").length && alt.on("speedometer:data", e =>
	{
		let t = e.speed,
			r = e.gear,
			s = e.rpm,
			n = e.isElectric,
			i = r,
			o = 0,
			l = 0,
			a = ["R", "P", 1, 2, 3, 4, 5, 6];
		n && (a = ["R", "P", 1]);
		let h = 0;
		0 === t ? h = 1 : 0 === i && t > 0 ? h = 0 : 1 === i ? h = 2 : 6 === i ? h = 7 : (o = r + 1, l = r - 1, h = r + 1), i = a[h], o = void 0 !== a[h + 1] ? a[h + 1] : "", l = "" !== (l = void 0 !== a[h - 1] ? a[h - 1] : "") ? l : "-", o = "" !== o ? o : "-";
		let d = (s / 1e4 * 100).toFixed(0) < 90 ? "none" : "block";
		"R" !== i && "P" !== i && 6 !== i || (d = "none"), n && i > 0 && (d = "none");
		let c = Math.round(s / 1e3 * 27 + 180);

		function g(e)
		{
			let t = "#FFF";
			!1 === e && (t = "#424242"), $("#pin").css("color", t).css("border-color", t), $("#kmh").css("color", t);
			for (let e = 1; e <= 18; e++) $(".ii div:nth-child(" + e + ") > b").css("background-color", t);
			for (let e = 1; e <= 9; e++) $(".num_" + e).css("color", t)
		}
		$("#needle").css("transform", "rotate(" + c + "deg)"), $("#gearNext").text(o), $("#gearCurrent").text(i), $("#gearBefore").text(l), $("#shift").css("display", d), $("#speed").text(t), $(".lightOff").css("color", "#FFF"), $("#fuelbar > div").css("height", e.fuelPercentage + "%"), g(!0), e.isEngineRunning || (g(!1), $("#needle").css("transform", "rotate(180deg)"), $("#shift").css("display", "none"), t > 0 ? ($("#gearNext").text("P"), $("#gearCurrent").text("N"), $("#gearBefore").text("R")) : ($("#gearNext").text("1"), $("#gearCurrent").text("P"), $("#gearBefore").text("R"))), e.isEngineRunning ? (e.handbrakeActive ? $("#handbrake").show() : $("#handbrake").hide(), e.isVehicleOnAllWheels ? $("#inair").hide() : $("#inair").show(), 1 === e.lightState ? $("#lightsOn").show().css("color", "#193a61") : 2 === e.lightState ? $("#lightsOn").show().css("color", "#3b97ff") : $("#lightsOn").hide(), $("#fuel").show()) : ($("#handbrake").hide(), $("#inair").hide(), $("#lightsOn").hide(), $("#fuel").hide())
	})
});