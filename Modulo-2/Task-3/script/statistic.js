let statistics={
    democrats:[],
    republicans:[],
    independents:[],
    avgPVdemocrats:0,
    avgPVrepublicans:0,
    avgPVindependents:0
}
// Verificacion de house o Senate
let members=data.results[0].members;

// console.log(members);
// Array de Democrats,Republicans, Independents
for (let i = 0; i < members.length; i++) {
   if (members[i].party=="D") {
       statistics.democrats.push(members[i]) 
    } else if (members[i].party=="R") {
        statistics.republicans.push(members[i]) 
    }else{statistics.independents.push(members[i]) }
}
console.log(statistics.democrats);
console.log(statistics.republicans);
console.log(statistics.independents);

//Promedio
function avaregePartyVotes(array) {
    let sum=0;
    let avg=0;
    for (let i = 0; i < array.length; i++) {
       sum += array[i].votes_with_party_pct;
    }
    avg=sum/array.length;
   
    console.log(array.length)
    console.log(sum);
    console.log(avg);
}
avaregePartyVotes(members)
statistics.avgPVdemocrats=avaregePartyVotes(statistics.democrats)
statistics.avgPVrepublicans=avaregePartyVotes(statistics.republicans)
statistics.avgPVindependents=avaregePartyVotes(statistics.independents)

function createGlaceTable(){
    let tbody=document.querySelector("#at_glace tbody")
    console.log(tbody)
    if(document.getElementById("attendance")){
        tbody.innerHTML='<tr><td>Republican</td>'
        tbody.innerHTML+='<td>${statistics.republicans.length}</td>'
        tbody.innerHTML+='<td>${statistics.avgPVrepublicans}</td>'
        tbody.innerHTML+='</tr>'
        
        
    }
}

createGlaceTable()