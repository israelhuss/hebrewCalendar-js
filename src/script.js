const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("curMonth").innerHTML = months[new Date().getMonth()];
document.getElementById("curYear").innerHTML = new Date().getFullYear();

var month = months.indexOf(document.getElementById("curMonth").innerHTML);
var year = parseFloat(document.getElementById("curYear").innerHTML);
var view = 'Month';

var city = Hebcal.cities.getCity('monsey');
Hebcal.defaultLocation = [city[0], city[1]];



function daysInMonth(month, year) {
  let d = new Date(year, month + 1, 0);
  return d.getDate();
}

function lastMonth() {
  if (month === 0) {
    return 11;
  } else {
    return month - 1;
  } 
}

function lastYear() {
  if(month === 0) {
    return year - 1;
  } else {
    return year;
  }
}



function loadCalendarDays() {

  var num = daysInMonth(month, year); // Get number of days in current month


  document.getElementById("calendarDays").innerHTML = "";

  const tmpDate = new Date(year, month, 0);
  const dayOfWeek = tmpDate.getDay(); // find where to start calendar, day of week

  if (view === 'Month') {
    // create previous days
    if (dayOfWeek < 6) {
      var lastDate = tmpDate.getDate();
      
      for (var i = 0; i <= dayOfWeek; i++) {

        var prvDate = lastDate - (dayOfWeek - i);
        var d = document.createElement("div");
        d.innerHTML = prvDate;
        d.classList.add("day");
        d.classList.add("past");
        d.setAttribute('data-date', JSON.stringify({
          month: months[lastMonth(month)],
          day: prvDate,
          year: lastYear(),
          id: new Date(lastYear(), lastMonth(month), prvDate).getDay()
        }))
        document.getElementById("calendarDays").appendChild(d);
      }
    }

    //render the rest of the days
    for (var i = 0; i < num; i++) {

      var tmp = i + 1;
      var d = document.createElement("div");
      d.id = "calendarday_" + i;
      d.classList.add("day");
      d.innerHTML = tmp;
      d.setAttribute('data-date', JSON.stringify({
        month: months[month],
        day: tmp,
        year: year,
        id: new Date(year, month, tmp).getDay()
      }))
      document.getElementById("calendarDays").appendChild(d);
    }

  } else if (view === 'Week') {
    var today = new Date();
    var dayInWeek = today.getDay();
    var firstDay = new Date(year, month, (today.getDate() - dayInWeek));


    for (i = 0; i <= 6; i++) {
      var weekDay = new Date(year, firstDay.getMonth(), (firstDay.getDate() + i));
      var d = document.createElement('div');
      d.classList.add('day');
      d.innerHTML = weekDay.getDate();
      d.setAttribute('data-date', JSON.stringify({
        month: months[weekDay.getMonth()],
        day: weekDay.getDate(),
        year: weekDay.getFullYear(),
        id: weekDay.getDay()
      }));
      d.id = 'calendarday_' + (weekDay.getDate() - 1);
      document.getElementById('calendarDays').appendChild(d);
    }
  }

  // Highlight today's box
  var day = new Date();
  var today = day.getDate();
  var el = document.getElementById("calendarday_" + (today - 1));
  if (day.getMonth() === months.indexOf(JSON.parse(el.getAttribute('data-date')).month)) {
    el.classList.add("today");
  }
  addBtn(document.getElementsByClassName('day'));
}

loadCalendarDays();
// add button to add events
function addBtn(daysArr) {


  for (i = 0; i < daysArr.length; i++) {
    var b = document.createElement('div');
    b.id = 'addEvent';
    b.classList.add('add_event');
    b.innerHTML = '+'
    daysArr[i].appendChild(b);

    b.addEventListener('click', function (e) {
      recieveEvent(e);
    });
  }
}





// HEBCAL Dates and Sunset times

