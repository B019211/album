window.addEventListener('DOMContentLoaded' , 
    function() {
        //(1)ページ本体が読み込まれたタイミングで実行するコード
        let c, o_x = 0, o_y = 0, flag = false;
        let subject = document.getElementById('subject');
        let memo = document.getElementById('memo');
        let save = document.getElementById('save');
        let cancel = document.getElementById('cancel');
        let board =document.getElementById('board');

        //(1)canvas_APIを利用した処理
        c = board.getContext('2d');

        //閉域ライン
        c.beginPath();
        c.moveTo(250,10);
        c.lineTo(50,50);
        c.lineTo(30,150);
        c.lineTo(170,180);
        c.lineTo(250,150);
        c.closePath();
        //グラデーション
        let gr = c.createRadialGradient(150, 150, 10, 150, 150, 120);
        gr.addColorStop(0, '#ff0');
        gr.addColorStop(0.5, '#f0f');
        gr.addColorStop(1, '#0ff');
        c.fillStyle = gr;
        c.lineWidth = 3;
        c.stroke();
        c.fill();

        //2次ビジェ曲線
        c.moveTo(200, 10);
        c.quadraticCurveTo(10, 100,250 ,150);
        c.strokeStyle = '#f00';
        c.lineWidth = 3;
        c.stroke();

        //3次ビジェ曲線
        c.moveTo(40, 50);
        c.bezierCurveTo(50, 150, 150, 350, 50, 120, 150)
        c.strokeStyle = '#f00';
        c.lineWidth = 3;
        c.stroke();

        //円
        c.arc(150, 100, 80, 0, 2 * Math.PI, true);
        c.strokeStyle = '#f00';
        c.fillStyle = '#cc5';
        c.lineWidth = 3;
        c.stroke();
        c.fill();

        //文字
        c.font = '30px, sans-serif';
        c.fillText('こんにちは', 70, 50);
        c.strokeText('こんにちは', 70, 50);

        c.fillStyle = '#00f';
        c.lineWidth = 3;

        let img = new Image();
        img.src = 'image/ham.jpg';
        img.addEventListener(
            'load',
            function(e) {
                c.drawImage(img, 80, 80, 120, 100);
            }
        );

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
                //(1)セッションストレージから現在位置を取得するコード
                let cpos_latitude = sessionStorage.getItem('cpos_latitude');
                let cpos_longitude = sessionStorage.getItem('cpos_longitude');
                if(cpos_latitude == null || cpos_longitude == null) {
                    window.alert('トップページからアクセスしなおしてください。');
                    location.href = 'index.html';
                }
                //(2)ローカルストレージにメモを登録するコード
                let list = localStorage.getItem('memolist');
                if(list === null) {
                    list =[];
                } else {
                    list = JSON.parse(list);
                }
                list.push({
                    //(3)ローカルストレージに保存する内容
                    latitude: cpos_latitude,
                    longitude: cpos_longitude,
                    subject: subject.value,
                    memo: memo.value,
                    picture: board.toDataURL(),
                    updated: new Date()
                });
                list = JSON.stringify(list);
                localStorage.setItem('memolist', list);
                location.href = 'index.html';
            }, false
        );

        cancel.addEventListener('click' , 
            function() {
                //(2)[キャンセル]ボタンのクリック時に実行するコード
                location.href = 'index.html';
            }, false
        );

        let ondown = function(e) {
            //(1)タッチ開始/マウスダウン時の処理
            e.preventDefault();
            flag = true;
            if (e.touches) {e = e.touches[0];}
            let c_rect = e.target.getBoundingClientRect();
            o_x = e.clientX - c_rect.left;
            o_y = e.clientY - c_rect.top;
        };

        let onup = function(e) {
            //(2)タッチ終了/マウスアップ時の処理
            e.preventDefault();
            flag = false;
        };

        let onmove = function(e) {
            //(3)タッチ移動中/マウス移動中時の処理
            e.preventDefault();
            if (flag) {
                //(6)マウスが押されている場合の処理
                if(e.touches) { e = e.touches[0]; }
                let c_rect = e.target.getBoundingClientRect();
                let x = e.clientX - c_rect.left;
                let y = e.clientY - c_rect.top;
                c.beginPath();
                c.moveTo(o_x, o_y) ;
                c.lineTo(x, y);
                c.stroke();
                o_x = x;
                o_y = y;               
            }
        };

        if(window.ontouchstart === undefined) {
            //(4)タッチイベントに対応していない場合の処理
            board.addEventListener('mousedown', ondown, false);
            board.addEventListener('mouseup', onup, false);
            board.addEventListener('mousemove', onmove, false);
        } else {
            //(5)タッチイベントに対応している場合の処理
            board.addEventListener('touchdown', ondown, false);
            board.addEventListener('touchup', onup, false);
            board.addEventListener('touchmove', onmove, false);      
        }
    }, false
);