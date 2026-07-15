# Sunset Calculator

A web app that tells you when the sun sets at any location and counts down to it in real time.

# Screenshot

![Full screenshot of the site](/Screenshot.png)

# Why

I wanted to build something actually useful learning Javascript. Sunset time felt like a good project because the math behind is really cool.

# How it went

I started with just the basic calculation and everything was fed manully. Once that was working, I started swapping every manual input wiat a automatic calculations oen by one.

At frist you had  to calculate the day of year yourself and type it in. I automated that so the script figures it out on its own. Timezone was the next headache. I was originally using UTC, and to convert to local time I tried assuming the time zone using the longitude, but that wasn't accurate enough. After some research I found the 'tzlookup' library which  figures out the timezone from coordinates directly, and that solved it.

Then i added GPS. Tap "use GPS" and it fills in your coordinates automaticlly using the browser's geolocation API. After than i added  the live countdown, so instade of just showing a static sunset time it ticks down in real time. Finally i Styled everything and fixed the layout for mobile because it looked broken on smaller screens.

That's basically it.

# What it dose

You type  in your latitude and longitude (or hit "Use GPS"), tap calculate and it will show you the sunset time for today at that location and counts down to it live.

# Challenges

My first version used JS's 'alert()' to show results, whice felt terrible to use, so i added a '<p>' tag to the HTML and displayed and result there instead. I also made a lot of silly mistakes along the way, like typing 'scr' instead of 'src' in the script tag, or writing  'Data' instead of 'Date'. These small things way to0 long to spot. the Timezones assumption was not a good idea as metioned before and i had to use a library. On top of that, a lot of my GitHub Actions were failing or timing out during deployment. I amm still not sure it was a problem on my side or GitHub's, But it sorted itself out after a day or so.

# Built With

- HTML
- CSS
- JavaScript
- tzlookup
