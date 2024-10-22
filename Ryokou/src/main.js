const { ipcRenderer } = require('electron');
            
function quitApp() {
    ipcRenderer.send('quit-app');
}

document.addEventListener('DOMContentLoaded', () => {
    const quitButton = document.getElementById("quitButton");
    if (quitButton) {
        quitButton.addEventListener('click', (e) => {
            e.preventDefault();
            quitApp();
        });
    }
});