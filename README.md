# Railway timeline

Showing your deployments as an interactive timeline.

## About

TODO

## Limitations

- resizing the timeline element doesn't update its state (e.g. as min zoom the viewport can go out of bounds when increasing the width of the timeline element)
- the timeline ruler doesn't always work perfectly (e.g. months splits doesn't always match the number of days)
- the code could be cleaner, more decoupled and better factorized in some places

## Future ideas

- [ ] state in the url (so when you refresh you're still at the same spot in the timeline, for the same env, with the same options etc)
- [ ] better a11y for the `Timeline` component (better html semantic, aria labels, etc)
- [ ] hover on a deployment to show more info in a floating window (author, dates, duration, status, etc)
- [ ] show logs and a lot more in a modal when clicking on a deployment
- [ ] a minimap for the whole timeline
- [ ] a scroll bar
- [ ] filters
- [ ] a calendar to select a date and jump to it
- [ ] `TimelineRef.jumpTo(date)` method
- [ ] `TimelineRef.scroll()` and `TimelineRef.zoom()` interpolation for smooth programmatic scroll and/or zooming
- [ ] a lot more unit and integration tests
