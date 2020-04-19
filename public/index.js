
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  navigator.serviceWorker.register('/service-worker.js')
}


let deferredPrompt;
const a2hsPanel = document.getElementById('a2hs');
const a2hsOk = document.getElementById('a2hs-ok');
const a2hsCancel = document.getElementById('a2hs-cancel');


window.addEventListener('beforeinstallprompt', (e) => {

  e.preventDefault();
  deferredPrompt = e;
  a2hsPanel.style.display = 'block';

  a2hsOk.addEventListener('click', () => {

    a2hsPanel.style.display = 'none';
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });

  a2hsCancel.addEventListener('click', () => {
    a2hsPanel.style.display = 'none';
  });

});
