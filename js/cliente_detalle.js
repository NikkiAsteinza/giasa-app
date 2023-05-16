const textarea = document.querySelector('textarea');
textarea.addEventListener('input', function() {
  adjustHeight(this);
});

function adjustHeight(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}