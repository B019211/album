window.addEventListener('DOMContentLoaded' , 
    function() {
        //(1)ページ本体が読み込まれたタイミングで実行するコード
        let cancel = document.getElementById('cancel');
        cancel.addEventListener('click' , 
            function() {
                //(2)[キャンセル]ボタンのクリック時に実行するコード
                location.href = 'index.html';
            }, false
        );
    }, false
);