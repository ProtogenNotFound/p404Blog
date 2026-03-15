---
title: 'releaseToAlt - a small, vibe-coded github anonymizer'
description: 'Because I really dont want to switch accounts every time I work on kinky stuff'
pubDate: 'Mar 10 2026'
updateDate: 'Mar 10 2026'
heroImage: '../../assets/releaseToAltThumbnail.png'
---

### Switching accounts is annoying

When I started working on the COSSM app, I didn't really think about the fact that I'd want to publish it at some point. When I did in fact want to publish it, I now had to make a choice: either I lose all of my git history, or have my main account be in the git history of an app used to control a Fuck Machine. I'm not yet rich enough to not give a shit, so I chose the third option: just lie in my git history. Originally I just had Warp rewrite the whole thing, but ideally, I didn't wanna have to do that every time I commit new stuff, so I had Warp just write a small python script that pulls the repo from my main, anonymizes it and pushes it to my alt. I want to publish more stuff here and I don't want to have a script for every repo, so I figured it might be useful to just (have Antigravity) write a small command-line tool that's a bit more universal.

releaseToAlt now features a nice TUI that allows you to select your main and alt, select the right repo from a list, go through all mails/names used in commits to black/white-list them and will then push it to your alt. It also saves your main/alt and allows you to save configs so you can batch rerelease etc.
Feel free to check it out on my [Github](https://github.com/ProtogenNotFound/ReleaseToAlt). (you might know that already - I did not - turns out your github commit graph thingy can in fact be retroactively overwritten so you can just write whatever to a git history and force push that to draw pixelart using your green squares lol)
