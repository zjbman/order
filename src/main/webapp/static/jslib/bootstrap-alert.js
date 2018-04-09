(function ($) {

window.Ewin = function () {

    var html = '<div id="[Id]" class="modal fade" role="dialog" aria-labelledby="modalLabel">' +
            '<div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
            '</div><div class="modal-body">' +
            '<p><span class="glyphicon [Icon]" style="color: #d9534f;margin-top:-2px;margin-right:8px;vertical-align:middle;font-size:22px"></span>[Message]</p></div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' +
            '<button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button>' +
            '</div></div></div></div>';

    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');//不区分大小写，全局匹配，多行匹配
    var generateId = function () {
        var date = new Date();
        return 'mdl' + date.valueOf();
    }
    var init = function (options) {
        options = $.extend({}, {
            title: "操作提示",
            message: "提示内容",
            icon:"glyphicon-exclamation-sign",
            btnok: "确定",
            btncl: "取消",
            width: 200,
            auto: false
        }, options || {});
        var modalId = generateId();
        var content = html.replace(reg, function (node, key) {
            console.log("node:"+node,"key:"+key);
            //node:每次匹配结果，key每次匹配结果的索引
            return {
                Id: modalId,
                Title: options.title,
                Message: options.message,
                BtnOk: options.btnok,
                BtnCancel: options.btncl
            }[key];
        });
        $('body').append(content);
        $('#' + modalId).modal({
            width: options.width,
            backdrop: 'static'
        });
        $('#' + modalId).on('hide.bs.modal', function (e) {
            $('body').find('#' + modalId).remove();
        });
        return modalId;
    }

    return {
        alert: function (options) {
            if (typeof options == 'string') {
                options = {
                    message: options
                };
            }
            var id = init(options);
            var modal = $('#' + id);
            modal.find('.ok').removeClass('btn-success').addClass('btn-primary');
            modal.find('.cancel').hide();

            return {
                id: id,
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.find('.ok').click(function () { callback(true); });
                    }
                },
                hide: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.on('hide.bs.modal', function (e) {
                            callback(e);
                        });
                    }
                }
            };
        },
        confirm: function (options) {
            var id = init(options);
            var modal = $('#' + id);
            modal.find('.ok').removeClass('btn-primary').addClass('btn-success');
            modal.find('.cancel').show();
            return {
                id: id,
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.find('.ok').click(function () { callback(true); });
                        modal.find('.cancel').click(function () { callback(false); });
                    }
                },
                hide: function (callback) {
                    if (callback && callback instanceof Function) {
                        modal.on('hide.bs.modal', function (e) {
                            callback(e);
                        });
                    }
                }
            };
        }
    }
}();
})(jQuery);