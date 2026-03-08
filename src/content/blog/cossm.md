---
title: 'COSSM - Cheap Open Source Sex Machine'
description: 'If you have an old Hoverboard and Ender 3, its probably under 100 bucks'
pubDate: 'Mar 08 2026'
updateDate: 'Mar 09 2026'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

### If you have an old Hoverboard and Ender 3, its probably under 100 bucks

A few years ago, I was pretty desperate - long story short, I wanted to buy a fuck machine but those things are either really really expensive or not that powerful. Also, I like building things. I still had an old Ender 3 lying around and got a cheap hoverboard from Ebay because people have built custom firmwares for these things and I wanted to try building something with one as well - turns out, for the price, hoverboard hardware is really really good. You essentially get two 400w BLDC motors with mediocre relative position tracking and all of the hardware needed to control them for under 50 bucks if you get one used. Two small caveats here are that the firmware works best with one specific stm32 board and theyre sold so cheap because people aren't using them at all, so the battery's most likely toast or close to it.

So as it turns out, most piston style fuck machines are kinda weak and also have pretty conservative stroke length. In comparison to that, hoverboard BLDCs are strong enough to push half a human, meaning leverage isn't really an issue, so the only limiting factor (other than biology) is the length of whatever i can attach to the motor.
There were a few hurdles: turns out my hoverboard did indeed not use that specific board – initially tried to work around that but I got too annoyed and just bought the correct one. Also, my battery was indeed toast, so I had to buy a new one. I still have no idea if the one I bought from AliExpress for like $30 will go up in flames at some point but I'm a few charge/discharge cycles in and so far everything seems to be fine.

I'm now at the end of what I'd call a solid v0.1 giving me a fuck machine that's portable (make of that what you will, it's really large and weighs a ton, but it doesn't need to be plugged in to run), has an adjustable stroke length up to 20+cm and could probably kill someone since the motor can spin up to around 600 rpm with heavy toys and at max stroke length. I didn't have the balls to use it at over 240 rpm, but the motor does seem to have enough torque to push you right into the ICU.

## Design/etc.

I'll open source the full f3d design soon, as well as everything else

### Hardware

My goal was to only use extrusions from the Ender 3 I had lying around as well as little types of screws as possible. Thus, this thing's basically a rebuild 1/2 of an Ender with a ton of mostly M5x12 Socket head screws and a few extra bits.
The piston mechanism essentially reuses the z-axis
To be continued...

### Software

Luckily, the difficult part was already taken care of. Thanks to [these absolute legends](https://github.com/EFeru/hoverboard-firmware-hack-FOC), I just had to write a few lines of config and had a fully remote controllable hoverboard. I wanted the ability to control the thing via bluetooth, so I've configured the hoverboard to be controlled via serial and am using an esp32 running off the hoverboards 12v rail with a step-down to send/receive commands via BLE.
To control it, im using a swiftUI app thats based on [this](https://github.com/ArtsemiR/Swift-ESP32-BLE-Remote-Control-Demo) example. Basically, were just spamming the speed via BLE which gets sent to the hoverboard. Since the esp32 just relays commands and the hoverboard expects to recieve commands at a high frequency, that means that, if the app crashes, the machine will stop, which is kinda nice.
Also to be continued...