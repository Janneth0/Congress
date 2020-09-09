//variables estadisticas
var statistics = {
    "number_of_democrats": 0,
    "number_of_republicans": 0,
    "number_of_independents": 0,
    "total": 0,
    "democrats_average_votes_with_party": 0,
    "republicans_average_votes_with_party": 0,
    "independents_average_votes_with_party": 0,
    "total_average": 0,
    "least_engaged": [],
    "most_engaged": [],
    "least_loyal": [],
    "most_loyal": [],
};
//variables extras
var datos = data.results[0].members;
var demo = "D";
var repu = "R";
var inde = "I";
var ten = datos.length * 10 / 100;
//contando cantidad de miembros	
function contando(partido) {
    let cant = datos.filter(member => member.party === partido);
    return cant.length
}
statistics.number_of_democrats = contando(demo);
statistics.number_of_republicans = contando(repu);
statistics.number_of_independents = contando(inde);
statistics.total = datos.length;
//porcenaje de votos por partido
function promedio_voto(partido) {
    let cant = 0;
    let cont = 0;
    let prom = 0;
    for (let i = 0; i < datos.length; i++) {
        if (datos[i].party === partido) {
            cant += datos[i].votes_with_party_pct;
            cont++;
            prom = (cant / cont).toFixed(2);
        }
    }
    return prom;
}
statistics.democrats_average_votes_with_party = promedio_voto(demo);
statistics.republicans_average_votes_with_party = promedio_voto(repu);
statistics.independents_average_votes_with_party = promedio_voto(inde);
// porcentaje de votos totales
function votetotal(arrayA) {
    let cant = 0;
    let prom = 0;
    for (let i = 0; i < arrayA.length; i++) {
        cant += arrayA[i].votes_with_party_pct;
        prom = (cant / statistics.total).toFixed(2);
    }
    return prom;
}
statistics.total_average = votetotal(datos);
//creando tabla Glance
creandotabla();
function creandotabla() {
    let elGlance = document.getElementById('tabla_glance');
    let GlanceEl = construirTablaHTML();
    elGlance.innerHTML = GlanceEl;
}

/////////////////attendance//////////////
//least_endgaged 10% butom
function Least_Engaged(arrayA) {
    let elementoHtml = '';
    let ultimo = arrayA.length - 1;
    for (var i = 0; i < arrayA.length; i++) {
        arrayA.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct));
        if (statistics.least_engaged.length < ten) {
            statistics.least_engaged.push(arrayA[ultimo]);
            ultimo--;
        }
    }
    statistics.least_engaged.forEach(function (member) {
        elementoHtml += '<tr>';
        if (member.middle_name === null) {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.last_name + '</td>';
        } else {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.middle_name + ' ' + member.last_name + '</a></td>';
        }
        elementoHtml += '<td class="nro_missed_vote">' + member.missed_votes + '</td>';
        elementoHtml += '<td class="state">' + member.missed_votes_pct + '</td>';
        elementoHtml += '</tr>';
    });
    return elementoHtml;
}
//most endgaged 10% top
function Most_Engaged(arrayA) {
    let elementoHtml = '';
    for (var i = 0; i < arrayA.length; i++) {
        arrayA.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct));
        //console.log(arrayA[i].missed_votes_pct);

        if (statistics.most_engaged.length < ten) {
            statistics.most_engaged.push(arrayA[i]);
        }

    }
    statistics.most_engaged.forEach(function (member) {
        elementoHtml += '<tr>';
        if (member.middle_name === null) {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.last_name + '</td>';
        } else {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.middle_name + ' ' + member.last_name + '</a></td>';
        }
        elementoHtml += '<td class="nro_missed_vote">' + member.missed_votes + '</td>';
        elementoHtml += '<td class="state">' + member.missed_votes_pct + '</td>';
        elementoHtml += '</tr>';
    });
    return elementoHtml;
}
//creando tablas attendance
tabla_attendance();
function tabla_attendance() {
    ////////////////LEAST-ENGAGED//////////////
    if (document.getElementById("tabla_least_engaged")) {
        let elLeast_Engaged = document.getElementById('tabla_least_engaged');
        let Least_EnEl = Least_Engaged(datos);
        elLeast_Engaged.innerHTML = Least_EnEl;
    }
    ////////////////MOST-ENGAGED//////////////
    if (document.getElementById("tabla_most_engaged")) {
        let elMost_Engaged = document.getElementById('tabla_most_engaged');
        let Most_EnEl = Most_Engaged(datos);
        elMost_Engaged.innerHTML = Most_EnEl;
    }
}
////////////////party_loyal//////////////
//least_loyal 10%butom
function Least_Loyal(arrayA) {
    let elementoHtml = '';
    for (var i = 0; i < arrayA.length; i++) {
        arrayA.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct));
        if (statistics.least_loyal.length < ten) {
            statistics.least_loyal.push(arrayA[i]);
        }
    }
    statistics.least_loyal.forEach(function (member) {
        elementoHtml += '<tr>';
        if (member.middle_name === null) {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.last_name + '</td>';
        } else {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.middle_name + ' ' + member.last_name + '</a></td>';
        }
        elementoHtml += '<td class="nro_missed_vote">' + member.total_votes + '</td>';
        elementoHtml += '<td class="state">' + member.votes_with_party_pct + '</td>';
        elementoHtml += '</tr>';
    });
    return elementoHtml;
}
// ---------------------------------------------
var ten = datos.length * 10 / 100;

