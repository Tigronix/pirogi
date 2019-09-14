'use strict';

var qs = function qs(sel) {
	return document.querySelector(sel);
};
var qsa = function qsa(sel) {
	return document.querySelectorAll(sel);
};
var APP = {
	name: 'HTML Starter'
};

(function () {
	// specific
	var cardCalc = function cardCalc() {
		var cards = document.querySelectorAll('.js-card');
		var cardObj = {
			'cardArr': [],
			'calcPrice': function calcPrice(index) {
				var quantity = this.cardArr[index].quantity;
				var price = this.cardArr[index].price;

				var summ = quantity * price;

				return this.cardArr[index].summ = summ;
			},
			'quantityMinus': function quantityMinus(index) {
				var quantity = this.cardArr[index].quantity;
				quantity--;

				if (quantity <= 0) {
					quantity = 1;
				}

				return this.cardArr[index].quantity = quantity;
			},
			'quantityPlus': function quantityPlus(index) {
				var quantity = this.cardArr[index].quantity;
				quantity++;

				return this.cardArr[index].quantity = quantity;
			},
			'calcTotalQuantity': function calcTotalQuantity(index) {
				var totalQuantityArr = [];

				this.cardArr.forEach(function (elem) {
					totalQuantityArr.push(parseInt(elem.quantity));
				});

				var result = totalQuantityArr.reduce(function (sum, current) {
					return sum + current;
				}, 0);

				this.totalQuantity = result;
			}
		};

		cards.forEach(function (card, index) {
			var basketCounter = document.querySelector('.js-basket-counter');
			var counter = card.querySelector('.js-counter');
			var counterMinusBtn = counter.querySelector('.js-counter-prev');
			var counterPlusBtn = counter.querySelector('.js-counter-next');
			var counterNumber = counter.querySelector('.js-counter-number');
			var inputFirst = card.querySelector('.js-card-input');
			var inputs = card.querySelectorAll('.js-card-input');
			var price = card.querySelector('.js-card-price');

			var insertText = function insertText() {
				counterNumber.innerText = cardObj.cardArr[index].quantity;
				price.innerText = cardObj.cardArr[index].summ;
				basketCounter.innerText = cardObj.totalQuantity;
			};

			// data for obj
			var quantity = counterNumber.innerText;
			var defaultPrice = inputFirst.getAttribute('data-default-price');

			var itemObj = {
				quantity: quantity,
				price: defaultPrice
			};

			// data created
			cardObj.cardArr.push(itemObj);

			// listeners
			counterMinusBtn.addEventListener('click', function () {
				cardObj.quantityMinus(index);
				cardObj.calcPrice(index);
				cardObj.calcTotalQuantity();

				insertText();
			});

			counterPlusBtn.addEventListener('click', function () {
				cardObj.quantityPlus(index);
				cardObj.calcPrice(index);
				cardObj.calcTotalQuantity();

				insertText();
			});

			inputs.forEach(function (input) {
				input.addEventListener('change', function () {
					var defaultPrice = input.getAttribute('data-default-price');

					cardObj.cardArr[index].price = defaultPrice;
					cardObj.calcPrice(index);
					cardObj.calcTotalQuantity();

					insertText();
				});
			});
		});
	};

	var onPageRdy = function onPageRdy() {
		cardCalc();
	};

	onPageRdy();
})();
//# sourceMappingURL=main.js.map
