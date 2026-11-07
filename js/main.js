
(()=>{
const $=s=>document.querySelector(s),clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),lerp=(a,b,t)=>a+(b-a)*t,ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* ---- фон: плавные волны + немного кода ---- */
const easeS=t=>-(Math.cos(Math.PI*t)-1)/2;
const wc=$('#topo'),wx=wc.getContext('2d');let WW=0,WH=0,dpr=1,tone=0,wt=0,wmx=innerWidth/2,wmy=innerHeight/2;
const bgCode=[
['SELECT s.Name, AVG(g.Mark)','FROM Students s','JOIN Grades g ON g.StudentId = s.Id','GROUP BY s.Name','HAVING AVG(g.Mark) > 4;'],
['public class Student : IEntity','{','    public int Id { get; set; }','    public string Name { get; set; }','}'],
['var top = db.Students','    .Where(x => x.Mark > 4)','    .OrderBy(x => x.Name)','    .ToList();'],
['CREATE TABLE Courses (','    Id INT PRIMARY KEY,','    Title NVARCHAR(100) NOT NULL,','    Hours INT DEFAULT 36',');'],
['public async Task<User> GetAsync(int id)','{','    return await _db.Users','        .FirstOrDefaultAsync(u => u.Id == id);','}'],
['UPDATE Students','SET Mark = Mark + 1','WHERE GroupId = 3','  AND Mark < 5;'],
['foreach (var s in students)','{','    if (s.Mark >= 4)','        Console.WriteLine(s.Name);','}'],
['using var tx = db.Database','    .BeginTransaction();','db.SaveChanges();','tx.Commit();'],
['interface IRepository<T>','{','    T GetById(int id);','    void Add(T item);','    IEnumerable<T> GetAll();','}']];
const codePos=[[.03,.14],[.36,.09],[.68,.16],[.05,.46],[.40,.52],[.72,.47],[.04,.82],[.38,.86],[.68,.80]];
const codePosM=[[.04,.13],[.5,.27],[.04,.43],[.5,.60],[.04,.78]];
function wsize(){dpr=1;WW=innerWidth;WH=innerHeight;wc.width=Math.round(WW*dpr);wc.height=Math.round(WH*dpr)}
let hk=1;
const PW=[[75,0,130],[100,149,237],[25,25,112],[143,180,255]];
const mixc=(x,y,t)=>x.map((v,i)=>v+(y[i]-v)*t);
function drawWaves(sv){
  const mob_=WW<700;
  wx.setTransform(dpr,0,0,dpr,0,0);wx.clearRect(0,0,WW,WH);
  const mob=WW<700,N=Math.round(lerp(24,17,hk)*(mob_?.7:1)),step=mob?18:12,cr=Math.round(lerp(25,100,tone)),cg=Math.round(lerp(25,149,tone)),cb=Math.round(lerp(112,237,tone));
  const A=WH*.075*(1+.75*hk),k1=6.2832/(WW*(.95+.55*hk)),k2=6.2832/(WW*(.52+.3*hk)),k3=6.2832/(WW*(.31+.16*hk)),sw=WW*.15,sh=WH*.24;
  const tt=wt+gt*hk*1.7;
  let strokeS=null;
  if(hk>.01){const u=gt*.00014,ix=Math.floor(u),fr=easeS(u-ix),g=wx.createLinearGradient(0,0,WW,0);
    for(let j=0;j<=4;j++){const c0=PW[(j+ix)%4],c1=PW[(j+ix+1)%4],pc=mixc(c0,c1,fr),cc=mixc([cr,cg,cb],pc,hk);g.addColorStop(j/4,`rgb(${cc.map(Math.round)})`)}strokeS=g}
  wx.lineWidth=1+.7*hk;wx.lineJoin='round';
  for(let i=0;i<N;i++){
    const base=WH*(.04+.92*i/(N-1)),amp=A*(.65+.35*Math.sin(i*.27+.8))*(1+.38*hk*Math.sin(gt*.00042+i*.55)),ph=i*.21;
    const al=(.05+.10*(.5+.5*Math.sin(i*.5+1.2)))*(1+.8*hk);
    if(strokeS){wx.strokeStyle=strokeS;wx.globalAlpha=Math.min(.34,al)}else{wx.strokeStyle=`rgba(${cr},${cg},${cb},${al.toFixed(3)})`}
    wx.beginPath();
    for(let x=-step;x<=WW+step;x+=step){
      let y=base+amp*Math.sin(x*k1+tt*.00022+ph)+amp*.45*Math.sin(x*k2-tt*.00015+ph*1.7+hk*Math.sin(gt*.0003+i))+amp*.18*Math.sin(x*k3+tt*.0001+ph*2.3);
      const dx=x-wmx,dy=base-wmy;y-=WH*.05*(.35+sv)*Math.exp(-dx*dx/(2*sw*sw)-dy*dy/(2*sh*sh));
      x<=-step?wx.moveTo(x,y):wx.lineTo(x,y);
    }
    wx.stroke();wx.globalAlpha=1;
  }
  /* полупрозрачный код на заднем плане */
  const fs=mob?10:13,n=mob?codePosM.length:codePos.length,al0=mob?.12:.13;
  wx.font=`${fs}px ui-monospace,Consolas,monospace`;wx.textBaseline='alphabetic';
  for(let bi=0;bi<n;bi++){
    const pp=mob?codePosM[bi]:codePos[bi];
    const bx0=WW*pp[0]+Math.sin(wt*.00018+bi*2)*16,by0=WH*pp[1]+Math.cos(wt*.00014+bi)*12;
    bgCode[bi].forEach((ln,li)=>{
      const al=al0*(.6+.4*Math.sin(wt*.0005+li*.8+bi*1.9));
      wx.fillStyle=`rgba(${cr},${cg},${cb},${al.toFixed(3)})`;wx.fillText(ln,bx0,by0+li*fs*1.7);
    });
  }
}
wsize();addEventListener('resize',wsize);
/* ---- лавровый венок ---- */
document.querySelectorAll('[data-l]').forEach(s=>{let h='';for(let side=0;side<2;side++)for(let i=0;i<8;i++){const a=(i/7)*1.9-.2,x=35+(side?1:-1)*(27*Math.cos(a*.9)),y=52-i*6.2;h+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.2" ry="5.2" transform="rotate(${(side?1:-1)*(28+i*4)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="none" stroke="currentColor" stroke-width=".9"/>`}
h+='<circle cx="35" cy="30" r="14" fill="none" stroke="currentColor" stroke-width="1"/><text x="35" y="34" text-anchor="middle" font-family="Inter Tight,Arial" font-weight="800" font-size="11" fill="currentColor">C#</text>';s.innerHTML=h});
/* ---- бегущая строка ---- */
const rows=[['#ra','Из первой строки кода рождается профессия · '],['#rb','Я помню каждого своего студента · ']];
rows.forEach(([s,x])=>$(s).textContent=x.repeat(5));
let rw=[1,1];const meas=()=>{rw=['#ra','#rb'].map(q=>$(q).scrollWidth/5||1)};meas();document.fonts&&document.fonts.ready.then(meas);
/* ---- сцена ---- */
const story=$('#story'),shot=$('#shot'),shotbg=$('#shotbg'),w1=$('#w1'),w2=$('#w2'),ph=$('#ph'),marq=$('#marq'),hero=$('#hero'),hch=$('#hchips'),root=document.documentElement;
const c0=[230,230,250],c1=[27,0,63];let T=0,dark=false;
const tlTrack=$('#ttrack'),tlFill=$('#tfill'),tlItems=[...document.querySelectorAll('#timeline .tli')];
const WORLD=3.0,rItems=[...document.querySelectorAll('#reviews .ri')];rItems.forEach(e=>{e._d=+e.dataset.d||1;e._dm=+e.dataset.dm||0});const tph=$('#tlph');if(tph)tph.src=ph.src;
const L={sh:1,rt:0,rh:1,tt:0};
const measureL=()=>{L.sh=story.offsetHeight;const r=$('#reviews');L.rt=r.offsetTop;L.rh=r.offsetHeight;L.tt=$('#timeline').offsetTop};
let lastS=-1,lastCol='';
function onScroll(){
  T=clamp(scrollY/(L.sh-innerHeight));hk=1-ease(clamp(T/.12));
  const s=ease(clamp(T/.2)),k=lerp(1,.3,s);
  if(s!==lastS){lastS=s;
  [shot,shotbg].forEach(el=>{el.style.transform=`scale(${k})`;el.style.clipPath=`inset(0 ${(s*10).toFixed(2)}% 0 ${(s*10).toFixed(2)}%)`});
  shotbg.style.setProperty('--g',s.toFixed(3));
  ph.style.filter=`grayscale(${s}) contrast(${1-s*.12})`}
  const c=c0.map((v,i)=>Math.round(lerp(v,c1[i],clamp(s*1.25))));
  const R=clamp((scrollY-L.rt)/(L.rh-innerHeight)),lt=ease(clamp((R-.3)/.4));
  {const fin=lt>0?c.map((v,i)=>Math.round(lerp(v,c0[i],lt))):c,colF=`rgb(${fin})`;
  /* фон пишем только когда цвет реально изменился: --bg на :root заставляет браузер пересчитывать стили всей страницы */
  if(colF!==lastCol){lastCol=colF;root.style.setProperty('--bg',colF);document.body.style.background=colF;root.style.background=colF}}
  document.body.classList.toggle('dark',s>.45&&lt<.5);dark=s>.45&&lt<.5;
  tone=clamp(s*1.25)*(1-lt);
  const WT=(WORLD-1)*innerWidth;
  /* хронология */
  {const tl=$('#timeline'),N=tlItems.length,gap=Math.round(innerHeight*(innerWidth<700?.5:.44)),dist=(N-1)*gap;
  tl.style.height=(innerHeight+dist+innerHeight*.35)+'px';tlTrack.style.setProperty('--gap',gap+'px');tlTrack.style.setProperty('--dist',dist+'px');
  const P=clamp((scrollY-L.tt)/dist),ty=innerHeight*.5-P*dist;
  tlTrack.style.transform=`translate3d(0,${ty.toFixed(1)}px,0)`;
  tlFill.style.setProperty('--fill',Math.max(0,P*dist-innerHeight*.3).toFixed(1)+'px');
  tlItems.forEach((e,i)=>{const a=clamp(1-Math.abs(i-P*(N-1))*1.3);e.style.setProperty('--a',a.toFixed(3));e.classList.toggle('on',a>.6)})}

  const mobR=innerWidth<=700;rItems.forEach(e=>{e.style.transform=`translate3d(${(-R*WT*(mobR&&e._dm?e._dm:e._d)).toFixed(1)}px,0,0)`});
  marq.style.opacity=clamp((T-.07)/.08);
  [hero,hch].forEach(e=>{e.style.opacity=clamp(1-s*2.4);e.style.transform=`translateY(${(-s*60).toFixed(1)}px)`});
  sigT=easeS(clamp((T-.26)/.5));
}
let sTick=false;addEventListener('scroll',()=>{if(!sTick){sTick=true;requestAnimationFrame(()=>{sTick=false;onScroll()})}},{passive:true});
/* ---- самостоятельно переливающийся градиент ---- */
let sigT=0;
measureL();addEventListener('load',()=>{measureL();onScroll()});
if(window.ResizeObserver)new ResizeObserver(()=>{measureL();onScroll()}).observe(document.body);
addEventListener('resize',()=>{meas();measureL();onScroll()});
let mx=innerWidth/2,my=innerHeight/2;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
const ir=[...document.querySelectorAll('.iri i')],marqRows=[[$('#ra'),-1],[$('#rb'),1]],off=[0,0];
const PAL=[[100,149,237],[75,0,130],[230,230,250],[25,25,112]];
const PALD=[[75,0,130],[25,25,112],[27,0,63]];
function palCol(u,P){const n=P.length,i=((Math.floor(u)%n)+n)%n,f=easeS(u%1),a=P[i],b=P[(i+1)%n];return`rgb(${a.map((v,k)=>Math.round(lerp(v,b[k],f)))})`}
let gt=0,sigP=0,last=performance.now();
function frame(now){
  const dt=Math.max(0,Math.min(64,now-last));last=now;const kk=t=>1-Math.exp(-dt/t);
  gt+=dt*(reduce?.15:1);
  /* фон: волны */
  wmx+=(mx-wmx)*kk(600);wmy+=(my-wmy)*kk(600);
  const cx=wmx/innerWidth,cy=wmy/innerHeight;
  wt=(cx*2.2+cy*1.4)*9000;
  /* большие цветные круги: двигаем только если мышь ещё «догоняется»; цвет меняем ~8 раз/сек (смена цвета = перерисовка огромных градиентов) */
  const mvd=Math.abs(mx-wmx)>.4||Math.abs(my-wmy)>.4||ir._f==null;
  if(mvd||now-(ir._t||0)>120){
    const colorTick=now-(ir._t||0)>120;if(colorTick)ir._t=now;ir._f=1;
    ir.forEach((el,i)=>{
      const x=innerWidth*(.5+(cx-.5)*[1.1,-.9,.7][i%3]),y=innerHeight*(.5+(cy-.5)*[-.8,1,-.6][i%3]);
      el.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;
      if(colorTick)el.style.setProperty('--c',palCol(cx*2.4+cy*1.2+i*1.35,dark?PALD:PAL))})}
  /* волны на canvas: 30 кадров/с достаточно для такого медленного фона */
  if(now-(frame._d||0)>=30){frame._d=now;drawWaves(0)}
    /* медленная бесконечная строка за фото */
  if(T<1){ /* бегущая строка и подпись нужны только пока видна первая сцена */
  if(!reduce){off[0]+=dt*.032;off[1]+=dt*.022}
  marqRows.forEach(([el,dir],i)=>{const o=off[i]%rw[i];el.style.transform=`translate3d(${(dir<0?-o:o-rw[i]).toFixed(1)}px,0,0)`})}
  /* подпись: мягкая волна слева направо */
  sigP+=(sigT-sigP)*kk(240);if(Math.abs(sigT-sigP)<.0005)sigP=sigT;
  const SOFT=.22,p=sigP*(1+SOFT);
  /* маска подписи с тяжёлым фильтром перерисовывается только пока анимация идёт */
  if(sigP!==frame._sp){frame._sp=sigP;w1.setAttribute('offset',clamp(p-SOFT).toFixed(4));w2.setAttribute('offset',clamp(p).toFixed(4))}
  requestAnimationFrame(frame)
}
onScroll();requestAnimationFrame(frame);
})();

;

(()=>{
/* t — название, y — год, o — l/p ориентация, r — пропорции карточки, src — фото, c — подпись в увеличенном виде */
const AW=[
 {t:'Премия',y:2017,o:'p',r:0.84,src:'images/laureat-prezident-2017.jpg',c:'Страница издания колледжа «Лауреаты специального фонда Президента Республики Беларусь» — лауреат фонда по социальной поддержке одарённых учащихся и студентов, 2017'},
 {t:'Грамота',y:2006,o:'p',r:0.8,src:'images/pochetnaya-gramota-2006.jpg',c:'Почётная грамота — «за добросовестное и творческое отношение к работе» в связи с 50-летием колледжа (14.11.2006)'},
 {t:'Грамота',y:2021,o:'l',r:1.1,src:'images/gramota-itplaneta-2021.jpg',c:'Благодарственная грамота О. В. Орехво — за помощь в подготовке студентов к международной олимпиаде «ИТ-Планета 2020/21»'},
 {t:'Благодарность',y:2025,o:'p',r:0.8,src:'images/blagodarnost-plehanov-2025.jpg',c:'Благодарность наставнику участников IV финала марафона IT-Плеханов Cup 2025'},
 {t:'Диплом',y:2009,o:'l',r:1.12,src:'images/diplom-2009-monitoring.jpg',c:'Диплом III степени — победитель мониторинга качества преподавания в колледже (18.02.2009)'},
 {t:'Диплом',y:2007,o:'p',r:0.8,src:'images/diplom-2007-otkrytyi-urok.jpg',c:'Диплом II степени — конкурс методических разработок «Открытый урок», номинация «Воспитательное мероприятие или проект» (05.10.2007)'},
 {t:'Удостоверение',y:2025,o:'l',r:1.12,src:'images/udostoverenie-reu-2025.jpg',c:'Удостоверение о повышении квалификации · РЭУ имени Г. В. Плеханова · «Тьюторский подход в самоопределении подростка», 16 часов'},
 {t:'Грамота',y:2009,o:'p',r:0.82,src:'images/gramota-pzt-2009.jpg',c:'Грамота от коллектива группы ПЗТ-2.15 — «за активное участие в образовательно-полезной жизни группы» (28.02.2009)'},
 {t:'Диплом',y:2025,o:'p',r:0.8,src:'images/diplom-stelmashuk-2025.jpg',c:'Диплом победителя (1 место) · А. Стельмашук · IV финал марафона IT-Плеханов Cup 2025'},
 {t:'Диплом',y:2021,o:'l',r:1.1,src:'images/diplom-kanabay-2021.jpg',c:'Диплом победителя (III место) · К. Канабай · «DataArt IT Contest», олимпиада «ИТ-Планета 2020/21»'},
 {t:'Диплом',y:2021,o:'p',r:0.8,src:'images/diplom-kanabay-bitcup-2021.jpg',c:'Диплом I степени · К. Канабай · победитель конкурса «Программирование на .NET» студенческой олимпиады в сфере информационных технологий BIT-CUP 2021 (БГУИР, Минск)'},
 {t:'Диплом',y:2019,o:'p',r:0.8,src:'images/diplom-desyatov-2019-05.jpg',c:'Диплом I степени · В. Десятов · первичный этап республиканского конкурса профессионального мастерства «WorldSkills Belarus», компетенция «Программные решения для бизнеса» (ГрГУ имени Янки Купалы, 17–18 мая 2019)'},
 {t:'Сертификат',y:2019,o:'l',r:1.38,src:'images/sertifikat-desyatov-2019.jpg',c:'Сертификат участника · В. Десятов · первичный этап IV Республиканского конкурса профессионального мастерства «WorldSkills Belarus 2020», компетенция «Программные решения для бизнеса» (ГрГУ имени Янки Купалы, 6–7 декабря 2019)'},
 {t:'Диплом',y:2019,o:'p',r:0.8,src:'images/diplom-desyatov-2019-12.jpg',c:'Диплом I степени · В. Десятов · первичный этап IV Республиканского конкурса «WorldSkills Belarus 2020» (декабрь 2019)'},
 {t:'Диплом',y:2025,o:'p',r:0.84,src:'images/diplom-laputko-2025.jpg',c:'Диплом I степени · К. Лапутько · областной этап VI Республиканского конкурса «Программные решения для бизнеса»'},
 {t:'Диплом',y:2019,o:'p',r:0.86,src:'images/diplom-lisovsky-2019-12.jpg',c:'Диплом II степени · А. Лисовский · первичный этап IV Республиканского конкурса «WorldSkills Belarus 2020»'},
 {t:'Диплом',y:2020,o:'p',r:0.8,src:'images/diplom-desyatov-2020-oblast.jpg',c:'Диплом III степени · В. Десятов · областной этап конкурса «WorldSkills Belarus», 2020'},
 {t:'Диплом',y:2019,o:'p',r:0.9,src:'images/diplom-alhimovich-2019-12.jpg',c:'Диплом III степени · Д. Альхимович · первичный этап IV Республиканского конкурса «WorldSkills Belarus 2020»'},
 {t:'Диплом',y:2025,o:'p',r:0.84,src:'images/diplom-mikucevich-2025.jpg',c:'Диплом II степени · В. Микуцевич · областной этап VI Республиканского конкурса «Программные решения для бизнеса»'},
 {t:'Грамота',y:2024,o:'p',r:0.8,src:'images/gramota-itplaneta-2024.jpg',c:'Благодарственная грамота АНО ЦРИТ «ИТ-Планета» — за значимый вклад в развитие личных и профессиональных навыков у обучающихся и многолетнее наставничество (Москва, 2024)'},
 {t:'Диплом',y:2017,o:'p',r:0.8,src:'images/diplom-cheberachko-russia-2017.jpg',c:'Диплом (2 место) · Д. Чеберачко · финал V Национального чемпионата «Молодые профессионалы» (WorldSkills Russia), компетенция «Программные решения для бизнеса», Краснодар, 15–19 мая 2017'},
 {t:'Премия',y:2017,o:'p',r:0.8,src:'images/svidetelstvo-premiya-prezidenta-2017.jpg',c:'Свидетельство о награждении третьей премией специального фонда Президента Республики Беларусь — за особый вклад в развитие способностей одарённых учащихся и студентов по итогам 2016/2017 учебного года'},
 {t:'Грамота',y:2017,o:'l',r:1.12,src:'images/gramota-oblispolkom-2017.jpg',c:'Почётная грамота Гродненского областного исполнительного комитета — за многолетнюю плодотворную работу, значительный личный вклад в развитие системы образования (август 2017)'},
 {t:'Благодарность',y:2009,o:'p',r:0.8,src:'images/blagodarstvennoe-pismo-2009.jpg',c:'Благодарственное письмо директора колледжа — за методическую помощь в организации педагогической деятельности начинающих преподавателей (04.07.2009)'},
 {t:'Сертификат',y:2017,o:'p',r:0.8,src:'images/sertifikat-cheberachko-china-2017.jpg',c:'Сертификат участия · Д. Чеберачко · China International Skills Competition 2017, IT Software Solutions for Business (6–9 июня 2017)'},
 {t:'Сертификат',y:2023,o:'p',r:0.8,src:'images/sertifikat-eksperta-profskills-2023.jpg',c:'Сертификат эксперта · V Республиканский конкурс профессионального мастерства «Profskills Belarus 2023», компетенция «Программные решения для бизнеса» (Минск, 2023)'},
 {t:'Сертификат',y:2023,o:'p',r:0.76,src:'images/sertifikat-kanabay-itplaneta-2023.jpg',c:'Сертификат · К. Канабай · первый отборочный этап Международной олимпиады «ИТ-Планета 2023», конкурс компании SimbirSoft — задание выполнено на 92 % из 100 % (30.03.2023)'},
 {t:'Диплом',y:2020,o:'p',r:0.8,src:'images/diplom-diklyaeva-technomarafon-2020.jpg',c:'Диплом I степени · Д. Дикляева · I место в online-конкурсе «Хочу в IT. Тестировщик» областного «ТехноМарафона 2.0» (ГОЦТТ, Гродно, 2020)'},
 {t:'Диплом',y:2020,o:'p',r:0.8,src:'images/diplom-vrublevsky-testirovshchik-2020.jpg',c:'Диплом II степени · Д. Врублевский · II место в online-конкурсе «Хочу в IT. Тестировщик» областного «ТехноМарафона 2.0» (ГОЦТТ, Гродно, 2020)'},
 {t:'Диплом',y:2020,o:'p',r:0.8,src:'images/diplom-zaytsev-testirovshchik-2020.jpg',c:'Диплом II степени · А. Зайцев · II место в online-конкурсе «Хочу в IT. Тестировщик» областного «ТехноМарафона 2.0» (ГОЦТТ, Гродно, 2020)'},
 {t:'Диплом',y:2020,o:'p',r:0.8,src:'images/diplom-zaytsev-mozgomatika-2020.jpg',c:'Диплом I степени · А. Зайцев · I место в конкурсе «МозгоМатика» областного «ТехноМарафона» (ГОЦТТ, Гродно, 2020)'},
 {t:'Диплом',y:2021,o:'p',r:0.8,src:'images/diplom-kanabay-web-2021.jpg',c:'Диплом I степени · К. Канабай · I место в конкурсе «Web-технологии» областного «ТехноМарафона 2.1» (ГОЦТТ, Гродно, 2021)'},
 {t:'Диплом',y:2021,o:'p',r:0.8,src:'images/diplom-morozova-2021.jpg',c:'Диплом III степени · А. Морозова · III место в конкурсе «Математика в картинках» областного «ТехноМарафона 2.1» (ГОЦТТ, Гродно, 2021)'},
 {t:'Сертификат',y:2021,o:'p',r:0.8,src:'images/sertifikat-kanabay-dataart-1-2021.jpg',c:'Сертификат участника · К. Канабай · первый отборочный этап конкурса «DataArt IT Contest», международная олимпиада «ИТ-Планета 2020/21» (Москва, 28.06.2021)'},
 {t:'Сертификат',y:2021,o:'p',r:0.8,src:'images/sertifikat-kanabay-oracle-1-2021.jpg',c:'Сертификат участника · К. Канабай · первый отборочный этап конкурса «Базы данных Oracle», международная олимпиада «ИТ-Планета 2020/21» (Москва, 28.06.2021)'},
 {t:'Сертификат',y:2021,o:'p',r:0.8,src:'images/sertifikat-antoshchenko-oracle-1-2021.jpg',c:'Сертификат участника · М. Антощенко · первый отборочный этап конкурса «Базы данных Oracle», международная олимпиада «ИТ-Планета 2020/21» (Москва, 28.06.2021)'},
 {t:'Сертификат',y:2021,o:'p',r:0.8,src:'images/sertifikat-savanets-dataart-1-2021.jpg',c:'Сертификат участника · Т. Саванец · первый отборочный этап конкурса «DataArt IT Contest», международная олимпиада «ИТ-Планета 2020/21» (Москва, 28.06.2021)'},
 {t:'Сертификат',y:2021,o:'p',r:0.8,src:'images/sertifikat-chekanov-dataart-1-2021.jpg',c:'Сертификат участника · В. Чеканов · первый отборочный этап конкурса «DataArt IT Contest», международная олимпиада «ИТ-Планета 2020/21» (Москва, 28.06.2021)'},
 {t:'Сертификат',y:2021,o:'p',r:0.8,src:'images/sertifikat-kanabay-dataart-2-2021.jpg',c:'Сертификат участника · К. Канабай · второй отборочный этап конкурса «DataArt IT Contest», международная олимпиада «ИТ-Планета 2020/21» (Москва, 28.06.2021)'},
 {t:'Сертификат',y:2021,o:'p',r:0.8,src:'images/sertifikat-kanabay-oracle-2-2021.jpg',c:'Сертификат участника · К. Канабай · второй отборочный этап конкурса «Базы данных Oracle», международная олимпиада «ИТ-Планета 2020/21» (Москва, 28.06.2021)'},
 {t:'Сертификат',y:2023,o:'p',r:0.8,src:'images/sertifikat-kanabay-itplaneta-2023-etap2.jpg',c:'Сертификат · К. Канабай · второй этап Международной олимпиады «ИТ-Планета 2023», конкурс компании SimbirSoft — задание выполнено на 96 % из 100 % (29.04.2023)'},
 {t:'Грамота',y:2011,o:'p',r:0.8,src:'images/gramota-uprobr-2011.jpg',c:'Почётная грамота управления образования Гродненского облисполкома — за многолетнюю плодотворную работу в системе образования, достигнутые успехи в профессиональной деятельности (приказ № 103-к от 04.11.2011)'},
 {t:'Сертификат',y:2017,o:'p',r:0.8,src:'images/sertifikat-cheberachko-eurasia-2017.jpg',c:'Сертификат участника · Д. Чеберачко · открытый Евразийский чемпионат по стандартам WorldSkills, Краснодар, 15–19 мая 2017'},
 {t:'Сертификат',y:2018,o:'p',r:0.8,src:'images/sertifikat-eksperta-ws-2018.jpg',c:'Сертификат эксперта · III Республиканский конкурс профессионального мастерства «WorldSkills Belarus 2018», компетенция «Программные решения для бизнеса» (Минск, 2018)'},
 {t:'Обложка',y:2017,o:'p',r:0.8,src:'images/obolozhka-fond-prezidenta-2017.jpg',c:'Обложка наградного документа · Специальный фонд Президента Республики Беларусь по социальной поддержке одарённых учащихся и студентов'},
 {t:'Грамота',y:2016,o:'p',r:0.8,src:'images/gramota-minobr-2016.jpg',c:'Грамота Министерства образования Республики Беларусь — за многолетнюю плодотворную педагогическую деятельность, достигнутые успехи в обучении и воспитании подрастающего поколения (приказ № 119-у от 03.11.2016)'},
 {t:'Сертификат',y:2017,o:'p',r:0.8,src:'images/sertifikat-cheberachko-abudhabi-2017.jpg',c:'Сертификат участника · Д. Чеберачко · 44-й чемпионат мира WorldSkills, Абу-Даби (ОАЭ), 14–19 октября 2017, компетенция IT Software Solutions for Business'},
 {t:'Диплом',y:2016,o:'p',r:0.8,src:'images/diplom-eksperta-ws-2016.jpg',c:'Диплом эксперта · II Республиканский конкурс профессионального мастерства «WorldSkills Belarus – 2016», компетенция «Программное обеспечение для бизнеса» (Минск, 2016)'},
 {t:'Диплом',y:2016,o:'p',r:0.8,src:'images/diplom-cheberachko-2016.jpg',c:'Диплом II степени · Д. Чеберачко · II место на II Республиканском конкурсе профессионального мастерства «WorldSkills Belarus – 2016»'},
 {t:'Сертификат',y:2024,o:'p',r:0.8,src:'images/sertifikat-ripo-2024.jpg',c:'Сертификат РИПО — очное участие в тренинге по компетенции «Программные решения для бизнеса» в рамках проекта ПРООН «Развитие инновационного потенциала молодёжи для ускоренного устойчивого развития Беларуси» (Минск, 2024)'},
 {t:'Диплом',y:2020,o:'p',r:0.8,src:'images/diplom-alhimovich-2020-oblast.jpg',c:'Диплом участника · Д. Альхимович · областной этап конкурса «WorldSkills Belarus», компетенция «Программные решения для бизнеса» (Гродно, 2020)'}
];
const grid=document.getElementById('agrid'),alb=document.getElementById('alb'),albc=document.getElementById('albc');
const rot=i=>[-3,2.5,-1.5,3,-2,1.5][i%6];
function dip(a,big){
  if(a.src)return `<img src="${a.src}" alt="${(a.c||a.t+' '+a.y).replace(/"/g,'&quot;')}" loading="lazy" decoding="async">`;
  return `${big?`<div class="dw ${a.o}">`:''}<div class="dip ${a.o}"${big?'':` style="transform:rotate(${rot(a.y)}deg)"`}><i>Орехво Ольга Витальевна</i><strong>${a.t}</strong><u></u><u></u><small>Здесь будет фото диплома · ${a.y}</small><s>C#</s></div>${big?'</div>':''}`;
}
let cols=0,io=null;
function build(){
  const n=innerWidth<700?2:4;if(n===cols)return;cols=n;grid.innerHTML='';
  const cs=[...Array(n)].map(()=>{const d=document.createElement('div');d.className='acol';grid.appendChild(d);return d});
  AW.forEach((a,i)=>{
    const el=document.createElement('article');el.className='ac';el.tabIndex=0;el.style.setProperty('--r',a.r);el.style.setProperty('--fd',(6+(i*1.3)%3).toFixed(1)+'s');el.style.setProperty('--fdl',(-(i*1.7)%6).toFixed(1)+'s');
    el.style.transitionDelay=((i%n)*.08)+'s,'+((i%n)*.08)+'s,0s,0s';
    el.innerHTML=`<div class="ai">${String(i+1).padStart(2,'0')}</div><div class="ap">${dip(a,false)}</div><div class="al"><b>${a.y}</b><span>${a.t}</span></div>`;
    el.addEventListener('click',()=>open(a));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(a)}});
    cs[i%n].appendChild(el);
  });
  io&&io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  grid.querySelectorAll('.ac').forEach(e=>io.observe(e));
}
function open(a){albc.innerHTML=dip(a,true)+`<p>${a.c||(a.t+' · '+a.y)}</p>`;alb.classList.add('on');alb.setAttribute('aria-hidden','false')}
function close(){alb.classList.remove('on');alb.setAttribute('aria-hidden','true')}
alb.addEventListener('click',close);addEventListener('keydown',e=>{if(e.key==='Escape')close()});
/* лёгкий параллакс колонок */
const SP=[0,-.09,.04,-.14];let tick=false;
function par(){tick=false;const sr=document.getElementById('awards').getBoundingClientRect();document.body.classList.toggle('lg-hide',sr.top<120&&sr.bottom-innerHeight*.2>120);if(sr.bottom<-400||sr.top>innerHeight*2)return;const r=grid.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight-r.top)/(r.height+innerHeight)));
  const k=innerWidth<700?.5:1;[...grid.children].forEach((c,i)=>{c.style.transform=`translate3d(0,${((p-.5)*SP[i%4]*innerHeight*k*2).toFixed(1)}px,0)`})}
