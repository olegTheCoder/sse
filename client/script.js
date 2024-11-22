// Создаем новый EventSource для подключения к серверу
const eventSource = new EventSource('http://localhost:3000/events');

// Обработчик события onmessage для получения данных
eventSource.onmessage = function(event) {
  const {appName, date} = JSON.parse(event.data);
  const id = JSON.parse(event.lastEventId);
  const messageList = document.getElementById('apps');
  const newListItem = document.createElement('li');
  newListItem.textContent = `${id}: ${appName} - ${date} - Взять в работу`;
  messageList.appendChild(newListItem);
};

// Обработчик для закрытия соединения
window.addEventListener('beforeunload', function() {
  eventSource.close();
});