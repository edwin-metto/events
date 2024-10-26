
const events = [
    {
        title: 'Team Meeting',
        date: new Date('2023-10-25'),
        location: 'board room',
        attendees: new Set(['Ali', 'Ben','edwin','mark'])
    },
    {
        title: 'Project Launch',
        date: new Date('2023-10-29'),
        location: 'nairobi',
        attendees: new Set(['cynthia', 'glen','george'])
    },
    {
        title: 'Monthly Review',
        date: new Date('2023-11-01'),
        location: 'kisumu',
        attendees: new Set(['eli', 'amos', 'eugene','val'])
    }
];

const organizers = new WeakMap();
organizers.set('Team Meeting', 'Jane Doe');
organizers.set('Project Launch', 'John Smith');
organizers.set('Monthly Review', 'Sarah Connor');

function displayUpcomingEvents() {
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    
    const upcomingEvents = events.filter(event => event.date >= now && event.date <= nextWeek);
    
    const detailsDiv = document.getElementById('event-details');
    detailsDiv.innerHTML = '<table><tr><th>Title</th><th>Date</th><th>Location</th></tr>';
    
    upcomingEvents.forEach(({ title, date, location }) => {
        detailsDiv.innerHTML += `<tr><td>${title}</td><td>${date.toLocaleDateString()}</td><td>${location}</td></tr>`;
    });
    detailsDiv.innerHTML += '</table>';
}

function addAttendeePrompt() {
    const eventTitle = prompt("Enter the event title:");
    const attendeeName = prompt("Enter the attendee name:");
    addAttendee(eventTitle, attendeeName);
}

function addAttendee(eventTitle, attendeeName) {
    const event = events.find(event => event.title === eventTitle);
    if (event) {
        event.attendees.add(attendeeName);
        alert(`Added ${attendeeName} to ${eventTitle}`);
    } else {
        alert('Event not found');
    }
}

function convertToJSON() {
    const jsonEvents = eventsToJSON();
    alert(jsonEvents);
}

function eventsToJSON() {
    return JSON.stringify(events.map(event => ({
        ...event,
        formattedDate: event.date.toLocaleDateString('en-US')
    })), null, 2);
}

function deleteEventPrompt() {
    const eventTitle = prompt("Enter the event title to delete:");
    deleteEvent(eventTitle);
}

function deleteEvent(eventTitle) {
    const index = events.findIndex(event => event.title === eventTitle);
    if (index !== -1) {
        events.splice(index, 1);
        alert(`${eventTitle} has been deleted.`);
    } else {
        alert('Event not found');
    }
}

function findEventWithMostAttendees() {
    const event = eventWithMostAttendees();
    alert(`Event with most attendees: ${event.title} with ${event.attendees.size} attendees`);
}

function eventWithMostAttendees() {
    return events.reduce((prev, current) => {
        return (prev.attendees.size > current.attendees.size) ? prev : current;
    });
}