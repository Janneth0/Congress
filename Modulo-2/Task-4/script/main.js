let app = new Vue({
    el: "#app",
    data: {
        init: {
            method: 'GET',
            headers: {
                'X-API-Key': '6O9DGlnFI336AAC5hCDNIiYAbKnQLeS51hJOHaa4'
            }
        },
        members: [],
        checkedParty: ["D", "R", "ID"],
        states: [],
        allselectedState: "All",
        statistics:{
            //Cantidad de Miembros por Party
            democrats:[],
            republicans: [],
            independents: [],
            total:[]
        }

    },
    methods: {
        //verificar que la api sea correcta tanto para senate como para house
        getApi: function () {
            if (document.getElementById("senate")) {
                return "https://api.propublica.org/congress/v1/113/senate/members.json"
            } else if (document.getElementById("house")) {
                return "https://api.propublica.org/congress/v1/113/house/members.json"
            }
        },
        //recorer memebers y obtener States
        getstates() {
            for (let i = 0; i < this.members.length; i++) {
                if (!this.states.includes(this.members[i].state)) {
                    this.states.push(this.members[i].state)
                }
            }
            this.states.sort();
        },
        getPartyMembers:function (party) {
            return this.members.filter(member => member.party == party)
        },
        avaregeVotes:function(party, key) {
            let sum = 0;
            party.forEach(function (partyMembers) {
                sum += partyMembers[key];
            });
            return (sum / party.length || 0).toFixed(2);
        }
    },
    created: function () {
        fetch(this.getApi(), this.init)
            .then(function (res) {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error(res.status)
                }
            })
            .then(json => {
                this.members = json.results[0].members;
                this.getstates();
                this.statistics.democrats=this.getPartyMembers("D"),
                this.statistics.republicans=this.getPartyMembers("R"),
                this.statistics.independents=this.getPartyMembers("ID")
                this.statistics.total=this.members
            })
            .catch(function (error) {
                console.log("error al traer info. ERROR:" + error)
            })
    },
    //filtra members segun states y party
    computed: {
        memberFiltered: function () {
            return this.members.filter(member => this.checkedParty.includes(member.party) && (member.state == this.allselectedState || this.allselectedState == "All"));
        }
    }

})

//Comandos para verificar que se haya guardados members dentro de la variable
// app.members    > todos los miembros
// app.memberFiltered    --> solo miembros filtrados
// app.states  --> muestra yodos los estados sin repetirse







// ENTREGARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
// let app = new Vue({
//     el: "#app",
//     data: {
//         init: {
//             method: 'GET',
//             headers: {
//                 'X-API-Key': '6O9DGlnFI336AAC5hCDNIiYAbKnQLeS51hJOHaa4'
//             }
//         },
//         members: [],
//         checkedParty: ["D", "R", "ID"],
//         states: [],
//         allselectedState: "All"

//     },
//     methods: {
//         getApi: function () {
//             if (document.getElementById("senate")) {
//                 return "https://api.propublica.org/congress/v1/113/senate/members.json"
//             } else if (document.getElementById("house")) {
//                 return "https://api.propublica.org/congress/v1/113/house/members.json"
//             }
//         },
//         getstates() {
//             for (let i = 0; i < this.members.length; i++) {
//                 if (!this.states.includes(this.members[i].state)) {
//                     this.states.push(this.members[i].state)
//                 }
//             }
//             this.states.sort();
//         }
//     },
//     created: function () {
//         fetch(this.getApi(), this.init)
//             .then(function (res) {
//                 if (res.ok) {
//                     return res.json()
//                     // json = res.json()
//                 } else {
//                     throw new Error(res.status)
//                     // alert(promise.status)
//                     // return 0;
//                 }
//             })
//             .then(json => { 
//                 this.members = json.results[0].members; 
//                 this.getstates()
//             })
//             .catch(function(error){
//                 console.log("error al traer info. ERROR:" + error)
//             })
//     },
//     computed: {
//         memberFiltered: function () {
//             return this.members.filter(member => this.checkedParty.includes(member.party) && (member.state==this.allselectedState||this.allselectedState=="All"));
//         }
//     }

// })
