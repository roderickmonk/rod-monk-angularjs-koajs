# TTCWebSite
The site is running at https://www.tsawwassentennis.club for the Tsawwassen Tennis Club.  The site became operational on February 1st, 2016, just in time for registration for the 2016 season.
<br>
The goals of the site are the following:
<ol>
<li>To provide all of the content that the previous site did ('Home page', 'How to Find Us', 'Calendar', 'News', 'About Us', 'Contact Us', etc.</li>
<li>To be responsive.</li>
<li>Allow members to 'Login'.</li>
<li>Allow members to search the membership contacts details (once logged in).</li>
<li>Allow the membership to modify their own contact details.</li>
<li>Allow the members to change their password.</li>
<li>Provide an application form for new members.</li>
<li>A means for existing members to renew their membership.</li>
<li>A means to distinguish executive members (who will be given an extra range of privileges).</li>
<li>A new <b>TennisBC Export</b> function: this allows a member of the executive to export the membership list to TennisBC (required once per year).</li>
<li>A new <b>Fee Accounting</b> function: When applying, will allow a member to specify other members within the same family; this feature will allow the site to auto-determine each family's yearly fees.</li>
<li>A new <b>Document Management</b> function: members of the executive will be able to add documents to a document repository (e.g. minutes of meetings, club bylaws, etc.).  The general membership will be able to view these documents.</li>
<li>A new <b>News Management</b> function: members of the executive will be able to add news items to the website (typically club successes in league play).  The general membership will be able to view these news items.  A news item consists of text and pictures.  They are to be displayed in the website in reverse chronological order.</li>
<li>An technical interface to FogBugz which will automatically record software failures (FogBugz is an issue tracking system).</li>
</ol>

## Technologies
NodeJS 7.8+, KoaJS, AngularJS, Bootstrap, MongoDB, Mongoose, Git, GitHub, Gulp, and several npm packages (jwt-simple, bcrypt, async, gridfs-stream, moment, etc.).

## Application Notes
<ol>
<li>Full access to the site requires the user to register a password and identify themselves (first and last name, postal code, date of birth, etc.).  Once logged in, the member can then search the membership database, view historical eBlasts, renew their membership, etc.</li>
</ol>

## Application ToDo List
<ul>
<li>Export to TennisBC</li>
</ul>

## Database
MongoDB available via MongoLab.

## Server
Currently running on a Heroku servelet.

## Security
1.  Passwords are hashed (bcrypt) and stored to the database, along with the member's other details.
2.  SSL
3.  JWT is used to ensure the ongoing security of a login. The JWT is stored in a secure cookie client-side.