const req=()=>{if(!tick){tick=true;requestAnimationFrame(par)}};
build();par();addEventListener('scroll',req,{passive:true});addEventListener('resize',()=>{build();req()});
})();

;

(()=>{
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.st,.pl li,.gi').forEach((e,i)=>{e.style.transitionDelay=((i%4)*.07)+'s';io.observe(e)});
document.querySelectorAll('.gi').forEach(g=>{const open=()=>{const a=document.getElementById('alb'),c=document.getElementById('albc'),p=document.createElement('p');p.textContent=g.dataset.c;c.innerHTML='<img src="'+g.dataset.src+'" alt="">';c.appendChild(p);a.classList.add('on');a.setAttribute('aria-hidden','false')};g.addEventListener('click',open);g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}})});
document.querySelectorAll('[data-years]').forEach(b=>{b.textContent=new Date().getFullYear()-(+b.dataset.years)});
})();


/* ---- отзывы: каскадное появление и 3D-наклон ---- */
(()=>{
const cards=[...document.querySelectorAll('.vq')];if(!cards.length)return;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const vio=new IntersectionObserver(es=>{
  let k=0;es.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top||a.boundingClientRect.left-b.boundingClientRect.left).forEach(e=>{
    e.target.style.setProperty('--dl',(k++*.16)+'s');e.target.classList.add('in');vio.unobserve(e.target)});
},{threshold:.15});
cards.forEach(c=>vio.observe(c));
if(reduce||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
cards.forEach(c=>{
  let raf=0,ev=null;
  const apply=()=>{raf=0;const r=c.getBoundingClientRect(),px=(ev.clientX-r.left)/r.width,py=(ev.clientY-r.top)/r.height;
    c.style.setProperty('--ry',((px-.5)*9).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-py)*7).toFixed(2)+'deg');
    c.style.setProperty('--mx',(ev.clientX-r.left).toFixed(0)+'px');c.style.setProperty('--my',(ev.clientY-r.top).toFixed(0)+'px')};
  c.addEventListener('pointerenter',()=>c.classList.add('tilt'));
  c.addEventListener('pointermove',e=>{ev=e;if(!raf)raf=requestAnimationFrame(apply)});
  c.addEventListener('pointerleave',()=>{c.classList.remove('tilt');['--rx','--ry'].forEach(v=>c.style.setProperty(v,'0deg'));c.style.removeProperty('--mx');c.style.removeProperty('--my')});
});
})();
;

