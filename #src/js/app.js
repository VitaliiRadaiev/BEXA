let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));


window.addEventListener('load', function () {

	document.body.classList.add('is-load');

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('._padding-top');
		if (wrapper) {
			let header = document.querySelector('.header');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 1000)
				window.addEventListener('resize', setPedding);
			}

		}
	}
	// ==== AND ADD PADDING-TOP ================================

	@@include('_function.js');
	@@include('forms.js');
	@@include('../common/header/header.js');
	@@include('../common/popup/popup.js');
	@@include('../common/promo-header/promo-header.js');
	@@include('../common/objects/objects.js');
	@@include('../common/testimonials/testimonials.js');
	@@include('../common/partners/partners.js');
	@@include('../common/input-file/input-file.js');
	@@include('../common/footer/footer.js');

	// input mask init
	let items = document.querySelectorAll('[data-mask]');
	if (items.length) {
		items.forEach(item => {
			let maskValue = item.dataset.mask;
			let input = item.querySelector('input[type="text"]');

			if (input) {
				Inputmask(maskValue, {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
				}).mask(input);
			}
		})
	}


	let advantagesTitles = document.querySelectorAll('.advantages__title, .advantages__text');
	if (advantagesTitles.length) {
		const setHeight = () => {
			if (document.documentElement.clientWidth >= 768) {
				setSameHeight(advantagesTitles);
			}
		}

		setHeight();

		window.addEventListener('resize', setHeight);
	}
});

window.addEventListener('DOMContentLoaded', function () {
	if (isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}

	if (isMobile.iOS()) {
		document.body.classList.add('_is-mobile-ios');
	}

	@@include('files/dynamic_adapt.js');

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
});


