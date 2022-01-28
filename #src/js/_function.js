//SlideToggle
function _slideUp(target, duration = 500) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
function _slideDown(target, duration = 500) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'flex';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
function _slideToggle(target, duration = 500) {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================







//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			if (spoller.classList.contains('_active')) {
				_slideDown(spoller.nextElementSibling);
			}

			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				if (spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
spollerInit();
// === // Spollers ==================================================================




function tabsInit() {
	let tabsContainers = document.querySelectorAll('._tabs');
	if (tabsContainers.length) {
		tabsContainers.forEach(tabsContainer => {
			let triggerItems = tabsContainer.querySelectorAll('._tab-trigger');
			let contentItems = Array.from(tabsContainer.querySelectorAll('._tab-content'));

			const getContentItem = (id) => {
				if (!id.trim()) return;
				return contentItems.filter(item => item.dataset.id === id)[0];
			}

			if (triggerItems.length && contentItems.length) {
				triggerItems[0].classList.add('_active');
				getContentItem(triggerItems[0].dataset.id).classList.add('_active');

				triggerItems.forEach(item => {
					item.addEventListener('click', () => {
						item.classList.add('_active');
						getContentItem(item.dataset.id).classList.add('_active');

						triggerItems.forEach(i => {
							if (i === item) return;

							i.classList.remove('_active');
							getContentItem(i.dataset.id).classList.remove('_active');
						})
					})
				})
			}
		})
	}
}
tabsInit();


function setSameHeight(items) {
	if (!items.length) return;

	let maxHeight = Math.max(...Array.from(items).map(i => i.clientHeight));
	items.forEach(i => i.style.minHeight = maxHeight + 'px');
}

function setCounterAnim() {
	let couterItems = document.querySelectorAll('[data-counter]');
	if (couterItems) {
		couterItems.forEach(item => {
			let animation = anime({
				targets: item,
				textContent: [0, item.dataset.counter || 0],
				round: 1,
				easing: 'linear',
				autoplay: false,
				duration: 1000
			});
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (entry.intersectionRatio >= 0.7) {
							animation.play();
							observer.disconnect();
						}
					});
				},
				{
					threshold: 0.7
				}
			);

			observer.observe(item);
		})
	}
}

setCounterAnim();

let anchors = document.querySelectorAll('.anchor');
if (anchors.length) {
	anchors.forEach(anchor => {
		if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

		let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
		anchor.addEventListener('click', (e) => {

			let el = document.getElementById(id);
			if (el) {
				e.preventDefault();
				window.scrollTo({
					top: el.offsetTop,
					behavior: 'smooth',
				})
			}

		})
	})
}

function trimString(el, stringLength = 0) {
	let str = el.innerText;
	if (str.length <= stringLength) return;
	el.innerText = [...str].slice(0, stringLength).join('') + '...';
}

function numberCounterAnim() {

	let counterItems = document.querySelectorAll('[data-number-counter-anim]');
	if (counterItems) {

		counterItems.forEach(item => {
			let animation = anime({
				targets: item,
				textContent: [0, item.innerText],
				round: 1,
				easing: 'linear',
				autoplay: false,
				duration: 1000
			});
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (entry.intersectionRatio >= 0.7) {
							animation.play();
							observer.disconnect();
						}
					});
				},
				{
					threshold: 0.7
				}
			);

			observer.observe(item);
		})
	}

}