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
            dynamicBullets: true,
            renderBullet: function(index, className) {
                let num;
                if((index + 1) >= 10) {
                    num = index + 1;
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
