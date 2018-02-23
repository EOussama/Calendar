//Variables-------------------------------------------------------------------------------------
var 
	themeID = 1,
	timer,
	curSet = false,
	currentIter = 0,
	date = new Date(),
	absDate = new Date(),
	monthElement = document.getElementById('monthName'),
	monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var
	modalBG = document.getElementById('modalBG'),
	modalBox = document.getElementById('modalBox'),
	timeElement = document.getElementById('time'),
	caption = document.getElementById('capID'),
	table = document.getElementsByTagName('table')[0],
	rows = table.getElementsByTagName('tr'),
	cells;

//Event handlers--------------------------------------------------------------------------------
document.body.onload = function() {
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
			clearStyling();
			
			if(table.classList.contains('table-dark-theme')) table.classList.remove('table-dark-theme');
			if(table.classList.contains('table-custom-theme')) table.classList.remove('table-custom-theme');
			
			if(caption.classList.contains('caption-dark-theme')) caption.classList.remove('caption-dark-theme');
			if(caption.classList.contains('caption-custom-theme')) caption.classList.remove('caption-custom-theme');
			
			table.classList.add('table-light-theme');
			caption.classList.add('caption-light-theme');
			
			break;
		}
		
		// Dark theme
		case 2:
		{
			clearStyling();
			
			if(table.classList.contains('table-light-theme')) table.classList.remove('table-light-theme');
			if(table.classList.contains('table-custom-theme')) table.classList.remove('table-custom-theme');
			
			if(caption.classList.contains('caption-light-theme')) caption.classList.remove('caption-light-theme');
			if(caption.classList.contains('caption-custom-theme')) caption.classList.remove('caption-custom-theme');
			
			table.classList.add('table-dark-theme');
			caption.classList.add('caption-dark-theme');
			
			break;
		}
	}
}

function showASetts() {
	if(modalBox.style.height === '490px')
		modalBox.style.height = '320px';
	else
		modalBox.style.height = '490px';
}