function Least_Loyal(arrayA) {
    for (var i = 0; i < arrayA.length; i++) {
        arrayA.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct));
        if (statistics.least_loyal.length < ten) {
            statistics.least_loyal.push(arrayA[i]);
        }
    }
}
function Most_Loyal(arrayA) {
    let ultimo = arrayA.length - 1;
    for (var i = 0; i < arrayA.length; i++) {
        arrayA.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct));
        if (statistics.most_loyal.length < ten) {
            statistics.most_loyal.push(arrayA[ultimo]);
            ultimo--;
        }
    }
}

function Most_Engaged(arrayA) {
    for (var i = 0; i < arrayA.length; i++) {
        arrayA.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct));
        //console.log(arrayA[i].missed_votes_pct);

        if (statistics.most_engaged.length < ten) {
            statistics.most_engaged.push(arrayA[i]);
        }

    }
}
function Least_Engaged(arrayA) {
    let elementoHtml = '';
    let ultimo = arrayA.length - 1;
    for (var i = 0; i < arrayA.length; i++) {
        arrayA.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct));
        if (statistics.least_engaged.length < ten) {
            statistics.least_engaged.push(arrayA[ultimo]);
            ultimo--;
        }
    }
}
// ---------------------------------------------------
//most_loyal 10% top
function Most_Loyal(arrayA) {
    let elementoHtml = '';
    let ultimo = arrayA.length - 1;
    for (var i = 0; i < arrayA.length; i++) {
        arrayA.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct));
        if (statistics.most_loyal.length < ten) {
            statistics.most_loyal.push(arrayA[ultimo]);
            ultimo--;
        }
    }
    statistics.most_loyal.forEach(function (member) {
        elementoHtml += '<tr>';
        if (member.middle_name === null) {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.last_name + '</td>';
        } else {
            elementoHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.middle_name + ' ' + member.last_name + '</a></td>';
        }
        elementoHtml += '<td class="nro_missed_vote">' + member.total_votes + '</td>';
        elementoHtml += '<td class="state">' + member.votes_with_party_pct + '</td>';
        elementoHtml += '</tr>';
    });
    return elementoHtml;
}
//creando tabla party
function tabla_party() {
    ////////////////LEAST-LOYAL//////////////
    if (document.getElementById("tabla_least_loyal")) {
        let elLeast_Loyal = document.getElementById('tabla_least_loyal');
        let Least_LoEl = Least_Loyal(datos);
        elLeast_Loyal.innerHTML = Least_LoEl;
    }
    ////////////////MOST-LOYAL
    if (document.getElementById("tabla_most_loyal")) {
        let elMost_Loyal = document.getElementById('tabla_most_loyal');
        let Most_LoEl = Most_Loyal(datos);
        elMost_Loyal.innerHTML = Most_LoEl;
    }
}
tabla_party();