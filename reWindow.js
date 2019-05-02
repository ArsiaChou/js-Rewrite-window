(() => {
    /*  一个全局变量，一次只能显示一个*/
    var isShow = false,
        /* 用count和number两个计数器来保证多个窗口会按照先后顺序输出 */
        count = 0, number = 0;

    /*
*   原生js又臭又长，又不想依赖jQuery，
*   所以模仿了几个函数来简化代码
*   放外面是因为我写了这么多，总不能只在这个js文件里用吧，亏死了
* */
    var addElementFunctions = (tag) => {
        /*
        *   用 return tag 来实现链式代码
        * */
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

        /*
        *   ()=>{}返回的this是上层函数的this，
        *   所以这里使用function(){}
        * */
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
            tag.removeClass(oldClass)
                .addClass(newClass);
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

        tag.setBackgroundColor = (color) => {
            tag.css('backgroundColor', color);
            return tag;
        };

        tag.text = function () {
            if (arguments.length == 0) {
                return tag.innerText;
            } else {
                tag.innerText = arguments[0];
            }
        }
    };


    /*
    *   实现提示框的展示动画和消除动画
    * */
    var addHideAndShow = (tag) => {
        /* 展示使用淡入效果，用speed自增来实现加速淡入 */
        tag.show = () => {
            tag.css('opacity', 0)
                .css('display', 'block');

            var speed = 0.001, opacity = 0;
            var showInterval = setInterval(() => {
                opacity += speed;
                tag.css('opacity', opacity);
                speed += 0.01;

                if (opacity >= 1.0) {
                    tag.css('opacity', 1.0);
                    clearInterval(showInterval);
                }
            }, 30);
            isShow = true;
        };

        tag.hideFade = () => {
            tag.css('opacity', 1.0)
                .css('display', 'block');

            var speed = 0.001, opacity = 1;
            var showInterval = setInterval(() => {
                opacity -= speed;
                tag.css('opacity', opacity);
                speed += 0.01;

                if (opacity <= 0) {
                    tag.css('opacity', 0);
                    tag.remove();
                    isShow = false;
                    clearInterval(showInterval);
                }
            }, 30);
            isShow = true;
        };

        /* 消除动画使用的是加速上移到顶部然后消失 */
        tag.hide = (distance) => {
            tag.css('transform', 'translateY(' + distance + ')')
                .css('transition', 'transform .5s ease-out');

            setTimeout(() => {
                tag.remove();
            }, 500);
            isShow = false;
        };
    };

    /*
    *   同样是简化又臭又长的document.createElement()，
    *   顺便为创建的标签加上简化的处理方法addElementFunctions()
    * */
    var createElement = (tagName) => {
        var tag = document.createElement(tagName);
        addElementFunctions(tag);
        return tag;
    };

    /*
    *   使用者的空字符串错误总是要给他们提高一下容错率才是吧，
    * */
    var emptyString = (string) => {
        /*
        *   这里不用花里胡哨的trim(),
        *   如果别人就是想要输出空格呢
        * */
        return string == '' || string == undefined || string == 0 || string == null;
    };

    /*
    *   外层的框架
    *   {width, height, user-select, border, border-radius, overflow, display, position}
    * */
    var createFrame = (param) => {
        var frame = createElement('div');

        frame.setWidth(param.width)
            .setHeight(param.height)
            .css('userSelect', param.userSelect)
            .css('border', param.border)
            .css('borderRadius', param.borderRadius)
            .css('overflow', 'hidden')
            .css('display', param.display)
            .css('position', param.position)
            .css('top', param.top)
            .css('left', param.left)

        addHideAndShow(frame);
        return frame;
    };

    /*
    *   可能需要标题
    *   {width, height, line-height, text-align, font-size, font-weight}
    * */
    var createTitle = (param) => {
        var titleBox = createElement('div');
        titleBox.setWidth(param.width)
            .setHeight(param.height)
            .setLineHeight(param.lineHeight)
            .css('textAlign', param.textAlign)
            .css('fontSize', param.fontSize)
            .css('fontWeight', param.fontWeight)
            .setBackgroundColor(param.backgroundColor)
            .css('color', param.color)
            .text(param.text);
        return titleBox;
    };

    /*
    *   放message的div
    *   {width, height, line-height, font-size, font-weight}
    * */
    var createContainer_NoInput = (param) => {
        var alterContainer = createElement('div');

        alterContainer.css('width', param.width)
            .css('height', param.height)
            .setLineHeight(param.lineHeight)
            .css('fontSize', param.fontSize)
            .css('fontWeight', param.fontWeight)
            .css('textAlign', param.textAlign)
            .css('color', param.color)
            .setBackgroundColor(param.backgroundColor)
            .text(param.message);

        return alterContainer;
    };

    /*
    *   button-box{width, height, text-align}
    *   button{}
    * */
    var createOneButton = (param, frame, frameHide) => {
        var buttonBox = createElement('div'), button = createElement('input');

        buttonBox.appendChild(button);
        buttonBox.setWidth(param.width)
            .setHeight(param.height)
            .css('textAlign', param.textAlign)
            .setBackgroundColor(param.backgroundColor);

        if (param.textAlign === 'right') {
            button.css('marginRight', param.button.marginRight)
        }
        if (param.textAlign === 'left') {
            button.css('marginLeft', param.button.marginLeft)
        }

        button.setWidth(param.button.width)
            .setHeight(param.button.height)
            .setBackgroundColor(param.button.backgroundColor)
            .css('outline', param.button.outline)
            .css('border', param.button.border)
            .css('borderRadius', param.button.borderRadius)
            .css('color', param.button.color)
            .value = param.button.value;
        button.type = 'button';

        button.onmouseover = () => {
            button.setBackgroundColor(param.button.hover.backgroundColor)
                .css('border', param.button.hover.border)
        };
        button.onmouseleave = () => {
            button.setBackgroundColor(param.button.backgroundColor)
                .css('border', param.button.border)
        };

        button.onclick = () => {
            frame.hide(frameHide);
        };

        return buttonBox
    };

    (() => {
        /*
        *   一些默认值
        *   想改变窗口样式可以改这些
        * */
        var ALERT_FRAME_CSS = {
                width: '400px',
                height: '200px',
                border: '1px rgba(0,0,0,0) solid',
                borderRadius: '5px',
                overflow: 'hidden',
                position: 'absolute',
                top: '60px',
                left: 'calc(50% - 200px)',
                userSelect: 'none',
                display: 'none'
            },
            ALERT_TITLE_CSS = {
                width: '100%',
                height: '40px',
                lineHeight: '40px',
                textAlign: 'center',
                fontWeight: 'bold',
                backgroundColor: 'hsla(0, 0%, 100%, .6)',
                color: '#333',
                fontSize: '1.3em',
                text: ''
            },
            ALERT_CONTAINER_CSS = {
                width: '100%',
                height: null,
                lineHeight: null,
                /* 有标题栏的高度 */
                titleHeight: '100px',
                /* 没有标题栏的高度 */
                noTitleHeight: '140px',
                textAlign: 'center',
                backgroundColor: 'hsla(0, 0%, 100%, .8)',
                color: '#000',
                fontSize: '1.0em',
                message: null
            },
            ALERT_BUTTON_BOX_CSS = {
                width: '100%',
                height: '60px',
                backgroundColor: 'hsla(0, 0%, 100%, .8)',
                textAlign: 'center',
                button: {
                    width: '100px',
                    height: '40px',
                    outline: 'none',
                    border: '1px #A4D3EE solid',
                    backgroundColor: '#A4D3EE',
                    borderRadius: '5px',
                    color: '#fff',
                    value: null,
                    hover: {
                        border: '1px #93C2DD solid',
                        backgroundColor: '#93C2DD'
                    }
                }
            };

        window.alert = function (message, title) {
            /* 创建容器 */
            var frame = createFrame(ALERT_FRAME_CSS), container;
            var body = (document.getElementsByTagName('body'))[0];

            /* 标记 */
            var countNow = count++;
            number++;
            /* 一些默认值 */
            ALERT_TITLE_CSS.text = title;
            ALERT_CONTAINER_CSS.message = message;
            ALERT_BUTTON_BOX_CSS.button.value = '确定';

            /* 有标题 */
            if (arguments.length === 2) {
                ALERT_CONTAINER_CSS.height = ALERT_CONTAINER_CSS.titleHeight;
                ALERT_CONTAINER_CSS.lineHeight = ALERT_CONTAINER_CSS.titleHeight;
                var titleBox = createTitle(ALERT_TITLE_CSS);
                container = createContainer_NoInput(ALERT_CONTAINER_CSS);
                frame.appendChild(titleBox);
                frame.appendChild(container)

                /* 无标题 */
            } else if (arguments.length === 1) {
                ALERT_CONTAINER_CSS.height = ALERT_CONTAINER_CSS.noTitleHeight;
                ALERT_CONTAINER_CSS.lineHeight = ALERT_CONTAINER_CSS.noTitleHeight;
                container = createContainer_NoInput(ALERT_CONTAINER_CSS);
                frame.appendChild(container);
            }
            var buttonBox = createOneButton(ALERT_BUTTON_BOX_CSS, frame, '-270px');
            frame.appendChild(buttonBox);
            body.appendChild(frame);

            /* 保证窗口一次只显示一个， 并且按顺序输出 */
            var waitShow = setInterval(() => {
                if (!isShow && countNow === number - count) {
                    frame.show();
                    /* 一次窗口队列输出完毕后， 计数器归零 */
                    if (count === 0) number = 0;
                    /* 下一个窗口 */
                    else count--;
                    clearInterval(waitShow);
                }
            }, 10);
        };

        var TOAST_FRAME_CSS = {
            // width: '400px',
            height: '40px',
            border: '1px rgba(0,0,0,0) solid',
            borderRadius: '5px',
            overflow: 'hidden',
            position: 'absolute',
            userSelect: 'none',
            display: 'block'
        };
        window.toast = (message, time) => {
            /* 创建容器 */
            var frame = createFrame(TOAST_FRAME_CSS);
            var body = (document.getElementsByTagName('body'))[0];
            /* 标记 */
            var countNow = count++;
            number++;

            /* 样式初始化 */
            frame.setLineHeight(TOAST_FRAME_CSS.height)
                .css('padding', '0 10px')
                .setBackgroundColor('rgba(0,0,0,.5)')
                .css('color', '#FFF')
                .css('fontSize', '1em')
                .css('fontWeight', 'normal')
                .text(message);

            /*
             *  不把元素加入页面并且display不是block得到的宽度就为零
             *  所以要先append进页面，并且display要为block
             **/
            body.appendChild(frame);
            /* 使他居中 */
            var frameWidth = frame.getWidth();
            frame.css('left', 'calc(50% - '+(frameWidth/2)+'px)')
                .css('top', '100px')
                .css('display', 'none');

            time = time || 1000;
            /* 保证窗口一次只显示一个， 并且按顺序输出 */
            var waitShow = setInterval(() => {
                if (!isShow && countNow === number - count) {
                    frame.show();
                    /* 一次窗口队列输出完毕后， 计数器归零 */
                    if (count === 0) number = 0;
                    /* 下一个窗口 */
                    else count--;
                    clearInterval(waitShow);
                    /* 延时关闭 */
                    setTimeout(()=>{
                        frame.hideFade()
                    },time);
                }
            }, 10);
        };
    })();
})();