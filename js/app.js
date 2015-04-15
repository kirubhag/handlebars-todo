/**
 * Created by WebStorm.
 * User: kirubha-2911
 * Date: 3/15/15
 * Time: 1:44 AM
 * Project: Task_1
 * File Name: app
 */

var TaskStatus = "unfinished";

(function () {
    Handlebars.registerHelper("iterate", function (content, option) {
        var temp = "";
        $.each(content, function (index, val) {
            if (TaskStatus === 'all') {
                if (val.status === "finished" || val.status === "unfinished") {
                    temp += option.fn({
                        id: val.id,
                        title: val.title,
                        content: val.content,
                        isFinished: (val.status === "finished" && TaskStatus === "all") ? "st" : ""
                    });
                }
            } else if (TaskStatus === 'trash') {
                if (val.status.split('+')[0] === TaskStatus) {
                    temp += option.fn({
                        id: val.id,
                        title: val.title,
                        content: val.content,
                        isFinished: (val.status.split('+')[0] === "trash" && val.status.split('+')[1] === "100") ? "st" : ""
                    });
                }
            } else {
                if (val.status === TaskStatus) {
                    temp += option.fn({
                        id: val.id,
                        title: val.title,
                        content: val.content,
                        isFinished: (val.status === "finished" && TaskStatus === "finished") ? "st" : ""
                    });
                }
            }
        });

        return temp;
    });
})();

var TODO = (function () {

    var TODO = {};
    var source = $('#my-blog').html();
    var template;

    TODO.popup = $('.add-task-wrap')[0];

    TODO.makeItMiddle = function (sw, sh) {
        var h = TODO.popup.offsetHeight;
        var w = TODO.popup.offsetWidth;
        var top = (( sh / 2) - (h / 2)) + 'px';
        var left = ((sw / 2) - (w / 2)) + 'px';
        TODO.popup.style.left = left;
        TODO.popup.style.top = top;
    };

    TODO.taskList = {
        blogs: [
            {
                id: 1,
                title: "JS Dictionary",
                content: "Provides off-line hand-held JS dictionary with you always.Provides off-line hand-held JS dictionary with you always.",
                status: "unfinished"
            },
            {
                id: 2,
                title: "FBChatTheme",
                content: "Allow you to customize the FB Chat as your wish.",
                status: "unfinished"
            },
            {
                id: 3,
                title: "ZohoChat",
                content: "Allow you to customize the ZohoChat as your wish.",
                status: "finished"
            },
            {id: 4, title: "TODO", content: "My very first handlebar JS.", status: "trash"}
        ]
    };

    TODO.init = function () {
        TODO.storeData();

        template = Handlebars.compile(source);
        $('.blog-wrap').append(template(TODO.taskList));
        TODO.bindJSForDynamicElements();
    };

    TODO.storeData = function () {
        if (localStorage || window.localStorage) {
            localStorage.taskList = JSON.stringify(TODO.taskList);
        }
    };

    TODO.renderTrashedTash = function () {

        var tempData = JSON.parse(localStorage.taskList);
        $('.blog-wrap').html("");

        TaskStatus = "trash";
        template = Handlebars.compile(source);
        $('.blog-wrap').append(template(tempData));
        if (!$('.blog').length) {
            $('.blog-wrap').html("<p class='text-center'>Woohoo! No tasks in the Trash label.</p>");
        }

        TODO.bindJSForDynamicElements();
    };

    TODO.renderFinishedTash = function () {

        var tempData = JSON.parse(localStorage.taskList);
        $('.blog-wrap').html("");

        TaskStatus = "finished";
        template = Handlebars.compile(source);
        $('.blog-wrap').append(template(tempData));
        if (!$('.blog').length) {
            $('.blog-wrap').html("<p class='text-center'>Woohoo! No tasks in the Finished label.</p>");
        }

        TODO.bindJSForDynamicElements();
    };

    TODO.renderUnfinishedTash = function () {

        var tempData = JSON.parse(localStorage.taskList);
        $('.blog-wrap').html("");

        TaskStatus = "unfinished";
        template = Handlebars.compile(source);
        $('.blog-wrap').append(template(tempData));
        if (!$('.blog').length) {
            $('.blog-wrap').html("<p class='text-center'>Woohoo! No tasks in the Unfinished label.</p>");
        }

        TODO.bindJSForDynamicElements();
    };

    TODO.renderAllTask = function () {

        var tempData = JSON.parse(localStorage.taskList);
        $('.blog-wrap').html("");

        TaskStatus = "all";
        template = Handlebars.compile(source);
        $('.blog-wrap').append(template(tempData));
        if (!$('.blog').length) {
            $('.blog-wrap').html("<p class='text-center'>Woohoo! No tasks in the All label.</p>");
        }

        TODO.bindJSForDynamicElements();
    };

    TODO.bindJSForDynamicElements = function () {

        $('.blog').on('click', function () {
            ($(this).find('.fa').hasClass('fa-square-o')) ? $(this).find('.fa').addClass('fa-check-square-o').removeClass('fa-square-o') : $(this).find('.fa').addClass('fa-square-o').removeClass('fa-check-square-o');
            //$('.detailed-view').stop().animate({right: 0}, 600);
        });

    };

    TODO.init();

    return TODO;
})();

