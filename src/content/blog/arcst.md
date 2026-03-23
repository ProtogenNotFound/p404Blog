---
title: 'ARCST - an actual real size comparison tool'
description: 'Reverse Engineering Bad Dragons 3d viewer so i wont accidentally buy a dildo thats as large as my forearm'
pubDate: 'Mar 08 2026'
updateDate: 'Mar 24 2026'
heroImage: '../../assets/arcstThumbnail.png'
---

### Reverse Engineering Bad Dragons 3d viewer so i wont accidentally buy a dildo thats as large as my forearm

As someone who likes bottoming and thinks human-shaped dildos are kinda boring, I've always been a fan of bad dragon. Thing is, their sizing is kinda inconsitent. Medium Habu is actually pretty big, medium Vector is pretty long but not that wide, medium Ky'el is about as big as a large orochi, chance recently got a remodel and basically moved everything one size up - you get the point. Thats why bad dragon has their size comparison tool where you can scale a credit card to be right size and can then view dildos in their actual size. That's pretty solid but it only works in 2d and personally, this didn't let me grasp the toys sizes well enough. 
Apple has this cool thing called ARKit which makes it really easy to show 3d models in the real world. As soon as you throw a .usdz at it, it'll show it to you in the real world, anchor it to the environment and it'll even handle occlusion/lighting. That would be really really cool since i could just plop new toys down next to ones I own to check if i can handle them or not. The goal is clear: we need to get the 3d models from bad dragon, find out how tall they are and then view them in AR. 

## Getting the models

Since bad dragon has a 3d viewer on their site, these things have to be loaded somewhere. I went through the API and found out that `/api/products` returns all products and their info. Filtering for `type == "insertable"` gives us all the dildos. Each one has a sku which we can get all the infos we need under `/api/products/{sku}`. Theres a bunch of interesting stuff in here, but since we're looking for a 3d model, the most interesting field is `previewObjModel` which has a url that points to an obj file.
Now thats already pretty cool, but theres one glaring issue - it kinda looks like ass. The reason for that is BDs ancient 3d viewer. TLDR, it seems like this things built to run on casio wristwatches. As a part of that, our models have like five polygons and we're using a normal map for a bunch of extra details. Good news is, we can also just download the normalMap. 
Huge issue here which I'll rant about later - the normalMap is in World Space, not Tangent Space which is what Apple wants and theres no easy way to convert that. There are people on the internet who can explain this way better than I ever could but the gist is that a normalMap is used to create the illusion of texture on a low poly model by telling incoming light how to bounce off the model based on the color of the pixel. In world space, the color of the pixel tells the light how to bounce off the model by the way its positioned in the world but in tangent space, the color of the pixel tells the light how to bounce off the model in relation to the direction the polygon is facing. If your normalMap kinda looks like a rainbow, it's probably in world space. (I'd also like to take this opportunity to give my sincere thanks to the absolute chads at nyoon that just load a usdz file into their viewer. Litterally just download that and open it and Bam, 3d model of a dildo right there. - model's 2m tall per default but still)
Sorry for the tangent - TLDR, we now have a model that looks bad, we can add some amount of detail to it but without fixing the normalMap, stuff does look kinda weird. 

### Great, we've got the model, but how do we show it in App?

Kind of an issue here - we've got an obj and a normalMap. Apple's native ARKit only supports usdz files. There is a converter tool on Mac but that'd mean, we'd have to convert every model manually. This is not only tedious and annoying, but I also don't know if BD likes me redistributing low-poly versions of their dildos over Github. So we need to do this programmatically. 
**This was a HUUUUGE pain in the ass.** (heh)
There are multiple reasons for this. 
- The native QuickLook preview (which we really really wanna use, because it's very fancy) does not support obj files. 
- We need to apply the normalMap somehow (and ideally have a way to modify the model, e.g. scale it) and the only way to do that is to load the model into memory and convert it to a usdz file ourselves. 
- RealityKit also doesn't like objs
I needed a workaround for this - SceneKit. It's old, it's complicated, i dont't like it, but for some godforsaken reason, it's the only way to actually build a usdz with a normalMap, so now, we're downloading the obj, loading it into SceneKit, applying the normalMap, exporting it as a usdz and then loading that into RealityKit. I hate it but at the time of building this, it seems to be the only way to do it. 
There's a bunch of extra stuff afterwards which I might write about later (I tried to reverse engineer BDs viewer and reconstruct the whole thing as a RealityKit material - huge, complicated graph that's somewhat working), but we just have to move the model so it's not stuck in the floor and save it to a reality file and now we finally have something we can throw into the QuickLook preview. One slight issue - **it's the wrong size**

### BD has an actual size comparison tool - can we use that?

Yup, we can. Back to the API. Luckily, BDs tool litterally just scales 2d images of the different models and a credit card next to it. `/api/products/{sku}` has a `scaleImages` field which is a list of images of the toy at different scales. There seems to be no further scaling logic, so we can assume that we can just get the height of those images and calculate the scale factor from there (either by using the credit card, which has a standardized size, or using any toy's image in relation to it's total size). Turns out, the toys size in inches is `pixels/104` inches tall and so converting that from "freedom" units into freedom units, multiply that by 25.4 to get the size in mm which we can use in RealityKit to scale our models.

### Great, we've got the model in the right size, but it still looks like ass

to be continued...


