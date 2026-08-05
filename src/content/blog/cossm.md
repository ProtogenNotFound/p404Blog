---
title: 'COSSM - Cheap Open Source Sex Machine'
description: 'If you have an old Hoverboard and Ender 3, its probably under 100 bucks'
pubDate: 'Mar 08 2026'
updateDate: 'Aug 06 2026'
heroImage: '../../assets/cossmThumbnail.png'
---

### If you have an old Hoverboard and Ender 3, its probably under 100 bucks

A few years ago, I was pretty desperate – long story short, I wanted to buy a fuck machine, but those things are either really, really expensive or not that powerful. Also, I like building things. I still had an old Ender 3 lying around and got a cheap hoverboard from Ebay because people have built custom firmwares for these things and I wanted to try building something with one as well - turns out, for the price, hoverboard hardware is really, really good. You essentially get two 400w BLDC motors with mediocre relative position tracking and all of the hardware needed to control them for under 50 bucks if you get one used. Two small caveats here are that the firmware works best with one specific stm32 board and theyre sold so cheap because people aren't using them at all, so the battery's most likely toast or close to it.

So as it turns out, most piston style fuck machines are kinda weak and also have pretty conservative stroke length. In comparison to that, hoverboard BLDCs are strong enough to push half a human, meaning leverage isn't really an issue, so the only limiting factor (other than biology) is the length of whatever i can attach to the motor.
There were a few hurdles: turns out my hoverboard did indeed not use that specific board – initially tried to work around that but I got too annoyed and just bought the correct one. Also, my battery was indeed toast, so I had to buy a new one. I still have no idea if the one I bought from AliExpress for like $30 will go up in flames at some point but I'm a few charge/discharge cycles in and so far everything seems to be fine.

I'm now at the end of what I'd call a solid v0.1 giving me a fuck machine that's portable (make of that what you will, it's really large and weighs a ton, but it doesn't need to be plugged in to run), has an adjustable stroke length up to 20+cm and could probably kill someone since the motor can spin up to around 600 rpm with heavy toys and at max stroke length. I didn't have the balls to use it at over 240 rpm, but the motor does seem to have enough torque to push you right into the ICU.

## Design/etc.

I've designed the whole thing from scratch in fusion360 – it's grown sorta organically, so there's some weirdness with the subassemblies that should probably be fixed for v0.2. I also had to sand some parts for everything to fit together as intended which should probably be fixed at some point. I also tried to use as few different fasteners as possible to keep component prices down. This was somewhat successful since with a few exceptions, the only screw used is a socket head m5x12 with either t-nuts for the extrusions or locking nuts (for the most part, the screws just screw directly into the plastic - this is probably slightly weaker than the nuts but still really strong).

### Hardware

My goal was to only use extrusions from the Ender 3 I had lying around as well as little types of screws as possible. Thus, this thing's basically a rebuild 1/2 of an Ender with a ton of mostly M5x12 Socket head screws and a few extra bits.
The piston mechanism essentially reuses the z-axis but in reverse (axis slides, carriage is fixed). There are lots of mechanisms in there that I'm at least sorta proud of and some I've scrapped because I couldn't get them to work (height adjustment originally used a mechanism kinda like an aperture where youd twist the bottom to lock/unlock it, but honestly having a button was just more practical).
Electronics setup is pretty straightforward, we're using the hoverboards own mainboard and battery. Remote control is handled by an esp32 that's running off of the mainboards power with a step-down, receives commands via BLE and relays them to the mainboard via serial.
There's also an option for a small wired remote, which is just an analog potentiometer wired to the hoverboard. I've included mounting points for zip-ties for strain-relief. If you want to go extra-fancy, the mounting points also work well when the cables are sleeved.

### Software

Luckily, the difficult part was already taken care of. Thanks to [these absolute legends](https://github.com/EFeru/hoverboard-firmware-hack-FOC), I just had to write a few lines of config and had a fully remote controllable hoverboard. I wanted the ability to control the thing via bluetooth, so I've configured the hoverboard to be controlled via serial to receive commands from the aforementioned esp32.
To control it, I’m using a swiftUI app based on [this](https://github.com/ArtsemiR/Swift-ESP32-BLE-Remote-Control-Demo) example. Basically, were just spamming the speed value via BLE which gets sent to the hoverboard. Since the esp32 just relays commands and the hoverboard expects to receive commands at a high frequency, that means that, if the app crashes, the machine will stop, which is kinda nice.
The app also shows the battery percentage and allows the setting of a top speed (because, realistically, 600something rpm is probably too much for most people and setting the top speed to something more realistic allows finer speed adjustments).

### Toy-mounting

Gotta be honest, this is the shittiest part of the whole thing. Currently, I'm using an acrylic disk for suction cups and just have some hooks on its side to tie toys down. That does work but mounting toys takes a while and is all around kinda ass. 

## Future Plans

To be completely transparent, I've recently built an OSSM (you'll never guess what COSSM's name's based on) which weighs a fraction of this thing, is mostly portable and isn't piston-based, so stroke length and shape can be adjusted on the fly. Also, someone designed a parametric tpu toy-mounting system which is really, really nice. If licensing allows it, I'll probably steal that one, so it works with COSSM. Other than that, there are, of course, a lot of design updates: other than the m5x12, there are two longer screws to mount the motor and one even longer one for the piston. Ideally, I'd either use three identical long screws here, or change the motor mount to also use the m5x12 ones. Of course, I'll also need to add in some tolerances so parts won't need to be sanded down. Assembly was pretty violent for me since I've left tolerances for interfacing with the extrusions tight on purpose. I've kinda underestimated how strong the prints and t-nuts will be, so I went a bit overboard with structural stuff. I'm pretty happy with my OSSM right now so all of this might take a while but feel free to give [this repo](https://github.com/ProtogenNotFound/COSSM) a star or something so I can gauge how many of you are interested in me continuing to build this thing :3