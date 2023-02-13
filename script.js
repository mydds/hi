const words = document.querySelectorAll('.word');
words.forEach(word => {
  word.classList.add('highlight');
  setTimeout(() => {
    word.classList.remove('highlight');
  }, 2000);
    
    word.addEventListener('mouseenter', e => {
    const popupType = word.dataset.popupType;
    const popupContent = word.dataset.popupContent;
    const popup = document.createElement('div');
    popup.classList.add('popup', `popup-${popupType}`);

    const wordRect = word.getBoundingClientRect();
    popup.style.top = `${wordRect.top + wordRect.height + 10}px`;
    popup.style.left = `${wordRect.left}px`;

        
         // Calculate the left position of the popup based on the position of the element
    if (wordRect.left + wordRect.width / 2 < window.innerWidth / 2) {
      // If the element is closer to the left side of the screen, position the popup to the right of the element
      popup.style.left = `${wordRect.left + wordRect.width + 0}px`;
    } else {
      // If the element is closer to the right side of the screen, position the popup to the left of the element
      popup.style.left = `${wordRect.left - wordRect.width - 10}px`;
    }
        
        
    if (popupType === 'word') {
      popup.innerHTML = `<div class="popup-word">${popupContent}</div>`;
    } else if (popupType === 'text') {
      popup.innerHTML = `<div class="popup-text">${popupContent}</div>`;
    } else if (popupType === 'image') {
      popup.innerHTML = `<img class="popup-image" src="${popupContent}">`;
    } else if (popupType === 'grid') {
      const images = popupContent.split(',');
      let gridHTML = '<div class="popup-grid" style="flex-wrap: wrap">';
      images.forEach((image, index) => {
        const img = new Image();
        img.src = image;
        gridHTML += `<img class="popup-grid-item" src="${image}" style="order: ${index}">`;
      });
      gridHTML += '</div>';
      popup.innerHTML = gridHTML;
    } else if (popupType === 'image-text') {
      // Split popupContent into image URL and text caption
      const [imageURL, text] = popupContent.split('|');
      popup.innerHTML = `
        <div class="popup-image-text">
          <img class="popup-image-text-image" src="${imageURL}">
          <div class="popup-image-text-text">${text}</div>
        </div>
      `;
    } else if (popupType === 'circle') {
        /* For adding a single circle image popup below*/
  popup.innerHTML = `<div class="popup-circle"><img src="${popupContent}"></div>`;
} 
        else if (popupType === 'grid2') {
  // Split popupContent into image URLs and text
  const [imageURLs, text] = popupContent.split('|');
  const images = imageURLs.split(',');
  let gridHTML = '<div class="popup-grid2" style="flex-wrap: wrap">';
  gridHTML += `<div class="popup-grid2-text">${text}</div>`;
  images.forEach((image, index) => {
    const img = new Image();
    img.src = image;
    gridHTML += `<img class="popup-grid2-item" src="${image}" style="order: ${index}">`;
  });
  gridHTML += '</div>';
  popup.innerHTML = gridHTML;
}


        /*Original working popupgrid2 circle code below
        else if (popupType === 'grid2') {
      const images = popupContent.split(',');
      let gridHTML = '<div class="popup-grid2" style="flex-wrap: wrap">';
      images.forEach((image, index) => {
        const img = new Image();
        img.src = image;
        gridHTML += `<img class="popup-grid2-item" src="${image}" style="order: ${index}">`;
      });
      gridHTML += '</div>';
      popup.innerHTML = gridHTML;
    }*/
        else if (popupType === 'gridabove') {
    /* For adding popup grid of images that popup above*/
      const images = popupContent.split(',');
      let gridHTML = '<div class="popup-gridabove" style="flex-wrap: wrap">';
      images.forEach((image, index) => {
        const img = new Image();
        img.src = image;
        gridHTML += `<img class="popup-gridabove-item" src="${image}" style="order: ${index}">`;
      });
      gridHTML += '</div>';
      popup.innerHTML = gridHTML;
    }
         
        

    document.body.appendChild(popup);
  });
  word.addEventListener('mouseleave', e => {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
      popup.remove();
    });
  });
});





/* For adding dark mode below - This one below works but its the one inside the upper nav bar*/
/*
document.addEventListener("DOMContentLoaded", function () {
  const darkModeButton = document.getElementById("dark-mode-button");
  darkModeButton.addEventListener("click", toggleDarkMode);
});

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}
*/



/* For adding Alternate dark mode toggle switchbelow */
  // Select the checkbox input
  const checkbox = document.querySelector('.dark-mode-toggle__checkbox');

  // Add a change event listener to the checkbox
  checkbox.addEventListener('change', function() {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // If checked, add the 'dark-mode' class to the body
      document.body.classList.add('dark-mode');
    } else {
      // If not checked, remove the 'dark-mode' class from the body
      document.body.classList.remove('dark-mode');
    }
  });




/*All of this below is just to get the static popup boxes working. If decide I don't want those anymore, can delete all of this*/
/*Change this click below to mouseenter in order to get the popup to happen upon hover*/
document.querySelectorAll('.static').forEach(element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const popupType = element.dataset.popupType;
    const popupContent = element.dataset.popupContent;
    const popup = document.createElement('div');
    popup.classList.add('popup', `popup-${popupType}`);

    const elementRect = element.getBoundingClientRect();
    popup.style.top = `${elementRect.top + elementRect.height - 180}px`;
    popup.style.left = `${elementRect.left}px`;

    if (popupType === 'word') {
      popup.innerHTML = `
        <div class="popup-word">
          ${popupContent}
          <button class="static-close-button">X</button>
        </div>
      `;
    } else if (popupType === 'text') {
      popup.innerHTML = `
        <div class="popup-text">
          ${popupContent}
          <button class="static-close-button">X</button>
        </div>
      `;
    }

    document.body.appendChild(popup);

    popup.querySelector('.static-close-button').addEventListener('click', e => {
      e.preventDefault();
      popup.remove();
    });
  });
});

document.addEventListener('click', function(event) {
  let target = event.target;

  // Check if the target is a .static element
  if (target.classList.contains('static')) {
    // Add a .static-clicked class to the element
    target.classList.add('static-clicked');
  } else if (target.classList.contains('static-close-button')) {
    // Find the .static element that the close button belongs to
    const staticElement = target.closest('.static');
    // Remove the .static-clicked class from the element
    staticElement.classList.remove('static-clicked');
  }
});





/*Add loading page to the intro of the website -- This One Works if needed...
window.addEventListener('load', function() {
  // Wait for 1 second
  setTimeout(function() {
    // Fade out the loading screen
    document.querySelector('.loading-screen').style.opacity = 0;
  }, 1000);
});

document.querySelector('.loading-screen').addEventListener('transitionend', function() {
  // Remove the loading screen from the page once the transition is complete
  this.remove();
});*/

