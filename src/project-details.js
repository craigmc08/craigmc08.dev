import anime from 'animejs';

const backButt = document.querySelector('.back-butt');
if (backButt) backButt.addEventListener('click', () => {
    const outer = document.querySelector('.outer');
    if (outer) {
        outer.style.position = 'fixed';
        outer.style.left = '0px';
        outer.style.top = '0px';
        outer.style.width = '100%';
        outer.style.height = '100%';
        outer.style.transform = 'translateX(0)';
        outer.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.3)';
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