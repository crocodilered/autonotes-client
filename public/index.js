
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}

let deferredPrompt;
const a2hsPanel = document.getElementById('a2hs');


window.addEventListener('beforeinstallprompt', (e) => {

  e.preventDefault();
  deferredPrompt = e;
  a2hsPanel.style.display = 'block';

  a2hsPanel.addEventListener('click', (e) => {
    console.log(3)

    a2hsPanel.style.display = 'none';
    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
