import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('.',import.meta.url)));
import {animals,calculateResult} from './dist/data.js';
assert.equal(animals.length,9);assert.equal(animals.flatMap(a=>a.questions).length,45);
for(const a of animals){assert.equal(a.questions.length,5);assert.ok(fs.existsSync(`dist/assets/animal-${a.id}.png`));}
assert.equal(calculateResult(Array(9).fill(0)),null);
assert.throws(()=>calculateResult([6,0,0,0,0,0,0,0,0]));
assert.throws(()=>calculateResult([1,2]));
assert.throws(()=>calculateResult(['1',0,0,0,0,0,0,0,0]));
for(let n=0;n<1000;n++){const scores=Array.from({length:9},()=>Math.floor(Math.random()*6));const r=calculateResult(scores);if(!r)continue;assert.equal(r.percentages.reduce((a,b)=>a+b,0),100);assert.ok(r.percentages.every(v=>v>=0&&v<=100));assert.equal(scores[r.type-1],Math.max(...scores));assert.ok([r.type===1?9:r.type-1,r.type===9?1:r.type+1].includes(r.wing));}
const r=calculateResult([0,0,1,0,1,3,5,2,0]);assert.equal(r.type,7);assert.equal(r.wing,6);
assert.equal(calculateResult([5,1,0,0,0,0,0,0,4]).wing,9);
assert.equal(calculateResult([4,0,0,0,0,0,0,1,5]).wing,1);
const tie=calculateResult([1,5,5,0,0,0,0,0,0],3);assert.equal(tie.type,3);assert.equal(tie.wing,2);
assert.equal(calculateResult([1,1,5,1,0,0,0,0,0],3,4).wing,4);
const routes=['','education/','lectures/','contact/','test/','result/'];
for(const name of ['history-symbol.png','history-system.png','history-psychology.png','history-community.png','logo-symbol-clean.png','favicon-clean-32.png','favicon-clean-192.png','apple-touch-clean.png','og-image-corrected.png'])assert.ok(fs.statSync(`dist/assets/${name}`).size>0);
assert.deepEqual(animals.map(a=>a.name),['소','강아지','독수리','고양이','부엉이','사슴','원숭이','호랑이','코끼리']);
for(const route of routes)assert.ok(fs.existsSync(`dist/${route}index.html`));
for(const name of ['hero-animals.png','logo.svg','gsap.min.js','ScrollTrigger.min.js','html2canvas.min.js','jspdf.umd.min.js','PretendardVariable.woff2'])assert.ok(fs.statSync(`dist/assets/${name}`).size>0);
for(const name of ['hero-transparent.png','logo-3d.png','favicon-32.png','favicon-192.png','apple-touch-icon.png','og-image.png'])assert.ok(fs.statSync(`dist/assets/${name}`).size>0);
for(const name of ['logo-enneagram-3d.png','favicon-enneagram-32.png','favicon-enneagram-192.png','apple-touch-enneagram.png'])assert.ok(fs.statSync(`dist/assets/${name}`).size>0);
for(const name of ['education-icon.png','lecture-icon.png','contact-mail.png','contact-phone.png','contact-location.png','contact-person.png','about-discover.png','about-connect.png','about-grow.png'])assert.ok(fs.statSync(`dist/assets/${name}`).size>0);
for(const route of routes){const html=fs.readFileSync(`dist/${route}index.html`,'utf8');assert.ok(html.includes('property="og:image" content="https://leejinho970715-star.github.io/Insight/assets/og-image-corrected.png"'));assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));assert.equal((html.match(/sizes="32x32"/g)||[]).length,1);assert.ok(html.includes('refinements.css'));for(const match of html.matchAll(/(?:src|href)="((?:\.\/|\.\.\/)[^"]+)"/g)){const path=new URL(match[1],new URL(`dist/${route}index.html`,import.meta.url));assert.ok(fs.existsSync(path),`Missing ${path}`);}}
assert.ok(!fs.readFileSync('dist/style.css','utf8').includes('url(/assets/'));
assert.ok(fs.readFileSync('dist/motion.js','utf8').includes("pin:'.brand-stage'"));
console.log('PASS: corrected 9 animals, 45 questions, wings/ties, 1000 percentage checks, six routes, relative resource paths and clay icons.');
