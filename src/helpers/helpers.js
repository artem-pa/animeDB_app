export const firstL = str => str ? str.slice(0, 1).toUpperCase() + str.slice(1) : null;
const removeUnder = str => str.split('_').map(e => firstL(e)).join(' ');

export const normalize = (data) => {
  if (!data) return;

  const result = {};
  for (const key in data) {
    switch (key) {
      case 'main_picture':
        result[key] = `url(${data[key].medium ?? data[key].large})`;
        result.picture_url = data[key]?.medium || data[key]?.large;
        break;
      case 'media_type':
        if (data[key] === 'one_shot') {
          result[key] = 'One-shot'; break;
        }
        result[key] = /^(ona|ova|tv)$/.test(data[key]) ? data[key].toUpperCase() : removeUnder(data[key]);
        break;
      case 'status':
      case 'source':
        result[key] = removeUnder(data[key]);
        break;
      case 'start_date':
        result.year = data[key].slice(0, 4);
      case 'start_date':
      case 'end_date':
        if (!data.start_date) break;
        result[key] = data[key] && (new Date(data[key])).toDateString().slice(4);
        result.date = result.start_date + ' to ' + (result.end_date ?? '?');
        break;
      case 'alternative_titles':
        result.synonyms = Array.isArray(data[key].synonyms) ? data[key].synonyms.join(', ') : data[key].synonyms;
        result.ja = data[key]?.ja;
        result.en = data[key]?.en;
        break;
      case 'studios':
      case 'genres':
        result[key] = data[key].map(item => item.name).join(', ')
        break;
      case 'broadcast':
        result[key] = `${firstL(data[key].day_of_the_week)} at ${data[key].start_time} (JST)`;
        break;
      case 'start_season':
        result[key] = `${firstL(data[key].season)} ${data[key].year}`
      case 'average_episode_duration':
        result.duration = `${Math.round(data[key] / 60)} min. per ep.`;
        break;
      case 'rating':
        result[key] = data[key].replace('_', '-').toUpperCase();
        break;
      case 'rank':
      case 'popularity':
        result[key] = '#' + data[key];
        break;
      case 'num_list_users':
      case 'num_scoring_users':
        result[key] = data[key].toLocaleString('en-US');
        break;
      case 'serialization':
        result[key] = data[key].map(item => item.node.name);
        break;
      case 'authors':
        result[key] = data[key].map((item, i) => `${i > 0 ? ', ' : ''}${item.first_name ?? item.node.first_name} ${item.last_name ?? item.node.last_name}${item.role ? ` (${item.role})` : ``}`);
        break;
      default:
        result[key] = data[key];
        break;
    }
  }

  if (!data.start_date) result.date = 'Not Yet Relised';

  return result;
}

export const topRoutes = {
  anime: {
    all: 'All Anime',
    airing: 'Top Airing',
    upcoming: 'Top Upcoming',
    tv: 'Top TV Series',
    movie: 'Top Movies',
    special: 'Top Specials',
    bypopularity: 'Most Popular',
    favorite: 'Most Favorited'
  },
  manga: {
    all: 'All Manga',
    manga: 'Top Manga',
    novels: 'Top Light Novels',
    oneshots: 'Top One-shots',
    manhwa: 'Top Manhwa',
    bypopularity: 'Most Popular',
    favorite: 'Most Favorited'
  }
}

export const seasonList = {
  winter: [0, 1, 2],
  spring: [3, 4, 5],
  summer: [6, 7, 8],
  fall: [9, 10, 11]
}
