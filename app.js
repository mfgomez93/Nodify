window.addEventListener('load', () => {
    // --- Helper: chequea que Bootstrap esté disponible antes de usarlo
    function withBootstrap(cb) {
      if (window.bootstrap) return cb();
      console.warn('Bootstrap no está disponible. ¿Agregaste el <script> al final del HTML?');
    }
  
    // === CARRUSELES ============================================================
    withBootstrap(() => {
      // Hero carousel (id="heroCarousel")
      const heroCarousel = document.querySelector('#heroCarousel');
      if (heroCarousel && bootstrap.Carousel) {
        new bootstrap.Carousel(heroCarousel, {
          interval: 2800,
          ride: 'carousel',
          pause: false,
          touch: true,
          wrap: true
        });
      }
  
      // Testimonios (id="testi")
      const testi = document.querySelector('#testi');
      if (testi && bootstrap.Carousel) {
        new bootstrap.Carousel(testi, {
          interval: 4200,
          ride: 'carousel',
          pause: false,
          wrap: true
        });
      }
    });
  
    // === CHAT ANIMADO (DEMO) ===================================================
    const chat = document.getElementById('chat');
    const typing = document.getElementById('typing');
  
    const sequence = [
      {who:'me',  text:'Hola! ¿Tenés turno para el miércoles a la tarde?'},
      {who:'bot', text:'¡Hola! Claro que sí 😊 Miércoles 17:30 está libre. ¿Querés reservarlo?'},
      {who:'me',  text:'Sí, confirmo.'},
      {who:'bot', text:'Listo ✅ turno reservado para **miércoles 17:30**.'},
      {who:'bot', text:'Te aviso 24 horas antes por este medio. ¿Querés añadir una nota?'},
      {who:'me',  text:'Sí: limpieza facial básica.'},
      {who:'bot', text:'Anotado 🗒️ ¡Nos vemos!'}
    ];
  
    function addBubble(who, text){
      const b = document.createElement('div');
      b.className = 'bubble ' + (who==='me' ? 'b-me' : 'b-bot');
      b.innerHTML = text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
      chat.appendChild(b);
      chat.scrollTop = chat.scrollHeight;
    }
  
    async function playChat(){
      if(!chat) return;
      chat.innerHTML='';
      for(const step of sequence){
        if (typing) typing.value = (step.who==='me') ? 'Vos está escribiendo…' : 'Nodify está escribiendo…';
        await new Promise(r=>setTimeout(r, 700 + Math.random()*900));
        addBubble(step.who, step.text);
        await new Promise(r=>setTimeout(r, 350));
      }
      if (typing) typing.value='Escribiendo…';
      await new Promise(r=>setTimeout(r, 1500));
      playChat(); // loop
    }
    playChat();
  
    // === SCROLL REVEAL ========================================================
    const els = document.querySelectorAll('.reveal-up');
    if (els.length) {
      const io = new IntersectionObserver(entries=>{
        entries.forEach(e=>{
          if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
        });
      },{ threshold:.12 });
      els.forEach(el=>io.observe(el));
    }
  
    // === PARALLAX LIGERO EN HERO ==============================================
    const hero = document.querySelector('.hero');
    const layers = document.querySelectorAll('.layer');
    if (hero && layers.length){
      hero.addEventListener('mousemove', (e)=>{
        const r = hero.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - .5;
        const cy = (e.clientY - r.top) / r.height - .5;
        layers.forEach((l, i)=>{
          const depth = (i+1) * 8;
          l.style.transform = `translate(${ -cx * depth }px, ${ -cy * depth }px)`;
        });
      });
    }
  
    // === MODAL "SOLICITÁ TU AGENTE" (OPCIONAL) ================================
    // Abre el modal si existen enlaces a #contacto o #cta
    withBootstrap(() => {
      const leadLinks = document.querySelectorAll('a[href="#contacto"], a[href="#cta"], [data-action="lead"]');
      const leadModalEl = document.getElementById('leadModal');
      if (leadLinks.length && leadModalEl && bootstrap.Modal) {
        const leadModal = new bootstrap.Modal(leadModalEl);
        leadLinks.forEach(el=>{
          el.addEventListener('click', (e)=>{
            e.preventDefault();
            leadModal.show();
          });
        });
      }
    });
  
    // Fake-submit del formulario (solo para demo visual)
    const leadForm = document.getElementById('leadForm');
    const leadOk = document.getElementById('leadOk');
    if (leadForm && leadOk){
      leadForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        leadForm.classList.add('d-none');
        leadOk.classList.remove('d-none');
      });
    }
  });
  
  
  // CARRUSEL DE OPINIONES (auto)
  const opiniones = document.querySelector('#opinionesCarousel');
  if (opiniones && window.bootstrap && bootstrap.Carousel) {
    new bootstrap.Carousel(opiniones, {
      interval: 4800,
      ride: 'carousel',
      pause: false,
      touch: true,
      wrap: true
    });
  }
  