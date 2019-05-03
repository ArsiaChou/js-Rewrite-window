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

## alert
   `alert('message')`
    
   ![no title](image/no-title-alert.png)
   
   `alert('message', 'title')`
   
   ![title](image/title-alert.png)
   
   
## toast
   `toast('message') or toast('message', 1000)`
   
   ![toast](image/toast.png)
