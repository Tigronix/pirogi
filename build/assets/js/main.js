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
	// sliders
	var personCardSlider = function personCardSlider() {
		var $sliders = $('.js-person-card-slider');

		$sliders.slick({
			slidesToShow: 5,
			infinite: false,
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			}]
		});
	};

	var advantagesSlider = function advantagesSlider() {
		var $sliders = $('.js-advantages-slider');
		var options = {
			slidesToShow: 3,
			infinite: false
		};

		$(window).on('load resize orientationchange', function () {
			$sliders.each(function () {
				var $slider = $(this);
				var isDesktop = $(window).width() > 768;
				var isSliderActive = $slider.hasClass('slick-initialized');

				if (isDesktop) {
					if (!isSliderActive) {
						$slider.slick(options);
					}
				} else {
					if (isSliderActive) {
						$slider.slick('unslick');
					}
				}
			});
		});
	};

	var popularServices = function popularServices() {
		var $sliders = $('.js-services-slider');
		var options = {
			slidesToShow: 1,
			infinite: false,
			mobileFirst: true,
			dots: true
		};

		$(window).on('load resize orientationchange', function () {
			$sliders.each(function () {
				var $slider = $(this);
				var isDesktop = $(window).width() > 768;
				var isSliderActive = $slider.hasClass('slick-initialized');

				if (isDesktop) {
					if (isSliderActive) {
						$slider.slick('unslick');
					}
				} else {
					if (!isSliderActive) {
						$slider.slick(options);
					}
				}
			});
		});
	};

	// others
	var selectChange = function selectChange() {
		var selectWraps = document.querySelectorAll('.js-select-wrap');

		selectWraps.forEach(function (selectWrap) {
			var select = selectWrap.querySelector('.js-select');

			select.addEventListener('change', function () {
				select.classList.add('changed');
			});
		});
	};

	var phoneMask = function phoneMask() {
		var $phoneInputs = $('.form-elem--phone');

		$phoneInputs.mask('+7 (000)-000-00-00'), {
			placeholder: '123'
		};
	};

	var checkboxLink = function checkboxLink() {
		var checkboxLinks = document.querySelectorAll('.js-checkbox-link');

		checkboxLinks.forEach(function (checkboxLink) {
			var input = checkboxLink.querySelector('.checkbox__input');
			var href = checkboxLink.getAttribute('data-href');

			input.addEventListener('change', function () {
				var isChecked = this.checked;

				if (isChecked) {
					location.replace(href);
				}
			});
		});
	};

	var menu = function menu() {
		var body = document.querySelector('body');
		var aside = document.querySelector('.js-aside');
		var btn = document.querySelector('.js-btn-menu');
		var imgOpen = btn.querySelector('.js-menu-img-open');
		var imgClose = btn.querySelector('.js-menu-img-close');

		var open = function open(btn) {
			btn.classList.add('active');
			aside.classList.add('active');
			body.classList.add('overflow');
		};

		var close = function close(btn) {
			btn.classList.remove('active');
			aside.classList.remove('active');
			body.classList.remove('overflow');
		};

		btn.addEventListener('click', function () {
			var isActive = this.classList.contains('active');

			if (isActive) {
				close(this);
			} else {
				open(this);
			}
		});
	};

	var avtoSelect = function avtoSelect() {
		var totalText = {};
		var currentStep = 1;
		var $form = $('.js-form-help');
		var form = document.querySelector('.js-form-help');
		var selectBrand = document.getElementById('brand');
		var selectModel = document.getElementById('model');
		var selectMalfunction = document.getElementById('malfunction');
		var infoSelectors = document.querySelectorAll('.js-total-text');
		var steps = document.querySelectorAll('.js-steps');
		var steps1 = document.querySelectorAll('.js-steps-1');
		var steps2 = document.querySelectorAll('.js-steps-2');
		var steps3 = document.querySelectorAll('.js-steps-3');
		var btnNextStep = document.querySelector('.js-btn-next-step');
		var btnSubmit = document.querySelector('.js-btn-submit');
		var carsWrap = document.querySelector('.js-form-cars');

		$form.each(function () {
			// utility functions
			var formReset = function formReset() {
				$form[0].reset();
			};

			var disableNextBtn = function disableNextBtn() {
				btnNextStep.classList.add('disabled');
			};

			var permitNextBtn = function permitNextBtn() {
				btnNextStep.classList.remove('disabled');
			};

			var closeSteps = function closeSteps() {
				var steps = document.querySelectorAll('.js-steps');

				steps.forEach(function (step) {
					step.classList.add('hide');
					step.classList.remove('active');
				});
			};

			var goToStep = function goToStep(steps) {
				closeSteps();

				steps.forEach(function (step) {
					step.classList.add('active');
					step.classList.remove('hide');
				});
			};

			var refreshOrderStatus = function refreshOrderStatus() {
				infoSelectors.forEach(function (infoSelector) {
					var textNodes = infoSelector.querySelectorAll('span');

					textNodes.forEach(function (textNode) {
						textNode.remove();
					});

					infoSelector.insertAdjacentHTML('afterbegin', '<span>' + totalText.total + '</span>');
				});
			};

			var resetModelSelect = function resetModelSelect(modelOptions) {
				selectModel.selectedIndex = 0;

				var selectModelWrap = selectModel.closest('.form-elem__wrap');
				selectModelWrap.classList.remove('checked');
			};

			var closeOptions = function closeOptions(modelOptions) {
				modelOptions.forEach(function (modelOption) {
					modelOption.classList.add('hide');
					modelOption.classList.remove('matched');
				});
			};

			var openOptions = function openOptions(modelOption) {
				modelOption.classList.remove('hide');
				modelOption.classList.add('matched');
			};

			// listeners
			formReset();

			selectBrand.addEventListener('change', function () {
				var brandValue = selectBrand.options[selectBrand.selectedIndex].value;
				var brandText = selectBrand.options[selectBrand.selectedIndex].text;
				var modelOptions = selectModel.querySelectorAll('option');
				var selectWrap = selectBrand.closest('.form-elem__wrap');

				totalText.brand = brandText;

				selectWrap.classList.add('checked');

				resetModelSelect(modelOptions);
				closeOptions(modelOptions);

				modelOptions.forEach(function (modelOption) {
					var modelGroup = modelOption.getAttribute('data-group');
					var isMatched = modelGroup === brandValue;

					if (isMatched) {
						openOptions(modelOption);
					}
				});

				disableNextBtn();
			});

			selectModel.addEventListener('change', function () {
				var modelText = selectModel.options[selectModel.selectedIndex].text;
				var selectWrap = selectModel.closest('.form-elem__wrap');

				selectWrap.classList.add('checked');
				totalText.model = modelText;

				totalText.total = totalText.brand + ' ' + totalText.model;

				refreshOrderStatus();
				permitNextBtn();
			});

			selectMalfunction.addEventListener('change', function () {
				var selectWrap = selectMalfunction.closest('.form-elem__wrap');
				var malfunctionText = selectMalfunction.options[selectMalfunction.selectedIndex].text;

				selectWrap.classList.add('checked');

				totalText.malfunction = malfunctionText;

				totalText.total = totalText.brand + ' ' + totalText.model + ', ' + totalText.malfunction;

				refreshOrderStatus();
			});

			btnNextStep.addEventListener('click', function () {
				closeSteps();

				if (currentStep >= 2) {
					this.classList.add('hide');
					console.log(this);

					currentStep = 2;
				}

				var nextStep = currentStep + 1;
				var nextStepNodesStroke = '.js-steps-' + nextStep;
				var nextStepNodes = document.querySelectorAll('.js-steps-' + nextStep);

				currentStep++;

				// car animation
				form.classList.remove('step-1');
				form.classList.remove('step-2');
				form.classList.add('step-' + nextStep);

				goToStep(nextStepNodes);
			});
		});
	};

	var headerScroll = function headerScroll() {
		var $header = $('.js-header');

		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 50) {
				$header.addClass('scrolled');
			} else {
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
//# sourceMappingURL=main.js.map
