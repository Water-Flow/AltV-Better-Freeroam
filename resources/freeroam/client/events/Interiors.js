import * as alt from 'alt';
import * as native from "natives";

function loadipl(element) {
    if (element["status"] == 0){
        native.requestIpl(element["ipl"]);
    } else {
        native.removeIpl(element["ipl"]);
    }
}

function Interiors(ipls){
    ipls.forEach(element => {
        loadipl(element);
    });

	native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4981.012, -5712.747, 20.78103, true, 0, 0, -10);
	native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4984.134, -5709.249, 20.78103, true, 0, 0, 10);
	native.doorControl(alt.hash("h4_prop_h4_gate_r_03a"), 4990.681, -5715.106, 20.78103, true, 0, 0, -10);
	native.doorControl(alt.hash("h4_prop_h4_gate_l_03a"), 4987.587, -5718.635, 20.78103, true, 0, 0, 10);

    //disable Waves
    native.setDeepOceanScaler(0.0);
    native.waterOverrideSetStrength(1.0);

    native.refreshInterior(274689)

    for(var i = 0; i <= 15; i++){
        native.setMinimapComponent(i, true, -1);
    };
};

alt.onServer("freeroam:Interiors", Interiors);