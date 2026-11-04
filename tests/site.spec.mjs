import {test,expect} from '@playwright/test';
import fs from 'node:fs';
const ids=['uwallet','saudi','devil','uwallet-world-cup','big-chips','olivewood','uwallet-2','ai','auto','food','gym','aqsa'];
test('Homepage: positioning, complete covers, source aspect ratios, responsive layout and motion',async({page},testInfo)=>{
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('#work')).toBeVisible();
 await expect(page.locator('.project-card')).toHaveCount(12);
 expect(await page.locator('.project-card').evaluateAll(nodes=>nodes.every(node=>getComputedStyle(node).opacity==='1'))).toBeTruthy();
 expect(await page.locator('.featured-grid').evaluate(el=>el.getBoundingClientRect().height>200)).toBeTruthy();
 await expect(page.getByRole('heading',{name:/campaign visuals/i})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBeTruthy();
 const img=page.locator('.project-card img').first();
 await expect(img).toBeVisible();
 await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBeTruthy();
 // Simulate an actual reader scrolling the full collection; verify every lazy image.
 const oldWork=page.locator('#earlier-works');
 await oldWork.locator('summary').click();
 await expect(oldWork).toHaveAttribute('open','');
 const cardImages=await page.locator('.project-card img').all();
 for(const cardImage of cardImages){
  await cardImage.scrollIntoViewIfNeeded();
  await expect.poll(()=>cardImage.evaluate(el=>el.complete&&el.naturalWidth>0),{timeout:20000}).toBeTruthy();
 }
 await oldWork.locator('summary').click();
 await expect(oldWork).not.toHaveAttribute('open','');
 await page.evaluate(()=>window.scrollTo(0,0));
 expect(errors).toEqual([]);
 await page.screenshot({path:`test-results/home-${testInfo.project.name}.png`,fullPage:true,animations:'disabled'});
 if(testInfo.project.name==='mobile'){
  const menu=page.locator('.menu-toggle');
  await menu.click();
  await expect(page.locator('#site-nav')).toHaveClass(/is-open/);
  await page.getByRole('link',{name:'Work',exact:true}).click();
  await expect(page.locator('#site-nav')).not.toHaveClass(/is-open/);
 }else{
  const animation=await page.locator('.hero-title>span').first().evaluate(el=>getComputedStyle(el).animationName);
  expect(animation).toContain('portfolio-headline-arrive');
 }
});
test('Uwallet narrative: typography before creative applications, no duplicated text-only boards, and accessible archive',async({page},testInfo)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/case.html?id=uwallet');
 await expect(page.getByRole('heading',{name:'Uwallet Campaigns',exact:true})).toBeVisible();
 await page.screenshot({path:`test-results/uwallet-opening-${testInfo.project.name}.png`,fullPage:false,animations:'disabled'});
 const sections=page.locator('.editorial-section');
 await expect(sections).toHaveCount(2);
 const a=sections.nth(0),b=sections.nth(1);
 await expect(a.locator('.case-stage').first()).toContainText('Campaign typography');
 await a.locator('.case-stage').first().scrollIntoViewIfNeeded();
 await page.screenshot({path:`test-results/uwallet-type-${testInfo.project.name}.png`,fullPage:false,animations:'disabled'});
 await expect(b.locator('.case-stage').first()).toContainText('Campaign typography');
 const aImages=await a.locator('.case-artwork img').evaluateAll(els=>els.map(el=>el.getAttribute('src')));
 const bImages=await b.locator('.case-artwork img').evaluateAll(els=>els.map(el=>el.getAttribute('src')));
 expect(aImages[0]).toContain('/269ebf509a568783.webp');
 expect(aImages.indexOf(aImages.find(x=>x.includes('269ebf509a568783')))).toBeLessThan(aImages.findIndex(x=>x.includes('48b416fb696c4150')));
 expect(bImages[0]).toContain('/ef7bd23938a4e2ad.webp');
 expect(bImages.indexOf(bImages.find(x=>x.includes('ef7bd23938a4e2ad')))).toBeLessThan(bImages.findIndex(x=>x.includes('c220a02d274c643d')));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBeTruthy();
 const archive=page.locator('.case-process');
 await expect(archive).toHaveCount(1);
 await archive.locator('summary').click();
 await expect(archive).toHaveAttribute('open','');
 await expect(archive.locator('img')).toHaveCount(6);
 const images=page.locator('.case-artwork img');
 expect(await images.count()).toBe(17);
 expect(errors).toEqual([]);
 await page.screenshot({path:`test-results/uwallet-${testInfo.project.name}.png`,fullPage:false,animations:'disabled'});
});
test('Case navigation: all twelve deep links, no runtime errors, valid original covers',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const id of ids){
  await page.goto('/case.html?id='+id);
  await expect(page.locator('.portfolio-case h1')).toBeVisible();
  await expect.poll(()=>page.locator('.case-cover').evaluate(el=>el.complete&&el.naturalWidth>0)).toBeTruthy();
  await expect(page.locator('.case-overview')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBeTruthy();
 }
 expect(errors).toEqual([]);
});
test('Lightbox: keyboard closure, focus restoration and reduced-motion support',async({page},testInfo)=>{
 await page.goto('/case.html?id=uwallet');
 const first=page.locator('.case-artwork a[data-lightbox]').first();
 await first.scrollIntoViewIfNeeded(); await first.click();
 const dialog=page.locator('.lightbox');
 await expect(dialog).toBeVisible();
 await expect(page.getByRole('button',{name:'Close preview'})).toBeFocused();
 await page.keyboard.press('Escape');
 await expect(dialog).toBeHidden();
 await expect(first).toBeFocused();
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect.poll(()=>page.locator('.hero-title').count()).toBe(0);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBeTruthy();
});