(()=>{
if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
const dot=document.getElementById('cdot'),ring=document.getElementById('cring');
let x=-100,y=-100,rx=-100,ry=-100,seen=false,card=null,pull=0;
addEventListener('pointermove',e=>{
  x=e.clientX;y=e.clientY;
  if(!seen){seen=true;rx=x;ry=y;dot.classList.add('on');ring.classList.add('on')}
  setState(e.target);
},{passive:true});
function setState(t){
  const c=t&&(t.closest?t:t.parentElement);if(!c)return;
  const st=c.closest('.alb')?'close':c.closest('.ac')?'zoom':c.closest('a,button,.tli,[tabindex]')?'link':'';
  ring.classList.toggle('zoom',st==='zoom');ring.classList.toggle('close',st==='close');ring.classList.toggle('link',st==='link');
  card=(st===''||st==='link')?c.closest('.vq'):null;ring.classList.toggle('card',!!card);
  dot.classList.toggle('hide',st==='zoom'||st==='close');
}
/* при прокрутке и анимациях курсор не двигается — пересчитываем элемент под ним */
let fc=0;const recheck=()=>{if(seen)setState(document.elementFromPoint(x,y))};
addEventListener('scroll',recheck,{passive:true});
addEventListener('pointerdown',()=>ring.classList.add('down'));addEventListener('pointerup',()=>ring.classList.remove('down'));
document.documentElement.addEventListener('pointerleave',()=>{dot.classList.remove('on');ring.classList.remove('on');seen=false});
let cRun=false,idle=0;function loop(){cRun=true;
  if(++fc%8===0)recheck();let tx=x,ty=y;
  if(card){const r=card.getBoundingClientRect();tx=x+(r.left+r.width/2-x)*.16;ty=y+(r.top+r.height/2-y)*.16}
  rx+=(tx-rx)*.16;ry+=(ty-ry)*.16;
  dot.style.transform=`translate3d(${x}px,${y}px,0)`;ring.style.transform=`translate3d(${rx.toFixed(1)}px,${ry.toFixed(1)}px,0)`;
  const settled=!card&&Math.abs(tx-rx)<.2&&Math.abs(ty-ry)<.2;
  if(settled){if(++idle>30){cRun=false;return}}else idle=0;
  requestAnimationFrame(loop);
}
const wake=()=>{idle=0;if(!cRun)requestAnimationFrame(loop)};
addEventListener('pointermove',wake,{passive:true});addEventListener('scroll',wake,{passive:true});wake();
})();

