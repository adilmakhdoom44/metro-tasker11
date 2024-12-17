



document.addEventListener("DOMContentLoaded", function () {
    const texts = ["TV Installation", "TV Mounting", "Wall Mounting"];
    const targetElement = document.getElementById("text-rotator");
    let currentIndex = 0;

    function typeText(text, callback) {
        let charIndex = 0;
        targetElement.textContent = ""; // Clear the current text
        const typingInterval = setInterval(() => {
            targetElement.textContent += text[charIndex]; // Add one character at a time
            charIndex++;
            if (charIndex === text.length) {
                clearInterval(typingInterval);
                setTimeout(() => callback(), 1000); // Pause before removing the text
            }
        }, 100); // Typing speed
    }

    function deleteText(callback) {
        const deletingInterval = setInterval(() => {
            targetElement.textContent = targetElement.textContent.slice(0, -1); // Remove one character at a time
            if (targetElement.textContent.length === 0) {
                clearInterval(deletingInterval);
                callback();
            }
        }, 50); // Deleting speed
    }

    function cycleTexts() {
        typeText(texts[currentIndex], () => {
            deleteText(() => {
                currentIndex = (currentIndex + 1) % texts.length; // Move to the next text
                cycleTexts(); // Repeat the cycle
            });
        });
    }

    cycleTexts(); // Start the cycle
});

$(document).ready(function () {
    $('.slick-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.getElementById('content-area'); // Main content area
  
    // Mapping each category to its respective HTML file
    const tabs = {
      "interior-design": "interior-design.html",
      "mounting-tv": "mounting-tv.html",
      "diy-projects": "diy-projects.html",
      "storage-tips": "storage-tips.html",
    };
  
    // Function to load content dynamically
    const loadContent = (category) => {
      contentArea.classList.remove('show'); // Remove animation class to reset
      contentArea.innerHTML = ''; // Clear the current content
  
      if (category === 'all') {
        // Load all categories when "All" is clicked
        Object.values(tabs).forEach((file, index) => {
          setTimeout(() => {
            fetch(file)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Failed to load ${file}`);
                }
                return response.text();
              })
              .then((data) => {
                contentArea.innerHTML += `<div class="mb-4">${data}</div>`;
                if (index === Object.values(tabs).length - 1) {
                  contentArea.classList.add('show'); // Add animation class after loading
                }
              })
              .catch((error) => {
                console.error(error);
                contentArea.innerHTML += `<p>Error loading ${file}</p>`;
              });
          }, index * 100); // Staggered loading for "All" tab
        });
      } else {
        // Load specific category
        const file = tabs[category];
        fetch(file)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to load ${file}`);
            }
            return response.text();
          })
          .then((data) => {
            contentArea.innerHTML = data; // Replace content with the loaded HTML
            contentArea.classList.add('show'); // Add animation class after loading
          })
          .catch((error) => {
            console.error(error);
            contentArea.innerHTML = `<p>Error loading ${file}</p>`;
            contentArea.classList.add('show'); // Show error message with animation
          });
      }
    };
  
    // Event listener for category tabs only
    document.querySelectorAll('.nav-link[data-category]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = link.getAttribute('data-category');
        loadContent(category);
      });
    });
  
    // Load "All" content by default
    loadContent('all');
  });


  // Load Header
fetch('header.html')
.then(response => response.text())
.then(data => {
  document.getElementById('header-placeholder').innerHTML = data;
});

// Load Footer
fetch('footer.html')
.then(response => response.text())
.then(data => {
  document.getElementById('footer-placeholder').innerHTML = data;
});





// Function to fetch and display blog content
async function loadBlogContent() {
  // Get URL parameters
  const params = new URLSearchParams(window.location.search);
  const blogFile = params.get('file'); // Name of the blog file to load

  if (!blogFile) {
      document.querySelector('.blog-posts-container').innerHTML = '<p>No blog selected.</p>';
      return;
  }

  try {
      // Fetch the blog content from the file
      const response = await fetch(`/blog-content/${blogFile}`);
      if (!response.ok) throw new Error('Blog file not found');

      const blogContent = await response.text();

      // Create a new blog-post div and append the content
      const blogPostDiv = document.createElement('div');
      blogPostDiv.className = 'blog-post';
      blogPostDiv.innerHTML = blogContent;

      // Append the new blog content to the blog-posts-container
      document.querySelector('.blog-posts-container').appendChild(blogPostDiv);
  } catch (error) {
      console.error(error);
      document.querySelector('.blog-posts-container').innerHTML += `<p>Error loading blog: ${blogFile}</p>`;
  }
}

// Call the function to load the blog content
loadBlogContent();




document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll('.count-up');
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const target = entry.target;
              const targetValue = parseInt(target.dataset.target);
              let currentValue = 0;
              const increment = Math.ceil(targetValue / 100); // Control speed
              
              const updateCounter = () => {
                  currentValue += increment;
                  if (currentValue >= targetValue) {
                      target.textContent = targetValue;
                      clearInterval(counterInterval);
                  } else {
                      target.textContent = currentValue;
                  }
              };
              const counterInterval = setInterval(updateCounter, 30); // Adjust speed here
              observer.unobserve(target);
          }
      });
  });

  counters.forEach(counter => observer.observe(counter));
});


window.addEventListener("load", function () {
  setTimeout(() => {
    document.body.classList.add("loaded");
    document.getElementById("content").style.display = "block";
  }, 1000);
});
