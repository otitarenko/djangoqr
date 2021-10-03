class AppViewModel {
	constructor() {
		var self = this;

		self.articles = ko.observableArray([]);
		self.filteredArticles = ko.observableArray([]);

		self.specifications = ko.observableArray([]);
		self.selectedSpecifications = ko.observableArray([]);

		self.stores = ko.observableArray([]);
		self.selectedStores = ko.observableArray([]);

		self.shop = ko.observable("");
		self.article = ko.observable("");
		self.nomenclature = ko.observable("");
		self.characteristic = ko.observable("");
		self.quantity = ko.observable(0);
		self.price = ko.observable(0);

		self.inOtherStores = ko.observableArray([]);
		self.currentStoreCharacteristics = ko.observableArray([]);
		self.otherStoreCharacteristics = ko.observableArray([]);

		self.getBarCodeData = function (data) {
			//$.get("/static/js/result.json", function (data) {

				var element = data[0].forEach(x => {

					if (!self.currentStoreCharacteristics().some((y => x.Характеристика == y.Характеристика &&
						x.Цена == y.Цена &&
						x.Остаток == y.Остаток))) {

						self.currentStoreCharacteristics.push({
							Характеристика: x.Характеристика,
							Цена: x.Цена,
							Остаток: x.Остаток,
						});

					}

				});

				var element = data[0][0];
				var inOtherStoreData = data[1];

				self.shop(element.Магазин);
				self.article(element.Артикул);
				self.nomenclature(element.Номенклатура);
				self.characteristic(element.Характеристика);
				self.quantity(element.Остаток);
				self.price(element.Цена);

				self.sortBy(inOtherStoreData, "Магазин");

				inOtherStoreData.forEach((x) => {

					if (!self.otherStoreCharacteristics().some((y) => x.Характеристика == y.name)) {

						var characteristic = {
							name: x.Характеристика,
							stores: inOtherStoreData.filter(y => x.Характеристика == y.Характеристика)
						};

						self.sortBy(characteristic.stores, "Магазин");

						self.otherStoreCharacteristics.push(characteristic);

					}
				});

				self.sortBy(self.otherStoreCharacteristics, "name");

			//});
		};

		self.clickSpecification = function () {

			if (self.selectedSpecifications().includes(this.name)) {
				var index = self.selectedSpecifications().indexOf(this.name);
				if (index !== -1) {
					self.selectedSpecifications.splice(index, 1);
				}
			} else {
				self.selectedSpecifications.push(this.name);
			}
			
			self.applyFilter();
		}

		self.clickStore = function () {

			if (self.selectedStores().includes(this.name)) {
				var index = self.selectedStores().indexOf(this.name);
				if (index !== -1) {
					self.selectedStores.splice(index, 1);
				}
			} else {
				self.selectedStores.push(this.name);
			}
			
			self.applyFilter();
		}

		self.applyFilter = function () {

			var selectedSpecifications = self.selectedSpecifications();
			var selectedStores = self.selectedStores();

			var filtered = self.articles().filter(x => (selectedSpecifications.length === 0 || selectedSpecifications.includes(x.Характеристика)) &&
														(selectedStores.length === 0 || selectedStores.includes(x.Магазин)));

			self.filteredArticles(filtered);
		}

		self.sortBy = function (array, key) {
			return array.sort(function(a, b) {
				var x = a[key]; var y = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		}

		self.start = function (data) {
			self.getBarCodeData(data);
		};
	}
}
