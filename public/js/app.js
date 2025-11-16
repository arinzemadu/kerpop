const state = {
  items: []
};

async function fetchCatalogue() {
  const listEl = document.getElementById('catalogueList');
  if (!listEl) return;

  try {
    const res = await fetch('/api/menu');
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    state.items = Array.isArray(data.items) ? data.items : [];
    renderCatalogue();
  } catch (err) {
    console.error('Could not load catalogue', err);
    listEl.innerHTML = '<p class="kp-card-desc">Could not load hero flavours. Check that the Node server is running.</p>';
  }
}

function renderCatalogue() {
  const listEl = document.getElementById('catalogueList');
  if (!listEl) return;

  listEl.innerHTML = '';

  if (!state.items.length) {
    listEl.innerHTML = '<p class="kp-card-desc">No hero flavours defined. Edit sampleMenu in server.js to add your own items.</p>';
    return;
  }

  state.items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'kp-card';

    // MEDIA
    const media = document.createElement('div');
    media.className = 'kp-card-media';

    if (item.image) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name || '';
      media.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'kp-card-media-placeholder';
      ph.textContent = 'Add a product image for ' + (item.name || 'this hero flavour');
      media.appendChild(ph);
    }

    // BODY
    const body = document.createElement('div');
    body.className = 'kp-card-body';

    if (item.family) {
      const fam = document.createElement('p');
      fam.className = 'kp-card-family';
      fam.textContent = item.family;
      body.appendChild(fam);
    }

    const titleRow = document.createElement('div');
    titleRow.className = 'kp-card-title-row';

    const title = document.createElement('h2');
    title.className = 'kp-card-title';
    title.textContent = item.name || 'Unnamed hero flavour';

    const ref = document.createElement('span');
    ref.className = 'kp-card-ref';
    ref.textContent = item.id ? 'Ref: ' + item.id : '';

    titleRow.appendChild(title);
    titleRow.appendChild(ref);

    const desc = document.createElement('p');
    desc.className = 'kp-card-desc';
    desc.textContent = item.description || '';

    const specRow = document.createElement('div');
    specRow.className = 'kp-spec-row';

    if (item.unitsPerCase) {
      const pill = document.createElement('span');
      pill.className = 'kp-spec-pill';
      pill.innerHTML = '<span class="kp-spec-label">Units</span><span class="kp-spec-value">' + item.unitsPerCase + ' / case</span>';
      specRow.appendChild(pill);
    }

    if (item.weightGrams) {
      const pill = document.createElement('span');
      pill.className = 'kp-spec-pill';
      pill.innerHTML = '<span class="kp-spec-label">Weight</span><span class="kp-spec-value">' + item.weightGrams + ' g</span>';
      specRow.appendChild(pill);
    }

    if (item.price) {
      const pill = document.createElement('span');
      pill.className = 'kp-spec-pill';
      pill.innerHTML = '<span class="kp-spec-label">Price</span><span class="kp-spec-value">£' + item.price.toFixed(2) + '</span>';
      specRow.appendChild(pill);
    }

    if (item.isPopular) {
      const pill = document.createElement('span');
      pill.className = 'kp-spec-pill';
      pill.innerHTML = '<span class="kp-spec-label">Flag</span><span class="kp-spec-value">Popular</span>';
      specRow.appendChild(pill);
    }

    const footer = document.createElement('div');
    footer.className = 'kp-card-footer';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kp-btn';
    btn.textContent = 'Add to notes';

    btn.addEventListener('click', () => {
      console.log('Hero flavour clicked:', item.id || item.name);
    });

    footer.appendChild(btn);

    body.appendChild(titleRow);
    body.appendChild(desc);
    body.appendChild(specRow);
    body.appendChild(footer);

    card.appendChild(media);
    card.appendChild(body);
    listEl.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCatalogue();
});
