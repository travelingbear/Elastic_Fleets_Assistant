# Elastic Fleets Assistant


What is?
-------

It's a javascript web application to help you create your Elastic Fleets with ease.

<br>

What is included in this repo?
-----------------------------

 - index.html - Just the presentation, where I put images, text and gifs, to better explain how Elastic Fleets work
 - wizard.js - Here is where most of the magic happens. There I created functions that will handle user inputs, json and script formatting and creation (based on user inputs)
 - FileSaver.js - This one helps allowing this web application provide a file download, so you can upload to your CloudFormation or use in the CLI
 - styles.css - Yeah, CSS. I know you can do amazing things with CSS, but don't expect much in this app. I am just trying to make it functional
 - jquery.serializejson.min.js - This plugin is AWESOME. Seriously. If it wasn't it, I would be just using powershell scripts instead of a webapplication (https://plugins.jquery.com/serializeJSON/)

<br>

How it works?
-------------

1. Copy the files to your local computer (or publish in a web server)
2. Open 'index.html'
3. Create your awesome Elastic Fleet

<br>

Wanna test?
----------

You can check here: https://dtqryi1d1tj5j.cloudfront.net/index.html

<br>

Limitations
-----------

 - As for now, it only generates CF templates for WINDOWS fleets.
 - Linux fleets were put aside for a moment, but I will come back to it soon.


![It ain't much, but it's honest work](https://dtqryi1d1tj5j.cloudfront.net/ItAintMuch.PNG)
