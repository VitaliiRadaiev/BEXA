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
}