;(()=>{const w=document.getElementById('hmenu');if(!w)return;const b=w.querySelector('.menu');let t;
const set=v=>{w.classList.toggle('open',v);b.setAttribute('aria-expanded',v)};
w.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){clearTimeout(t);set(true)}});
w.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){t=setTimeout(()=>set(false),350)}});
b.addEventListener('click',()=>set(!w.classList.contains('open')));
w.querySelectorAll('.drawer a').forEach(a=>a.addEventListener('click',()=>set(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
document.addEventListener('pointerdown',e=>{if(!w.contains(e.target))set(false)});
})();

;(()=>{const m=document.getElementById('rmodal');if(!m)return;let last;
const open=()=>{last=document.activeElement;m.hidden=false;requestAnimationFrame(()=>m.classList.add('on'));document.body.classList.add('modal-open');m.querySelector('.rm-x').focus()};
const close=()=>{m.classList.remove('on');document.body.classList.remove('modal-open');setTimeout(()=>{m.hidden=true},300);last&&last.focus&&last.focus()};
document.querySelectorAll('[data-open="rmodal"]').forEach(b=>b.addEventListener('click',open));
m.querySelector('.rm-x').addEventListener('click',close);
m.addEventListener('pointerdown',e=>{if(e.target===m)close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!m.hidden)close()});
})();

