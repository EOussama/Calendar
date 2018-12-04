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
	
	let curDate = new Date();

    // #region Generating the calendar's rows.
    (() => {
        for (let i in [...Array(6)]) {
			const
				dayOfWeekOfFirstDayOfMonth = (new Date(curDate.getFullYear(), curDate.getMonth(), 1)).getDay(),
				dayOfWeekOfLastDayOfMonth = (new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1)).getDay(),
				lastDayOfCurrentMonth = (new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0)).getDate(),
				lastDayOfLastMonth = (new Date(curDate.getFullYear(), curDate.getMonth(), 0)).getDate(),
				row = document.createElement('tr');

            for (let j in [...Array(7)]) {
				const column = document.createElement('td');
				let dayOnCalendar = ((parseInt(j) + 1) + (parseInt(i) * 7)) - dayOfWeekOfFirstDayOfMonth;

                // Affecting text to the column.
				if (dayOnCalendar <= 0) {
					dayOnCalendar = lastDayOfLastMonth - ((dayOfWeekOfFirstDayOfMonth * (i + 1)) - j - 1);

					// Adding style to the days out of range of the focused month.
					column.classList.add('out-of-range');
				} else if (dayOnCalendar > lastDayOfCurrentMonth) {
					dayOnCalendar = j - dayOfWeekOfLastDayOfMonth + 1;

					// Adding style to the days out of range of the focused month.
					column.classList.add('out-of-range');
				}

				column.textContent = Math.abs(dayOnCalendar);

				// Adding a highlight to the current day.
				if (dayOnCalendar == curDate.getDate()) {
					column.classList.add('current-day');
				}

                // Appending the column.
                row.appendChild(column);
            }
            
            // Adding the new row.
			rowContainer.appendChild(row);
		}
	})();
	// #endregion

	// #region Real-time for the caption.
	setInterval(() => {
		curDate = new Date();

		// Updating the month.
		monthYearLabel.textContent = `${ monthsName[curDate.getMonth()] } ${ curDate.getFullYear() }`;

		// Updating the time.
		const
			_hours = (curDate.getHours() < 10 ? `0${ curDate.getHours() }` : curDate.getHours()),
			_minutes = (curDate.getMinutes() < 10 ? `0${ curDate.getMinutes() }` : curDate.getMinutes()),
			_seconds = (curDate.getSeconds() < 10 ? `0${ curDate.getSeconds() }` : curDate.getSeconds());

		timeLabel.textContent = `${ _hours } : ${ _minutes } : ${ _seconds }`;
	}, 1000);
	// #endregion

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
