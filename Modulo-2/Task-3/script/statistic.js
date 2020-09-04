
let members = data.results[0].members;

let statistics = {
    democrats: getPartyMembers("D"),
    republicans: getPartyMembers("R"),
    independents: getPartyMembers("ID"),
    avgPVdemocrats: 0,
    avgPVrepublicans: 0,
    avgPVindependents: 0,
    leastLoyal: [],
    mostLoyal:[]

}

//arrays de party
function getPartyMembers(party) {
    return members.filter(member => member.party == party)
}

//Promedio
function avaregePartyVotes(party, key) {
    let sum = 0;
    party.forEach(function (partyMembers) {
        sum += partyMembers[key];
    });
    return (sum / party.length || 0).toFixed(2);
}

//Least Or Most Loyal
function leastOrMost(members) {
    let tenP = Math.round(members.length / 10);//P=11 A=45

    let mSort = [...members];
    mSort.sort((a, b) => {return  a.votes_with_party_pct - b.votes_with_party_pct});

    let leastTenM = mSort[tenP].votes_with_party_pct;
    let mostTenM = mSort[mSort.length-tenP].votes_with_party_pct;

    statistics.leastLoyal = mSort.filter(member => member.votes_with_party_pct <= leastTenM);
    statistics.mostLoyal = mSort.filter(member => member.votes_with_party_pct >= mostTenM);
    statistics.mostLoyal.reverse();
}
leastOrMost(members)

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
            + '<td>' + members.length + '</td>'
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
            + '<td>' + members.length + '</td>'
            + '<td>' + avaregePartyVotes(members, "missed_votes_pct") + '</td>'
            + '</tr>';
    }
}

createGlaceTable()


