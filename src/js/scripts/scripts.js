(function () {
	const PG = {};

	// specific
	const selectRelocation = () => {
		const selects = document.querySelectorAll('.js-metro-input');


		selects.forEach((select) => {
			select.addEventListener('change', () => {
				const href = ;
			});
		});
	};

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

	const rangeSlider = function () {
		const rangeSliders = document.querySelectorAll('.js-range-slider');
		const openSpiceBtns = document.querySelectorAll('.js-open-spices');

		PG.rangeSliderObj = {
			valuesArr: [],
			getValuesLength: function (index) {
				return this.valuesArr[index].length - 1;
			},
			filterValuesActive: function (index) {
				let result = this.valuesArr[index].findIndex(function (item, index, array) {
					const isActive = item.classList.contains('active');

					if(isActive) {
						return index
					}
				});

				return result
			}
		};

		openSpiceBtns.forEach((openSpiceBtn) => {
			openSpiceBtn.addEventListener('click', function () {
				const card = this.closest('.js-card');
				const spices = card.querySelector('.spices');
				const sliderContainers = spices.querySelectorAll('.spices__range-slider-container');

				spices.classList.add('active');

				sliderContainers.forEach((sliderContainer) => {
					setTimeout(() => {
						sliderContainer.classList.add('active');
					}, 300);
				});
			});
		});


		rangeSliders.forEach(function (rangeSlider, index) {
			const spicesSection = rangeSlider.closest('.js-spices');
			const rangeSlidersStr = `js-range-slider${index}`;
			const item = rangeSlider.closest('.js-spices-li');
			const valuesCollection = item.querySelectorAll('.js-spices-values');
			const valuesRealArray = Array.from(valuesCollection);
			const btnMinus = item.querySelector('.js-spices-btn-minus');
			const btnPlus = item.querySelector('.js-spices-btn-plus');
			const btnClose = spicesSection.querySelector('.js-spices-close');

			const updateValues = function (activeIndex) {
				valuesCollection.forEach(function (value, index) {
					const isIndexMatch = index === activeIndex;

					if(isIndexMatch) {
						value.classList.add('active');
					} else {
						value.classList.remove('active');
					}
				});
			};

			PG.rangeSliderObj.valuesArr.push(valuesRealArray);

			rangeSlider.id = rangeSlidersStr;
			rangeSlider.name = rangeSlidersStr;

			$(`#${rangeSlidersStr}`).ionRangeSlider({
				type: "double",
				min: 0,
				max: PG.rangeSliderObj.getValuesLength(index),
				from: PG.rangeSliderObj.filterValuesActive(index),
				onChange: function (data) {
					const activeIndex = data.from;

					updateValues(activeIndex);
				}
			});

			const instance = $(`#${rangeSlidersStr}`).data("ionRangeSlider");

			btnMinus.addEventListener('click', function () {
				let activeIndex = instance.result.from - 1;

				if(activeIndex < 0) {
					activeIndex = 0;
				}

				const from = activeIndex;

				instance.update({
					from: from,
				});

				updateValues(activeIndex);
			});

			btnPlus.addEventListener('click', function () {
				let activeIndex = instance.result.from + 1;
				const max = instance.result.max;

				if(activeIndex > max) {
					activeIndex = max;
				}

				const from = activeIndex;

				instance.update({
					from: from,
				});

				updateValues(activeIndex);
			});

			btnClose.addEventListener('click', () => {
				const card = btnClose.closest('.js-card');
				const spices = card.querySelector('.spices');
				const sliderContainers = spices.querySelectorAll('.spices__range-slider-container');

				spicesSection.classList.remove('active');

				sliderContainers.forEach((sliderContainer) => {
					// sliderContainer.classList.remove('active');
				});
			});
		});
	};

	const insideNumbers = function () {
		const inputs = document.querySelectorAll('.js-inside-input');
		const btn = document.querySelector('.js-inside-btn');

		inputs.forEach(function (input) {
			input.addEventListener('click', () => {
				const section = input.closest('.js-inside');
				const dataNumber = input.getAttribute('data-inside-number');
				const dataHref = input.getAttribute('data-inside-link');
				const nodeNumber = section.querySelector('.js-inside-number');
				const isChecked = input.checked;

				if(isChecked) {
					nodeNumber.innerText = dataNumber;
					btn.href = dataHref;
				}

			});
		});
	};

	const metroRelocation = () => {
		const metro = document.querySelectorAll('.js-metro');

		metro.forEach((metro) => {
			const select = metro.querySelector('.js-metro-select');
			const options = select.querySelectorAll('.js-metro-option');
			const btn = metro.querySelector('.js-metro-btn');
			let value = '';

			select.addEventListener('change', () => {
				value = select.options[select.selectedIndex].value;
			});

			btn.addEventListener('click', () => {
				window.location.href = value;
			});
		});
	};

	const hamburger = () => {
		const btn = document.querySelector('.js-hamburger-btn');
		const menu = document.querySelector('.js-hamburger-menu');

		btn.addEventListener('click', () => {
			const isActive = menu.classList.contains('active');

			if(isActive){
				menu.classList.remove('active');
				btn.classList.remove('active');
			}else{
				menu.classList.add('active');
				btn.classList.add('active');
			}
		});
	};

	const headerScroll = () => {
		const header = $('.page-header');
		const menu = $('.menu');

		$(window).on('scroll', (e) => {
			const scrollTop = $(window).scrollTop();
			const isScrolled = scrollTop >= 50;

			if(isScrolled){
				header.addClass('scrolled');
				menu.addClass('scrolled');
			}else{
				header.removeClass('scrolled');
				menu.removeClass('scrolled');
			}
		});


	};

	// utility
	const map = function () {
		const maps = document.querySelectorAll('.js-map');

		maps.forEach(function (map, index) {
			const id = `map${index}`;
			const mapSection = map.closest('.js-map-section');
			const fieldRoute = mapSection.querySelector('.js-field-route');
			const timeTravelNode = mapSection.querySelector('.js-field-route-time-travel');

			map.id = id;

			ymaps.ready(function () {
				var myMap = new ymaps.Map(id, {
					center: [55.753994, 37.622093],
					zoom: 9,
					controls: ['routePanelControl']
				});

				// Получение ссылки на панель маршрутизации.
				var control = myMap.controls.get('routePanelControl');

				const getRouteInfo = function (from, to) {
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
							if(activeRoute) {
								// Вывод информации об активном маршруте.
								// console.log("Длина: " + activeRoute.properties.get("distance").text);
								// console.log("Время прохождения: " + activeRoute.properties.get("duration").text);

								const timeTravel = activeRoute.properties.get("duration").text;
								timeTravelNode.innerText = timeTravel;

							}
						});
					}, function (err) {
						console.log(err);
					});
				};



				fieldRoute.addEventListener('keyup', function () {
					const from = this.getAttribute('data-source');
					const to = this.value;

					getRouteInfo(from, to);
				});
			});
		});
	};

	const lazyLoad = () => {
		lazyload();
	};

	const tabs = function tabs() {
		$(document).on('click', '[data-tabclass]', function onClick() {
			const $this = $(this);
			const content = $this.data('tabclass');
			const number = $this.data('tabnumber');

			$('[data-tabclass="' + content + '"]').each(function each() {
				const $element = $(this);

				if($element.data('tabnumber') === number) {
					$element.addClass('active').siblings().removeClass('active');
				}
			});

			$('.' + content + ' > [data-tabnumber="' + number + '"]').addClass('active').siblings().removeClass('active');
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
				infinite: false,
				responsive: [{
					breakpoint: 1280,
					settings: {
						slidesToShow: 1
					}
				}]
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
			infinite: false,
			responsive: [{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3
				}
			}]
		};

		$slider.slick(options);
	};

	const productSlider = function () {
		const $slider = $('.js-product-slider');
		const sliders = document.querySelectorAll('.js-product-slider');
		const options = {
			slidesToShow: 5,
			arrows: true,
			infinite: false,
			vertical: true,
			swipe: false,
			appendArrows: '.js-product-arrows',
			prevArrow: '<button class="product__small-btn product__small-btn--prev js-product-btn-prev" type="button"><img src="assets/img/icons/chevron-up.png" alt=""></button>',
			nextArrow: '<button class="product__small-btn product__small-btn--next js-product-btn-next" type="button"><img src="assets/img/icons/chevron-down1.png" alt=""></button>'
		};

		$slider.slick(options);

		sliders.forEach((slider) => {
			const section = slider.closest('.js-product');
			const prevBtnEdge = section.querySelector('.js-product-btn-edge-prev');
			const btnNext = section.querySelector('.js-product-btn-next');
			const $slider = $(`.${slider.classList[1]}`);
			const START_NUMBER = -1;
			let countFlag = START_NUMBER;
			let isNextDisabled = false;
			let activeSlides = '';
			let slidesArr = '';
			let arrows = '';
			let prevBtn = '';

			$slider.on('afterChange', function (event, slick, direction) {
				isNextDisabled = btnNext.classList.contains('slick-disabled');
				activeSlides = slider.querySelectorAll('.slick-active');
				slidesArr = Array.from(activeSlides);
				arrows = section.querySelector('.js-product-arrows');
				prevBtn = arrows.querySelector('.js-product-btn-prev');

				if(isNextDisabled) {
					countFlag++;

					if(countFlag >= 4) {
						countFlag = 4;
					}

					if(countFlag >= 1) {
						slidesArr[0].classList.add('edge-hide');
						prevBtn.classList.add('hide');
						prevBtnEdge.classList.add('active');
					}

					slidesArr.forEach((elem, index) => {
						elem.classList.remove('edge-active');
					});

					slidesArr[countFlag].classList.add('edge-active');
				} else {
					countFlag = START_NUMBER;

					prevBtnEdge.classList.remove('active');

					slidesArr.forEach((elem, index) => {
						elem.classList.remove('edge-active', 'edge-hide');
					});
				}
			});

			prevBtnEdge.addEventListener('click', () => {
				countFlag--;

				slidesArr.forEach((elem, index) => {
					elem.classList.remove('edge-active');
				});

				slidesArr[countFlag].classList.add('edge-active');

				if(countFlag == 0) {
					slidesArr[0].classList.remove('edge-hide');
					prevBtn.classList.remove('hide');
					prevBtnEdge.classList.remove('active');
				}
			});
		});
	};

	const productFoodSlider = () => {
		const $sliders = $('.js-product-food');
		const options = {
			slidesToShow: 7,
			arrows: true,
			infinite: false,
			responsive: [{
				breakpoint: 1280,
				settings: {
					slidesToShow: 3
				}
			}]
		};

		const sliderInitiate = function () {
			$sliders.each(function () {
				const $slider = $(this);
				const isDesktop = window.matchMedia('(min-width: 1280px)').matches;
				const isSliderActive = $slider.hasClass('slick-initialized');

				if(isDesktop) {
					if(!isSliderActive) {
						$slider.slick(options);
					}
				} else {
					if(isSliderActive) {
						$slider.slick('unslick');
					}
				}
			});
		};

		$(window).on('load resize orientationchange', function () {
			sliderInitiate();
		});

		sliderInitiate();
	}


	// <****************PAGE READY****************>
	const onPageRdy = function () {
		// sliders
		popularSlider();
		setsSlider();
		clientsSlider();
		productSlider();
		productFoodSlider();

		// utility
		map();
		rangeSlider();
		lazyLoad();
		tabs();

		// specific
		cardCalc();
		setCalc();
		insideNumbers();
		metroRelocation();
		hamburger();
		headerScroll();
		selectRelocation();
	};

	onPageRdy();
})();
