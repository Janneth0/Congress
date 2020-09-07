let members = data.results[0].members;

let statistics = {
    //Cantidad de Miembros por Party
    democrats: getPartyMembers("D"),
    republicans: getPartyMembers("R"),
    independents: getPartyMembers("ID"),
    //promedio ya sea de votes w/party o missed voted
    avgPVdemocrats: 0,
    avgPVrepublicans: 0,
    avgPVindependents: 0,

    missedVotesDemocrats:0,
    missedVotesRepublicans: 0,
    missedVotesIndependents: 0,
    //array least-most Loyal
    leastLoyal: [],
    mostLoyal: [],
    //array least-most Loyal
    leastMissed: [],
    mostMissed: []
}
function getPartyMembers(party) {
    return members.filter(member => member.party == party)
}
//Promedio
function avaregeVotes(party, key) {
    let sum = 0;
    party.forEach(function (partyMembers) {
        sum += partyMembers[key];
    });
    return (sum / party.length || 0).toFixed(2);
}

//Least Or Most Loyal
function leastOrMost(members, key, LorM) {
    let tenP = Math.round(members.length / 10);//P=11 A=45
    let mSort = [...members];
    mSort.sort((a, b) => { return a[key] - b[key] });
    if (LorM = "least") {
        let leastTenM = mSort[tenP][key];
        return statistics.leastLoyal = mSort.filter(
            member => member[key] <= leastTenM,
        );
        // console.log("leastloyal");
        // for (let i = 0; i < tenP; i++) {
        //     console.log(statistics.leastLoyal[i].votes_with_party_pct)
        // }
    } else {
        let mostTenM = mSort[mSort.length - tenP][key];
        statistics.mostLoyal = mSort.filter(member => member[key] >= mostTenM);
        return statistics.mostLoyal.reverse();
        // console.log("mostloyal");
        // for (let i = 0; i < tenP; i++) {
        //     console.log(statistics.mostLoyal[i].votes_with_party_pct)
        // }
    }
}
statistics.leastLoyal = leastOrMost(members, "votes_with_party_pct", "least")
statistics.mostLoyal = leastOrMost(members, "votes_with_party_pct", "most")
statistics.leastMissed = leastOrMost(members, "missed_votes_pct", "least")
statistics.mostMissed = leastOrMost(members, "missed_votes_pct", "most")
statistics.avgPVdemocrats = avaregeVotes(statistics.democrats,"votes_with_party_pct")
statistics.avgPVrepublicans = avaregeVotes(statistics.republicans,"votes_with_party_pct")
statistics.avgPVindependents = avaregeVotes(statistics.independents,"votes_with_party_pct")
statistics.missedVotesDemocrats = avaregeVotes(statistics.democrats, "missed_votes_pct");
statistics.missedVotesRepublicans = avaregeVotes(statistics.republicans, "missed_votes_pct");
statistics.missedVotesIndependents = avaregeVotes(statistics.independents, "missed_votes_pct");
console.log(statistics)

let loyalty = document.getElementById("loyalty")
function createGlaceTable() {
    let tbody = document.querySelector("#at_glace tbody")
    tbody.innerHTML =
        `<tr>
                    <td>Republicans</td>
                    <td>${statistics.republicans.length}</td>
                    <td>${loyalty ? avaregeVotes(statistics.republicans, "votes_with_party_pct") : avaregeVotes(statistics.republicans, "missed_votes_pct")} % </td>
                    </tr>`;
    tbody.innerHTML +=
        `<tr>
                    <td>Democrats</td>
                    <td>${statistics.democrats.length}</td>
                    <td>${loyalty ? avaregeVotes(statistics.democrats, "votes_with_party_pct") : avaregeVotes(statistics.democrats, "missed_votes_pct")} % </td>
                    </tr>`;
    tbody.innerHTML +=
        `<tr>
                    <td>Independents</td>
                    <td>${statistics.independents.length}</td>
                    <td>${loyalty ? avaregeVotes(statistics.independents, "votes_with_party_pct") : avaregeVotes(statistics.independents, "missed_votes_pct")} % </td>
                    </tr>`;
    tbody.innerHTML +=
        `<tr id="total">
                    <td>Total</td>
                    <td>${members.length}</td>
                    <td>${loyalty ? avaregeVotes(members, "votes_with_party_pct") : avaregeVotes(members, "missed_votes_pct")} % </td>
                    </tr>`;
}
createGlaceTable()
