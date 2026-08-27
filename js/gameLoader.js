window.Arcade=window.Arcade||{};
let active=null;
function injectScript(slug){return new Promise((resolve,reject)=>{if(window.ArcadeGames?.[slug])return resolve();const script=document.createElement('script');script.src=`games/${slug}/index.js`;script.onload=resolve;script.onerror=()=>reject(new Error(`Could not load ${slug}`));document.head.append(script)})}
async function loadGame(game,container){unloadGame();const style=document.createElement('link');style.rel='stylesheet';style.href=`games/${game.slug}/style.css`;style.dataset.gameStyle=game.slug;document.head.append(style);try{await injectScript(game.slug);active={instance:window.ArcadeGames[game.slug].init(container),style}}catch(error){style.remove();container.innerHTML='<p>That game could not start. Please return to Arcade and try another.</p>';console.error(error)}}
function unloadGame(){if(!active)return;active.instance?.destroy?.();active.style?.remove();active=null}
window.Arcade.loadGame=loadGame;window.Arcade.unloadGame=unloadGame;
