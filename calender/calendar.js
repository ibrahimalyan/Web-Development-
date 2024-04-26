document.addEventListener('DOMContentLoaded', function () {
    const monthAndYear = document.getElementById('monthAndYear');
    const calendarTable = document.getElementById('calendarTable');
    const eventWindow = document.getElementById('eventWindow');
    const eventDate = document.getElementById('eventDate');
    const startTime = document.getElementById('startTime');
    const endTime = document.getElementById('endTime');
    const description = document.getElementById('description');
    const okButton = document.getElementById('ok');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const todayButton = document.getElementById('today');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function generateCalendar(month, year) {
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarTable.innerHTML = '';
        monthAndYear.innerHTML = `${getMonthName(month)} ${year}`;

        // Create the row for the days of the week
        const daysOfWeekRow = calendarTable.createTHead().insertRow();
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        daysOfWeek.forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            daysOfWeekRow.appendChild(th);
        });

        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = calendarTable.insertRow();

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    const cell = row.insertCell();
                    const prevMonthDays = new Date(year, month, -firstDay + j + 1).getDate();
                    cell.textContent = prevMonthDays;
                    cell.classList.add('prevMonth');
                } else if (date > daysInMonth) {
                    const cell = row.insertCell();
                    const nextMonthDays = new Date(year, month + 1, date - daysInMonth).getDate();
                    cell.textContent = nextMonthDays;
                    cell.classList.add('nextMonth');
                    date++;
                } else {
                    const cell = row.insertCell();
                    cell.textContent = date;
                    if (date === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                        cell.classList.add('currentDate');
                    }
                    date++;

                    // Add event listener to each cell
                    cell.addEventListener('click', function () {
                        openEventWindow(new Date(year, month, parseInt(cell.textContent)));
                    });
                }
            }
        }
    }

    function getMonthName(month) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        return monthNames[month];
    }

    function openEventWindow(date) {
        eventDate.textContent = "New event at " + date.toLocaleDateString();
        eventWindow.style.display = 'block';
    }

    function closeEventWindow() {
        eventWindow.style.display = 'none';
    }

    function updateCalendar() {
        generateCalendar(currentMonth, currentYear);
        eventWindow.style.display = 'none';
    }

    prevButton.addEventListener('click', function () {
        currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        updateCalendar();
    });

    nextButton.addEventListener('click', function () {
        currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        updateCalendar();
    });

    todayButton.addEventListener('click', function () {
        currentDate = new Date();
        currentMonth = currentDate.getMonth();
        currentYear = currentDate.getFullYear();
        updateCalendar();
    });

    okButton.addEventListener('click', function () {
        // Retrieve the entered values
        const start = startTime.value;
        const end = endTime.value;
        const desc = description.value;

        // Do something with the event details (e.g., save to a database)
        console.log("New event created:");
        console.log("Start Time:", start);
        console.log("End Time:", end);
        console.log("Description:", desc);

        // Close the event window
        closeEventWindow();
    });

    generateCalendar(currentMonth, currentYear);
});
