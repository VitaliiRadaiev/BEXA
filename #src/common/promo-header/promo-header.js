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
}