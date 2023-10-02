import React, { useEffect } from 'react';
import * as THREE from 'three';
import cloud from '../img/cloud3.png';
import earth2 from '../img/earth6.jpeg';
import earthBump from '../img/earth-bump-map.jpeg'; // Replace with your bump map texture

function Earth() {
  useEffect(() => {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Adjust aspect ratio to 1 for a square viewport
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    const width = window.innerWidth / 2; // Adjust the width as needed
    const height = window.innerHeight / 2; // Adjust the height as needed
    renderer.setSize(width, height);
    renderer.setSize(400, 385); // Set the size of the viewport
    renderer.setClearColor(0x000000, 0); // Set a transparent background
    renderer.domElement.style.zIndex = 3; // Set z-index to 3
    const earthContainer = document.getElementById('earth-container');
    earthContainer.appendChild(renderer.domElement);

    // Create a sphere for the Earth
    const earthGeometry = new THREE.SphereGeometry(3, 32, 32);
    const earthTexture = new THREE.TextureLoader().load(earth2);
    const earthBumpMap = new THREE.TextureLoader().load(earthBump); // Load the bump map
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthBumpMap, // Add bump map
      bumpScale: 0.1, // Adjust bump scale as needed
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Create a sphere for clouds
    const cloudGeometry = new THREE.SphereGeometry(3.08, 32, 32);
    const cloudTexture = new THREE.TextureLoader().load(cloud); // Replace with your cloud texture
    const cloudMaterial = new THREE.MeshBasicMaterial({ map: cloudTexture, transparent: true });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x333333, 1); // Soft ambient light with a darker color
    scene.add(ambientLight);

    // Add directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    scene.add(directionalLight);

    // Add blue point light for shadow
    const blueLight = new THREE.PointLight(0x0000ff, 0.5); // Blue light with intensity 0.5
    scene.add(blueLight);

    // Add a white directional light pointing in the opposite direction
    const whiteLight = new THREE.DirectionalLight(0xffffff, 1);
    whiteLight.position.set(0, 0, -5); // Pointing away from the scene
    scene.add(whiteLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y -= 0.0009;
      clouds.rotation.y += 0.0005;

      // Simulate day-night cycle by changing the light direction
      const timeOfDay = (Date.now() % 20000) / 20000; // Adjust the duration as needed
      const lightAngle = Math.PI * 2 * timeOfDay;
      const lightDistance = 5;
      const lightX = Math.cos(lightAngle) * lightDistance;
      const lightY = Math.sin(lightAngle) * lightDistance;
      const lightZ = lightDistance / 2; // Adjust the height of the light

      directionalLight.position.set(lightX, lightY, lightZ);

      // Move the blue light opposite to the sun's direction to create a shadow effect
      blueLight.position.set(-lightX, -lightY, -lightZ);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup Three.js resources if the component unmounts
      scene.remove(earth);
      scene.remove(clouds);
      scene.remove(blueLight); // Remove the blue light
      scene.remove(whiteLight); // Remove the white light
      renderer.dispose();
      earthContainer.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <><div className='earth'>
    <div id="earth-container"  /> // Set width and height

    </div></>
  );
}

export default Earth;
