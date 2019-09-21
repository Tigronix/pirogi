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
	var PG = {};

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

				insertText();
			});

			counterPlusBtn.addEventListener('click', function () {
				cardObj.quantityPlus(index);
				cardObj.calcPrice(index);

				insertText();
			});

			inputs.forEach(function (input) {
				input.addEventListener('change', function () {
					var defaultPrice = input.getAttribute('data-default-price');

					cardObj.cardArr[index].price = defaultPrice;
					cardObj.calcPrice(index);

					insertText();
				});
			});
		});
	};

	var setCalc = function setCalc() {
		var cards = document.querySelectorAll('.js-set-card');

		var setObj = {
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
			}
		};

		cards.forEach(function (card, index) {
			var basketCounter = document.querySelector('.js-basket-counter');
			var counter = card.querySelector('.js-counter');
			var counterMinusBtn = counter.querySelector('.js-counter-prev');
			var counterPlusBtn = counter.querySelector('.js-counter-next');
			var counterNumber = counter.querySelector('.js-counter-number');
			var price = card.querySelector('.js-set-card-price');

			var insertText = function insertText() {
				counterNumber.innerText = setObj.cardArr[index].quantity;
				price.innerText = setObj.cardArr[index].summ;
			};

			// data for obj
			var quantity = counterNumber.innerText;
			var defaultPrice = price.getAttribute('data-default-price');

			var itemObj = {
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

	var rangeSlider = function rangeSlider() {
		var rangeSliders = document.querySelectorAll('.js-range-slider');
		var openSpiceBtns = document.querySelectorAll('.js-open-spices');

		PG.rangeSliderObj = {
			valuesArr: [],
			getValuesLength: function getValuesLength(index) {
				return this.valuesArr[index].length - 1;
			},
			filterValuesActive: function filterValuesActive(index) {
				var result = this.valuesArr[index].findIndex(function (item, index, array) {
					var isActive = item.classList.contains('active');

					if (isActive) {
						return index;
					}
				});

				return result;
			}
		};

		openSpiceBtns.forEach(function (openSpiceBtn) {
			openSpiceBtn.addEventListener('click', function () {
				var card = this.closest('.js-card');
				var spices = card.querySelector('.spices');
				var sliderContainers = spices.querySelectorAll('.spices__range-slider-container');

				spices.classList.add('active');

				sliderContainers.forEach(function (sliderContainer) {
					setTimeout(function () {
						sliderContainer.classList.add('active');
					}, 300);
				});
			});
		});

		rangeSliders.forEach(function (rangeSlider, index) {
			var spicesSection = rangeSlider.closest('.js-spices');
			var rangeSlidersStr = 'js-range-slider' + index;
			var item = rangeSlider.closest('.js-spices-li');
			var valuesCollection = item.querySelectorAll('.js-spices-values');
			var valuesRealArray = Array.from(valuesCollection);
			var btnMinus = item.querySelector('.js-spices-btn-minus');
			var btnPlus = item.querySelector('.js-spices-btn-plus');
			var btnClose = spicesSection.querySelector('.js-spices-close');

			var updateValues = function updateValues(activeIndex) {
				valuesCollection.forEach(function (value, index) {
					var isIndexMatch = index === activeIndex;

					if (isIndexMatch) {
						value.classList.add('active');
					} else {
						value.classList.remove('active');
					}
				});
			};

			PG.rangeSliderObj.valuesArr.push(valuesRealArray);

			rangeSlider.id = rangeSlidersStr;
			rangeSlider.name = rangeSlidersStr;

			$('#' + rangeSlidersStr).ionRangeSlider({
				type: "double",
				min: 0,
				max: PG.rangeSliderObj.getValuesLength(index),
				from: PG.rangeSliderObj.filterValuesActive(index),
				onChange: function onChange(data) {
					var activeIndex = data.from;

					updateValues(activeIndex);
				}
			});

			var instance = $('#' + rangeSlidersStr).data("ionRangeSlider");

			btnMinus.addEventListener('click', function () {
				var activeIndex = instance.result.from - 1;

				if (activeIndex < 0) {
					activeIndex = 0;
				}

				var from = activeIndex;

				instance.update({
					from: from
				});

				updateValues(activeIndex);
			});

			btnPlus.addEventListener('click', function () {
				var activeIndex = instance.result.from + 1;
				var max = instance.result.max;

				if (activeIndex > max) {
					activeIndex = max;
				}

				var from = activeIndex;

				instance.update({
					from: from
				});

				updateValues(activeIndex);
			});

			btnClose.addEventListener('click', function () {
				var card = btnClose.closest('.js-card');
				var spices = card.querySelector('.spices');
				var sliderContainers = spices.querySelectorAll('.spices__range-slider-container');

				spicesSection.classList.remove('active');

				sliderContainers.forEach(function (sliderContainer) {
					// sliderContainer.classList.remove('active');
				});
			});
		});
	};

	var insideNumbers = function insideNumbers() {
		var inputs = document.querySelectorAll('.js-inside-input');

		inputs.forEach(function (input) {
			input.addEventListener('click', function () {
				var section = input.closest('.js-inside');
				var dataNumber = input.getAttribute('data-inside-number');
				var nodeNumber = section.querySelector('.js-inside-number');
				var isChecked = input.checked;

				if (isChecked) {
					nodeNumber.innerText = dataNumber;
				}
			});
		});
	};

	// utility
	var map = function map() {
		var maps = document.querySelectorAll('.js-map');

		maps.forEach(function (map, index) {
			var id = 'map' + index;
			var mapSection = map.closest('.js-map-section');
			var fieldRoute = mapSection.querySelector('.js-field-route');
			var timeTravelNode = mapSection.querySelector('.js-field-route-time-travel');

			map.id = id;

			ymaps.ready(function () {
				var myMap = new ymaps.Map(id, {
					center: [55.753994, 37.622093],
					zoom: 9,
					controls: ['routePanelControl']
				});

				// Получение ссылки на панель маршрутизации.
				var control = myMap.controls.get('routePanelControl');

				var getRouteInfo = function getRouteInfo(from, to) {
					// Задание состояния для панели маршрутизации.
					control.routePanel.state.set({
						// Адрес начальной точки.
						from: from,
						// Адрес конечной точки.
						to: to
					});

					// Получение мультимаршрута.
					var multiRoutePromise = control.routePanel.getRouteAsync();

					multiRoutePromise.then(function (multiRoute) {
						// Подписка на событие обновления мультимаршрута.
						multiRoute.model.events.add('requestsuccess', function () {
							// Получение ссылки на активный маршрут.
							var activeRoute = multiRoute.getActiveRoute();
							// Когда панель добавляется на карту, она
							// создает маршрут с изначально пустой геометрией.
							// Только когда пользователь выберет начальную и конечную точки,
							// маршрут будет перестроен с непустой геометрией.
							// Поэтому для избежания ошибки нужно добавить проверку,
							// что маршрут не пустой.
							if (activeRoute) {
								// Вывод информации об активном маршруте.
								// console.log("Длина: " + activeRoute.properties.get("distance").text);
								// console.log("Время прохождения: " + activeRoute.properties.get("duration").text);

								var timeTravel = activeRoute.properties.get("duration").text;
								timeTravelNode.innerText = timeTravel;
							}
						});
					}, function (err) {
						console.log(err);
					});
				};

				fieldRoute.addEventListener('keyup', function () {
					var from = this.getAttribute('data-source');
					var to = this.value;

					getRouteInfo(from, to);
				});
			});
		});
	};

	// sliders
	var popularSlider = function popularSlider() {
		var $sliderContainers = $('.js-popular-slider-container');

		$sliderContainers.each(function () {
			var $sliderContainer = $(this);
			var $slider = $sliderContainer.find('.js-popular-slider');
			var options = {
				slidesToShow: 5,
				arrows: true,
				appendDots: '.js-popular-slider-dots',
				dots: true,
				infinite: false
			};

			$slider.slick(options);
		});
	};

	var setsSlider = function setsSlider() {
		var $sliderContainers = $('.js-sets-slider-container');

		$sliderContainers.each(function () {
			var $sliderContainer = $(this);
			var $slider = $sliderContainer.find('.js-sets-slider');
			var options = {
				slidesToShow: 5,
				arrows: true,
				appendDots: '.js-sets-slider-dots',
				dots: true,
				infinite: false
			};

			$slider.slick(options);
		});
	};

	var clientsSlider = function clientsSlider() {
		var $slider = $('.js-clients-slider');
		var options = {
			slidesToShow: 7,
			arrows: true,
			infinite: false
		};

		$slider.slick(options);
	};

	// <****************PAGE READY****************>
	var onPageRdy = function onPageRdy() {
		// sliders
		popularSlider();
		setsSlider();
		clientsSlider();

		// utility
		map();
		rangeSlider();

		// specific
		cardCalc();
		setCalc();
		insideNumbers();
	};

	onPageRdy();
})();
//# sourceMappingURL=main.js.map
