'use strict';

const google = require('..');
const fs = require('fs')

describe('GoogleThis Tests', () => { 
  it('Should search a query', async () => {
    const search = await google.search('Stephen Hawking');
    expect(search.results).not.toHaveLength(0);
  });
  
  it('Should search images', async () => {
    const search = await google.image('Supermassive Blackhole');
    expect(search).not.toHaveLength(0);
  });
  
  it('Should do reverse image search', async () => {
    const search = await google.search('https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonas-kakaroto-736230.jpg&fm=jpg', { ris: true });
    expect(search.results).not.toHaveLength(0);
  });
  
  it('Should do reverse image search with fingerprint', async () => {
    const search = await google.search(fs.createReadStream('test/test.jpg'), { ris: true });
    expect(search.results).not.toHaveLength(0);

    const search2 = await google.search(search.finger_print, { ris: true, by_finger_print: true, page: 1 });
    expect(search2.results).not.toHaveLength(0);
  });
  
  it('Should retrieve top news', async () => {
    const news = await google.getTopNews('en', 'AU');
    expect(news.headline_stories).not.toHaveLength(0);
  });
});