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
        rowContainer = document.getElementsByTagName('tbody')[0],
        modal = document.getElementById('modal-bg'),
        settingsBtn = document.getElementById('settings-btn'),
        closeBtn = document.getElementById('close-btn');

    // Generating the calendar's rows.
    (() => {
        for (let i in [...Array(5)]) {
            const row = document.createElement('tr');

            for (let j in [...Array(7)]) {
                const column = document.createElement('td');

                column.textContent = (parseInt(j) + 1) + (parseInt(i) * 7);
                row.appendChild(column);
            }
            
            rowContainer.appendChild(row);
        }
    })();

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
/*
//Variables-------------------------------------------------------------------------------------
const 
	monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	modalBG = document.getElementById('modalBG'),
	modalBox = document.getElementById('modalBox'),
	monthElement = document.getElementById('monthName'),
	timeElement = document.getElementById('time'),
	caption = document.getElementById('capID'),
	table = document.getElementsByTagName('table')[0],
	rows = table.getElementsByTagName('tr'),
	lightTheme = document.getElementById('lightTheme'),
	darkTheme = document.getElementById('darkTheme'),
	autoTheme = document.getElementById('autoTheme'),
	facts = document.getElementById('facts');

var 
	config = {theme : "light"},
	themeID = 1,
	timer,
	curSet = false,
	currentIter = 0,
	date = new Date(),
	absDate = new Date(),
	cells;
	

//Event handlers--------------------------------------------------------------------------------
document.body.onload = function() { "use strict";
	
	loadConfig();
								   
	switch(config.theme) {
		case 'light': {
			themeID = 1;
			setTheme();

			break;
		}
		case 'dark': {
			themeID = 2;
			setTheme();

			break;
		}
		case 'auto': {
			themeID = 3;
			setTheme();

			break;
		}
	}
	
	timer = setInterval(function() {
		absDate = new Date();
		updateTime();
		
	}, 1000);
	
	updateCal(date);
	closeModal();
	console.info('Calendar started - ' + new Date());
}

document.getElementById('leftArrow').addEventListener('mousedown', function (){
	date = new Date(absDate.getFullYear(), absDate.getMonth() + (--currentIter), absDate.getDate());
	
	updateCal(date);
});

document.getElementById('rightArrow').addEventListener('mousedown', function (){
	date = new Date(absDate.getFullYear(), absDate.getMonth() + (++currentIter), absDate.getDate());
	
	updateCal(date);
});

document.getElementById('settingsBtn').addEventListener('click', function () {
	openModal();
});

document.getElementById('closeBtn').addEventListener('click', function () {
	closeModal();
});

window.addEventListener('click', function (e) {
	if(e.target == modalBG)
		closeModal();
});

//Functions-------------------------------------------------------------------------------------
function updateTime() {
	
	let tempDate = new Date();
	
	timeElement.innerHTML = (absDate.getHours() < 10 ? '0' : '') + absDate.getHours() + ":" + (absDate.getMinutes() < 10 ? '0' : '') + absDate.getMinutes() + ":" + (absDate.getSeconds() < 10 ? '0' : '') + absDate.getSeconds();
}

function updateCal(dt) {

	curSet = false;
	let x = 0;
	let lastMonthDays = new Date(dt.getFullYear(), dt.getMonth(), 0);

	monthElement.innerHTML = monthsName[dt.getMonth()] + " " + dt.getFullYear();

	for(let i = 0; i<rows.length; i++)
	{
		cells = rows[i].getElementsByTagName('td');

		for(let j = 0; j<cells.length; j++)
		{
			cells[j].innerHTML = '';
			cells[j].classList.remove('oor');

			if(i == 1)
			{
				if(lastMonthDays.getDay() == 6 || j >= lastMonthDays.getDay() + 1)
					cells[j].innerHTML = ++x;
				
				else
				{
					cells[j].innerHTML = lastMonthDays.getDate() - ((new Date(dt.getFullYear(), dt.getMonth(), 1)).getDay() - j - 1);
					cells[j].classList.add('oor');
				}
			}
			
			else if(i >= rows.length - 2)
			{
				if(x < (new Date(dt.getFullYear(), dt.getMonth() + 1, 0)).getDate() && x > 20)
					cells[j].innerHTML = ++x;
				else
				{
					if(x == (new Date(dt.getFullYear(), dt.getMonth() + 1, 0)).getDate())
						x = 0;
					
					cells[j].innerHTML = (new Date(dt.getFullYear(), dt.getMonth() + 1, ++x)).getDate();
					cells[j].classList.add('oor');
				}
			}
			
			else
				cells[j].innerHTML = ++x;

			if(cells[j].innerText == dt.getDate() && dt.getMonth() == absDate.getMonth() && dt.getFullYear() == absDate.getFullYear() && curSet == false)
			{
				cells[j].classList.add('currentDay');
				curSet = true;
			}
			else
				cells[j].classList.remove('currentDay');
		}
	}
}
	
function openModal() {
	modalBG.style.display = 'block';
	table.style.filter = 'blur(5px)';
}
	
function closeModal() {
	modalBG.style.display = 'none';
	table.style.filter = 'blur(0px)';
}

function setTheme() {
	switch(themeID)
	{
		// Light theme
		case 1:
		{
			if(table.classList.contains('table-dark-theme')) table.classList.remove('table-dark-theme');
			if(table.classList.contains('table-custom-theme')) table.classList.remove('table-custom-theme');
			
			if(caption.classList.contains('caption-dark-theme')) caption.classList.remove('caption-dark-theme');
			if(caption.classList.contains('caption-custom-theme')) caption.classList.remove('caption-custom-theme');
			
			table.classList.add('table-light-theme');
			caption.classList.add('caption-light-theme');
			
			darkTheme.checked = autoTheme.checked = !(lightTheme.checked = true);
			config.theme = "light";
			
			break;
		}
		
		// Dark theme
		case 2:
		{
			if(table.classList.contains('table-light-theme')) table.classList.remove('table-light-theme');
			if(table.classList.contains('table-custom-theme')) table.classList.remove('table-custom-theme');
			
			if(caption.classList.contains('caption-light-theme')) caption.classList.remove('caption-light-theme');
			if(caption.classList.contains('caption-custom-theme')) caption.classList.remove('caption-custom-theme');
			
			table.classList.add('table-dark-theme');
			caption.classList.add('caption-dark-theme');
			
			lightTheme.checked = autoTheme.checked = !(darkTheme.checked = true);
			config.theme = "dark";
			
			break;
		}
		
		// Auto theme
		case 3: {
			let time = new Date().getHours();
			if(time < 20) {
				themeID = 1;
				setTheme();
			}
			else {
				themeID = 2;
				setTheme();
			}
			
			darkTheme.checked = lightTheme.checked = !(autoTheme.checked = true);
			config.theme = "auto";
		}
	}
	
	saveConfig();
}

function showASetts() {
	if(modalBox.style.height === '490px')
		modalBox.style.height = '320px';
	else
		modalBox.style.height = '410px';
}

function saveConfig() {
	localStorage.setItem('config', JSON.stringify(config));
}

function loadConfig() {
	if(localStorage.getItem('config') != null)
		config = JSON.parse(localStorage.getItem('config'));
}*/
