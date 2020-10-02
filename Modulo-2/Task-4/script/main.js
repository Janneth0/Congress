Vue.component("stast-table",{
    props:['members', 'asc', 'prop1', 'prop2'],
    
    methods:{
        leastOrMost: function () {
            let tenP = Math.round(this.members.length / 10);
            let arrayS = this.asc ? [...this.members].sort((a, b) => b[this.prop1] - a[this.prop1]):[...this.members].sort((a, b) => a[this.prop1] - b[this.prop1]);//P=11 A=45
            let result=arrayS[tenP][this.prop1];
            // let i = result.length;
            // while (i < arrayS.length && result[result.length - 1][this.prop1] == arrayS[i][this.prop1]) {
            //     console.log("Agregando repetidos que estaban fuera del Array");
            //     result.push(arrayS[i]);
            //     i++;
            // }
            return this.asc? arrayS.filter(member=>member[this.prop1]>[result]):arrayS.filter(member=>member[this.prop1]<[result]);
        }

    },
    template: `
                    <tbody>
                        <tr v-for="member in leastOrMost()"> 
                            <td><a v-bind:href="member.url"> 
                            {{member.first_name}} {{member.middle_name || ""}} {{member.last_name}}</a></td>
                            <td>{{member[prop2]}}</td>  
                            <td>{{member[prop1]}}%</td>
                        
                        </tr>
                    </tbody>
               `
})



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
        statistics: {
            //Cantidad de Miembros por Party
            democrats: [],
            republicans: [],
            independents: [],
            total: [],
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
        getPartyMembers: function (party) {
            return this.members.filter(member => member.party == party)
        },
        avaregeVotes: function (party, key) {
            let sum = 0;
            party.forEach(function (partyMembers) {
                sum += partyMembers[key];
            });
            return (sum / party.length || 0).toFixed(2);
        },
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
                this.statistics.democrats = this.getPartyMembers("D"),
                this.statistics.republicans = this.getPartyMembers("R"),
                    this.statistics.independents = this.getPartyMembers("ID")
                this.statistics.total = this.members
               
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

