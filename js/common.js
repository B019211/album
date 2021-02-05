let h = function(str) {
    //(1)h関数の実処理を定義
    if (str !== null) {
        //(2)引数strが空でない場合の処理
        str = str.toString();
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
    } else {
        //(3)引数strが空である場合の処理
        str = '';
    }
    return str;
};
