


var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 70;
camera.zoom = 100;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.5 );

document.getElementById('container').appendChild( renderer.domElement );



var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;


var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(360, 100%, 100%)'), 0.8);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(360, 100%, 100%)'), 0.8);
fillLight.position.set(250, 250, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(50, 50, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// var mtlLoader = new THREE.MTLLoader();
// mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
// mtlLoader.setPath('/examples/3d-obj-loader/assets/');
// mtlLoader.load('r2-d2.mtl', function (materials) {

//     materials.preload();

    var objLoader = new THREE.OBJLoader();
    // objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('bottlecapeyewasher.obj', function (object) {

        scene.add(object);
        object.position.y -= 40;

    });

// });

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();



window.onload = window.onresize = function() {
    var canvas = document.getElementById('test');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;


}

