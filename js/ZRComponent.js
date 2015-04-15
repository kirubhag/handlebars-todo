//$Id$
/**
 * Created by WebStorm.
 * User: kirubha-2911
 * Date: 3/16/15
 * Time: 2:47 PM
 * Project: webapps
 * File Name: ZRComponent
 */

var ZRComponent = (function () {

    /*Do not change this*/
    var ZRComponent = ZRComponent || {};
    var keys = [37, 38, 39, 40];
    var btnAlignClassArray = ['al', 'ac', 'ar'];//NO I18N
    var btnArrayClass = ["btn-primary", "btn-secondary", "btn-positive", "btn-negative"];//NO I18N
    var positionArray = ['top', 'middle', 'bottom', 'middletop', 'middlebottom'];//NO I18N

    var defaultModelBox = {
        modalClass: "model-box-wrap zrc-modal-block confirm w400",//NO I18N
        btnClass: "zrc-btns-block ",//NO I18N
        btnAlign: "ar",//NO I18N
        position: 'middletop'//NO I18N
    };

    ZRComponent.keydown = function (e) {
        if ($.inArray(e.keyCode, keys) !== -1) {
            ZRCommonUtil.preventDefault(e);
            return;
        }
    };

    ZRComponent.wheel = function (e) {
        ZRCommonUtil.preventDefault(e);
    };

    ZRComponent.disableScroll = function () {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', ZRComponent.wheel, false);//NO I18N
        }
        window.onmousewheel = document.onmousewheel = ZRComponent.wheel;
        document.onkeydown = ZRComponent.keydown;
    };

    ZRComponent.enableScroll = function () {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', ZRComponent.wheel, false);//NO I18N
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    };

    ZRComponent.hideModalBox = function (tgtId) {
        ZRComponent.enableScroll();
        var targetId = '#' + tgtId;
        if ($(targetId).css('bottom') != '0px') {
            $(targetId).css({top: "-300px"});
            $(targetId).parent().fadeOut(1200, function () {
                if ($(this).data('removedialog') === true) {
                    $(this).remove();
                }
            });
        } else {
            var box = $(targetId)[0];
            ZRComponent.popup = box;
            ZRComponent.popup.style.bottom = '';
            ZRComponent.popup.style.top = box.getBoundingClientRect().top + 'px';
            $(targetId).css({top: -300});
            $(targetId).parent().fadeOut(1200, function () {
                if ($(this).data('removedialog') === true) {
                    $(this).remove();
                }
            });
        }
    };

    /*Default Model Box Setting goes here.You can edit it as your wish*/

    ZRComponent.getDefaultModalBoxVal = function (attr) {
        return (typeof attr === 'string' && defaultModelBox[attr]) ? defaultModelBox[attr] : undefined;
    };

    ZRComponent.getBtnClass = function (arg) {
        return (arg >= 0 && arg <= btnArrayClass.length - 1) ? btnArrayClass[arg] : btnArrayClass[0];
    };

    ZRComponent.resizeMonitor = true;

    ZRComponent.ConstError = {
        Error1: "Pass only object as parameter to this function.",//NO I18N
        Error2: "Provide valid value for the width parameter.",//NO I18N
        Error3: "Modal box Html template already available in the page."//NO I18N
    };

    ZRComponent.generateModalBox = function (args, modalBox, ModalBoxType) {
        $('body').append(modalBox);//NO I18N
        ZRComponent.popup = $('#' + args.modalId)[0];
        ZRComponent.showModalBox(args);
    };

    ZRComponent.AnimationDuration = 100;

    /*This will place the content at the middle of the screen*/
    ZRComponent.makeItMiddle = function (sw, sh) {
        var h = ZRComponent.popup.offsetHeight;
        var w = ZRComponent.popup.offsetWidth;
        var top = (( sh / 2) - (h / 2)) + 'px';//NO I18N
        var left = ((sw / 2) - (w / 2)) + 'px';//NO I18N
        ZRComponent.popup.style.left = left;
        $(ZRComponent.popup).animate({top: top}, ZRComponent.AnimationDuration);
    };

    ZRComponent.showModalBox = function (args) {

        var position = args.position;
        ZRComponent.disableScroll();
        var targetId = '#' + args.modalId;
        $(targetId).parent().fadeIn('fast');
        if (position == 'top') {
            ZRComponent.resetPosition();
            $(ZRComponent.popup).animate({top: 0}, ZRComponent.AnimationDuration);
        }

        if (position == 'middle') {
            ZRComponent.resetPosition();
            ZRComponent.makeItMiddle($(window).width(), $(window).height());
        }

        if (position == 'middletop') {
            ZRComponent.resetPosition();
            ZRComponent.makeItMiddle($(window).width(), $(window).height());
            $(ZRComponent.popup).animate({top: 0}, ZRComponent.AnimationDuration);
        }

        if (position == 'middlebottom') {
            ZRComponent.resetPosition();
            ZRComponent.makeItMiddle($(window).width(), $(window).height());
            $(ZRComponent.popup).animate({top: $(window).height() - ZRComponent.popup.offsetHeight}, ZRComponent.AnimationDuration);
        }

        if (position == 'bottom') {
            ZRComponent.resetPosition();
            $(ZRComponent.popup).animate({top: $(window).height() - ZRComponent.popup.offsetHeight}, ZRComponent.AnimationDuration);
        }
    };

    ZRComponent.resetPosition = function () {
        $('.model-box-wrap').removeClass('hideAbove');
        ZRComponent.popup.style.top = '';
        ZRComponent.popup.style.left = '';
        ZRComponent.popup.style.bottom = '';
    };

    ZRComponent.closeFunction = function (ev, target, mId) {
        ZRComponent.hideModalBox(mId);
    };

    ZRComponent.createAlert = function (args) {
        ZRComponent.disableScroll();
        args = (args && typeof args === 'object') ? args : {};//NO I18N
        var modalClass = (args && args.modalClass) ? 'model-box-wrap zrc-modal-block confirm ' + args.modalClass : ZRComponent.getDefaultModalBoxVal('modalClass');//NO I18N
        var modalId = (args && args.modalId) ? args.modalId : "zrc-modal-box-" + $('.model-box-wrap').length;//NO I18N
        var removeFreeze = (args && args.hasOwnProperty('removeFreeze') && args.removeFreeze === true) ? args.removeFreeze : false;//NO I18N
        var removeDialog = (args && args.hasOwnProperty('removeDialog')) ? args.removeDialog : true;//NO I18N
        var needFreezeClass = (removeFreeze === true) ? '' : 'modal-freeze';//NO I18N
        var modalTitle = (args && args.title) ? args.title : I18n.getMsg('zr.component.modalbox.alert.title');//NO I18N
        var modalContent = (args && args.content) ? args.content : Utils.createHTML({
            "name": "p",//NO I18N
            "html": I18n.getMsg('zr.component.modalbox.alert.defaultcontent')//NO I18N
        });
        var btnAlignClass = (args && args.btnAlignClass) ? ($.inArray(args.btnAlignClass, btnAlignClassArray) !== -1) ? args.btnAlignClass : ZRComponent.getDefaultModalBoxVal('btnAlign') : ZRComponent.getDefaultModalBoxVal('btnAlign');//NO I18N
        btnAlignClass = ZRComponent.getDefaultModalBoxVal('btnClass') + btnAlignClass;//NO I18N
        var okButtonLabel = (args && args.okbtnLabel) ? args.okbtnLabel : I18n.getMsg('ok').toUpperCase();//NO I18N
        var okButtonType = (args && args.okbtnClass) ? args.okbtnClass : ZRComponent.getBtnClass(2);
        var okButtonFun = (args && args.okbtnFn) ? args.okbtnFn : ZRComponent.closeFunction;
        var okButtonArg = (args && args.okbtnArg) ? args.okbtnArg : [modalId];
        var closeFun = (args && args.closeFn && typeof args.closeFn === 'function') ? args.closefn : ZRComponent.closeFunction;//NO I18N
        var callback = (args && args.callback && typeof  args.callback === 'function') ? args.callback : undefined;//NO I18N
        var callbackArg = (args && args.callbackarg) ? args.callbackarg : undefined;
        args.position = (args && args.position && $.inArray(args.position, positionArray) != -1) ? args.position : ZRComponent.getDefaultModalBoxVal('position');
        args.modalId = modalId;

        var createElem = Utils.createHTML({
            "name": "div",//NO I18N
            "attr": {"class": needFreezeClass, "data-removefreeze": removeFreeze, "data-removedialog": removeDialog},//NO I18N
            "child"://No I18N
                [{
                    "name": "div",//NO I18N
                    "attr": {"class": modalClass, "id": modalId},//NO I18N
                    "child": [{//NO I18N
                        "name": "a",//NO I18N
                        "attr": {"href": "javascript:void(0)", "class": "zrc-close-modal"},//NO I18N
                        "html": "&times;",//NO I18N
                        "events": [{"name": "click", "fn": closeFun, "args": [modalId]}]//NO I18N
                    },//No I18N
                        {"name": "h2", "attr": {"class": "til"}, "html": modalTitle},//NO I18N
                        {"name": "div", "attr": {"class": "zrc-modal-content"}, "html": modalContent},//NO I18N
                        {
                            "name": "div", "attr": {"class": btnAlignClass}, "child"://No I18N
                            [{
                                "name": "input",//NO I18N
                                "attr": {"type": "button", "class": okButtonType, "value": okButtonLabel},//NO I18N
                                "events": [{"name": "click", "fn": okButtonFun, "args": okButtonArg}]//NO I18N
                            }]
                        }]
                }]
        });

        ZRComponent.generateModalBox(args, createElem, 'alert');//NO I18N
        if (callback) {
            callback(callbackArg);
        }
    };

    ZRComponent.createConfirm = function (args) {
        ZRComponent.disableScroll();
        args = (args && typeof args === 'object') ? args : {};//NO I18N
        var modalClass = (args && args.modalClass) ? 'model-box-wrap zrc-modal-block confirm ' + args.modalClass : ZRComponent.getDefaultModalBoxVal('modalClass');//NO I18N
        var modalId = (args && args.modalId) ? args.modalId : "zrc-modal-box-" + $('.model-box-wrap').length;//NO I18N
        var removeFreeze = (args && args.hasOwnProperty('removeFreeze') && args.removeFreeze === true) ? args.removeFreeze : false;//NO I18N
        var removeDialog = (args && args.hasOwnProperty('removeDialog')) ? args.removeDialog : true;//NO I18N
        var needFreezeClass = (removeFreeze === true) ? '' : 'modal-freeze';
        var modalTitle = (args && args.title) ? args.title : I18n.getMsg('zr.component.modalbox.confirm.title');
        var modalContent = (args && args.content) ? args.content : Utils.createHTML({
            "name": "p",//NO I18N
            "html": I18n.getMsg('zr.component.modalbox.alert.defaultcontent')//NO I18N
        });
        var btnAlignClass = (args && args.btnAlignClass) ? ($.inArray(args.btnAlignClass, btnAlignClassArray) !== -1) ? args.btnAlignClass : ZRComponent.getDefaultModalBoxVal('btnAlign') : ZRComponent.getDefaultModalBoxVal('btnAlign');//NO I18N
        btnAlignClass = ZRComponent.getDefaultModalBoxVal('btnClass') + btnAlignClass;//NO I18N
        var confirmButtonLabel = (args && args.confirmButtonLabel) ? args.confirmButtonLabel : I18n.getMsg('zr.component.modalbox.button.lable.delete').toUpperCase();
        var confirmButtonClass = (args && args.confirmBtnClass) ? args.confirmBtnClass : ZRComponent.getBtnClass(4);
        var confirmButtonFun = (args && args.confirmButtonFun) ? args.confirmButtonFun : undefined;
        var confirmButtonArg = (args && args.confirmButtonArg) ? args.confirmButtonArg : undefined;

        var cancelButtonLabel = (args && args.cancelButtonLabel) ? args.cancelButtonLabel : I18n.getMsg('zr.component.modalbox.button.lable.cancel').toUpperCase();
        var cancelButtonClass = (args && args.cancelBtnClass) ? args.cancelBtnClass : ZRComponent.getBtnClass(2);
        var cancelButtonFun = (args && args.cancelButtonFun) ? args.cancelButtonFun : ZRComponent.closeFunction;
        var cancelButtonArg = (args && args.cancelButtonArg) ? args.cancelButtonArg : [modalId];

        var closeFun = (args && args.closeFn && typeof args.closeFn === 'function') ? args.closefn : ZRComponent.closeFunction;//NO I18N
        var callback = (args && args.callback && typeof  args.callback === 'function') ? args.callback : undefined;//NO I18N
        var callbackArg = (args && args.callbackArg) ? args.callbackArg : undefined;
        args.position = (args && args.position && $.inArray(args.position, positionArray) != -1) ? args.position : ZRComponent.getDefaultModalBoxVal('position');
        args.modalId = modalId;

        var createElem = Utils.createHTML({
            "name": "div", //NO I18N
            "attr": {"class": needFreezeClass, "data-removefreeze": removeFreeze, "data-removedialog": removeDialog},//NO I18N
            "child"://No I18N
                [{
                    "name": "div",//NO I18N
                    "attr": {"class": modalClass, "id": modalId},//NO I18N
                    "child": [{//NO I18N
                        "name": "a",//NO I18N
                        "attr": {"href": "javascript:void(0)", "class": "zrc-close-modal"},//NO I18N
                        "html": "&times;",//NO I18N
                        "events": [{"name": "click", "fn": closeFun, "args": [modalId]}]//NO I18N
                    },//No I18N
                        {"name": "h2", "attr": {"class": "til"}, "html": modalTitle},//NO I18N
                        {"name": "div", "attr": {"class": "zrc-modal-content"}, "html": modalContent},//NO I18N
                        {
                            "name": "div", "attr": {"class": btnAlignClass}, "child"://No I18N
                            [
                                {
                                    "name": "input",//NO I18N
                                    "attr": { //NO I18N
                                        "type": "button",//NO I18N
                                        "class": confirmButtonClass,//NO I18N
                                        "value": confirmButtonLabel //NO I18N
                                    },
                                    "events": [{"name": "click", "fn": confirmButtonFun, "args": confirmButtonArg}]//NO I18N
                                },
                                {
                                    "name": "input",//NO I18N
                                    "attr": {//NO I18N
                                        "type": "button",//NO I18N
                                        "class": cancelButtonClass + " marL15",//NO I18N
                                        "value": cancelButtonLabel//NO I18N
                                    },
                                    "events": [{"name": "click", "fn": cancelButtonFun, "args": cancelButtonArg}]//NO I18N
                                }
                            ]
                        }]
                }]
        });

        ZRComponent.generateModalBox(args, createElem, 'alert');//NO I18N
        if (callback) {
            callback(callbackArg);
        }

    };

    return ZRComponent;
})();


/*This is Model Box resize monitor*/
$(window).resize(function () {
    if (ZRComponent.resizeMonitor && ZRComponent.popup !== undefined) {
        if (ZRComponent.popup.offsetTop > 0) {
            ZRComponent.makeItMiddle($(window).width(), $(window).height());
        }
    }
});