/**
*
* @name:       Calendar
* @version:    0.1.0
* @author:     EOussama
* @license     Apache-2.0
* @source:     https://github.com/EOussama/Calendar
* 
* The main javascript file of the app.
*/

window.addEventListener('load', () => {
    const
        monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		rowContainer = document.getElementsByTagName('tbody')[0],
		monthYearLabel = document.getElementById('month-year'),
		timeLabel = document.getElementById('time'),
        modal = document.getElementById('modal-bg'),
        settingsBtn = document.getElementById('settings-btn'),
		closeBtn = document.getElementById('close-btn');
	
	let currentDate = new Date();

    // Generating the calendar's rows.
    (() => {
        for (let i in [...Array(5)]) {
            const row = document.createElement('tr');

            for (let j in [...Array(7)]) {
                const column = document.createElement('td');

                // Affecting text to the column.
                column.textContent = (parseInt(j) + 1) + (parseInt(i) * 7);

                // Appending the column.
                row.appendChild(column);
            }
            
            // Adding the new row.
            rowContainer.appendChild(row);
		}
		
		console.log(currentDate.getMonth());
	})();

	setInterval(() => {
		currentDate = new Date();

		// Updating the month.
		monthYearLabel.textContent = `${ monthsName[currentDate.getMonth()] } ${ currentDate.getFullYear() }`;

		// Updating the time.
		const
			_hours = (currentDate.getHours() < 10 ? `0${ currentDate.getHours() }` : currentDate.getHours()),
			_minutes = (currentDate.getMinutes() < 10 ? `0${ currentDate.getMinutes() }` : currentDate.getMinutes()),
			_seconds = (currentDate.getSeconds() < 10 ? `0${ currentDate.getSeconds() }` : currentDate.getSeconds());

		timeLabel.textContent = `${ _hours } : ${ _minutes } : ${ _seconds }`;
	}, 1000);

    /**
     * The click event that opens the modal.
     */
    settingsBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    /**
     * The click event that closes the modal.
     */
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
});
