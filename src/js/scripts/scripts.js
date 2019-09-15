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

				insertText();
			});

			counterPlusBtn.addEventListener('click', function () {
				cardObj.quantityPlus(index);
				cardObj.calcPrice(index);

				insertText();
			});

			inputs.forEach(function (input) {
				input.addEventListener('change', function () {
					const defaultPrice = input.getAttribute('data-default-price');

					cardObj.cardArr[index].price = defaultPrice;
					cardObj.calcPrice(index);

					insertText();
				});
			});
		});
	};

	const setCalc = function () {
		const cards = document.querySelectorAll('.js-set-card');

		const setObj = {
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
		};

		cards.forEach(function (card, index) {
			const basketCounter = document.querySelector('.js-basket-counter');
			const counter = card.querySelector('.js-counter');
			const counterMinusBtn = counter.querySelector('.js-counter-prev');
			const counterPlusBtn = counter.querySelector('.js-counter-next');
			const counterNumber = counter.querySelector('.js-counter-number');
			const price = card.querySelector('.js-set-card-price');

			const insertText = function () {
				counterNumber.innerText = setObj.cardArr[index].quantity;
				price.innerText = setObj.cardArr[index].summ;
			};

			// data for obj
			const quantity = counterNumber.innerText;
			const defaultPrice = price.getAttribute('data-default-price');

			const itemObj = {
				quantity: quantity,
				price: defaultPrice
			};

			// data created
			setObj.cardArr.push(itemObj);

			// listeners
			counterMinusBtn.addEventListener('click', function () {
				setObj.quantityMinus(index);
				setObj.calcPrice(index);

				insertText();
			});

			counterPlusBtn.addEventListener('click', function () {
				setObj.quantityPlus(index);
				setObj.calcPrice(index);

				insertText();
			});
		});
	};

	// sliders
	const popularSlider = function () {
		const $sliderContainers = $('.js-popular-slider-container');

		$sliderContainers.each(function () {
			const $sliderContainer = $(this);
			const $slider = $sliderContainer.find('.js-popular-slider');
			const options = {
				slidesToShow: 5,
				arrows: true,
				appendDots: '.js-popular-slider-dots',
				dots: true,
				infinite: false
			};

			$slider.slick(options);
		});
	};

	const setsSlider = function () {
		const $sliderContainers = $('.js-sets-slider-container');

		$sliderContainers.each(function () {
			const $sliderContainer = $(this);
			const $slider = $sliderContainer.find('.js-sets-slider');
			const options = {
				slidesToShow: 5,
				arrows: true,
				appendDots: '.js-sets-slider-dots',
				dots: true,
				infinite: false
			};

			$slider.slick(options);
		});
	};

	const clientsSlider = function () {
		const $slider = $('.js-clients-slider');
		const options = {
			slidesToShow: 7,
			arrows: true,
			infinite: false
		};

		$slider.slick(options);
	};


	// <****************PAGE READY****************>
	const onPageRdy = function () {
		// sliders
		popularSlider();
		setsSlider();
		clientsSlider();

		// utility

		// specific
		cardCalc();
		setCalc();
	};

	onPageRdy();
})();