function loadHebrewDates() {

  document.getElementById("calendarDays").innerHTML = "";
  loadCalendarDays();

  var daysArr = document.getElementsByClassName('day');
  var num = daysArr.length; // Get number of days in current calendar view

  for (i = 0; i < num; i++) {



    // Get current month year and day
    var currentMonth = JSON.parse(daysArr[i].getAttribute('data-date')).month;
    var d = JSON.parse(daysArr[i].getAttribute('data-date')).day;
    var y = JSON.parse(daysArr[i].getAttribute('data-date')).year;

    // Get all dates of the month
    var dayFull = new Date(currentMonth + " " + d + " " + y); // Wed Apr 29 2020 03:39:17 GMT-0400 (Eastern Daylight Time)
    var dayString = currentMonth + " " + d + " " + y; // Apr 29 2020
    var dayId = JSON.parse(daysArr[i].getAttribute('data-date')).id;


    // Get the hebrew date for the current day
    var hday = new Hebcal.HDate(new Date(dayString)).toString().slice(0, 2);


    // Make it into a number and switch to hebrew letter
    var hdayNum = parseInt(hday);
    switch (hdayNum) {
      case 1:
        hcode = "א";
        break;
      case 2:
        hcode = "ב";
        break;
      case 3:
        hcode = "ג";
        break;
      case 4:
        hcode = "ד";
        break;
      case 5:
        hcode = "ה";
        break;
      case 6:
        hcode = "ו";
        break;
      case 7:
        hcode = "ז";
        break;
      case 8:
        hcode = "ח";
        break;
      case 9:
        hcode = "ט";
        break;
      case 10:
        hcode = "י";
        break;
      case 11:
        hcode = "יא";
        break;
      case 12:
        hcode = "יב";
        break;
      case 13:
        hcode = "יג";
        break;
      case 14:
        hcode = "יד";
        break;
      case 15:
        hcode = "טו";
        break;
      case 16:
        hcode = "טז";
        break;
      case 17:
        hcode = "יז";
        break;
      case 18:
        hcode = "יח";
        break;
      case 19:
        hcode = "יט";
        break;
      case 20:
        hcode = "כ";
        break;
      case 21:
        hcode = "כא";
        break;
      case 22:
        hcode = "כב";
        break;
      case 23:
        hcode = "כג";
        break;
      case 24:
        hcode = "כד";
        break;
      case 25:
        hcode = "כה";
        break;
      case 26:
        hcode = "כו";
        break;
      case 27:
        hcode = "כז";
        break;
      case 28:
        hcode = "כח";
        break;
      case 29:
        hcode = "כט";
        break;
      case 30:
        hcode = "ל";
        break;
    }

    // Create div and append to day
    var hebday = document.createElement("div");
    hebday.classList.add("hday");
    hebday.innerHTML = hcode;
    daysArr[i].appendChild(hebday);

    //SUNSET
    // Find the sunset time for that day IN MONSEY, and get the time string
    var times = new Hebcal.HDate(new Date(dayString)).sunset();
    var sunsetString = times.toLocaleTimeString().slice(0, 4);

    // Add a div to the day element including the sunset
    var sunset = document.createElement("div");
    sunset.classList.add("sunset");
    sunset.innerHTML = sunsetString + " " + "<span class='sun'>שקיעה</span>";
    daysArr[i].appendChild(sunset);


    //SEDRA
    if (dayId === 6) {
      var sedra = new Hebcal.HDate(dayFull).getSedra('h');
      if (sedra.length === 2) {
        var first = sedra[0];
        var second = sedra[1];
        var sedra = first + " - " + second;
      }
      var sedraDiv = document.createElement("div");
      sedraDiv.classList.add("sedra");
      sedraDiv.innerHTML = sedra;
      daysArr[i].appendChild(sedraDiv);
      daysArr[i].classList.add("shabbos");
    }


    //EVENTS

    var events = new Hebcal.HDate(new Date(dayString)).holidays();

    if (events.length === 0) {
      daysArr[i].style.gridTemplateRows = "1fr 1fr";
    } else if (events.length === 1) {
      var e = document.createElement('div');
      e.classList.add('event');
      e.innerHTML = events[0].desc[2];
      daysArr[i].appendChild(e);
    } else if (events.length === 2) {
      var e = document.createElement('div');
      e.classList.add('event1');
      e.innerHTML = events[0].desc[2];
      daysArr[i].appendChild(e);
      var e = document.createElement('div');
      e.classList.add('event2');
      e.innerHTML = events[1].desc[2];
      daysArr[i].appendChild(e);
    } else if (events.length === 3) {
      console.log(events);

    }



    // Get the English Month That is displayed and get the Hebrew months in it
    var curHmonth = new Hebcal.HDate(new Date(currentMonth + " " + 1 + " " + year)).getMonthName('h');
    var hmonthArr = [curHmonth];
    var hmonth = new Hebcal.HDate(new Date(dayString)).getMonthName('h');
    if (hmonth !== curHmonth) {
      hmonthArr.push(hmonth);
    }
    var hMonthString = hmonthArr.join(' - ');


    // Get the hebrew year for the displayed month
    var hyear = Hebcal.HDate(new Date(dayString)).getFullYear('h');
    var hYearString = Hebcal.gematriya(hyear, 3);



    // Load Custom Events
    addCustomEvent(dayString, daysArr);

  }

  document.getElementById('HMonth').innerHTML = hMonthString;
  document.getElementById('HYear').innerHTML = hYearString;

}

