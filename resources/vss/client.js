import * as alt from 'alt';
import * as native from 'natives';

let loaded = false;
let opened = false;
let player = alt.Player.local;

const view = new alt.WebView('http://resource/html/index.html');

function menu(toggle) {
    opened = toggle;

    alt.showCursor(toggle);
    alt.toggleGameControls(!toggle);

    if (toggle) {
        view.focus();
    } else {
        view.unfocus();
    }

    view.emit('menu', toggle);
}

function promisify(callback) {
    return new Promise((resolve, reject) => {
        let loader = alt.setInterval(() => {
            if (callback() == true) {
                resolve(true);
                alt.clearInterval(loader);
            }
        }, 10);
    });
}

view.on('ready', () => {
    loaded = true;
});

view.on('menu', (toggle) => {
    menu(toggle);
});

view.on('select', (model) => {
	let position = player.pos;
	let rotation = player.rot;
    alt.emitServer('playerSpawnVehicle', model, position, rotation);
	alt.log(rotation);
	menu(false);
});

alt.on('keyup', (key) => {
    if (!loaded) return;

    if (key === 0x71) {
        menu(!opened);
    } else if (opened && key === 0x1B) {
        menu(false);
    }
});

alt.on('disconnect', () => {view.destroy()})

alt.onServer('setPedIntoVehicle', async (vehicle) => {
    let player = alt.Player.local;
    await promisify(() => {
        if (player.vehicle) return true;
        native.setPedIntoVehicle(player.scriptID, vehicle.scriptID, -1);
    });
});