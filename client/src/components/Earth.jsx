
import React, { useEffect } from 'react';
import * as THREE from 'three';
import cloud from '../img/cloud3.png';
import earth2 from '../img/earth6.jpeg';
import earthBump from '../img/earth-bump-map.jpeg';
import SunCalc from 'suncalc';
import circleMaskTexture from '../img/circleMaskTexture.png';

function Earth() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    const width = window.innerWidth / 2; // Adjust the width as needed
    const height = window.innerHeight / 2; // Adjust the height as needed
    renderer.setSize(width, height);
    renderer.setSize(400, 385); // Set the size of the viewport
    const earthContainer = document.getElementById('earth-container');
    earthContainer.appendChild(renderer.domElement);

    const earthGeometry = new THREE.SphereGeometry(3, 32, 32);
    const earthTexture = new THREE.TextureLoader().load(earth2);
    const earthBumpMap = new THREE.TextureLoader().load(earthBump);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: earthBumpMap,
      bumpScale: 0.1,
    });
    earthMaterial.color = new THREE.Color(5, 5, 5); // Adjust the RGB values
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    const cloudGeometry = new THREE.SphereGeometry(3.08, 32, 32);
    const cloudTexture = new THREE.TextureLoader().load(cloud);
    const cloudMaterial = new THREE.MeshBasicMaterial({ map: cloudTexture, transparent: true });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);

    const ambientLight = new THREE.AmbientLight(0x333333, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    scene.add(directionalLight);

    const blueLight = new THREE.PointLight(0x0000ff, 0.5);
    scene.add(blueLight);

    const whiteLight = new THREE.DirectionalLight(0xffffff, 1);
    whiteLight.position.set(0, 0, -5);
    scene.add(whiteLight);

    const animate = () => {
      requestAnimationFrame(animate);
      earth.rotation.y -= 0.0009;
      clouds.rotation.y += 0.0005;

      const date = new Date();
      const sunPos = SunCalc.getPosition(date, 0, 0);
      const lightX = sunPos.azimuth * (180 / Math.PI);
      const lightY = -sunPos.altitude * (180 / Math.PI);
      directionalLight.position.set(lightX, lightY, 10);
      blueLight.position.set(-lightX, -lightY, -10);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      scene.remove(earth);
      scene.remove(clouds);
      renderer.dispose();
      earthContainer.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className='earth'>
      <div id="earth-container" />
    </div>
  );
}

export default Earth;
