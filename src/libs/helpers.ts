export const pushNotification = () => {
	if (!('Notification' in window)) {
		// Check if the browser supports notifications
		alert('This browser does not support desktop notification');
	} else if (Notification.permission === 'granted') {
		// alert('ok');
		// Check whether notification permissions have already been granted;
		// if so, create a notification
		const img = `${process.env.publicURL}/images/FavIcon.png`;
		const text = `You have a new message.`;
		const notification = new Notification('Complete Greet', { body: text, icon: img });

		notification.onclick = (event) => {
			event.preventDefault(); // prevent the browser from focusing the Notification's tab
			window.open(`${process.env.publicURL}/dashboard/live-chat`, '_blank');
		};
	} else if (Notification.permission !== 'denied') {
		// We need to ask the user for permission
		Notification.requestPermission().then((permission) => {
			// If the user accepts, let's create a notification
			if (permission === 'granted') {
				const img = `${process.env.publicURL}/images/FavIcon.png`;
				const text = `You have a new message.`;
				const notification = new Notification('Complete Greet', { body: text, icon: img });
				notification.onclick = (event) => {
					event.preventDefault(); // prevent the browser from focusing the Notification's tab
					window.open(`${process.env.publicURL}/dashboard/live-chatt`, '_blank');
				};
			}
		});
	}

	// At last, if the user has denied notifications, and you
	// want to be respectful, there is no need to bother them anymore.
};

export const playSound = () => {
	const audio = new Audio('/audio/NotificationSoundFile-1672841469730.wav');
	audio.play();
};
