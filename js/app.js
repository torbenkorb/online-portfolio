(function() {
    'use strict';

    var overlay = {
        init: function() {
            this.galleryItems = document.querySelectorAll('.gallery__item');
            this.closeEl = document.querySelector('.overlay__close');
            this.wrapper = document.querySelector('.overlay');
            this.image = this.wrapper.querySelector('.overlay__media img');
            this.headline = this.wrapper.querySelector('.overlay__headline');
            this.background = this.wrapper.querySelector('.overlay__media');
            this.htmlContent = this.wrapper.querySelector('.overlay__description');
            this.closeEl.addEventListener('click', this.hide.bind(this));
            this.initGalleryListener();
        },
        initGalleryListener: function() {
            for(var i = 0; i < this.galleryItems.length; i++) {
                var galleryItem = this.galleryItems[i];
                galleryItem.firstElementChild.onclick = function(event) {
                    var target = event.currentTarget;
                    var viewportOffset = target.getBoundingClientRect();
                    var x = viewportOffset.left + (target.offsetWidth / 2);
                    var y = viewportOffset.top + (target.offsetHeight / 2);
                    var title = target.querySelector('.project__title').textContent;
                    var color = target.dataset.color;
                    var image = target.querySelector('.project__image img').src;
                    var html = target.querySelector('.project__long-description').innerHTML;

                    if(x && y) {
                        overlay.wrapper.style.transformOrigin = x + 'px ' + y + 'px';
                    }

                    var config = {
                        title: title,
                        color: color,
                        image: image,
                        html: html
                    };

                    overlay.render(config);
                };
            }
        },
        hide: function() {
            this.wrapper.classList.remove('active');
        },
        render: function(data) {
            this.image.src = '';
            this.image.src = data.image;
            this.wrapper.scrollTop = 0;
            this.headline.textContent = data.title;
            this.htmlContent.innerHTML = data.html;
            this.background.style.backgroundColor = (data.color) ? '#' + data.color : '';
            this.wrapper.classList.add('active');
        }
    }

    overlay.init();


    var scrollToNext = {
        init: function() {
            var site = document.querySelector('.site');
            this.element = document.querySelector('.next');
            this.element.addEventListener('click', function() {
                var nextSectionTop = document.querySelector('.mainstage').offsetHeight;
                if(!site.scroll) {
                    site.scrollTop = nextSectionTop;
                    return;
                }
                site.scroll({
                    top: nextSectionTop,
                    left: 0,
                    behavior: 'smooth'
                });
            })
        }
    }

    scrollToNext.init();

})();