loadHebrewDates();


function nextMonth() {
  if (month < 11) {
    month++;
    document.getElementById("curMonth").innerHTML = months[month];
    loadCalendarDays();
    loadHebrewDates();
  } else if (month === 11) {
    month = 0;
    year++;
    document.getElementById("curMonth").innerHTML = months[month];
    document.getElementById('curYear').innerHTML = year;
    loadCalendarDays();
    loadHebrewDates();
  }
};

function prvMonth() {
  if (month >= 1) {
    month--;
    document.getElementById("curMonth").innerHTML = months[month];
    loadCalendarDays();
    loadHebrewDates();
  } else if (month === 0) {
    month = 11;
    year--;
    document.getElementById("curMonth").innerHTML = months[month];
    document.getElementById('curYear').innerHTML = year;
    loadCalendarDays();
    loadHebrewDates();
  }
}


document.querySelector('.go-to-today').addEventListener('click', function () {
  month = new Date().getMonth();
  year = new Date().getFullYear();
  document.getElementById("curMonth").innerHTML = months[month];
  document.getElementById('curYear').innerHTML = year;
  loadHebrewDates();
});


document.addEventListener("keydown", function (e) {
  if (e.keyCode === 39) {
    nextMonth();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 37) {
    prvMonth();
  }
});


function addCustomEvent(day, daysArr) {
  var events = JSON.parse(localStorage.getItem('event'));


  if (events !== null) {
    for (a = 0; a < events.length; a++) {
      if (day === events[a].d) {
        var e = document.createElement('div');
        e.classList.add('custom-event');
        e.innerHTML = events[a].description;
        daysArr[i].appendChild(e);
        console.log(events[a]);
      }
    }
  }
};

function recieveEvent(e) {

  var clickedDay = JSON.parse(e.target.parentElement.getAttribute('data-date')).day;
  clickedDate = JSON.parse(e.target.parentElement.getAttribute('data-date')).month + ' ' + clickedDay + ' ' + JSON.parse(e.target.parentElement.getAttribute('data-date')).year;
  var userEvent = prompt('Add event for ' + clickedDate + '.');
  

  if (userEvent !== null && userEvent !== "") {
    eventObject = {
      d: clickedDate,
      description: userEvent
    }

    if (localStorage.getItem('event') == null) {
      localStorage.setItem('event', JSON.stringify(new Array));
      var eventString = localStorage.getItem('event');
      var eventArray = JSON.parse(eventString);
      eventArray.push(eventObject);
      localStorage.setItem('event', JSON.stringify(eventArray));
    } else {
      var eventString = localStorage.getItem('event');
      var eventArray = JSON.parse(eventString);
      eventArray.push(eventObject);
      localStorage.setItem('event', JSON.stringify(eventArray));

    }

    loadHebrewDates();

  } else if (userEvent == "") {
    alert('Blank events are not saved');
  }

};



function changeTheme(theme) {
if (theme.innerHTML === 'Week') alert('Week view is not fully functioning yet');
if (theme.innerHTML === 'Month' || theme.innerHTML === 'Week') {
  var active = document.getElementsByClassName('active');
  active[0].classList.remove('active');
  theme.classList.add('active');
  view = theme.innerHTML;
  document.querySelector('.days').classList.remove('month', 'week', 'day');
  document.querySelector('.days').classList.add(view.toLowerCase());
  loadHebrewDates();
} else {
  alert('Day view is not supported yet');
}
  
}


var zmanim = Hebcal.HDate(new Date(year, month, 29)).tachanun_uf();
// console.log(zmanim);


// var sunrise = Hebcal.HDate(new Date()).dafyomi('h');
// console.log(sunrise);
// console.log(Hebcal.HDate(new Date()));
// console.log(JSON.stringify(Hebcal.HDate(new Date()).getMonthName('h')));

// document.addEventListener('click', function (e) {
//   document.getElementById('addEvent').style.left = (e.pageX).toString() + 'px';
//   document.getElementById('addEvent').style.top = (e.pageY).toString() + 'px';

// });



// var mon = new Hebcal.HDate(new Date()).getMonthName('h');
// console.log(mon);


// var suns = new Hebcal.HDate(new Date()).sunset();
// console.log(suns);

// var events = new Hebcal.HDate(new Date('Apr 10 2020')).holidays('s');

// console.log(events);