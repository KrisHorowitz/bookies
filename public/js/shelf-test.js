/*globals THREE, $, colorThief*/

// Set up the scene, camera, and renderer as global variables.
var scene, camera, renderer, controls;
var colorThief = new ColorThief();
var n = 23;

  init();

  $(window).load(
    function(){
      $.get('user/1/shelf', function(data){
            $.get('shelf/1/book', function(data) {
                renderBooks(data);
            });
        }
      );
    }
  );

  function increment(){
    if (n >= -21) {
      n = n - 3;
      return n;
    } else {
      window.alert('Oops! Looks like there\'s no more room on your shelf.' );
    }

  }

  function renderBooks(books) {
      for(var i=0; i<books.length; i++) {
        //////////
        // BOOK //
        //////////
        var book = books[i],
          coverImg = book.cover_img,
          backImg = book.back_img;
        console.log(i);

        var bookGeometry = new THREE.BoxGeometry( book.length, book.height, book.width );

        var bookMaterialArray = [];

        var img = document.createElement('IMG');
        img.onload = function(){
          // order to add materials: x+,x-,y+,y-,z+,z-
          bookMaterialArray.push( new THREE.MeshBasicMaterial( { color: "rgb("+colorThief.getColor(img).join(',') + ")" } ) );
          // spine (x+)
          bookMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
          // opposite of spine (pages) (x-)
          bookMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
          // top (y+)
          bookMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
          // bottom (y-)
          bookMaterialArray.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/books/' +book.title + '-back.jpg') }) );
          // back (z+)
          bookMaterialArray.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/books/' +book.title +'-cover.jpg') }) );
          // cover (z-)

          var bookMaterial = new THREE.MeshFaceMaterial( bookMaterialArray );
          var bookMesh = new THREE.Mesh(bookGeometry, bookMaterial);

          if (i===1) {
            bookMesh.position.set(5, (book.height/2 + 0.5), n);
          } else {
            bookMesh.position.set(5,(book.height/2 + 0.5), increment(n));
          }
          // var loader = new THREE.Loader();
          // loader.createMaterial(book);
          scene.add(bookMesh);
        };
        img.src = 'images/books/'+book.title+'-cover.jpg';
      }
      animate();
  }



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
  camera.position.set(200,150,0); // set XYZ coordinate of camera
  scene.add(camera);

  //Crea  te an event listener that resizes the renderer with the browser window.
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
  // Create a light, set its position, and add it to the scene.
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,75,0);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight( 0xC6C6C6);
  scene.add(ambientLight);

  //////////////
  // ADD CUBE //
  //////////////

  var el = document.getElementById("addBook");

  el.addEventListener("click", function() {addBook(increment(n));}, false);

  function addBook(i){
    var data = {
      title: window.prompt("Please enter your book title", "")
    };

    if (data.title) {
        $.ajax({
          type: 'post',
          url:'/book',
          data: JSON.stringify(data),
          contentType: "application/json",
          success: function (book, status, jqxhr){
            console.log(book);
            var coverImg = book.cover_img,
              backImg = book.back_img;

            var geometry = new THREE.BoxGeometry( book.length, book.height, book.width );
            //replace data.cover_img
            var meshMaterialArray = [];

            var img = document.createElement('IMG');
            img.onload =function() {
                console.log('image loaded');
                // order to add materials: x+,x-,y+,y-,z+,z-
                meshMaterialArray.push( new THREE.MeshBasicMaterial( { color:  "rgb("+colorThief.getColor(img).join(',') + ")" } ) );
                // spine (x+)
                meshMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
                // opposite of spine (pages) (x-)
                meshMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
                // top (y+)
                meshMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
                // bottom (y-)
                meshMaterialArray.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/books/' +book.title + '-back.jpg') }) );
                // back (z+)
                meshMaterialArray.push( new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/books/' +book.title +'-cover.jpg')  }) );
                // cover (z-)
                var material = new THREE.MeshFaceMaterial( meshMaterialArray );
                 // var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );

                var mesh = new THREE.Mesh( geometry, material );
                mesh.position.set(5,(book.height/2 + 0.5),i);
                //scene is global
                scene.add(mesh);
            };
            img.src = 'images/books/' +book.title +'-cover.jpg';
          }
        });
    }
  }

  ///////////
  // SPINE //
  ///////////

    // create a canvas element
  // var canvas1 = document.createElement('canvas');
  // var context1 = canvas1.getContext('2d');
  // context1.font = "Bold 40px Arial";
  // context1.fillStyle = "rgba(255,0,0,0.95)";
  //   context1.fillText('Hello, world!', 0, 50);

  // canvas contents will be used for a texture
  // var texture1 = new THREE.Texture(canvas1)
  // texture1.needsUpdate = true;

  //   var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
  //   material1.transparent = true;

  //   var mesh1 = new THREE.Mesh(
  //       new THREE.PlaneGeometry(canvas1.width, canvas1.height),
  //       material1
  //     );
  // mesh1.position.set(0,50,0);
  // scene.add( mesh1 );

  ///////////
  // SHELF //
  ///////////
  var shelfGeometry = new THREE.BoxGeometry( 10, 50, 1 );
  var shelfMaterial = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('images/wood.png') } );
  var shelf = new THREE.Mesh( shelfGeometry, shelfMaterial );
  shelf.position.set(5,0,0);
  shelf.rotation.x = Math.PI / 2;
  // loader.createMaterial(shelf);
  scene.add(shelf);

  //////////
  // GRID //
  //////////

  var axes = new THREE.AxisHelper(50);
  axes.position = shelf.position;
  scene.add(axes);

  var gridXZ = new THREE.GridHelper(100, 10);
  gridXZ.setColors( new THREE.Color(0x006600), new THREE.Color(0x006600) );
  gridXZ.position.set( 100,-100,0 );
  scene.add(gridXZ); //green

  var gridXY = new THREE.GridHelper(100, 10);
  gridXY.position.set( 100,0,-100 );
  gridXY.rotation.x = Math.PI/2;
  gridXY.setColors( new THREE.Color(0x000066), new THREE.Color(0x000066) );
  scene.add(gridXY); //blue

  var gridYZ = new THREE.GridHelper(100, 10);
  gridYZ.position.set( 0,0,0 );
  gridYZ.rotation.z = Math.PI/2;
  gridYZ.setColors( new THREE.Color(0x660000), new THREE.Color(0x660000) );
  scene.add(gridYZ); //red

  // direction (normalized), origin, length, color(hex)
  // var origin = new THREE.Vector3(50,100,50);
  // var terminus  = new THREE.Vector3(75,75,75);
  // var direction = new THREE.Vector3().subVectors(terminus, origin).normalize();
  // var arrow = new THREE.ArrowHelper(direction, origin, 50, 0x884400);
  // scene.add(arrow);


  //////////////
  // CONTROLS //
  //////////////

  var controls = new THREE.OrbitControls(camera, renderer.domELement);
  controls.minDistance = 5;
  controls.maxDistance = 400;

  //limits vertical rotation
  controls.minPolarAngle = 0; // radians
  controls.maxPolarAngle = Math.PI / 2; // radians
  // limits horizontal rotation
  controls.minAzimuthAngle = 0;
  controls.maxAzimuthAngle = Math.PI;
}

function animate() {
  // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame(animate);

  // Render the scene.
  renderer.render(scene, camera);
  // controls.update();
}