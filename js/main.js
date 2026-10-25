(function(){
  document.querySelectorAll('[data-r]').forEach(function(w){
    var text=w.getAttribute('data-r');
    [].forEach.call(text,function(c,i){
      var h=0,s=text+i;
      for(var k=0;k<s.length;k++)h=Math.imul(h^s.charCodeAt(k),387420489);
      h=(h^h>>>9)>>>0;
      var sp=document.createElement('span');
      sp.className='ch';sp.setAttribute('aria-hidden','true');sp.textContent=c;
      var big=!!w.closest('h1'),v=(h>>7)%10;
      sp.style.setProperty('--t',big?'rotate('+((h%21)-10)+'deg) scale('+(0.88+((h>>3)%28)/100)+') translateY('+(((h>>5)%13)-6)+'px)':'rotate('+((h%17)-8)+'deg) scale('+(0.86+((h>>3)%30)/100)+') translateY('+(((h>>5)%9)-4)+'px)');
      if(big){if(v<2)sp.classList.add('box');else if(v===2)sp.classList.add('boxw');else if(v===3)sp.classList.add('pur')}
      else{if(v===0)sp.classList.add('box');else if(v===1)sp.classList.add('boxw');else if(v===2)sp.classList.add('pur')}
      w.appendChild(sp);
    });
  });
  document.querySelectorAll('nav .links a').forEach(function(a){
    var text=a.textContent;a.setAttribute('aria-label',text);a.textContent='';
    [].forEach.call(text,function(c,i){
      var h=0,s=text+i;
      for(var k=0;k<s.length;k++)h=Math.imul(h^s.charCodeAt(k),387420489);
      h=(h^h>>>9)>>>0;
      var sp=document.createElement('span');
      sp.className='ch';sp.setAttribute('aria-hidden','true');sp.textContent=c;
      sp.style.setProperty('--t','rotate('+((h%17)-8)+'deg) scale('+(0.86+((h>>3)%30)/100)+') translateY('+(((h>>5)%9)-4)+'px)');
      var v=(h>>7)%10;
      if(v===0)sp.classList.add('box');else if(v===1)sp.classList.add('boxw');else if(v===2)sp.classList.add('pur');
      a.appendChild(sp);
    });
  });
  var f=document.getElementById('msgform'),note=document.getElementById('note');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f);
    var body='Nama: '+d.get('n')+'\nEmail: '+d.get('e')+'\n\n'+d.get('m');
    var a=document.createElement('a');
    a.href='mailto:nama@contoh.com?subject='+encodeURIComponent('Pesan dari '+d.get('n'))+'&body='+encodeURIComponent(body);
    a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();
    note.textContent='Aplikasi email dibuka. Jika tidak muncul, kirim langsung ke nama@contoh.com.';
  });
  var views=document.querySelectorAll('[data-view]'),navs=document.querySelectorAll('nav .links a');
  function route(){
    var h=(location.hash||'#home').slice(1);
    if(!document.querySelector('[data-view="'+h+'"]'))h='home';
    views.forEach(function(v){v.hidden=v.getAttribute('data-view')!==h});
    navs.forEach(function(a){
      var on=a.getAttribute('href')==='#'+h;
      a.classList.toggle('on',on);
      if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    var sub=h!=='home';
    document.body.setAttribute('data-page',h);
    document.body.classList.toggle('sub',sub);
    document.querySelector('.hero').hidden=sub;
    document.querySelector('nav .links').hidden=sub;
    document.getElementById('esc').hidden=!sub;
    window.scrollTo(0,0);
  }
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,wipe=document.getElementById('wipe');
  route();
  addEventListener('hashchange',function(){
    if(rm){route();return}
    wipe.classList.remove('go');void wipe.offsetWidth;wipe.classList.add('go');
    setTimeout(route,340);
    setTimeout(function(){wipe.classList.remove('go')},760);
  });
  if(!rm){
    var tx=0,ty=0,cx=0,cy=0,rt=document.documentElement;
    addEventListener('mousemove',function(e){tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});
    (function loop(){
      cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;
      rt.style.setProperty('--px',cx.toFixed(3));rt.style.setProperty('--py',cy.toFixed(3));
      requestAnimationFrame(loop);
    })();
  }
  addEventListener('keydown',function(e){if(e.key==='Escape'&&document.body.classList.contains('sub'))location.hash='#home'});
  var els=document.querySelectorAll('.sk');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.4});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('on')})}
  var btn=document.getElementById('theme'),tn=document.getElementById('tname'),root=document.documentElement;
  var T=[{k:'blue',n:'00'},{k:'violet',n:'01'},{k:'red',n:'02'}];
  function show(){
    var i=0;T.forEach(function(x,j){if(x.k===root.getAttribute('data-theme'))i=j});
    tn.textContent=T[i].n;btn.setAttribute('aria-label','Tema sekarang '+T[i].n+'. Klik untuk ganti.');return i;
  }
  show();
  btn.addEventListener('click',function(){
    var n=T[(show()+1)%T.length];
    root.setAttribute('data-theme',n.k);show();
    try{localStorage.setItem('eva-theme',n.k)}catch(e){}
    btn.classList.remove('zap');void btn.offsetWidth;btn.classList.add('zap');
  });
})();