$(document).ready(function () {


    /*Left menu click manager*/
    $('.lmenu>ul>li>a').on('click', function () {

        $(this).parent().parent().find('.active').removeClass('active');
        $(this).parent().find('a').addClass('active');
        $('.task-ctrls').find('.fa-check-square-o,.fa-square-o').addClass('fa-square-o').removeClass('fa-check-square-o');

        if ($(this).find('span').html() == "Create") {
            $('.freeze').show();
            $('#task-status').fadeOut('fast');
            TODO.makeItMiddle($(window).width(), $(window).height());
        }

        if ($(this).find('span').html() == "Unfinished") {
            $('#task-status').fadeIn('fast').find('span').html('Mark as Finished');
            TODO.renderUnfinishedTash();
        }

        if ($(this).find('span').html() == "Finished") {
            $('#task-status').fadeIn('fast').find('span').html('Mark as Unfinished');
            TODO.renderFinishedTash();
        }

        if ($(this).find('span').html() == "All") {
            $('#task-status').fadeOut('fast');
            TODO.renderAllTask();
        }

        if ($(this).find('span').html() == "Trash") {
            $('#task-status').fadeOut('fast');
            TODO.renderTrashedTash();
        }
    });

    $('.freeze').on('click', function (e) {
        e.stopPropagation();
        $(this).hide();
    });

    $('.add-task-wrap').on('click', function (e) {
        e.stopPropagation();
    });

    $('.fa-square-o').click(function (e) {
        ($(this).hasClass('fa-square-o')) ? $(this).addClass('fa-check-square-o').removeClass('fa-square-o') : $(this).addClass('fa-square-o').removeClass('fa-check-square-o');
    });

    $('.btn-close').on('click', function () {
        $('.freeze').trigger('click');
    });

    /*For adding new TODO*/
    $('.btn').on('click', function () {
        if ($(this).html() == 'Add Task') {
            if ($('#task-title').val().length > 3 && $('#task-detail').val().length > 3) {
                var title = $('#task-title').val();
                var content = $('#task-detail').val();
                var tempData = JSON.parse(localStorage.taskList);
                var newTask = {
                    id: (tempData.blogs.length + 1), title: title, content: content, status: "unfinished"
                };

                $('#task-title').attr({placeholder: "Tast Title"});
                $('#task-detail').attr({placeholder: "What you are going to do?"});

                tempData.blogs.push(newTask);
                localStorage.taskList = JSON.stringify(tempData);
                TODO.renderUnfinishedTash();
                $('.freeze').trigger('click');
            }
        } else {
            $('.freeze').trigger('click');
        }
    });

});