;

/* ===== «Победы учеников»: буквы, фильтр, рельса, магнитные бейджи, превью диплома ===== */
(()=>{
const sec=document.getElementById('pupils');if(!sec)return;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));

/* 1. заголовок собирается по буквам */
const h=sec.querySelector('h2[data-letters]');
if(h){let n=0;
  const walk=node=>[...node.childNodes].forEach(c=>{
    if(c.nodeType===3){const f=document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.append(' ');return}
        const w=document.createElement('span');w.className='w';
        [...t].forEach(ch=>{const s=document.createElement('span');s.className='ch';s.textContent=ch;s.style.setProperty('--i',n++);w.append(s)});f.append(w)});
      c.replaceWith(f)}
    else if(c.nodeType===1)walk(c)});
  walk(h);h.setAttribute('aria-label',h.textContent.replace(/\s+/g,' ').trim());
  const sh=h.closest('.sh'),io=new IntersectionObserver(e=>{if(e[0].isIntersecting){sh.classList.add('in');io.disconnect()}},{threshold:.35});io.observe(sh)}

const pl=sec.querySelector('.pl'),plw=document.getElementById('plw'),rows=[...pl.children];

/* 2. фильтр по призам */
const chips=[...sec.querySelectorAll('.pchip')];
chips.forEach(c=>{const f=c.dataset.f;c.querySelector('small').textContent=f==='all'?rows.length:rows.filter(r=>r.dataset.cat.split(' ').includes(f)).length});
const timers=new WeakMap();
function setRow(li,show,delay){
  if(show===!li.classList.contains('off')&&!li.classList.contains('gone'))return;
  clearTimeout(timers.get(li));li.classList.add('in','fx');li.style.transitionDelay=delay+'ms';
  if(show){
    if(li.classList.contains('gone')||li.classList.contains('off')){
      li.classList.remove('gone');li.style.transition='none';li.classList.remove('off');li.style.height='auto';
      const hh=li.offsetHeight;li.classList.add('off');li.style.height='0px';void li.offsetHeight;li.style.transition='';
      li.style.transitionDelay=delay+'ms';li.classList.remove('off');li.style.height=hh+'px'}
  }else{
    li.style.height=li.offsetHeight+'px';void li.offsetHeight;li.classList.add('off');li.style.height='0px'}
  timers.set(li,setTimeout(()=>{li.style.height='';li.style.transitionDelay='';li.classList.remove('fx');if(!show)li.classList.add('gone')},(reduce?0:800)+delay));
}
chips.forEach(c=>c.addEventListener('click',()=>{
  chips.forEach(x=>x.setAttribute('aria-pressed',x===c?'true':'false'));
  const f=c.dataset.f;let k=0;pv.classList.remove('on');
  rows.forEach(li=>{const show=f==='all'||li.dataset.cat.split(' ').includes(f);setRow(li,show,reduce?0:Math.min(k++,12)*28)})}));

