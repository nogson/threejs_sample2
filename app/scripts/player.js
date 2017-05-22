class Player {

    constructor() {

        // 汎用変数の宣言
        let width = window.innerWidth; // ブラウザのクライアント領域の幅
        let height = window.innerHeight; // ブラウザのクライアント領域の高さ

        //アニメショーン用のパラメーター
        this.handLRotation = 0.01;
        this.handRRotation = -0.01;
        this.footLRotation = -0.01;
        this.footRRotation = 0.01;
        this.meshFaceRotation = 0.005;
        this.bodyFaceRotation = 0.01;


        let MATERIALS = {
            m1: {
                color: 0xefb886
            },
            m2: {
                color: 0xffcc99
            },
            m3: {
                color: 0xffffff,
                side: THREE.DoubleSide
            },
            m4: {
                color: 0x000000,
            },
            m5: {
                color: 0xffffff,
                side: THREE.DoubleSide
            },
            m6: {
                color: 0xff2e2e,
            }
        }

        //キャラクターを入れるグループを作成
        this.player = new THREE.Group();

        //顔用グループ
        this.playerFace = new THREE.Group();
        this.player.add(this.playerFace);

        this.playerFace.rotation.x = Math.PI / 180 * 5;

        //顔
        let textuer1 = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('images/textuer_l.png')
        });
        let textuer2 = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('images/textuer_r.png')
        });
        let textuer3 = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('images/textuer_t.png')
        });
        let textuer4 = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('images/textuer_u.png')
        });
        let textuer5 = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('images/textuer_f.png')
        });
        let textuer6 = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('images/textuer_b.png')
        });

        let materialFace = new THREE.MultiMaterial([textuer1, textuer2, textuer3, textuer4, textuer5, textuer6])

        let geometryFace = new THREE.BoxGeometry(1, 1, 1);
        let meshFace = new THREE.Mesh(geometryFace, materialFace);
        meshFace.castShadow = true;
        this.playerFace.add(meshFace);

        //口
        let geometryMouth = new THREE.BoxGeometry(0.8, 0.1, 0.01);
        let materialMouth = new THREE.MeshPhongMaterial(MATERIALS.m6);
        let meshMouth = new THREE.Mesh(geometryMouth, materialMouth);

        meshMouth.position.z = 0.5;
        meshMouth.position.y = meshFace.position.y - 0.35;

        this.playerFace.add(meshMouth);

        //鼻
        let geometryNose = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let materialNose = new THREE.MeshPhongMaterial(MATERIALS.m1);
        let meshNose = new THREE.Mesh(geometryNose, materialNose);

        meshNose.position.z = 0.5;
        meshNose.position.y = meshFace.position.y - 0.15;

        this.playerFace.add(meshNose);

        //耳
        let geometryEar = new THREE.BoxGeometry(1.2, 0.3, 0.1);
        let materialEar = new THREE.MeshPhongMaterial(MATERIALS.m1);
        let meshEar = new THREE.Mesh(geometryEar, materialEar);

        meshEar.position.y = -0.1;
        meshEar.position.z = 0.1;
        this.playerFace.add(meshEar);

        //目
        let lEyeGroup = new THREE.Group();
        let rEyeGroup = new THREE.Group();

        let geometryGlasses = new THREE.TorusGeometry(0.15, 0.02, 10, 20);
        let geometryFrame = new THREE.BoxGeometry(0.2, 0.03, 0.05);
        let materialGlasses = new THREE.MeshPhongMaterial(MATERIALS.m4);
        let materialEyeBall = new THREE.MeshPhongMaterial(MATERIALS.m4);
        let materialEyebrows = new THREE.MeshPhongMaterial(MATERIALS.m4);
        let geometryEyebrows = new THREE.BoxGeometry(0.3, 0.05, 0.1);
        let geometryEye = new THREE.BoxGeometry(0.3, 0.05, 0.05);
        let geometryEyeBall = new THREE.BoxGeometry(0.05, 0.05, 0.05);
        let materialEye = new THREE.MeshPhongMaterial(MATERIALS.m5);
        let eyeLMesh = new THREE.Mesh(geometryEye, materialEye);
        let eyeRMesh = new THREE.Mesh(geometryEye, materialEye);
        let eyeBallLMesh = new THREE.Mesh(geometryEyeBall, materialEyeBall);
        let eyeBallRMesh = new THREE.Mesh(geometryEyeBall, materialEyeBall);
        let eyebrowsLMesh = new THREE.Mesh(geometryEyebrows, materialEyebrows);
        let eyebrowsRMesh = new THREE.Mesh(geometryEyebrows, materialEyebrows);
        let grassesLMesh = new THREE.Mesh(geometryGlasses, materialGlasses);
        let grassesRMesh = new THREE.Mesh(geometryGlasses, materialGlasses);
        let grassesFrame = new THREE.Mesh(geometryFrame, materialGlasses);

        eyeBallLMesh.position.z = eyeBallRMesh.position.z = 0.02;
        eyeBallLMesh.position.y = eyeBallRMesh.position.y = -0.03;
        eyeLMesh.position.z = eyeRMesh.position.z = 0.01;
        eyeLMesh.position.y = eyeRMesh.position.y = -0.05;
        grassesLMesh.position.z = grassesRMesh.position.z = 0.05;
        eyebrowsLMesh.position.y = eyebrowsRMesh.position.y = 0.08;
        eyebrowsLMesh.position.x = 0.05;
        eyebrowsRMesh.position.x = -0.05;
        eyebrowsLMesh.position.z = eyebrowsRMesh.position.z = 0.01;
        grassesFrame.position.z = 0.55;
        grassesFrame.position.y = 0.05;

        lEyeGroup.add(eyeLMesh);
        lEyeGroup.add(eyeBallLMesh);
        lEyeGroup.add(eyebrowsLMesh);
        lEyeGroup.add(grassesLMesh);
        rEyeGroup.add(eyeRMesh);
        rEyeGroup.add(eyeBallRMesh);
        rEyeGroup.add(eyebrowsRMesh);
        rEyeGroup.add(grassesRMesh);
        this.playerFace.add(grassesFrame);

        lEyeGroup.position.z = rEyeGroup.position.z = 0.5;
        lEyeGroup.position.x = 0.25;
        lEyeGroup.position.y = rEyeGroup.position.y = 0.1;
        lEyeGroup.rotation.z = Math.PI / 180 * -15;
        rEyeGroup.position.x = -0.25;
        rEyeGroup.rotation.z = Math.PI / 180 * 15;

        this.playerFace.add(lEyeGroup);
        this.playerFace.add(rEyeGroup);

        //首
        this.geometryNeck = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let materialNeck = new THREE.MeshPhongMaterial(MATERIALS.m2);
        let meshNeck = new THREE.Mesh(this.geometryNeck, materialNeck);
        meshNeck.castShadow = true;
        meshNeck.position.y = meshFace.position.y - meshFace.scale.y / 2 - 0.05;
        this.playerFace.add(meshNeck);

        //体
        this.bodyGroup = new THREE.Group();
        let geometryBody = new THREE.BoxGeometry(0.5, 0.7, 0.5);
        let materialBody = new THREE.MeshPhongMaterial(MATERIALS.m2);
        let meshBody = new THREE.Mesh(geometryBody, materialBody);
        meshBody.castShadow = true;
        meshBody.position.y = meshNeck.position.y - 0.4;
        this.bodyGroup.add(meshBody);

        //左手
        this.handLGroup = new THREE.Group();
        let geometryLhand = new THREE.BoxGeometry(0.8, 0.15, 0.15);
        let materialLhand = new THREE.MeshPhongMaterial(MATERIALS.m2);
        let meshLhand = new THREE.Mesh(geometryLhand, materialLhand);
        meshLhand.castShadow = true;
        meshLhand.position.y = meshBody.position.y - 0.05;
        meshLhand.position.x = meshBody.position.x + 0.3;
        meshLhand.rotation.z = -90 * Math.PI / 180;

        this.handLGroup.add(meshLhand);
        this.player.add(this.handLGroup);

        //右手
        this.handRGroup = new THREE.Group();
        let geometryRhand = new THREE.BoxGeometry(0.8, 0.15, 0.15);
        let materialRhand = new THREE.MeshPhongMaterial(MATERIALS.m2);
        let meshRhand = new THREE.Mesh(geometryRhand, materialRhand);
        meshRhand.castShadow = true;
        meshRhand.position.y = meshBody.position.y - 0.05;
        meshRhand.position.x = meshBody.position.x - 0.3;
        meshRhand.rotation.z = 90 * Math.PI / 180;

        this.handRGroup.add(meshRhand);
        this.player.add(this.handRGroup);

        //左足
        this.footLGroup = new THREE.Group();
        let geometryLleg = new THREE.BoxGeometry(0.7, 0.15, 0.15);
        let materialLleg = new THREE.MeshPhongMaterial(MATERIALS.m2);
        let meshLleg = new THREE.Mesh(geometryLleg, materialLleg);
        meshLleg.position.y = meshBody.position.y - 0.8;
        meshLleg.position.x = meshBody.position.x + 0.2;
        meshLleg.rotation.z = -90 * Math.PI / 180;
        meshLleg.castShadow = true;
        this.footLGroup.add(meshLleg);
        this.player.add(this.footLGroup);

        //右足
        this.footRGroup = new THREE.Group();
        let geometryRleg = new THREE.BoxGeometry(0.7, 0.15, 0.15);
        let materialRleg = new THREE.MeshPhongMaterial(MATERIALS.m2);
        let meshRleg = new THREE.Mesh(geometryRleg, materialRleg);
        meshRleg.castShadow = true;
        meshRleg.position.y = meshBody.position.y - 0.8;
        meshRleg.position.x = meshBody.position.x - 0.2;
        meshRleg.rotation.z = 90 * Math.PI / 180;
        this.footRGroup.add(meshRleg);
        this.player.add(this.footRGroup);


        //パンツ
        this.geometryPants = new THREE.Geometry();
        let materialPants = new THREE.MeshPhongMaterial(MATERIALS.m3);

        this.geometryPants.vertices.push(new THREE.Vector3(0, 0, 0));
        this.geometryPants.vertices.push(new THREE.Vector3(0.5, 0, 0));
        this.geometryPants.vertices.push(new THREE.Vector3(0.1, -0.2, 0));
        this.geometryPants.vertices.push(new THREE.Vector3(0.4, -0.2, 0));
        this.geometryPants.vertices.push(new THREE.Vector3(0, 0, -0.5));
        this.geometryPants.vertices.push(new THREE.Vector3(0.5, 0, -0.5));
        this.geometryPants.vertices.push(new THREE.Vector3(0.1, -0.2, -0.5));
        this.geometryPants.vertices.push(new THREE.Vector3(0.4, -0.2, -0.5));

        this.geometryPants.faces.push(new THREE.Face3(0, 1, 2));
        this.geometryPants.faces.push(new THREE.Face3(3, 2, 1));
        this.geometryPants.faces.push(new THREE.Face3(4, 6, 5));
        this.geometryPants.faces.push(new THREE.Face3(5, 6, 7));
        this.geometryPants.faces.push(new THREE.Face3(0, 2, 6));
        this.geometryPants.faces.push(new THREE.Face3(0, 4, 6));
        this.geometryPants.faces.push(new THREE.Face3(1, 5, 7));
        this.geometryPants.faces.push(new THREE.Face3(1, 3, 7));
        this.geometryPants.faces.push(new THREE.Face3(0, 1, 4));
        this.geometryPants.faces.push(new THREE.Face3(1, 4, 5));
        this.geometryPants.faces.push(new THREE.Face3(2, 3, 6));
        this.geometryPants.faces.push(new THREE.Face3(3, 6, 7));

        let meshPants = new THREE.Mesh(this.geometryPants, materialPants);

        meshPants.position.y = meshBody.position.y - 0.35;
        meshPants.position.x = -0.25
        meshPants.position.z = 0.25;
        meshPants.castShadow = true;


        this.geometryPants.computeFaceNormals();

        this.bodyGroup.add(meshPants);
        this.player.add(this.bodyGroup);


    }

    create() {
        this.render();
        return this.player;
    }

    start() {
        this.isMove = true;
    }

    stop() {
        this.isMove = false;
    }

    //描画
    render() {

        if (this.isMove === true) {
            this.moveHand();
            this.moveFoot();
            this.faceMove();
            this.bodyMove();
        }


        // animation
        requestAnimationFrame(this.render.bind(this));
    }

    //顔の移動
    faceMove() {
        //左手の回転
        if (this.playerFace.rotation.z > 0.05) {
            this.meshFaceRotation = -0.005;
        } else if (this.playerFace.rotation.z < -0.05) {
            this.meshFaceRotation = 0.005;
        }
        this.playerFace.rotation.z += this.meshFaceRotation;
    }

    //体の移動
    bodyMove() {
        //左手の回転
        if (this.bodyGroup.rotation.y > 0.1) {
            this.bodyFaceRotation = -0.01;
        } else if (this.bodyGroup.rotation.y < -0.1) {
            this.bodyFaceRotation = 0.01;
        }
        this.bodyGroup.rotation.y += this.bodyFaceRotation;
    }

    //手の移動
    moveHand() {

        //左手の回転
        if (this.handLGroup.rotation.x > 0.1) {
            this.handLRotation = -0.01;
        } else if (this.handLGroup.rotation.x < -0.1) {
            this.handLRotation = 0.01;
        }
        this.handLGroup.rotation.x += this.handLRotation;

        //右手の回転
        if (this.handRGroup.rotation.x > 0.1) {
            this.handRRotation = -0.01;
        } else if (this.handRGroup.rotation.x < -0.1) {
            this.handRRotation = 0.01;
        }
        this.handRGroup.rotation.x += this.handRRotation;
    }

    //足の移動
    moveFoot() {

        //左手の回転
        if (this.footLGroup.rotation.x > 0.1) {
            this.footLRotation = -0.01;
        } else if (this.footLGroup.rotation.x < -0.1) {
            this.footLRotation = 0.01;
        }
        this.footLGroup.rotation.x += this.footLRotation;

        //右手の回転
        if (this.footRGroup.rotation.x > 0.1) {
            this.footRRotation = -0.01;
        } else if (this.footRGroup.rotation.x < -0.1) {
            this.footRRotation = 0.01;
        }
        this.footRGroup.rotation.x += this.footRRotation;
    }

}