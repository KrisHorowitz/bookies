
// Set up the scene, camera, and renderer as global variables.
var scene, camera, renderer;

init();
animate();

//set up the scene
function init() {
  //create the scene and set the scene size
  scene = new THREE.Scene();
  var WIDTH = window.innerWidth,
    HEIGHT  = window.innerHeight;

  //Create a renderer and add it to the DOM.
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  //Create a camera, zoom it out from the model a bit, and add it to the scene,
  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
  // angle, aspect, near, draw distance
  camera.position.set(12,8,-14); // set XYZ coordinate of camera
  scene.add(camera);

  //Create an event listener that resizes the renderer with the browser window.
  window.addEventListener('resize', function() {
    var WIDTH = window.innerWidth,
      HEIGHT  = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectMatrix();
  });

  //Set the background color of the scene
  renderer.setClearColor(0xFFFFF0, 1);

  ///////////
  // LIGHT //
  ///////////
  //Create a light, set its position, and add it to the scene.
  // var light = new THREE.PointLight(0xffffff);
  // light.position.set(4,3,3);
  // scene.add(light);

  var ambientLight = new THREE.AmbientLight( 0xC6C6C6);
  scene.add(ambientLight);

  //////////
  // BOOK //
  //////////
  var bookMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
  bookMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xB57533 } ) );
  // spine (x+)
  bookMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
  // opposite of spine (pages) (x-)
  bookMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
  // top (y+)
  bookMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
  // bottom (y-)
  bookMaterialArray.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/3js-back.jpg' ) }) );
  // back (z+)
  bookMaterialArray.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/3js.jpg' ) }) );
  // cover (z-)

  var bookGeometry = new THREE.BoxGeometry(7.5, 9.2, 0.3);
  // var material = new THREE.MeshBasicMaterial({color: 0xB57533});
  var bookMaterial = new THREE.MeshFaceMaterial( bookMaterialArray );
  var book = new THREE.Mesh(bookGeometry, bookMaterial);

  var loader = new THREE.Loader();
  loader.createMaterial(book);
  scene.add(book);

  //rectangle
  // var rectLength = 2, rectWidth = 4;

  // var rectShape = new THREE.Shape();
  // rectShape.moveTo(0, 0);
  // rectShape.lineTo(0, rectWidth);
  // rectShape.lineTo(rectLength, rectWidth);
  // rectShape.lineTo(rectLength, 0);
  // rectShape.lineTo(0,0);

  // var loader = new THREE.Loader();
  // var rectGeom = new THREE.ExtrudeGeometry( rectShape, {"amount": 2} );
  // var rectMat = new THREE.MeshLambertMaterial({color: 0x00ff00});
  // var rectMesh = new THREE.Mesh(rectGeom, rectMat);
  // loader.createMaterial(rectMesh)
  // scene.add(rectMesh)

  //////////////
  // CONTROLS //
  //////////////

  controls = new THREE.OrbitControls(camera, renderer.domELement);
  controls.minDistance = 5;
  controls.maxDistance = 30;
}

function animate() {
  // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  requestAnimationFrame(animate);

  // Render the scene.
  renderer.render(scene, camera);
  controls.update();
}