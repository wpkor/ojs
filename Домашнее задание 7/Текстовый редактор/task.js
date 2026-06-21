'use strict';

const editor = document.getElementById('editor');
const clearBtn = document.getElementById('clearBtn');
const STORAGE_KEY = 'editor_content';

function loadFromStorage() {
  const savedText = localStorage.getItem(STORAGE_KEY);
  if (savedText !== null) {
    editor.value = savedText;
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, editor.value);
}

function clearContent() {
  if (editor.value.trim() === '') {
    return;
  }
  if (confirm('Очистить текст?')) {
    editor.value = '';
    localStorage.removeItem(STORAGE_KEY);
  }
}

loadFromStorage();
editor.addEventListener('input', saveToStorage);

if (clearBtn) {
  clearBtn.addEventListener('click', clearContent);
}
