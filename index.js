const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

sideLinks.forEach(item => {
    const li = item.parentElement;
    item.addEventListener('click', () => {
        sideLinks.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
    })
});

const menuBar = document.querySelector('.content nav .bx.bx-menu');
const sideBar = document.querySelector('.sidebar');


menuBar.addEventListener('click', () => {
    sideBar.classList.toggle('close');
});

const searchBtn = document.querySelector('.content nav form .form-input button');
const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
const searchForm = document.querySelector('.content nav form');

searchBtn.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault;
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchBtnIcon.classList.replace('bx-search', 'bx-x');
            
        } else {
            searchBtnIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add('close');
    } else {
        sideBar.classList.remove('close');
    }
    if (window.innerWidth > 576) {
        searchBtnIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

const toggler = document.getElementById('theme-toggle');

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
});

const addProductBtn = document.querySelector('.reports');
const popupMenu = document.querySelector('#pop-up-menu');
const imageInput = document.querySelector('#image-input');
const nameInput = document.querySelector('#name-input');
const idInput = document.querySelector('#id-input');
const conditionSelect = document.querySelector('#condition-select');
const locationSelect = document.querySelector('#location-select');
const availabilityInput = document.querySelector('#availability-input');
const priceInput = document.querySelector('#price-input');
const submitBtn = document.querySelector('#submit-btn');

addProductBtn.addEventListener('click', () => {
  popupMenu.style.display = 'block';
});

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const image = document.createElement('img');
    image.src = e.target.result;
    popupMenu.appendChild(image);
  };
  reader.readAsDataURL(file);
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);
  formData.append('name', nameInput.value);
  formData.append('id', idInput.value);
  formData.append('condition', conditionSelect.value);
  formData.append('location', locationSelect.value);
  formData.append('availability', availabilityInput.value);
  formData.append('price', priceInput.value);

  // Send the form data to the server
  fetch('/add-product', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});


