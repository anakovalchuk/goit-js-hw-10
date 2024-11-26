const form = document.querySelector('.feedback-form');
const formInput = document.querySelector('#user-email');
const formTextarea = document.querySelector('.form-textarea');

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

// Функція для отримання даних з локального сховища

function getStorageData() {
  const storageData = localStorage.getItem(STORAGE_KEY);
  if (storageData) {
    const storageDataParse = JSON.parse(storageData);
    formInput.value = storageDataParse.email;
    formTextarea.value = storageDataParse.message;
  }
}

getStorageData();

// Обробник події для фокусу на полі email

formInput.addEventListener('focus', () => {
  formInput.setAttribute('placeholder', 'Type your email here');
});

// Обробник події для blur (коли поле email втрачає фокус)

formInput.addEventListener('blur', () => {
  formInput.setAttribute('placeholder', '');
});

form.addEventListener('input', handleInput); // Функція обробки події input, яка оновлює дані в локальному сховищі
form.addEventListener('submit', handleSubmit); // Функція для обробки сабміту форми

function handleInput() {
  formData.email = formInput.value.trim();
  formData.message = formTextarea.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();
  // Перевірка чи обидва поля заповнені
  if (!formInput.value.trim() || !formTextarea.value.trim()) {
    alert('Fill please all fields');
    return;
  }

  // Якщо всі поля заповнені, зберігаємо їх значення в formData
  formData.email = formInput.value.trim();
  formData.message = formTextarea.value.trim();
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  formData.email = '';
  formData.message = '';
}
