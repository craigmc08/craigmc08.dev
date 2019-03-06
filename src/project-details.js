import anime from 'animejs';

const backButt = document.querySelector('.back-butt');
if (backButt) backButt.addEventListener('click', () => {
    // window.history.back();
    const outer = document.querySelector('.outer');
    if (outer) {
        outer.style.position = 'fixed';
        outer.style.left = '0px';
        outer.style.top = '0px';
        outer.style.width = '100%';
        outer.style.height = '100%';
        outer.style.transform = 'translateX(0)';
        anime({
            targets: [outer],
            translateX: '100%',
            duration: 250,
            easing: 'easeInQuad',
            complete: (anim) => {
                window.history.back();
            },
        });
    }
});