window.addEventListener('DOMContentLoaded' , 
    function() {
        //(1)ページ本体が読み込まれたタイミングで実行するコード
        let subject = document.getElementById('subject');
        let memo = document.getElementById('memo');
        let save = document.getElementById('save');
        let cancel = document.getElementById('cancel');

        save.addEventListener('click',
            function(e) {
                //(1)[保存]ボタンをクリック時に実行するコード
                e.preventDefault();
                if(subject.validity.valid === false || 
                    memo.validity.valid === false) {
                       //(2)件名、メモが入力されていないときに実行するコード
                       window.alert('件名、メモはいずれも必須です。');
                       return;
                }
            }, false
        );

        cancel.addEventListener('click' , 
            function() {
                //(2)[キャンセル]ボタンのクリック時に実行するコード
                location.href = 'index.html';
            }, false
        );
    }, false
);