/* 3. вертикальная линия с точкой */
const rail=plw.querySelector('.rail');let ry=0,cur=null,act=false,run=false;
new IntersectionObserver(e=>{act=e[0].isIntersecting;if(act&&!run){run=true;tick()}},{rootMargin:'20% 0px'}).observe(plw);
function tick(){
  if(!act){run=false;return}
  const r=plw.getBoundingClientRect(),target=clamp(innerHeight*.5-r.top,0,r.height);
  ry+=(target-ry)*(reduce?1:.16);if(Math.abs(target-ry)<.3)ry=target;
  rail.style.setProperty('--ry',ry.toFixed(1)+'px');
  let best=null,bd=1e9;
  for(const li of rows){if(li.classList.contains('gone')||li.classList.contains('off'))continue;
    const b=li.getBoundingClientRect(),m=r.top+ry,t=b.top-r.top,d=m>=t&&m<=t+b.height?0:Math.min(Math.abs(m-t),Math.abs(m-t-b.height));
    if(d<bd){bd=d;best=li}}
  if(best!==cur){cur&&cur.classList.remove('cur');cur=best;cur&&cur.classList.add('cur')}
  requestAnimationFrame(tick)}

/* 4. магнитные бейджи */
if(fine&&!reduce){
  rows.forEach(li=>{const b=li.querySelector('.bdg');if(!b)return;
    li.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy),R=260;
      if(d>R){b.style.transform='';return}
      const k=(1-d/R)*.55;b.style.transform=`translate(${(dx*k).toFixed(1)}px,${(dy*k*1.3).toFixed(1)}px) scale(${(1+k*.18).toFixed(3)})`});
    li.addEventListener('pointerleave',()=>b.style.transform='')})}

