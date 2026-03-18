---
title: 'ARCST - an actual real size comparison tool'
description: 'Reverse Engineering Bad Dragons 3d viewer so i wont accidentally buy a dildo thats as large as my forearm'
pubDate: 'Mar 08 2026'
updateDate: 'Mar 08 2026'
heroImage: '../../assets/arcstThumbnail.png'
---

### Reverse Engineering Bad Dragons 3d viewer so i wont accidentally buy a dildo thats as large as my forearm

As someone who likes bottoming and thinks human-shaped dildos are kinda boring, I've always been a fan of bad dragon. Thing is, their sizing is kinda inconsitent. Medium Habu is actually pretty big, medium Vector is pretty long but not that wide, medium Ky'el is about as big as a large orochi, chance recently got a remodel and basically moved everything one size up - you get the point. Thats why bad dragon has their size comparison tool where you can scale a credit card to be right size and can then view dildos in their actual size. That's pretty solid but it only works in 2d and personally, this didn't let me grasp the toys sizes well enough. 
Apple has this cool thing called ARKit which makes it really easy to show 3d models in the real world. As soon as you throw a .usdz at it, it'll show it to you in the real world, anchor it to the environment and it'll even handle occlusion/lighting. That would be really really cool since i could just plop new toys down next to ones I own to check if i can handle them or not. The goal is clear: we need to get the 3d models from bad dragon, find out how tall they are and then view them in AR. 

### Getting the models

Bad dragon uses a 3d viewer on their website - that means that somewhere, somehow these things are loaded and that also means, I can get them. I looked at the site in dev tools to understand the API a bit and 
to be continued.. (sry its 3am and ill actually need to look into my project to remember how it works lol)