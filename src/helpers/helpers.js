export const normalize = (data) => {
  const result = {};
  for (const key in data) {
    switch (key) {
      case 'main_picture':
        result[key] = `url(${data[key].medium ?? data[key].large})`;
        break;
      case 'media_type':
        result[key] = /^(ona|ova|tv)$/.test(data[key]) ? data[key].toUpperCase() : data[key].slice(0, 1).toUpperCase() + data[key].slice(1)
        break;
      case 'status':
      case 'status':
        result[key] = data[key] ? data[key].split('_').map(e => e.slice(0, 1).toUpperCase() + e.slice(1)).join(' ') : '?';
        break;
      case 'start_date':
        if (!data[key]) {
          result.date = 'Not Yet Relised';
          break;
        }
        result.year = data[key].slice(0,4);
      case 'start_date':
      case 'end_date':
        if (!data.start_date) break;
        result[key] = data[key] && (new Date(data[key])).toUTCString().slice(6, 16);
        result.date = result.start_date + ' to ' + result.end_date ?? '?';
        break;
      default:
        result[key] = data[key];
        break;
    }
  }

  return result;
}

