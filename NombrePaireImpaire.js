exports.action = function(data, callback){

	let client = setClient(data);

	info("NombrePaireImpaire from:", data.client, "To:", client);
	IsPaire (data, client);
	callback();
 
}


function IsPaire (data, client) {

    let numberIsPaire = data.action.rawSentence.replace(/est-ce|que|le|nombre|chiffre|est|un|pair/g, "").trim();

    if(!numberIsPaire) {
        Avatar.speak(`Je ne comprends pas ce que tu veux`, data.client,  () => {
        Avatar.Speech.end(data.client);
    });
        return;
    }

	function estPair(nombre) {
    return nombre % 2 === 0;
	}
	
	let monNombre = numberIsPaire;
	if (estPair(monNombre)) {
        Avatar.speak(`le nombre ${numberIsPaire.replace("nombre", "")} est un nombre pair.`, data.client, () => {
            Avatar.Speech.end(data.client);
    });
	} else {
        Avatar.speak(`le nombre ${numberIsPaire.replace("nombre", "")} n'est pas un nombre pair, alors est un nombre impair.`, data.client, () => {
            Avatar.Speech.end(data.client);
    });
	}
	estPair();
}


function setClient(data) {
    let client = data.client;
    if (data.action.room)
        client = (data.action.room !== 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
    if (data.action.setRoom)
        client = data.action.setRoom;
    return client;
}