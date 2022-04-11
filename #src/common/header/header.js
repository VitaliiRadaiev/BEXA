let header = document.querySelector('.header');
if (header) {
    let burger = header.querySelector('.header__burger');
    let menu = header.querySelector('.menu');
    let menuListHasHildrenItems = header.querySelectorAll('.menu__list > .menu-item-has-children');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        header.classList.toggle('menu-is-open');
        menu.classList.toggle('open');
    })

    if (menuListHasHildrenItems.length) {
        menuListHasHildrenItems.forEach(item => {
            let title = item.querySelector('.menu__link');
            let subMenu = item.querySelector('.sub-menu');
            let subItems = item.querySelectorAll('.menu-item-has-children');

            title.addEventListener('click', (e) => {
                if (document.documentElement.clientWidth < 992) {
                    e.preventDefault();
                    title.classList.toggle('active');
                    _slideToggle(subMenu);

                    menuListHasHildrenItems.forEach(i => {
                        if (i === item) return;

                        let title = i.querySelector('.menu__link');
                        let subMenu = i.querySelector('.sub-menu');

                        title.classList.remove('active');
                        _slideUp(subMenu)
                    })
                }
            })

            if (subItems.length) {
                subItems.forEach(item => {
                    let title = item.querySelector('.sub-menu__title-link');
                    let subMenu = item.querySelector('.sub-sub-menu');

                    title.addEventListener('click', (e) => {
                        if (document.documentElement.clientWidth < 992) {
                            e.preventDefault();
                            title.classList.toggle('active');
                            _slideToggle(subMenu);

                            subItems.forEach(i => {
                                if (i === item) return;

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
        header.classList.toggle('is-scroll', window.pageYOffset > 50);
    })


    let titleLinksWrapItems =  Array.from(header.querySelectorAll('.title-link-wrap'));
    if(titleLinksWrapItems.length) {
        let firstItem = titleLinksWrapItems[0];
        let otherItems = titleLinksWrapItems.slice(1);

        otherItems.forEach(item => {
            let link = item.querySelector('.sub-menu__title-link');
            if(link) {
                firstItem.append(link);
                item.style.display = 'none';
            }
        })

    }
}