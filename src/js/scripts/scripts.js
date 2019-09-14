(function () {
	// specific
	const cardCalc = function () {
		const cards = document.querySelectorAll('.js-card');
		const cardObj = {
			'cardArr': [],
			'calcPrice': function (index) {
				const quantity = this.cardArr[index].quantity;
				const price = this.cardArr[index].price;

				const summ = quantity * price;

				return this.cardArr[index].summ = summ;
			},
			'quantityMinus': function (index) {
				let quantity = this.cardArr[index].quantity;
				quantity--;

				if(quantity <= 0) {
					quantity = 1;
				}

				return this.cardArr[index].quantity = quantity;
			},
			'quantityPlus': function (index) {
				let quantity = this.cardArr[index].quantity;
				quantity++;

				return this.cardArr[index].quantity = quantity;
			},
			'calcTotalQuantity': function (index) {
				const totalQuantityArr = [];

				this.cardArr.forEach(function (elem) {
					totalQuantityArr.push(parseInt(elem.quantity));
				});

				const result = totalQuantityArr.reduce(function (sum, current) {
					return sum + current;
				}, 0);

				this.totalQuantity = result;
			},
		};

		cards.forEach(function (card, index) {
			const basketCounter = document.querySelector('.js-basket-counter');
			const counter = card.querySelector('.js-counter');
			const counterMinusBtn = counter.querySelector('.js-counter-prev');
			const counterPlusBtn = counter.querySelector('.js-counter-next');
			const counterNumber = counter.querySelector('.js-counter-number');
			const inputFirst = card.querySelector('.js-card-input');
			const inputs = card.querySelectorAll('.js-card-input');
			const price = card.querySelector('.js-card-price');

			const insertText = function () {
				counterNumber.innerText = cardObj.cardArr[index].quantity;
				price.innerText = cardObj.cardArr[index].summ;
				basketCounter.innerText = cardObj.totalQuantity;
			};

			// data for obj
			const quantity = counterNumber.innerText;
			const defaultPrice = inputFirst.getAttribute('data-default-price');

			const itemObj = {
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
					const defaultPrice = input.getAttribute('data-default-price');

					cardObj.cardArr[index].price = defaultPrice;
					cardObj.calcPrice(index);
					cardObj.calcTotalQuantity();

					insertText();
				});
			});
		});
	};

	const onPageRdy = function () {
		cardCalc();
	};

	onPageRdy();
})();
