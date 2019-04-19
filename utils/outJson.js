var outJSON = function (data,code,msg) {
    if (!data) {
        data = {};
    }
    if (!code) {
        code = 0;
    }
    if (!msg) {
        msg = '操作成功';
    }
    return {'code': code,'msg': msg, 'data': data};
}
module.exports = exports = outJSON;