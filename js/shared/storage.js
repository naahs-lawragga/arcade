const prefix='arcade:v1:';
function highScore(slug){return Number(localStorage.getItem(prefix+slug+':high')||0)}
function saveHighScore(slug,score){const next=Math.max(highScore(slug),Number(score)||0);localStorage.setItem(prefix+slug+':high',String(next));return next}
function setting(key,value){if(value===undefined)return localStorage.getItem(prefix+'setting:'+key);localStorage.setItem(prefix+'setting:'+key,JSON.stringify(value));return value}
window.ArcadeStorage={highScore,saveHighScore,setting};
