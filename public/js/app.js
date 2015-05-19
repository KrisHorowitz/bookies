
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
      camera.position.set(0,6,0); // set XYZ coordinate of camera
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

      //Create a light, set its position, and add it to the scene.
      var light = new THREE.PointLight(0xffffff);
      light.position.set(-100,200,100);
      scene.add(light);

      //cubey
      var loader = new THREE.Loader();
      var geometry = new THREE.BoxGeometry(2, 2.5, .5);
      var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
      var cube = new THREE.Mesh(geometry, material);
      loader.createMaterial(cube)
      scene.add(cube);

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

      //Add OrbitControls so that we can pan around with the mouse.
      controls = new THREE.OrbitControls(camera, renderer.domELement);
    }

    function animate() {
      // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
      requestAnimationFrame(animate);

      // Render the scene.
      renderer.render(scene, camera);
      controls.update();
    }