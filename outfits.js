document.querySelectorAll('.outfit-card').forEach(card => {
 const images = card.querySelectorAll('.outfit-photo img');
 const buttons = card.querySelectorAll('.outfit-choice');
 buttons.forEach(button => button.addEventListener('click', () => {
  images.forEach((image,index) => { image.hidden = index !== Number(button.dataset.look); });
  buttons.forEach(choice => choice.setAttribute('aria-pressed',String(choice === button)));
 }));
});