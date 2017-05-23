(() => {

    window.addEventListener('load', () => {

        // 汎用変数の宣言
        let width = window.innerWidth; // ブラウザのクライアント領域の幅
        let height = window.innerHeight; // ブラウザのクライアント領域の高さ
        let targetDOM = document.getElementById('webgl'); // スクリーンとして使う DOM

        // three.js 定義されているオブジェクトに関連した変数を宣言
        let scene; // シーン
        let camera; // カメラ
        let renderer; // レンダラ
        let axis; //ガイド
        let grid; //ガイド
        let directional;
        let ambient;

        // 各種パラメータを設定するために定数オブジェクトを定義
        let CAMERA_PARAMETER = { // カメラに関するパラメータ
            fovy: 90,
            aspect: width / height,
            near: 0.1,
            far: 100.0,
            x: 2.0, // + 右 , - 左
            y: 2, // + 上, - 下
            z: 7.5, // + 手前, - 奥
            lookAt: new THREE.Vector3(0.0, 0.0, 0.0) //x,y,z
        };
        let RENDERER_PARAMETER = { // レンダラに関するパラメータ
            clearColor: 0xffffff, //背景のリセットに使う色
            width: width,
            height: height
        };

        let LIGHT_PARAMETER = {
            directional: {
                positionX: -0.5,
                positionY: 4,
                positionZ: 3
            },
            ambient: {
                positionY: 1
            }
        }

        //let GROUND_MATERIAL = { color: 0xffffff, side: THREE.DoubleSide };

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
            CAMERA_PARAMETER.fovy,
            CAMERA_PARAMETER.aspect,
            CAMERA_PARAMETER.near,
            CAMERA_PARAMETER.far
        );

        camera.position.x = CAMERA_PARAMETER.x;
        camera.position.y = CAMERA_PARAMETER.y;
        camera.position.z = CAMERA_PARAMETER.z;
        camera.lookAt(CAMERA_PARAMETER.lookAt); //注視点（どこをみてるの？）

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAMETER.clearColor));
        renderer.setSize(RENDERER_PARAMETER.width, RENDERER_PARAMETER.height);
        renderer.shadowMap.enabled = true;

        //renderer.shadowMap.enabled = true; //影を有効
        targetDOM.appendChild(renderer.domElement); //canvasを挿入する

        controls = new THREE.OrbitControls(camera, render.domElement);

        //ライト
        directional = new THREE.DirectionalLight(0xffffff);
        ambient = new THREE.AmbientLight(0xffffff, 0.25);

        directional.castShadow = true;


        directional.position.y = LIGHT_PARAMETER.directional.positionY;
        directional.position.z = LIGHT_PARAMETER.directional.positionZ;
        directional.position.x = LIGHT_PARAMETER.directional.positionX;
        ambient.position.y = LIGHT_PARAMETER.ambient.positionY;

        //directional.castShadow = true;
        directional.shadow.mapSize.width = 800;
        directional.shadow.mapSize.height = 800;
        scene.add(directional);
        scene.add(ambient);

        // axis = new THREE.AxisHelper(1000);
        // axis.position.set(0, 0, 0);
        // scene.add(axis);

        // グリッドのインスタンス化
        //grid = new THREE.GridHelper(100, 50);

        //グリッドオブジェクトをシーンに追加する
        //scene.add(grid);

        var planeGeometry = new THREE.PlaneBufferGeometry(200, 200, 32);
        var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 180 * 90;
        plane.receiveShadow = true;
        scene.add(plane);

        //playerを作成
        let playerClass = new Player();
        let player = playerClass.create();

        playerClass.start();
        player.position.y = 2.1;

        scene.add(player);

        let targetX = width / 2;
        let targetY = height;

        //マウスイベントを設定
        window.addEventListener('mousemove', function(e) {
            console.log(e)
            targetX = e.clientX;
            targetY = e.clientY;
        });

        // window.addEventListener('touchend', function(e) {
        //     console.log(e)
        //     targetX = e.clientX;
        //     targetY = e.clientY;
        // });

        window.addEventListener('click', function(e) {
            if (playerClass.isMove === true) {
                playerClass.stop();
            } else {
                playerClass.start();
            }

        });

        render();

        //描画
        function render() {
            //player.position.z += 0.01;

            // rendering
            renderer.render(scene, camera);

            if (playerClass.isMove === true) {
                move();
            }

            // animation
            requestAnimationFrame(render);
        }

        function move() {
            let w = window.innerWidth;
            let h = window.innerHeight;
            let x = targetX * 2.0 - w;
            let y = targetY * 2.0 - h;
            let length = Math.sqrt(x * x + y * y);
            x /= length;
            y /= length;

            player.position.x += x / 100;
            player.position.z += y / 100;

            player.rotation.y = Math.atan2(x, y);

        }




    }, false);
})();