/*For selecting all the task*/
$('.task-ctrls').find('.fa-check-square-o,.fa-square-o').one().on('click', function () {
    if ($('.blog').length) {
        ($(this).hasClass('fa-square-o')) ? $('.blog').find('i').addClass('fa-check-square-o').removeClass('fa-square-o') : $('.blog').find('i').removeClass('fa-check-square-o').addClass('fa-square-o');
    }
});

/*Deleting the specified task list.*/
$('.fa-trash-o').on('click', function () {
    if ($('.blog').find('.fa-check-square-o').parent().parent().length) {

        var tempData = JSON.parse(localStorage.taskList).blogs;
        var id, TempData = {};

        $.each($('.blog').find('.fa-check-square-o').parent().parent(), function (index, value) {
            id = $(value).data('taskid');
            $.each(tempData, function (a, b) {
                if (b.id === parseInt(id)) {
                    b.status = (b.status === 'finished') ? 'trash+100' : 'trash';
                }
            });
        });

        TempData['blogs'] = tempData;
        localStorage.taskList = JSON.stringify(TempData);
        $('.task-ctrls').find('.fa-check-square-o,.fa-square-o').addClass('fa-square-o').removeClass('fa-check-square-o');

        switch ($('.lmenu>ul>li>a').parent().parent().find('.active').find('span').html().toLowerCase()) {
            case 'unfinished':
                TODO.renderUnfinishedTash();
                break;
            case 'finished':
                TODO.renderFinishedTash();
                break;
            case 'all':
                TODO.renderAllTask();
                break;
            case 'trash':
                TODO.renderTrashedTash();
                break;
            default :
                TODO.renderUnfinishedTash();
                break;
        }


    } else {
        alert('Select any list.');
    }
});

$('#task-status').on('click', function () {

    var ststus = ($(this).find('span').html() === 'Mark as Finished') ? "finished" : "unfinished";

    if ($('.blog').find('.fa-check-square-o').parent().parent().length) {

        var tempData = JSON.parse(localStorage.taskList).blogs;
        var id, TempData = {};

        $.each($('.blog').find('.fa-check-square-o').parent().parent(), function (index, value) {
            id = $(value).data('taskid');
            $.each(tempData, function (a, b) {
                if (b.id === parseInt(id)) {
                    b.status = ststus;
                }
            });
        });

        TempData['blogs'] = tempData;
        localStorage.taskList = JSON.stringify(TempData);
        $('.task-ctrls').find('.fa-check-square-o,.fa-square-o').addClass('fa-square-o').removeClass('fa-check-square-o');

        switch ($('.lmenu>ul>li>a').parent().parent().find('.active').find('span').html().toLowerCase()) {
            case 'unfinished':
                TODO.renderUnfinishedTash();
                break;
            case 'finished':
                TODO.renderFinishedTash();
                break;
            case 'all':
                TODO.renderAllTask();
                break;
            case 'trash':
                TODO.renderTrashedTash();
                break;
            default :
                TODO.renderUnfinishedTash();
                break;
        }


    } else {
        alert('Select any list.');
    }

});

/*Used for Tag Handlebar JS*/
function bindTagManager() {

    Handlebars.registerHelper("ZRHBJS_Tag_Iterate", function (content, option) {
        var temp = "";
        $.each(content, function (index, val) {
            temp += option.fn({
                tagId: val.tagId,
                tagName: val.tagName
            });
        });

        return temp;
    });

    var TagManager = (function () {

        var TagManager = {};

        TagManager.list = [
            {tagId: 1234, tagName: "kirubha"},
            {tagId: 1235, tagName: "Giri"}
        ];

        /*    TagManager.label = {
         actionLabel: I18n.getMsg('crm.label.actions'),
         tagNameLabel : I18n.getMsg('crm.potential.associate.popout.tagname')
         };
         */

        TagManager.actionLabel = I18n.getMsg('crm.label.actions');
        TagManager.tagNameLabel = I18n.getMsg('crm.potential.associate.popout.tagname');

        var source = $('#ZRHBJS-Tag').html();
        var template = Handlebars.compile(source);
        $('#ZRHBJS-Tag-wrap').append(template(TagManager));

        return TagManager;
    })();
}