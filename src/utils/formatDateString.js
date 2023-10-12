export default function formatDateString(dateString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('ru-RU', options);
  const date = new Date(dateString ? dateString : null);
  return formatter.format(date);
}