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

// var ten = members.length * 10 / 100;

// function Least_Loyal(arrayA) {
//     for (var i = 0; i < arrayA.length; i++) {
//         arrayA.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct));
//         if (statistics.leastLoyal.length < ten) {
//              statistics.leastLoyal.push(arrayA[i]); 
//         }
//         for (let i = 0; i < ten; i++) {
//             console.log(statistics.leastLoyal[i].missed_votes_pct)
             
//          }
//     }
// }
// Least_Loyal(members)

// console.log(statistics.leastLoyal)
// console.log(Least_Loyal(members))
//Least Or Most Loyal
let tenP = Math.round(members.length*10 / 100);//P=11 A=45
function leastOrMost(members, key, LorM) {
    members.slice()
   members.sort((a, b) => { return a[key] - b[key] });
    if (LorM = "least") {
        let leastTenM = members[tenP][key];
         statistics.leastLoyal = members.filter(
            member => member[key] <= leastTenM);
        // console.log("leastloyal");
        // console.log(statistics.leastLoyal)
        // for (let i = 0; i <= tenP; i++) {
        //     console.log(statistics.leastLoyal[i][key])
        // }
    } 
    if (LorM = "most"){
        let mostTenM = members[members.length - tenP][key];
        statistics.mostLoyal =  members.filter(member => member[key] >= mostTenM);
     
         statistics.mostLoyal.reverse();
        // console.log("mostloyal");
        // console.log(statistics.mostLoyal)
        // for (let i = 0; i < tenP; i++) {
        //     console.log(statistics.mostLoyal[i][key])
        // }
    }
}
//party loyalty
// statistics.leastLoyal = leastOrMost(members, "votes_with_party_pct", "least")
// statistics.mostLoyal = leastOrMost(members, "votes_with_party_pct", "most")
//attendance
statistics.leastMissed = leastOrMost(members, "missed_votes_pct", "least")
// statistics.mostMissed = leastOrMost(members, "missed_votes_pct", "most")
console.log(statistics.leastMissed)


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

// function tablel(array,morv,key){
//     for (let i = 0; i < array.length; i++) {
//         console.log(array[i].first_name, array[i][key],array[i][morv])
        
//     }
// }
// tablel(statistics.leastMissed,"votes_with_party_pct","total_votes")



// function tableleastOrMost(array,ide,key) {
//     let isLeast = document.getElementById(ide)
//     let tbody = document.querySelector(`${isLeast ? "#Least" : "#Most"} >tbody`)
//     for (let i = 0; i < array.length; i++) {
//         // console.log(array[i].first_name, array[i][key],array[i].votes_with_party_pct)
//         tbody.innerHTML +=
//             `<tr>
            
//                 <td><a class='iframe_colorbox' target='_blank' href=${array[i].url}>${array[i].first_name + ' ' + (array[i].middle_name || ' ') + '' + array[i].last_name}</a></td>
//                 <td>${isLeast? array[i][key]: array[i][key]}</td>
//                 <td>${loyalty ? array[i].votes_with_party_pct : array[i].missed_votes_pct} % </td>
//             </tr>`;
        
//         console.log()
//         // console.log("lloya",statistics.leastLoyal[i].first_name)
        
//     }
// }

// tableleastOrMost(statistics.leastLoyal,"#Least","total_votes")
// tableleastOrMost(statistics.mostLoyal,"#Most","missed_votes")

// tableleastOrMost(statistics.leastMissed,"#Least")
// tableleastOrMost(statistics.mostMissed,"#Most")
statistics.avgPVdemocrats = avaregeVotes(statistics.democrats, "votes_with_party_pct")
statistics.avgPVrepublicans = avaregeVotes(statistics.republicans, "votes_with_party_pct")
statistics.avgPVindependents = avaregeVotes(statistics.independents, "votes_with_party_pct")
statistics.missedVotesDemocrats = avaregeVotes(statistics.democrats, "missed_votes_pct");
statistics.missedVotesRepublicans = avaregeVotes(statistics.republicans, "missed_votes_pct");
statistics.missedVotesIndependents = avaregeVotes(statistics.independents, "missed_votes_pct");





// function Most_Loyal(arrayA) {
//     let ultimo = arrayA.length - 1;
//     for (var i = 0; i < arrayA.length; i++) {
//         arrayA.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct));
//         if (statistics.mostLoyal.length < ten) {
//             statistics.mostLoyal.push(arrayA[ultimo]);
//             ultimo--;
//         }
//     }
// }

// function Most_Missed(arrayA) {
//     for (var i = 0; i < arrayA.length; i++) {
//         arrayA.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct));
//         //console.log(arrayA[i].missed_votes_pct);
//         if (statistics.mostMissed.length < ten) {
//             statistics.mostMissed.push(arrayA[i]);
//         }

//     }
// }
// function Least_Missed(arrayA) {
//     let ultimo = arrayA.length - 1;
//     for (var i = 0; i < arrayA.length; i++) {
//         arrayA.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct));
//         if (statistics.leastMissed.length < ten) {
//             statistics.leastMissed.push(arrayA[ultimo]);
//             ultimo--;
//         }
//     }
// }


// var ten = members.length * 10 / 100;

// function Least_Loyal(arrayA) {
//     for (var i = 0; i < arrayA.length; i++) {
//         arrayA.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct));
//         if (statistics.leastLoyal.length < ten) {
//              statistics.leastLoyal.push(arrayA[i]); 
//         }
//         for (let i = 0; i < ten; i++) {
//             console.log(statistics.leastLoyal[i].missed_votes_pct)
             
//          }
//     }
// }
// Least_Loyal(members)

// console.log(statistics.leastLoyal)
// console.log(Least_Loyal(members))
//Least Or Most Loyal