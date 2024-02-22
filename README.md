# Timeline Journal

A personalized, visual life timeline

Project is currently hosted at: https://journal-timeline.web.app/

This is a personal project I created to build an easy-to-maintain timeline of life events. My goals for this project are as follows:

- Allow the user to track happenings in their life, both complete and ongoing, and save these entries in a simple spreadsheet
- Define entries with flexible timeframes, as specific as a date or as broad as a month or year. All entries are defined with one timeframe, a range between two timeframes, or as a single timeframe, marked as ongoing. For example, you could enter a party that took place on 2/3/2010, a school you attended from September 2015 to May 2018, or a job you have been working at since 2/2/2022.
- Display all entries that happened over a select timeframe, organized into lists of complete entries, ongoing entries, and anniversaries. Entries should be visualized, and include any information that might be interesting or relevant, such as the amount of days/months/years an entry has taken, or how long it has been going on for, if it is unfinished.
- Use my CSS/HTML skills to create a pleasing and intuitive interface with these goals in mind, and create a system wherein the user can save and maintain their file without involving a database

With these goals in mind, I have created this page (a work in progress), and I hope this can be of interest to others as much as this project has interested me.

# To anybody here on Github

Hello! If I have shared this with you, please note that this project was made and maintained entirely by me, Matthew Schoen, for myself and friends. I was not initially planning on showing the code for this to people, but I have decided to put it up on Github as an example of my work and passion. Everything I have made here has been created from scratch (save for some colors, initial button styles, and libraries I got online), and I would be happy to share specific implementation details to those who are interested. Please do not modify or share this code without my consent, and let me know if you have any feedback or ideas for me!

# Features

## Calendars

The star of the app is my calendar interface, created completely from scratch using CSS, HTML, and a little TS here and there for interactive events. I wanted to display an entire year at once, so to avoid clutter, I went with a simplified month representation with simple squares for each day. The calendar months themselves are created using white squares on a black background in a CSS grid, and the sizing of the squares uses EM units, which scale with the font size. This allows the calendars to grow and shrink easily with the browser's font, and when you mouse over a calendar, it embiggens to show selectable dates (with visible labels). Individual dates and month names can be selected on these calendars, and they can display date ranges with colored highlighting. Additionally, individual dates can be popped out on the shrunken version of the calendars to display a selection without the full calendar open.

## Creating Entries

By clicking "New Entry" (in the top right as of the creation of this readme), the user can create a new entry from scratch or from a template. Entries need a name and a timeframe, and can additionally have a defined Category/Location/Notes (any text), as well as can be designated an Anniversary if you want it to show up every year in the main view. The timeframe for the entry can either be a Complete Entry (a single date/month/year, or two for a range), or an Ongoing Entry (one date/month/year) for something that hasn't ended yet (such as where you are currently living or working). Entries are edited from the same page.

## Main Timeline View

On the main timeline view (starting page), you can select a timeframe on the calendar to see all entries relevant to that selection. Entries will be split into 3 lists:

- Started/Ended, for all entries whose start and/or end date fall within the selection
- Ongoing, for entries that started before your selection and either ended after or are still ongoing
- Anniversaries/Birthdays, for entries that started 1+ years prior to your selection
  For Started/Ended entries, they will be labeled "Started" or "Ended" if only one of their dates is within the selection, and for Anniversaries, the amount of years it has been will be shown. For example, if I select May 2023, the lists include: "Closed on [new apartment]", "Ended: Living at [former apartment]", "Started: Living at [new apartment]", "Working at [job]", and "2 Years: [Nephew]'s Birthday". Per my personal goals, this is a quick way for me to visualize what was happening at any given time in my life. Additionally, there are Text, Category, and Location filters that can be applied to find certain entries, and clicking an entry pops a modal with its details.

## Data Storage

Timelines can be saved and loaded from CSV files, per my goal to keep the data relatively easy for users to hold onto. There are no databases involved in this project, but all data is stored in and loaded from Browser Local Storage automatically, preventing you from having to save your data on every edit, as long as you use the same computer/browser every time you run the app.

- Clicking Save Timeline (which glows yellow when you have unsaved changes) allows you to export your timeline as a CSV file. You can also save a partial timeline, where you can select only specific entries to save. This is useful for sharing a curated timeline, such as giving a timeline of family birthdays to a family member who may want to use the app.
- Clicking Load Timeline (which glows orange when you have no data yet) allows you to import your timeline from a file. You can choose to either clear the current timeline and replace it with file data (with appropriate warnings when you haven't saved), or add all entries from an existing timeline to your current one. If you choose the latter, it will automatically combine identical events to prevent duplicates, and can roughly detect when events are similar enough to be modified versions of one-another, presenting you with a comparison view to choose which data to keep.

## Help Pages

The Help button brings you to a series of instructional pages, including an About section, rundowns for each page, planned future improvements, and a Changelog of everything I've added/changed/fixed over time. The Changelog is religiously updated, whereas the rest of the pages may need some updates as I have been changing things over time.

## Thoughts

The main drawbacks for this project, at the time of writing this, are its lack of responsiveness and accessibility, both of which I may wish to address at some point. The app is currently designed for medium-to-large monitors, and with the lack of media queries and its reliance on a lot of mouseover events, it is not well-suited for mobile use. Additionally the calendars are (presumably) an accessibility nightmare, since having 365 tiny boxes for calendar selection are probably not ideal for screen readers and keyboard navigation. When I first designed this project, I did so as a C# Windows application, and the calendar selection was done with combo boxes for years/months/days. I may eventually bring something like this to the app as an "accessibility mode" that is friendlier for keyboards and mobile, but I fell in love with the calendars I created, and I wanted to build my app around them.

An additional drawback is the lack of database support. As a Frontend-loving developer, I did not want to bother with an actual database, especially if it would involve storing sensitive life details of my app's users. As it stands, this app works great if you use it on one computer, in the same browser, but if you want to use it on multiple computers, you will have to pass around timeline CSV files, which is obviously not ideal. Still, I think using Browser Local Storage was a good (if risky/experimental) call here, as most timelines won't get close to the storage cap, stored as CSVs.

If you are reading this and have any feedback or ideas, please send them my way!