/* 5. фото диплома сбоку */
const pv=document.getElementById('ppv');let px=0,py=0,cx=0,cy=0,over=false,curImg='';
if(fine){
  const place=(w,hh)=>{const pad=18,gap=34;let x=px+gap;if(x+w>innerWidth-pad)x=px-gap-w;x=clamp(x,pad,Math.max(pad,innerWidth-w-pad));
    return[x,clamp(py-hh/2,pad,Math.max(pad,innerHeight-hh-pad))]};
  (function loop(){if(over){const w=pv.offsetWidth,hh=pv.offsetHeight,[tx,ty]=place(w,hh);
      if(!pv.classList.contains('on')){cx=tx;cy=ty}
      cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;pv.style.transform=`translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) rotate(${((tx-cx)*.02).toFixed(2)}deg)`}
    requestAnimationFrame(loop)})();
  const show=li=>{const im=li.dataset.img;if(!im){over=false;pv.classList.remove('on');return}
    if(im!==curImg){curImg=im;pv.innerHTML='';const a=im.split(' ');pv.dataset.n=a.length;
      a.forEach(s=>{const i=new Image();i.src=s;i.alt='';i.onerror=()=>{i.remove();if(!pv.children.length)pv.classList.remove('on')};pv.append(i)})}
    over=true;pv.classList.add('on')};
  const hide=()=>{over=false;pv.classList.remove('on')};
  rows.forEach(li=>{
    li.addEventListener('pointerenter',e=>{px=e.clientX;py=e.clientY;show(li)});
    li.addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY});
    li.addEventListener('pointerleave',hide);
    li.addEventListener('focus',()=>{const r=li.getBoundingClientRect();px=r.left+r.width*.55;py=r.top+r.height/2;show(li)});
    li.addEventListener('blur',hide)});
  addEventListener('scroll',()=>{if(over){const el=document.elementFromPoint(px,py);if(!el||!el.closest||!el.closest('.pl li'))hide()}},{passive:true})}
})();
