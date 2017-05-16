let app = new Vue({
	el: '#app',
	data: {
		buscar: '',
		ville: '',
		isMale: {
			type: Boolean
		},
		people: [
			{
				"dob": "",
				"gender": "",
				"name": {
					"first": "",
					"last": ""
				},
				"location": {
					"street": "",
					"city": "",
				},
				"email": "",
				"phone": "",
				"picture": {
					"large": "",
				}
			}
		]

	},

	created: function () { //fonction qui se grefe de la creation de l'instance
		let url = 'https://randomuser.me/api/?results=100&nat=fr';//requete en ajax
		this.$http.get(url).then(function (reponse) { // maniere dont vue peut faire une requete de type GET derriere une URL
			app.people = reponse.body.results; //corps de ma reponse
			console.log(app.people);
		})
	}, //closes created

	methods: {
		supprimer: function (item) {
			let position = this.people.indexOf(item);
			this.people.splice(position, 1);
		},
	},// end of Methods

	filters: {
		maj: function (elt) {
			return elt[0].toUpperCase() + elt.substring(1, elt.length);
		},

		age: function (elt) {
			yOb = elt.substring(0, 4);
			return 2017 - yOb;
		}

	},

	computed: {
		filtrado: function () {

			let gente = this.people;

			if (this.isMale == true) {
				gente = this.people.filter(function (elt) {
					return elt.gender === "male";
				});
			} else if (this.isMale == false) {
				gente = this.people.filter(function (elt) {
					return elt.gender === "female";
				});
			} else {
				gente = this.people;
			}


			if (this.buscar.length > 0) {
				let regex = new RegExp(app.buscar, "i");
				gente = this.people.filter(function (elt) {
					return regex.test(elt.name.first) == true || regex.test(elt.name.last) == true;
				});
			}

			if (this.ville.length > 0) {
				let regex = new RegExp(app.ville, "i");
				gente = this.people.filter(function (elt) {
					return regex.test(elt.location.city) == true;
				});
			}

			return gente;
		}
	} // closes computed
});