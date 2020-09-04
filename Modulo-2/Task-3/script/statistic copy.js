
let members = data.results[0].members;

let statistics = {
    democrats: getPartyMembers("D"),
    republicans: getPartyMembers("R"),
    independents: getPartyMembers("ID"),
    avgPVdemocrats: 0,
    avgPVrepublicans: 0,
    avgPVindependents: 0,

}

//arrays de party
function getPartyMembers(party) {
    return members.filter(member => member.party == party)
}
// console.log(members);
// Array de Democrats,Republicans, Independents
// for (let i = 0; i < members.length; i++) {
//     if (members[i].party == "D") {
//         statistics.democrats.push(members[i])
//     } else if (members[i].party == "R") {
//         statistics.republicans.push(members[i])
//     } else { statistics.independents.push(members[i]) }
// }

//Promedio
function avaregePartyVotes(party, key) {
    let sum = 0;
    // let avg = 0;

    party.forEach(function (partyMembers) {
        sum += partyMembers[key];
    });
    // for (let i = 0; i < array.length; i++) {

    //     if (document.getElementById(ide) == "attendance") {
    //         sum += array[i].missed_votes_pct;
    //     } else {
    //         sum += array[i].votes_with_party_pct;
    //     }
    //     avg = (sum / array.length).toFixed(2);
    // }
    return (sum / party.length||0).toFixed(2);
}


statistics.avgPVdemocrats = avaregePartyVotes(statistics.democrats)
statistics.avgPVrepublicans = avaregePartyVotes(statistics.republicans)
statistics.avgPVindependents = avaregePartyVotes(statistics.independents)

console.log("Array Democrats", statistics.democrats);
console.log("Array Republicans", statistics.republicans);
console.log("Array Independents", statistics.independents);
console.log("Promedio Democratas", statistics.avgPVdemocrats);
console.log("Promedio Republicanos", statistics.avgPVrepublicans);
console.log("Promedio Independientes", statistics.avgPVindependents);

// 

// tables
function createGlaceTable() {
    let tbody = document.querySelector("#at_glace tbody")
    console.log(tbody)
    if (document.getElementById("loyalty")) {
        tbody.innerHTML = '<tr><td>Democrats</td>'
            + '<td>' + statistics.democrats.length + '</td>'
            + '<td>' + avaregePartyVotes(statistics.democrats, "votes_with_party_pct") + '</td>'
            + '</tr>';
        tbody.innerHTML += '<tr><td>Republican</td>'
            + '<td>' + statistics.republicans.length + '</td>'
            + '<td>' + avaregePartyVotes(statistics.republicans, "votes_with_party_pct") + '</td>'
            + '</tr>';
        tbody.innerHTML += '<tr><td>Independents</td>'
            + '<td>' + statistics.independents.length + '</td>'
            + '<td>' + avaregePartyVotes(statistics.independents, "votes_with_party_pct") + '</td>'
            + '</tr>';
            tbody.innerHTML += '<tr><td>Total</td>'
            + '<td>' +members.length + '</td>'
            + '<td>' + avaregePartyVotes(members, "votes_with_party_pct") + '</td>'
            + '</tr>';
    } else if (document.getElementById("attendance")) {
        tbody.innerHTML = '<tr><td>Democrats</td>'
            + '<td>' + statistics.democrats.length + '</td>'
            + '<td>' + avaregePartyVotes(statistics.democrats, "missed_votes_pct") + '</td>'
            + '</tr>';
        tbody.innerHTML += '<tr><td>Republican</td>'
            + '<td>' + statistics.republicans.length + '</td>'
            + '<td>' + avaregePartyVotes(statistics.republicans, "missed_votes_pct") + '</td>'
            + '</tr>';
        tbody.innerHTML += '<tr><td>Independents</td>'
            + '<td>' + statistics.independents.length + '</td>'
            + '<td>' + avaregePartyVotes(statistics.independents, "missed_votes_pct") + '</td>'
            + '</tr>';
        tbody.innerHTML += '<tr><td>Total</td>'
            + '<td>' +members.length + '</td>'
            + '<td>' + avaregePartyVotes(members, "missed_votes_pct") + '</td>'
            + '</tr>';
    }
}

createGlaceTable()


