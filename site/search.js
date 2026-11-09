const form=document.querySelector('#archive-search');
if(form){
 const status=document.querySelector('#search-status'), results=document.querySelector('#search-results');
 const base=new URL('../../',location.href), query=form.querySelector('#query'), year=form.querySelector('#year');
 const params=new URLSearchParams(location.search);query.value=params.get('q')||'';year.value=params.get('year')||'';
 let records=[];
 function render(){
  const words=query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matches=records.filter(r=>(!year.value||r.year===year.value)&&words.every(w=>(r.title+' '+r.text).toLocaleLowerCase().includes(w)));
  results.replaceChildren();
  for(const r of matches){const li=document.createElement('li'),a=document.createElement('a'),meta=document.createElement('span');a.href=new URL(r.route.replace(/^\//,''),base);a.textContent=r.title;meta.textContent=[r.year,r.kind].filter(Boolean).join(' · ');meta.className='search-meta';li.append(a,meta);results.append(li);}
  status.textContent=matches.length+' results'+(matches.length===0?'. Try another name, topic or year.':'.');
 }
 form.addEventListener('submit',event=>{event.preventDefault();const p=new URLSearchParams();if(query.value.trim())p.set('q',query.value.trim());if(year.value)p.set('year',year.value);history.replaceState(null,'',location.pathname+(p.size?'?'+p.toString():''));render();});
 status.textContent='Loading the archive…';
 fetch(new URL('archive-search.json',base)).then(response=>{if(!response.ok)throw new Error('Archive unavailable');return response.json()}).then(data=>{records=data;render()}).catch(()=>{status.textContent='Search is unavailable. Browse the editions below.'});
}
// Expand a directly linked native disclosure without moving keyboard focus.
function revealHash(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const el=document.getElementById(id);if(el instanceof HTMLDetailsElement)el.open=true;else if(el?.closest('details'))el.closest('details').open=true;}
revealHash();addEventListener('hashchange',revealHash);
