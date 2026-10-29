(() => {
 const dialog = document.getElementById('map-dialog');
 const imageArea = dialog.querySelector('.map-dialog-image');
 document.querySelectorAll('.map-preview').forEach(button => {
  button.addEventListener('click', () => {
   document.getElementById('map-dialog-title').textContent = button.dataset.mapTitle;
   document.getElementById('map-dialog-coordinates').textContent = button.dataset.mapCoordinates;
   imageArea.replaceChildren(button.querySelector('img').cloneNode(true),button.querySelector('.meeting-pin').cloneNode(true));
   imageArea.querySelector('img').loading = 'eager';
   dialog.showModal();
   document.body.classList.add('map-is-open');
  });
 });
 const close = () => dialog.close();
 dialog.querySelector('.map-close').addEventListener('click',close);
 dialog.addEventListener('click',event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) close(); } });
 dialog.addEventListener('close',() => document.body.classList.remove('map-is-open'));
})();
