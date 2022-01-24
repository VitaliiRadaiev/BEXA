let partnerSlider = document.querySelector('.partners__slider');
if(partnerSlider) {
    let slider = partnerSlider;
    let mySwiper;

    function mobileSlider() {
        if(document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
            mySwiper = new Swiper(slider, {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                slidesPerView: 4,
                speed: 600,
                freeMode: true,
            });

            slider.dataset.mobile = 'true';
        }

        if(document.documentElement.clientWidth > 767) {
            slider.dataset.mobile = 'false';

            if(slider.classList.contains('swiper-container-initialized')) {
                mySwiper.destroy();
            }
        }
    }

    mobileSlider();

    window.addEventListener('resize', () => {
        mobileSlider();
    })
}