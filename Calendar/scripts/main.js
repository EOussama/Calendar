//Variables-------------------------------------------------------------------------------------
var 
	timer,
	curSet = false,
	currentIter = 0,
	date = new Date(),
	absDate = new Date();
	monthElement = document.getElementById('monthName'),
	monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var
	timeElement = document.getElementById('time'),
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


//Functions-------------------------------------------------------------------------------------
function updateTime() {
	
	let tempDate = new Date();
	
	timeElement.innerHTML = absDate.getHours() + ":" + (absDate.getMinutes() < 10 ? '0' : '') + absDate.getMinutes() + ":" + (absDate.getSeconds() < 10 ? '0' : '') + absDate.getSeconds();
}

function updateCal(dt) {
	
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
				if(j >= dt.getDay() - 1)
					cells[j].innerHTML = ++x;
				
				else
				{
					console.log('lastMonthDays.getDate(): ' + lastMonthDays.getDate());
					console.log('(new Date(dt.getFullYear(), dt.getMonth(), 1)).getDay(): ' + (new Date(dt.getFullYear(), dt.getMonth(), 1)).getDay());
					console.log('j: ' + j);
					console.log('result: ' + (lastMonthDays.getDate() - ((new Date(dt.getFullYear(), dt.getMonth(), 1)).getDay() - j - 1)));
					console.log('------------------------------------------------------');
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