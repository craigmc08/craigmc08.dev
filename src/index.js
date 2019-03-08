import anime from 'animejs';

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const cardName = card.id;
    const image = card.querySelector('img');
    card.addEventListener('click', expandCard(image, cardName));
    card.addEventListener('touch', expandCard(image, cardName));
});

/**
 * Adds elements to create a blank skeleton for a project layout
 * @param {HTMLElement} parent 
 */
function CreateProjectDetailSkeleton(parent) {
    const cont = document.createElement('div');
    cont.classList.add('place-pd-cont');
    parent.appendChild(cont);
    const createPlaceholder = () => {
        const el = document.createElement('div');
        return el;
    }

    const createText = () => {
        const text = createPlaceholder();
        text.classList.add('place-pd-text');
        return text;
    }
    const heading = createPlaceholder();
    heading.classList.add('place-pd-heading');
    cont.appendChild(heading);
    for (let i = 0; i < 3; i++) cont.appendChild(createText());
    cont.appendChild(document.createElement('br'));
    for (let i = 0; i < 2; i++) cont.appendChild(createText());
}

/**
 * @param {HTMLElement} element 
 */
function expandCard(element, cardName) {
    return function(e) {
        if (e.target.nodeName === 'A') return;

        const boundingRect = element.getBoundingClientRect();
    
        // Adjust the image element for the card
        element.style.maxHeight = '25rem';
        element.style.objectFit = 'cover';
        element.style.width = '100%';
        element.style.filter = 'brightness(100%)';

        // Replace the image with a blank div to hold it space in the layout
        const paddingElement = document.createElement('div');
        paddingElement.style.width = boundingRect.width + 'px';
        paddingElement.style.height = boundingRect.height + 'px';
        element.parentNode.replaceChild(paddingElement, element);

        // This holds the image and other content
        const contentElement = document.createElement('div');
        contentElement.style.position = 'fixed';
        contentElement.style.bottom = (window.innerHeight - boundingRect.bottom) + 'px';
        contentElement.style.left = boundingRect.left + 'px';
        contentElement.style.width = boundingRect.width + 'px';
        contentElement.style.height = boundingRect.height + 'px';
        contentElement.style.zIndex = 11;
        contentElement.style.backgroundColor = 'white';
        contentElement.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.3)';
        contentElement.classList.add('pd-container');

        document.body.appendChild(contentElement);
        contentElement.appendChild(element);
        CreateProjectDetailSkeleton(contentElement);

        console.log(boundingRect);
        // window.location = `#${cardName}`;
        anime({
            targets: [contentElement],
            left: '0px',
            width: '100%',
            height: window.innerHeight,
            bottom: '0px',
            top: '0px',
            easing: 'easeInOutQuad',
            duration: 400,
            complete: (anim) => {
                window.location = `${cardName}.html`;
            },
        });
        anime({
            targets: [element],
            minHeight: '25rem',
            filter: 'brightness(70%)',
            easing: 'easeInOutQuad',
            duration: 400,
        });
    }
}