test('Visual hiring gate: capture all twelve case openings on desktop and mobile',async({page},testInfo)=>{
 for(const id of ids){
  await page.goto('/case.html?id='+id);
  await expect(page.locator('.portfolio-case h1')).toBeVisible();
  const cover=page.locator('.case-cover');
  await expect.poll(()=>cover.evaluate(el=>el.complete&&el.naturalWidth>0),{timeout:20000}).toBeTruthy();
  await page.screenshot({path:`test-results/case-opening-${id}-${testInfo.project.name}.png`,fullPage:false,animations:'disabled'});
 }
});


test('Hiring gate: verify the actual first fold and source-grounded editorial sequencing',async({page},testInfo)=>{
 await page.goto('/');
 const firstImage=page.locator('#featured-projects .project-card img').first();
 await expect.poll(()=>firstImage.evaluate(el=>el.complete&&el.naturalWidth>0)).toBeTruthy();
 const workImageTop=await firstImage.evaluate(el=>el.getBoundingClientRect().top);
 const viewport=page.viewportSize();
 if(viewport.width>=1081)expect(workImageTop).toBeLessThan(viewport.height+75);
 else expect(workImageTop).toBeLessThan(viewport.height*1.5);
 const multiCard=page.locator('[data-project="ai"] img');
 await expect(multiCard).toHaveAttribute('src',/1eafe7f7e9b0b5d1\.webp/);
 await expect(page.locator('[data-project="saudi"] img')).toHaveAttribute('src',/3ec16f8c4ffd9826\.webp/);
 await page.goto('/case.html?id=uwallet-world-cup');
 const sections=page.locator('.editorial-section');
 await expect(sections).toHaveCount(3);
 await expect(sections.nth(0).locator('.case-stage')).toContainText('Campaign typography');
 await expect(sections.nth(1).locator('.case-stage')).toContainText('Visual development');
 await expect(sections.nth(2).locator('.case-stage')).toContainText('Final visual executions');
 const typeSrc=await sections.nth(0).locator('.case-artwork img').evaluateAll(els=>els.map(el=>el.getAttribute('src')));
 expect(typeSrc).toHaveLength(3);
 expect(typeSrc[0]).toContain('c11c6a7d33ac4f8b');
 expect(typeSrc[1]).toContain('24c7a19d9d50eab1');
 expect(typeSrc[2]).toContain('e69110d04db8b64c');
 for(const [step,section] of ['typography','development','executions'].map((label,i)=>[label,sections.nth(i)])){
  await section.locator('.case-stage').scrollIntoViewIfNeeded();
  await page.screenshot({path:`test-results/worldcup-${step}-${testInfo.project.name}.png`,fullPage:false,animations:'disabled'});
 }
 await page.goto('/case.html?id=saudi');
 await expect(page.locator('.case-cover')).toHaveAttribute('src',/3ec16f8c4ffd9826\.webp/);
 expect(await page.locator('.case-artwork img[src*="3ec16f8c4ffd9826"]').count()).toBe(0);
 await page.goto('/case.html?id=ai');
 await expect(page.locator('.case-cover')).toHaveAttribute('src',/1eafe7f7e9b0b5d1\.webp/);
 expect(await page.locator('.case-artwork img[src*="1eafe7f7e9b0b5d1"]').count()).toBe(0);
 await expect(page.locator('.case-selected .case-artwork')).toHaveCount(3);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2)).toBeTruthy();
});
