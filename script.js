// Загрузка CSV и рендер треков
const csvPath = 'data/tracks.csv';

function parseCSV(text){
  const lines = text.trim().split('\n');
  const headers = lines.shift().split(',').map(h=>h.trim());
  return lines.map(line=>{
    // простой разбор — не для сложных CSV с запятыми внутри
    const cols = line.split(',').map(c=>c.trim());
    const obj = {};
    headers.forEach((h,i)=>obj[h]=cols[i]||'');
    return obj;
  });
}

function renderTracks(tracks){
  const tbody = document.querySelector('#tracks-table tbody');
  tbody.innerHTML = '';
  tracks.forEach(t=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${t.title || '—'}</td>
      <td>${t.duration || '—'}</td>
      <td>${t.year || '—'}</td>
      <td>
        ${t.youtube_url ? `<a class="btn" href="${t.youtube_url}" target="_blank" rel="noopener">YouTube</a>` : ''}
        ${t.spotify_url ? `<a class="btn" href="${t.spotify_url}" target="_blank" rel="noopener">Spotify</a>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

fetch(csvPath).then(r=>{
  if(!r.ok) throw new Error('Нет доступа к CSV: '+r.status);
  return r.text();
}).then(text=>{
  const data = parseCSV(text);
  renderTracks(data);
}).catch(err=>{
  console.warn('Ошибка загрузки CSV:', err);
  const sample = [
    {title:'Крошка моя',duration:'3:50',year:'1999',youtube_url:'https://www.youtube.com/results?search_query=руки+вверх+крошка+моя',spotify_url:''},
    {title:'18 мне уже',duration:'3:30',year:'1998',youtube_url:'https://www.youtube.com/results?search_query=руки+вверх+18+мне+уже',spotify_url:'https://open.spotify.com/search/руки%20вверх%2018%20мне%20уже'},
    {title:'А он не пришёл',duration:'4:05',year:'2000',youtube_url:'https://www.youtube.com/results?search_query=руки+вверх+а+он+не+пришёл',spotify_url:''}
  ];
  renderTracks(sample);
});