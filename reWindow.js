(() => {
    const defaultRadius = 5,
        defaultBorderColor = 'rgba(0,0,0,0)',
        defaultBodyBgc = '#FFF',
        defaultTitleBgc = '#F2F2F2',
        defaultTitleColor = '#333',
        defaultContentBgc = '#efefef',
        defaultContentColor = '#000',
        defaultButtonBoxBgc = defaultContentBgc,
        defaultButtonBgc = '#A4D3EE',
        defaultButtonBgcHover = '#93C2DD',
        defaultButtonColor = '#FFF';

    var addElementFunctions = (tag) => {
        tag.setWidth = (width) => {
            tag.style.width = width;
            return tag;
        };
        tag.getWidth = () => {
            return tag.offsetWidth;
        };
        tag.setHeight = (height) => {
            tag.style.height = height;
            return tag;
        };
        tag.setLineHeight = (lineHeight) => {
            tag.style.lineHeight = lineHeight;
            return tag;
        };
        tag.getHeight = () => {
            return tag.offsetHeight;
        };
        tag.css = function () {
            if (arguments.length == 1) {
                return eval("this.style." + arguments[0].trim());
            } else if (arguments.length == 2) {
                eval("this.style." + arguments[0].trim() + " = '" + arguments[1] + "'");
                return this;
            }
        };
        tag.addClass = (className) => {
            tag.classList.add(className);
            return tag;
        };
        tag.removeClass = (className) => {
            tag.classList.remove(className);
            return tag;
        };
        tag.replaceClass = (oldClass, newClass) => {
            tag.removeClass(oldClass).addClass(newClass);
            return tag;
        };
        tag.hasClass = (className) => {
            return tag.classList.contains(className);
        };
        tag.getParent = () => {
            var parent = tag.parentElement;
            addElementFunctions(parent);
            return parent;
        };
        tag.getChildren = () => {
            var children = tag.children;
            for (var i = 0; i < children.length; i++) {
                addElementFunctions(children[i]);
            }
            return children;
        };
    };

    var addHideAndShow = (tag) => {
        tag.show = () => {
            tag.css('opacity', 0)
                .css('display', 'block');

            var speed = 0.001, opacity = 0;
            var showInterval = setInterval(() => {
                opacity += speed;
                tag.css('opacity', opacity);
                speed += 0.01;

                if (opacity >= 0.9) {
                    tag.css('opacity', 0.9);
                    clearInterval(showInterval);
                }
            }, 30);
        };

        tag.hide = (distance) => {
            /*
            * transform: translateY(270px);
            * transition: transform .6s ease-out;
            * */
            tag.css('transform', 'translateY(' + distance + 'px)')
                .css('transition', 'transform .5s ease-out');

            setTimeout(() => {
                tag.remove();
            }, 500);
        };
    };

    var createElement = (tagName) => {
        var tag = document.createElement(tagName);
        addElementFunctions(tag);
        return tag;
    };

    var emptyString = (string) => {
        if (typeof string == 'string') string = string.trim();
        return string == '' || string == undefined || string == 0 || string == null;
    };

    var createBody = (width, height) => {
        var body = createElement('div');

        body.setWidth(width + 'px')
            .setHeight(height + 'px')
            .css('borderRadius', defaultRadius + 'px')
            .css('border', '1px ' + defaultBorderColor + ' solid')
            .css('backgroundColor', defaultBodyBgc)
            .css('overflow', 'hidden')
            .css('display', 'none');

        return body;
    };

    var createTitle = (title) => {
        var titleBox = createElement('div');

        titleBox.setWidth('100%')
            .css('backgroundColor', defaultTitleBgc)
            .css('color', defaultTitleColor)
            .css('textAlign', 'center')
            .css('fontWeight', 'bold');

        titleBox.innerText = title;

        /*
        * font-size height
        * */

        return titleBox;
    };

    var createContent = (message) => {
        var content = createElement('div');

        content.setWidth('100%')
            .css('textAlign', 'center')
            .css('fontWeight', 'normal')
            .css('backgroundColor', defaultContentBgc)
            .css('color', defaultContentColor);

        content.innerText = message;

        /*
        *   height font-size
        * */

        return content;
    };

    var createOneButton = (value) => {
        var buttonBox = createElement('div'),
            button = createElement('input');

        buttonBox.setWidth('100%')
            .css('textAlign', 'center')
            .css('backgroundColor', defaultButtonBoxBgc);

        /*
        *   height
        * */

        button.css('backgroundColor', defaultButtonBgc)
            .css('color', defaultButtonColor)
            .css('borderRadius', defaultRadius + 'px')
            .css('border', '1px ' + defaultButtonBgc + ' solid')
            .css('outline', 'none');

        button.type = 'button';
        button.value = value;

        button.onmouseover = function () {
            button.css('backgroundColor', defaultButtonBgcHover)
                .css('border', '1px ' + defaultButtonBgcHover + ' solid');
        };

        button.onmouseleave = function () {
            button.css('backgroundColor', defaultButtonBgc)
                .css('border', '1px ' + defaultButtonBgc + ' solid');
        };

        /*
        *   height width
        * */

        buttonBox.appendChild(button);

        return buttonBox;
    };

    (() => {
        window.alert = (message, title) => {
            var domBody = document.getElementsByTagName('body')[0];
            var body = createBody(400, 200), titleB;
            var content = createContent(message);
            var button = createOneButton('确定');

            body.css('position', 'absolute')
                .css('top', '60px')
                .css('left', 'calc( 50% - ' + (200) + 'px');

            addHideAndShow(body);

            if (!emptyString(title)) {
                titleB = createTitle(title);
                body.appendChild(titleB);
                titleB.setHeight('40px').setLineHeight('40px');
                content.setHeight('100px').setLineHeight('100px');
            } else {
                content.setHeight('140px').setLineHeight('140px');
            }

            var realButton = button.setHeight('60px').getChildren()[0];
            realButton.setWidth('100px').setHeight('40px');

            realButton.onclick = () => {
                body.hide(-270);
            };

            domBody.onkeyup = (event) => {
                if (event.key == 'Enter') {
                    realButton.click();
                }
            };

            body.appendChild(content);
            body.appendChild(button);
            domBody.appendChild(body);
            body.show();
        };

        window.toast = (message, time) => {
            var domBody = document.getElementsByTagName('body')[0];
            var box = createElement('div');

            box.setWidth('200px')
                .setHeight('35px')
                .setLineHeight('35px')
                .css('backgroundColor', 'rgba(0,0,0,0.9)')
                .css('color', '#fff')
                .css('textAlign', 'center')
                .css('borderRadius', defaultRadius + 'px')
                .css('border', '1px ' + defaultBorderColor + ' solid')
                .css('display', 'none');

            box.innerText = message;

            box.css('position', 'absolute')
                .css('top', '150px')
                .css('left', 'calc( 50% - ' + (100) + 'px');

            addHideAndShow(box);
            domBody.appendChild(box);
            box.show();

            time = time || 1000;
            setTimeout(() => {
                var speed = 0.001, opacity = 0.9;
                var hideInterval = setInterval(() => {
                    opacity -= speed;
                    box.css('opacity', opacity);
                    speed += 0.01;

                    if (opacity <= 0) {
                        box.css('opacity', 0);
                        clearInterval(hideInterval);
                        box.remove();
                    }
                }, 15);
            }, time);
        };
    })()
})();