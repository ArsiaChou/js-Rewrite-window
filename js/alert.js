(function (win) {
    //调用接口
    win.tip = {};
    //样式
    win.tip.style = {
        /* background color */
        bgc: {
            normal: 'rgba(0, 0, 0, .5)',
            error: 'rgba(255, 30, 30, .5)',
            warn: 'rgba(255, 255, 0, .5)',
            success: 'rgba(173, 255, 47, .5)'
        },
        /* font color */
        fc: {
            normal: '#FFF',
            error: '#FFF',
            warn: '#FFF',
            success: '#FFF',
            close: '#FFF'
        },
        body: {
            padding: '10px',
            top: '10px',
            right: '20px',
            bottom: '',
            left: '',
        }
    };
    //部件创建
    var subgroup = {
        body: (width) => {
            var $body = document.createElement('div');
            $body.style.width = width;
            $body.style.padding = win.tip.style.body.padding;
            $body.style.margin = win.tip.style.body.margin;
            $body.style.float = win.tip.style.body.float;
            $body.style.border = '1px rgba(0,0,0,0) solid';
            $body.style.borderRadius = '5px';
            $body.style.userSelect = 'none';
            $body.style.position = 'absolute';
            $body.style.top = win.tip.style.body.top;
            $body.style.right = win.tip.style.body.right;
            $body.style.bottom = win.tip.style.body.bottom;
            $body.style.left = win.tip.style.body.left;
            return $body;
        },
        close: () => {
            var $close = document.createElement('div');
            $close.style.float = 'right';
            $close.style.margin = '0';
            $close.innerText = '×';
            $close.style.fontSize = '1.4em';
            $close.style.fontWeight = 'bold';
            $close.style.color = win.tip.style.fc.close;
            $close.style.cursor = 'pointer';
            return $close;
        },
        title: (title) => {
            var $title = document.createElement('div');
            $title.innerText = title;
            $title.style.fontSize = '1.1em';
            $title.style.fontWeight = 'bold';
            $title.style.float = 'left';
            return $title;
        },
        content: (connect) => {
            var $connect = document.createElement('div');
            $connect.innerText = connect;
            $connect.style.fontSize = '1em';
            $connect.style.fontWeight = 'normal';
            $connect.style.clear = 'both';
            return $connect;
        }
    };
    //alert 状态选择
    var alertType = function($body, type) {
        type = typeof type === 'undefined'?'normal':type;
        switch (type) {
            case 'normal':
                $body.style.backgroundColor = win.tip.style.bgc.normal;
                $body.style.color = win.tip.style.fc.normal;
                break;
            case 'error':
                $body.style.backgroundColor = win.tip.style.bgc.error;
                $body.style.color = win.tip.style.fc.error;
                break;
            case 'warn':
                $body.style.backgroundColor = win.tip.style.bgc.warn;
                $body.style.color = win.tip.style.fc.warn;
                break;
            case 'success':
                $body.style.backgroundColor = win.tip.style.bgc.success;
                $body.style.color = win.tip.style.fc.success;
                break;
            default:
                $body.style.backgroundColor = win.tip.style.bgc.normal;
                $body.style.color = win.tip.style.fc.normal;
        }
    };
    //alert
    win.tip.alert = (message, title, type, time) => {
        title = typeof title === 'undefined'?' ':title;
        message = typeof message === 'undefined'?' ':message;
        var $body = subgroup.body('200px'),
            $up = document.createElement('div'),
            $title = subgroup.title(title),
            $close = subgroup.close(),
            $content = subgroup.content(message);

        alertType($body, type);

        $up.style.clear = 'both';
        $up.append($title);
        $up.append($close);
        $body.append($up);
        $body.append($content);

        //关闭事件
        var closeClick = false;
        $close.onclick = function () {
           if (!closeClick) {
               //淡出
               closeClick = true;
               var opacity = 1, speed = 0.01;
               var alertFadeOut = setInterval(() => {
                   opacity -= speed;
                   speed += 0.03;
                   $body.style.opacity = opacity;
                   if (opacity <= 0) {
                       $body.style.opacity = 0;
                       clearInterval(alertFadeOut);
                   }
               }, 20);
           }
        };
        $close.onmousemove = function() {
            $close.style.color = '#FF0030';
        };
        $close.onmouseleave = function() {
            $close.style.color = '#FFF';
        };
        //淡入
        document.body.append($body);
        $body.style.opacity = 0;
        var opacity = 0, speed = 0.01;
        var alertFadeIn = setInterval(() => {
            opacity += speed;
            speed += 0.03;
            $body.style.opacity = opacity;
            if (opacity >= 1) {
                $body.style.opacity = 1;
                clearInterval(alertFadeIn);
            }
        }, 20);
        //延时自动关闭
        time = typeof title === 'undefined'?2000:time+50;
        setTimeout(() => {
            $close.click();
        }, time);
    };
})(window);