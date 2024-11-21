// Создаем новый EventSource для подключения к серверу
const eventSource = new EventSource('http://localhost:3000/events');

// Обработчик события onmessage для получения данных
eventSource.onmessage = function(event) {
  const newMessage = JSON.parse(event.data);
  const messageList = document.getElementById('apps');
  const newListItem = document.createElement('li');
  newListItem.textContent = `${newMessage.appName} - ${newMessage.date} - Взять в работу`;
  messageList.appendChild(newListItem);
};

// Обработчик для закрытия соединения при выгрузке страницы
window.addEventListener('beforeunload', function() {
  eventSource.close();
});