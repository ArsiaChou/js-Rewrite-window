# js-Rewrite-window

## 主要实现

 - 显示实现
    - 出现多次连续使用时一次只显示一个提示框
    - 显示顺序用计数器实现按顺序弹出

 - alert重写
    - alert (message) 无标题
    - alert (message, title) 有标题

 - 添加toast
    - toast (message)
    - toast (mesage, time)
    
 - confirm重写
    - confirm(function(select){}, message) 无标题
    - confirm(function(select){}, message, title) 有标题

## alert
   `alert('message')`
    
   ![no title](https://github.com/ArsiaChou/js-Rewrite-window/raw/master/image/no-title-alert.png)
   
   `alert('message', 'title')`
   
   ![title](https://github.com/ArsiaChou/js-Rewrite-window/raw/master/image/title-alert.png)
   
   
## toast
   `toast('message') or toast('message', 1000)`
   
   ![toast](https://github.com/ArsiaChou/js-Rewrite-window/raw/master/image/toast.png)
   
## confirm
   `confirm(function(select){}, 'message')`
   
   ![no title](https://github.com/ArsiaChou/js-Rewrite-window/raw/master/image/no-title-confirm.png)
   
   `confirm(function(select){}, 'message', 'title')`
   
   ![no title](https://github.com/ArsiaChou/js-Rewrite-window/raw/master/image/title-confirm.png)
   
