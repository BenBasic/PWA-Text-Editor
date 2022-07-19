const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevents older browsers from automatically showing the prompt
    event.preventDefault();
    // Stores the prompt event so it can be triggered later
    window.deferredPrompt = event;
    // Toggles the install button to be visible
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Defining the promptEvent to reference the prompt we made earlier
    const promptEvent = window.deferredPrompt;
    // If there is no promptEvent, then continue as normal, if there is a promptEvent, trigger a prompt
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();

    // Sets the prompt to null, and makes the install button invisible
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Sets the prompt to null
    window.deferredPrompt = null;
    // Changing the text of the install button once app gets installed
    butInstall.innerHTML = 'Install Completed';
});
