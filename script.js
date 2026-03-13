// ── custom cursor: follows mouse position
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// ── café photos from Unsplash, 8 per row = 16 total
const images = [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&q=80',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&q=80',
    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=500&q=80',
    'https://images.unsplash.com/photo-1507914372368-b2b085b925a1?w=500&q=80',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
    'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=500&q=80',
    'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=500&q=80',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80',
    'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=500&q=80',
    'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=500&q=80',
];

// ── diagonal tilt per card — alternating signs so adjacent cards lean opposite ways
// row 0: +6, -8, +7... / row 1: -7, +6, -8...
const tilts = [
    6, -8, 7, -6, 9, -7, 5, -9,   // row 0
    -7, 6, -8, 7, -5, 8, -6, 5,   // row 1
];

// ── grab the two row containers from the DOM
const rows = [
    document.getElementById('row0'),
    document.getElementById('row1'),
];

images.forEach((src, i) => {
    // first 8 go into row 0, rest into row 1
    const rowEl = rows[i < 8 ? 0 : 1];
    const tilt = tilts[i];

    // ── build the flip card DOM structure:
    // .flip-cell > .flip-inner > (.flip-front + .flip-back > img)
    const cell = document.createElement('div');
    cell.className = 'flip-cell';
    cell.style.transform = `rotate(${tilt}deg)`; // apply diagonal tilt to whole cell

    const inner = document.createElement('div');
    inner.className = 'flip-inner'; // this is the element that rotates on hover

    const front = document.createElement('div');
    front.className = 'flip-front'; // transparent side — visible by default

    const back = document.createElement('div');
    back.className = 'flip-back'; // image side — hidden until flipped

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'lazy'; // don't load until near viewport

    // assemble and append to row
    back.appendChild(img);
    inner.appendChild(front);
    inner.appendChild(back);
    cell.appendChild(inner);
    rowEl.appendChild(cell);

    // ── flip interaction state
    let lingerTimer = null; // tracks the delay before flipping back

    cell.addEventListener('mouseenter', () => {
        // cancel any pending flip-back if mouse re-enters before it fires
        if (lingerTimer) { clearTimeout(lingerTimer); lingerTimer = null; }

        // snap to fast transition, then flip to image side
        inner.classList.remove('flipping-back');
        inner.style.transition = 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)';
        inner.classList.add('flipped');
    });

    cell.addEventListener('mouseleave', () => {
        // wait 500ms so image lingers, then slowly flip back to transparent
        lingerTimer = setTimeout(() => {
            inner.classList.add('flipping-back'); // triggers slow transition via CSS
            inner.classList.remove('flipped');

            // clean up the slow-transition class once animation is done
            setTimeout(() => inner.classList.remove('flipping-back'), 1200);
        }, 500);
    });
});