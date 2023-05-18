const textarea = document.querySelector('textarea');
const acceptButton=document.querySelector('.accept-button');

textarea.addEventListener('focus', function() {
  adjustHeight(this);
  acceptButton.className +=" back-button"
  acceptButton.style.display='flex';
});


function adjustHeight(textarea) {
  textarea.style.border = '1px solid #ccc';
  textarea.style.borderLeft = 'none';
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}