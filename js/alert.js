(function (win) {
    //调用接口
    win.tip = {};
    //样式
    win.tip.style = {
        bgc: {
            normal: 'rgba(0, 0, 0, .5)',
            error: 'rgba(255, 30, 30, .5)',
            warn: 'rgba(255, 255, 0, .5)',
            success: 'rgba(173, 255, 47, .5)'
        },
        color: {
            normal: '#FFF',
            error: '#FFF',
            warn: '#FFF',
            success: '#FFF',
            close: '#FFF'
        },
        body: {
            float: 'right',
            padding: '10px',
            margin: '10px 20px 0 0'
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
            return $body;
        },
        close: () => {
            var $close = document.createElement('div');
            $close.style.float = 'right';
            $close.style.margin = '0';
            $close.innerText = '×';
            $close.style.fontSize = '1.4em';
            $close.style.fontWeight = 'bold';
            $close.style.color = win.tip.style.color.close;
            $close.style.cursor = 'pointer';
            return $close;
        },
        title: (title) => {
            var $title = document.createElement('div');
            $title.innerText = title;
            $title.style.fontSize = '1.2em';
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
    //alert
    win.tip.alert = (message, title, type, time) => {
        title = typeof title === 'undefined'?' ':title;
        message = typeof message === 'undefined'?' ':message;
        var $body = subgroup.body('200px'),
            $up = document.createElement('div'),
            $title = subgroup.title(title),
            $close = subgroup.close(),
            $content = subgroup.content(message);

        type = typeof type === 'undefined'?'normal':type;
        switch (type) {
            case 'normal':
                $body.style.backgroundColor = win.tip.style.bgc.normal;
                $body.style.color = win.tip.style.color.normal;
                break;
            case 'error':
                $body.style.backgroundColor = win.tip.style.bgc.error;
                $body.style.color = win.tip.style.color.error;
                break;
            case 'warn':
                $body.style.backgroundColor = win.tip.style.bgc.warn;
                $body.style.color = win.tip.style.color.warn;
                break;
            case 'success':
                $body.style.backgroundColor = win.tip.style.bgc.success;
                $body.style.color = win.tip.style.color.success;
                break;
            default:
                $body.style.backgroundColor = win.tip.style.bgc.normal;
                $body.style.color = win.tip.style.color.normal;
        }

        $up.style.clear = 'both';
        $up.append($title);
        $up.append($close);
        $body.append($up);
        $body.append($content);

        //关闭事件
        $close.onclick = function () {
            $body.remove();
        };
        $close.onmousemove = function() {
            $close.style.color = 'red';
        };
        $close.onmouseleave = function() {
            $close.style.color = '#FFF';
        };
        //延时自动关闭
        time = typeof title === 'undefined'?2000:time;
        setTimeout(() => {
            $close.click();
        }, time);
        //加入网页
        document.body.prepend($body);
    };
})(window);