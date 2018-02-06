var monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthElement = document.getElementById('monthName');
var timeElement = document.getElementById('time');
var timer;
var date = new Date(), absDate = new Date();
var currentIter = 0;
var table = document.getElementsByTagName('table')[0];
var rows = table.getElementsByTagName('tr');
var cells;

document.body.onload = function() {
	startCount();
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

function updateTime() {
	
	timeElement.innerHTML = absDate.getHours() + ":" + (absDate.getMinutes() < 10 ? '0' : '') + absDate.getMinutes() + ":" + (absDate.getSeconds() < 10 ? '0' : '') + absDate.getSeconds();
}

function startCount() {
	
	setInterval(function() {
		
		if(date.getMonth() == absDate.getMonth())
		{
			let x = 0;
			absDate = new Date();

			updateTime();
			updateCal(date);
		}
	}, 1000);
}

function updateCal(dt) {
	
	let x = 0;

	monthElement.innerHTML = monthsName[dt.getMonth()] + " " + dt.getFullYear();

	for(let i = 0; i<rows.length; i++)
	{
		cells = rows[i].getElementsByTagName('td');

		for(let j = 0; j<cells.length; j++)
		{
			cells[j].innerHTML = '';

			if((new Date(dt.getFullYear(), dt.getMonth() + 1, 0)).getDate() <= x)
				continue;

			if((new Date(dt.getFullYear(), dt.getMonth(), 0)).getDay() < j)
				cells[j].innerHTML = ++x;
			else if(i != 1)
				cells[j].innerHTML = ++x;

			if(cells[j].innerText == dt.getDate() && dt.getMonth() == absDate.getMonth() && dt.getFullYear() == absDate.getFullYear())
				cells[j].classList.add('currentDay');
			else
				cells[j].classList.remove('currentDay');
		}
	}
	
	fillOutOfRangeDays(dt);
}

function fillOutOfRangeDays(dt) {
	
	let x = 0;
	
	for(let i = 0; i<rows.length; i++)
	{
		cells = rows[i].getElementsByTagName('td');

		for(let j = 0; j<cells.length; j++)
		{
			if(cells[j].innerHTML == '')
			{
				cells[j].innerHTML = x;
				cells[j].classList.add('oor');
			}
			else
				cells[j].classList.remove('oor');
			
			x++;
		}
	}
}
