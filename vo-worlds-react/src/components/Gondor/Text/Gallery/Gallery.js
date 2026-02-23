import React, { useState, useRef } from 'react';
import './Gallery.css'; // Assuming your CSS file is named Gallery.css

function Gallery({choice}) {
     let images = [];
    if(choice == 1){
         images = [
    '../insta/gallery1.PNG',
    '../insta/gallery2.PNG',
    '../insta/gallery3.PNG',
  ];
}
else if(choice == 2){
         images = [
    '../insta/gallery4.PNG',
    '../insta/gallery5.PNG',
    '../insta/gallery6.PNG',
  ];
}

else if(choice == 3){
         images = [
    '../insta/gallery7.JPEG',
    '../insta/gallery8.JPEG',
    '../insta/gallery9.JPEG',
  ];
}


  const [selectedImage, setSelectedImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const dialogElement = useRef(null);

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    dialogElement.current.showModal();
  };

  const closeModal = () => {
    dialogElement.current.close();
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedImage(images[(currentIndex + 1) % images.length]); // Update selected image
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]); // Update selected image
  };
  
  React.useEffect(() => {
    if (selectedImage === '' && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return ( <div className="overlay-modal">
      
      <div className="thumbnail-container">
        
        {images.map((image, i) => (
          <button
            key={i}
            className="thumbnail-button"
            onClick={() => openModal(i)}
          >
            
            <img
              className="thumbnail-image"
              src={image}
              alt={`Gallery Image ${i + 1}`}
            /></button>
            
          
        ))}
      </div>
      

      <dialog className="carousel-dialog" ref={dialogElement}>
        <div className="carousel-container">
          <button className="carousel-button carousel-button-prev" onClick={prevImage}>
            ❮
          </button>
          <img src={selectedImage} alt="Carousel Image" className="carousel-image"/>
          <button className="carousel-button carousel-button-next" onClick={nextImage}>
            ❯
          </button>
        </div>
        <button onClick={closeModal} aria-label="close" className="x">
          ✗
        </button>
      </dialog>
    </div>   );
}

export default Gallery;