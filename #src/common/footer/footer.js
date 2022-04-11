{
    let footer = document.querySelector('.footer');
    if(footer) {
        let cta = footer.querySelector('.cta');
        if(!cta) {
            footer.classList.add('without-cta');
        }
    }
}