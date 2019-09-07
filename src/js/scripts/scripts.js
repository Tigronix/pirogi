(function () {
	// sliders
	const personCardSlider = function () {
		const $sliders = $('.js-person-card-slider');

		$sliders.slick({
			slidesToShow: 5,
			infinite: false,
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			}, ]
		});
	};

	const advantagesSlider = function () {
		const $sliders = $('.js-advantages-slider');
		const options = {
			slidesToShow: 3,
			infinite: false
		};

		$(window).on('load resize orientationchange', function () {
			$sliders.each(function () {
				const $slider = $(this);
				const isDesktop = $(window).width() > 768;
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
		});
	};

	const popularServices = function () {
		const $sliders = $('.js-services-slider');
		const options = {
			slidesToShow: 1,
			infinite: false,
			mobileFirst: true,
			dots: true
		};

		$(window).on('load resize orientationchange', function () {
			$sliders.each(function () {
				const $slider = $(this);
				const isDesktop = $(window).width() > 768;
				const isSliderActive = $slider.hasClass('slick-initialized');

				if(isDesktop) {
					if(isSliderActive) {
						$slider.slick('unslick');
					}
				} else {
					if(!isSliderActive) {
						$slider.slick(options);
					}
				}
			});
		});
	};

	// others
	const selectChange = function () {
		const selectWraps = document.querySelectorAll('.js-select-wrap');

		selectWraps.forEach(function (selectWrap) {
			const select = selectWrap.querySelector('.js-select');

			select.addEventListener('change', function () {
				select.classList.add('changed');
			});
		});
	};

	const phoneMask = function () {
		const $phoneInputs = $('.form-elem--phone');

		$phoneInputs.mask('+7 (000)-000-00-00'), {
			placeholder: '123'
		};
	};

	const checkboxLink = function () {
		const checkboxLinks = document.querySelectorAll('.js-checkbox-link');

		checkboxLinks.forEach(function (checkboxLink) {
			const input = checkboxLink.querySelector('.checkbox__input');
			const href = checkboxLink.getAttribute('data-href');

			input.addEventListener('change', function () {
				const isChecked = this.checked;

				if(isChecked) {
					location.replace(href);
				}
			});
		});
	};

	const menu = function () {
		const body = document.querySelector('body');
		const aside = document.querySelector('.js-aside');
		const btn = document.querySelector('.js-btn-menu');
		const imgOpen = btn.querySelector('.js-menu-img-open');
		const imgClose = btn.querySelector('.js-menu-img-close');

		const open = function (btn) {
			btn.classList.add('active');
			aside.classList.add('active');
			body.classList.add('overflow');
		};

		const close = function (btn) {
			btn.classList.remove('active');
			aside.classList.remove('active');
			body.classList.remove('overflow');
		};

		btn.addEventListener('click', function () {
			const isActive = this.classList.contains('active');

			if(isActive) {
				close(this);
			} else {
				open(this);
			}
		});
	};

	const avtoSelect = function () {
		const totalText = {};
		let currentStep = 1;
		const $form = $('.js-form-help');
		const form = document.querySelector('.js-form-help');
		const selectBrand = document.getElementById('brand');
		const selectModel = document.getElementById('model');
		const selectMalfunction = document.getElementById('malfunction');
		const infoSelectors = document.querySelectorAll('.js-total-text');
		const steps = document.querySelectorAll('.js-steps');
		const steps1 = document.querySelectorAll('.js-steps-1');
		const steps2 = document.querySelectorAll('.js-steps-2');
		const steps3 = document.querySelectorAll('.js-steps-3');
		const btnNextStep = document.querySelector('.js-btn-next-step');
		const btnSubmit = document.querySelector('.js-btn-submit');
		const carsWrap = document.querySelector('.js-form-cars');

		$form.each(function () {
			// utility functions
			const formReset = function () {
				$form[0].reset();
			};

			const disableNextBtn = function () {
				btnNextStep.classList.add('disabled');
			};

			const permitNextBtn = function () {
				btnNextStep.classList.remove('disabled');
			};

			const closeSteps = function () {
				const steps = document.querySelectorAll('.js-steps');

				steps.forEach(function (step) {
					step.classList.add('hide');
					step.classList.remove('active');
				});
			};

			const goToStep = function (steps) {
				closeSteps();

				steps.forEach(function (step) {
					step.classList.add('active');
					step.classList.remove('hide');
				});
			};

			const refreshOrderStatus = function () {
				infoSelectors.forEach(function (infoSelector) {
					const textNodes = infoSelector.querySelectorAll('span');

					textNodes.forEach(function (textNode) {
						textNode.remove();
					});

					infoSelector.insertAdjacentHTML('afterbegin', `<span>${totalText.total}</span>`);
				});
			};

			const resetModelSelect = function (modelOptions) {
				selectModel.selectedIndex = 0;

				const selectModelWrap = selectModel.closest('.form-elem__wrap');
				selectModelWrap.classList.remove('checked');
			};

			const closeOptions = function (modelOptions) {
				modelOptions.forEach(function (modelOption) {
					modelOption.classList.add('hide');
					modelOption.classList.remove('matched');
				});
			};

			const openOptions = function (modelOption) {
				modelOption.classList.remove('hide');
				modelOption.classList.add('matched');
			};

			// listeners
			formReset();

			selectBrand.addEventListener('change', function () {
				const brandValue = selectBrand.options[selectBrand.selectedIndex].value;
				const brandText = selectBrand.options[selectBrand.selectedIndex].text;
				const modelOptions = selectModel.querySelectorAll('option');
				const selectWrap = selectBrand.closest('.form-elem__wrap');

				totalText.brand = brandText;

				selectWrap.classList.add('checked');

				resetModelSelect(modelOptions);
				closeOptions(modelOptions);

				modelOptions.forEach(function (modelOption) {
					const modelGroup = modelOption.getAttribute('data-group');
					const isMatched = modelGroup === brandValue;

					if(isMatched) {
						openOptions(modelOption);
					}
				});

				disableNextBtn();
			});

			selectModel.addEventListener('change', function () {
				const modelText = selectModel.options[selectModel.selectedIndex].text;
				const selectWrap = selectModel.closest('.form-elem__wrap')

				selectWrap.classList.add('checked');
				totalText.model = modelText;

				totalText.total = `${totalText.brand} ${totalText.model}`;

				refreshOrderStatus();
				permitNextBtn();
			});

			selectMalfunction.addEventListener('change', function () {
				const selectWrap = selectMalfunction.closest('.form-elem__wrap');
				const malfunctionText = selectMalfunction.options[selectMalfunction.selectedIndex].text;

				selectWrap.classList.add('checked');

				totalText.malfunction = malfunctionText;

				totalText.total = `${totalText.brand} ${totalText.model}, ${totalText.malfunction}`;

				refreshOrderStatus();
			});

			btnNextStep.addEventListener('click', function () {
				closeSteps();

				if(currentStep >= 2) {
					this.classList.add('hide');
					console.log(this);

					currentStep = 2;
				}

				const nextStep = currentStep + 1;
				const nextStepNodesStroke = `.js-steps-${nextStep}`;
				const nextStepNodes = document.querySelectorAll(`.js-steps-${nextStep}`);

				currentStep++;

				// car animation
				form.classList.remove(`step-1`);
				form.classList.remove(`step-2`);
				form.classList.add(`step-${nextStep}`);

				goToStep(nextStepNodes);
			});
		});
	};

	const headerScroll = function () {
		const $header = $('.js-header');

		$(window).on('scroll', function () {
			if($(this).scrollTop() > 50){
				$header.addClass('scrolled');
			}else{
				$header.removeClass('scrolled');
			}
		});
	};

	// sliders
	personCardSlider();
	advantagesSlider();
	popularServices();

	// others
	selectChange();
	phoneMask();
	checkboxLink();
	menu();
	avtoSelect();
	headerScroll();
})();
