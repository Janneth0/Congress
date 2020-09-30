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
            //array least-most Loyalty
            leastLoyal: [],
            mostLoyal: [],
            // //array least-most Attendance
            leastMissed: [],
            mostMissed: []
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
        leastOrMost: function (members, key, LorM) {
            let tenP = Math.round(members.length * 10 / 100);
            let arrayS = LorM == "most" ? [...members].sort((a, b) => a[key] - b[key]) : [...members].sort((a, b) => b[key] - a[key]);//P=11 A=45
            let result = arrayS.slice(0, tenP);
            let i = result.length;
            while (i < arrayS.length && result[result.length - 1][key] == arrayS[i][key]) {
                console.log("Agregando repetidos que estaban fuera del Array");
                result.push(arrayS[i]);
                i++;
            }
            return result;
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
                this.statistics.democrats = this.getPartyMembers("D"),
                this.statistics.republicans = this.getPartyMembers("R"),
                    this.statistics.independents = this.getPartyMembers("ID")
                this.statistics.total = this.members
                //array least-most Loyalty
                this.statistics.leastLoyal = this.leastOrMost(this.members, "votes_with_party_pct", "least"),
                    this.statistics.mostLoyal = this.leastOrMost(this.members, "votes_with_party_pct", "most"),
                    // //array least-most Attendance
                    this.statistics.leastMissed = this.leastOrMost(this.members, "missed_votes_pct", "least"),
                    this.statistics.mostMissed = this.leastOrMost(this.members, "missed_votes_pct", "most")
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

