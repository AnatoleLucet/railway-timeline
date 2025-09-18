# Railway timeline

Showing your deployments as an interactive timeline.

## About

The base idea was to have a sleek interface to navigate across projects' deployments, and see at a glance periods with more/less activity, explore how build/deploy times have evolved with time, and much more.

I wanted the user experience so be as smooth and enjoyable as possible. If done well the timeline idea felt like it could really be something that's fun and entertaining to use. The kind of UI you just end up interacting with for no particular reason, just because it feels nice.
Following this idea, I wasn't able to find any library or online example of a timeline that had a smooth enough UX to produce a "wow" effect for me. That's how I ended up building my own timeline from scratch with time scaling enabling seamless scrolling from milliseconds to centuries, culling to only render the elements currently visible on screen, level-of-details to show different ruler time scales depending on the zoom level, and various other things to make it like I envisioned.
I ended up spending most of my time on the base timeline UI (1.5 out of 2 days) to make sure the code was readable and not a huge mess even I wouldn't comprehend after a week's past... Making this project mostly about frontend (even though I considered adding a backend for reason I'll get into later in this text).

Once I was done with the UI, I started checking into how I could use Railway's public GraphQL API to make everything work (had only checked briefly if most of the resources needed where reachable through the public API).
That's when I encountered my first (tiny) issue, CORS! Railway's public API doesn't seem to have an option to configure which hosts are allowed for a specific ApiKey, so it always returns an `Allow-Origin` set to `railway.com`.
As I was only building an SPA for simplicity sakes, it made the ReactJS frontend enable to call the Railway API without CORS policy issues. That's when I realized I had to build a backend (which wasn't planned). At first I just hacked my way through it with a CORS-Anywhere proxy, but I was sure there was something better to do without too much added complexity. Thought about building a very simple Golang Echo serve because Golang has some great codegen tools to work with GraphQL (and it's always a blast to write some go code), but in the end I ended up migrating my SPA to TanStack Start (which I wanted to try out for a long time) and took advantage of their RPC-like Server Functions which made it very very easy to call the Railway API on the backend and getting the data back to the frontend.

Another limitation was realizing I couldn't subscribe for new deployments via the Public API. After a tiny-bit of reverse engineering on the Railway Dashboard, it looked like the GraphQL subscriptions needed to watch for new deployments are only accessible through the internal API.
I started to dig into how I could use the internal API on my project anyway, but as I was a bit short on time I decided to ditch the live-reload part of the app and stick to the core idea.

And that's of we got here!
In the end I'm quite happy with how this project turned out (https://railway.com/design helped a **lot** for the UI), I think it could be cleaner in lots of ways, but for the short time period in which it was build I think it's nice!

For the practical use it stays very basic. It also looks way nicer on projects with longer build times and daily/weekly deployments. I have lots of [ideas](#improvements) on how this project could be enhanced, but that's for future me (maybe), because I quite liked the time I spent building this!

## Limitations

- resizing the timeline element doesn't update its state (e.g. increasing the width of the timeline element doesn't update the culling, or it can even go out of bounds)
- the timeline ruler doesn't always work perfectly (e.g. months splits doesn't always match the number of days)
- the code could be cleaner, more tested, more decoupled and better factorized

## Improvements

- [ ] load only visible deployments and lazy load more as the user scrolls or zoom out
- [ ] show live deployments and auto expand the timeline during the execution (was part of the original scope but doesn't seem to be possible with the public api, and no time to reverse-eng the internal api)
- [x] state in the url (so when you refresh you're still at the same spot in the timeline, for the same env, with the same options etc)
- [ ] better a11y for the `Timeline` component (better html semantic, aria labels, etc)
- [ ] hover on a deployment to show more info in a floating window (author, dates, duration, status, etc)
- [ ] show logs and a lot more in a modal when clicking on a deployment
- [ ] a minimap for the whole timeline
- [ ] a scroll bar
- [ ] better responsive design
- [ ] filters
- [ ] a calendar to select a date and jump to it
- [x] `TimelineRef.jumpTo(date)` method
- [ ] `TimelineRef.scroll()` and `TimelineRef.zoom()` interpolation for smooth programmatic scroll and/or zooming
- [ ] a lot more unit and integration tests
- [ ] e2e encryption of the api-key (by exposing a cacert of the nodejs server's private key for client side encryption on the frontend)
- [ ] extend this timeline to be a complete representation of a project's lifespan (showing services creations/deletions, when serviecs are put to sleep and woken up, when replicas are created and removed, etc etc). it would be an amazing tool to explore recurring trends and general project evolution
