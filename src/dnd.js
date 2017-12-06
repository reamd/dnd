/**
 * Created by reamd on 2017/12/5.
 */
'use strict';
(function(global, factory){
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        global.Dnd = factory();
    }
})(typeof window !== 'undefined' ? window : this, function(){
    var moveDom, skewingX, skewingY;
    var dnd = {
        options: {},
        mouseEvent: _isMobile()?['touchstart','touchmove','touchend']:['mousedown','mousemove','mouseup'],
        setConfig: function(opts){
            var key, value;
            for(key in opts){
                value = opts[key];
                if (value !== undefined && opts.hasOwnProperty(key)){
                    this.options[key] = value;
                }
            }
            return this;
        },
        dealOpts: function () {
            var opts = this.options;
            this.options['clone'] = opts['clone']? true : false;
            this.options['container'] = typeof opts['container'] === 'undefined'
                ? 'body'
                : opts['container'];

        },
        bindMouseEvent: function(){
            var items = this.options.items;
            var cloneFlag = this.options.clone;
            var container = document.querySelector(this.options.container);
            var subClassName = this.options.subContainer;
            var drags = this.options.drags;
            var _this = this;
            var startX, startY;

            for(var i = 0, len = items.length; i < len; i++){
                (function(i){
                    // 给新建元素绑定鼠标down事件
                    items[i].dom.addEventListener(_this.mouseEvent[0], function(e){
                        var dBCR, top, left;
                        if(cloneFlag) {
                            moveDom = this.cloneNode(true);
                            if(typeof items[i].dragType !== 'undefined') {
                                moveDom.setAttribute('dragType' ,items[i].dragType);
                                moveDom.setAttribute('class', drags[items[i].dragType].className);
                            }
                            moveDom.setAttribute('id', new Date().getTime());
                            !!subClassName
                                ? container.querySelector(subClassName).appendChild(moveDom)
                                : container.appendChild(moveDom);

                            dBCR = moveDom.getBoundingClientRect();
                            skewingX = dBCR.width / 2;  //鼠标偏移量
                            skewingY = dBCR.height / 2;
                            startY = typeof e.clientY !== 'undefined'? e.clientY : e.touches[0].clientY;
                            startX = typeof e.clientX !== 'undefined'? e.clientX : e.touches[0].clientX;
                            top = (startY - skewingY) + 'px';
                            left = (startX - skewingX) + 'px';

                        }else {
                            moveDom = this;
                            moveDom.style.zIndex = 999;
                            dBCR = moveDom.getBoundingClientRect();
                            skewingX = dBCR.width / 2;  //鼠标偏移量
                            skewingY = dBCR.height / 2;
                            top = dBCR.top + 'px';
                            left = dBCR.left + 'px';
                        }
                        moveDom.style.position = "fixed";
                        moveDom.style.top = top;
                        moveDom.style.left = left;

                        // 移除鼠标up事件
                        document.body.removeEventListener(_this.mouseEvent[2], _upFuc, false);
                        // 绑定鼠标移动事件
                        document.body.addEventListener(_this.mouseEvent[1], _moveFuc, false);
                        // 绑定鼠标up事件
                        document.body.addEventListener(_this.mouseEvent[2], _upFuc, false);

                    });

                })(i);
            }
            return this;
        },
        init: function(opts){
            this.setConfig(opts);
            this.bindMouseEvent();
        }
    };

    // 判断是否移动端
    function _isMobile() {
        var isTrue = false;
        //判断是否移动端设备的JS代码
        if(navigator.userAgent.match(/(iPhone|iPad|Android|ios)/i)) {
            isTrue = true;
        }else {
            isTrue = false;
        }
        return isTrue;
    }

    // 新元素鼠标移动事件
    function _moveFuc(e){
        var moveY = typeof e.clientY !== 'undefined'? e.clientY : e.touches[0].clientY;
        var moveX = typeof e.clientX !== 'undefined'? e.clientX : e.touches[0].clientX;
        moveDom.style.top = (moveY - skewingY) + 'px';
        moveDom.style.left = (moveX - skewingX) + 'px';
    }

    // 新元素鼠标up事件
    function _upFuc(e){
        document.body.removeEventListener(dnd.mouseEvent[1], _moveFuc, false);
        if(dnd.options.clone) {
            moveDom.addEventListener(dnd.mouseEvent[0], _dragDown, false);
        }else {
            moveDom.style.zIndex = "";
        }
    }

    // 容器中元素鼠标down
    function _dragDown(e){
        moveDom = this;
        moveDom.style.zIndex = 999;
        document.body.removeEventListener(dnd.mouseEvent[2], _upFuc, false);
        document.body.removeEventListener(dnd.mouseEvent[2], _dragUp, false);

        document.body.addEventListener(dnd.mouseEvent[1], _dragMove, false);
        document.body.addEventListener(dnd.mouseEvent[2], _dragUp, false);
    }

    // 容器中元素的移动
    function _dragMove(e){
        var moveY = typeof e.clientY !== 'undefined'? e.clientY : e.touches[0].clientY;
        var moveX = typeof e.clientX !== 'undefined'? e.clientX : e.touches[0].clientX;
        var top = moveY - skewingY;
        var left = moveX - skewingX;
        moveDom.style.top = top + 'px';
        moveDom.style.left = left + 'px';
    }

    // 容器中元素鼠标up
    function _dragUp(e){
        moveDom.style.zIndex = "";
        document.body.removeEventListener(dnd.mouseEvent[1], _dragMove, false);
    }

    return dnd;
});