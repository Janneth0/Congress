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

    missedVotesDemocrats: 0,
    missedVotesRepublicans: 0,
    missedVotesIndependents: 0,

    
    //array least-most Loyal
    leastLoyal: leastOrMost(members, "votes_with_party_pct", "least"),
    mostLoyal: leastOrMost(members, "votes_with_party_pct", "most"),
    // //array least-most Loyal
    leastMissed: leastOrMost(members, "missed_votes_pct", "least"),
    mostMissed:leastOrMost(members, "missed_votes_pct", "most")
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
//least or most
function leastOrMost(members, key, LorM) {
    let tenP = Math.round(members.length*10 / 100);
    let arrayS= LorM=="most" ? [...members].sort((a,b) => a[key] - b[key]) : [...members].sort((a,b) => b[key] - a[key]);//P=11 A=45
    let result = arrayS.slice(0,tenP);
    let i = result.length;
    while(i < arrayS.length && result[result.length - 1][key]== arrayS[i][key] ){
        console.log("ingreso a WIhle")
      result.push(arrayS[i]);
      i++;
      console.log("array",arrayS[i][key])
        }
    return result;
      }

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


function tableleastOrMost(ide) {
    let table = document.getElementById(ide)
    let tbody = document.createElement("tbody");
    let key = loyalty ? ide+"Loyal" : ide + "Missed" ;
    console.log(key)
    // console.log(statistics)
    let array=statistics[key]
    // console.log(statistics[key])
    // console.log(key)
    array.forEach(array => {
        tbody.innerHTML += `<tr>
        <td><a class='iframe_colorbox' target='_blank' href=${array.url}>${array.first_name + ' ' + (array.middle_name || ' ') + '' + array.last_name}</a></td>
        <td>${key? array.total_votes : array.missed_votes}</td>
        <td>${key? array.votes_with_party_pct : array.missed_votes_pct} % </td>
        </tr>
        `
      })
  
    table.appendChild(tbody);
}
tableleastOrMost("most")
tableleastOrMost("least")



statistics.avgPVdemocrats = avaregeVotes(statistics.democrats, "votes_with_party_pct")
statistics.avgPVrepublicans = avaregeVotes(statistics.republicans, "votes_with_party_pct")
statistics.avgPVindependents = avaregeVotes(statistics.independents, "votes_with_party_pct")
statistics.missedVotesDemocrats = avaregeVotes(statistics.democrats, "missed_votes_pct");
statistics.missedVotesRepublicans = avaregeVotes(statistics.republicans, "missed_votes_pct");
statistics.missedVotesIndependents = avaregeVotes(statistics.independents, "missed_votes_pct");

