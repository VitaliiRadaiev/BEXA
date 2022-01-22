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
function _slideDown (target, duration = 500) {
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
function _slideToggle (target, duration = 500) {
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

			if(spoller.classList.contains('_active')) {
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
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
spollerInit()
// === // Spollers ==================================================================






function createTabs(containerName = false, triggersName = false, tabsName = false) {
	let container = document.querySelector(`${containerName}`);
	if (container) {
		let allTriggers = container.querySelectorAll(`${triggersName}`);
		let allTabs = container.querySelectorAll(`${tabsName}`);

		if (allTriggers.length) {
			allTriggers.forEach(trigger => {
				trigger.addEventListener('click', (e) => {
					e.preventDefault();
					const id = trigger.getAttribute('href').replace('#', '');

					trigger.classList.add('active');

					allTriggers.forEach(i => {
						if (i == trigger) {
							return
						}
						i.classList.remove('active');
					});

					allTabs.forEach(tab => {
						if (tab.id == id) {
							tab.classList.add('active')
						} else {
							tab.classList.remove('active');
						}
					})

				})
			})
		}

	}
}

//createTabs('.tabs', '.tab-trigger', '.tab-content')


function setSameHeight(items) {
    if(!items.length) return;

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
if(anchors.length) {
	anchors.forEach(anchor => {
		if(!anchor.getAttribute('href').match(/#\w+$/gi)) return;
		
		let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
		anchor.addEventListener('click', (e) => {

			let el = document.getElementById(id);
			if(el) {
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
	if(str.length <= stringLength) return;
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

};
	let header = document.querySelector('.header');
if(header) {
    let burger = header.querySelector('.header__burger');
    let menu = header.querySelector('.menu');
    let menuListHasHildrenItems = header.querySelectorAll('.menu__list > .menu-item-has-children');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        header.classList.toggle('menu-is-open');
        menu.classList.toggle('open');
    })

    if(menuListHasHildrenItems.length) {
        menuListHasHildrenItems.forEach(item => {
            let title = item.querySelector('.menu__link');
            let subMenu = item.querySelector('.sub-menu');
            let subItems = item.querySelectorAll('.menu-item-has-children');

            title.addEventListener('click', (e) => {
                if(document.documentElement.clientWidth < 992) {
                    e.preventDefault();
                    title.classList.toggle('active');
                    _slideToggle(subMenu);

                    menuListHasHildrenItems.forEach(i => {
                        if(i === item) return;

                        let title = i.querySelector('.menu__link');
                        let subMenu = i.querySelector('.sub-menu');

                        title.classList.remove('active');
                        _slideUp(subMenu)
                    })
                }
            })  
            
            if(subItems.length) {
                subItems.forEach(item => {
                    let title = item.querySelector('.sub-menu__title-link');
                    let subMenu = item.querySelector('.sub-sub-menu');

                    title.addEventListener('click', (e) => {
                        if(document.documentElement.clientWidth < 992) {
                            e.preventDefault();
                            title.classList.toggle('active');
                            _slideToggle(subMenu);
        
                            subItems.forEach(i => {
                                if(i === item) return;
        
                                let title = i.querySelector('.sub-menu__title-link');
                                let subMenu = i.querySelector('.sub-sub-menu');
        
                                title.classList.remove('active');
                                _slideUp(subMenu)
                            })
                        }
                    })  
                })
            }
        })
    }
    

    window.addEventListener('scroll', () => {
        if(document.documentElement.clientWidth < 992) {
            header.classList.toggle('is-scroll', window.pageYOffset > 50);
        }
    })
};
	let promoHeader = document.querySelector('.promo-header');
if(promoHeader) {
    let textSlider = promoHeader.querySelector('.promo-header__slider-text');
    let bgSlider = promoHeader.querySelector('.promo-header__bg-slider');
    let col1 = promoHeader.querySelector('.promo-header__col-1');

    if(textSlider && bgSlider) {
        let textSliderData = new Swiper(textSlider, {
            effect: 'fade',
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
        });

        let bgSliderData = new Swiper(bgSlider, {
            /*
            effect: 'fade',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            */
            direction: 'vertical',
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 800,
            touchRatio: 0,
            pagination: {
            	el: promoHeader.querySelector('.swiper-pagination'),
            	clickable: true,
                renderBullet: function(index, className) {
                    let num;
                    if((index + 1) >= 10) {
                        num = index + '.';
                    } else {
                        num = '0' + (index + 1); 
                    }
                    return '<span class="'+ className +'"> ' + num + '</span>';
                }
            },
        });

        textSliderData.controller.control = bgSliderData;
        bgSliderData.controller.control = textSliderData;
        
    }

    const setMinHeight = () => {
        col1.style.minHeight = document.documentElement.clientHeight + 'px';
    }

    setMinHeight();

    window.addEventListener('resize', setMinHeight);
};
	let objectsBlock = document.querySelector('.objects');
if(objectsBlock) {
    let sliderData = new Swiper(objectsBlock.querySelector('.objects__slider'), {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 800,
        watchOverflow: true,
        pagination: {
        	el: objectsBlock.querySelector('.pagination'),
        	clickable: true,
            renderBullet: function(index, className) {
                let num;
                if((index + 1) >= 10) {
                    num = index + '.';
                } else {
                    num = '0' + (index + 1); 
                }
                return '<span class="'+ className +'"> ' + num + '</span>';
            }
        },

        navigation: {
            nextEl: objectsBlock.querySelector('.slider-button.next'),
            prevEl: objectsBlock.querySelector('.slider-button.prev'),
        },
    });
}
;
	let testimonials = document.querySelector('.testimonials');
if (testimonials) {

    let sliderData = new Swiper(testimonials.querySelector('.swiper-container'), {
        speed: 800,
        pagination: {
            el: testimonials.querySelector('.pagination'),
            clickable: true,
            renderBullet: function (index, className) {
                let num;
                if ((index + 1) >= 10) {
                    num = index + '.';
                } else {
                    num = '0' + (index + 1);
                }
                return '<span class="' + className + '"> ' + num + '</span>';
            }
        },

        navigation: {
            nextEl: testimonials.querySelector('.slider-button.next'),
            prevEl: testimonials.querySelector('.slider-button.prev'),
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
        },
    });
};


	let advantagesTitles = document.querySelectorAll('.advantages__title, .advantages__text');
	if(advantagesTitles.length) {
		const setHeight = () => {
			if(document.documentElement.clientWidth >= 768) {
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

	if(isMobile.iOS()) {
		document.body.classList.add('_is-mobile-ios');
	}

	// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);

					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
			
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);


		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}

	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
			
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
			
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}


	dynamicAdapt();

	
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}

	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());;

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
