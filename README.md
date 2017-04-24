# TTCWebSite
This is a new website, still under construction, and currently running at https://ttc-website.herokuapp.com for the Tsawwassen Tennis Club.  It is anticipated that the site will become operational on or before February 1st, 2016.
The existing site, http://www.tsawwassentennisclub.com/, is not responsive, but more importantly, does not provide facilities to manage the membership data.  The goals of the new site are the following:
<ol>
<li>To provide all of the content that the existing site does ('Home page', 'How to Find Us', 'Calendar', 'News', 'About Us', 'Contact Us', etc.</li>
<li>To be responsive.</li>
<li>Allow members to 'login'.</li>
<li>Allow members to search the membership contacts details (once logged in).</li>
<li>Allow the membership to modify their own contact details.</li>
<li>Allow the members to change their password.</li>
<li>Provide an application form for new members.</li>
<li>A means for existing members to renew their membership.</li>
<li>A means to distinguish executive members (who will be given an extra range of privileges).</li>
<li>A means for an executive member to send an eBlast.</li>
<li>A means for the membership to review recent eBlasts.</li>
<li>A new <b>TennisBC Export</b> function: this will allow a member of the executive to export the membership list to TennisBC (required once per year).</li>
<li>A new <b>Fee Accounting</b> function: When applying, will allow a member to specify other members within the same family; this feature will allow the site to auto-determine each family's yearly fees.</li>
<li>A new <b>Document Management</b> function: members of the executive will be able to add documents to a document repository (e.g. minutes of meetings, club bylaws, etc.).  The general membership will be able to view these documents.</li>
<li>A new <b>News Management</b> function: members of the executive will be able to add news items to the website (typically club successes in league play).  The general membership will be able to view these news items.  A news item consists of text and pictures.  They are to be displayed in the website in reverse chronological order.</li>
<li>An technical interface to FogBugz which will automatically record software failures (FogBugz is an issue tracking system).</li>
</ol>

<h4>Technologies</h4>
NodeJS, AngularJS, Bootstrap, MongoDB, Mongoose, Git, GitHub, Gulp, and several npm packages (jwt-simple, bcrypt, async, gridfs-stream, moment, and several others).

<h4>Application Notes</h4>
<ol>
<li>Full access to the site requires the user to register a password and identify themselves (first and last name, postal code, date of birth, etc.).  Once logged in, the member can then search the membership database, view historical eBlasts, renew their membership, etc.</li>
<li>eBlasts are sent out from the club's gmail address.  The server (NodeJS) queries Google's repository of eBlasts for the most recent and then displays them in reverse chronological order.  Once collected, the server caches the eBlasts for a time.  This cache is occassionally refreshed.</li>
</ol>
<h4>Application ToDo List</h4>
<ul>
<li>The Home Page is a work-in-progress.</li>
<li>Export to TennisBC</li>
<li>Not yet able to send eBlasts from within the site (currently requires access to the club gmail account).</li>
<li>eBlast attachments are not yet accessible.</li>
<li>User privilege levels have not yet been implemented.  Four are anticipated: 'member', 'executive', 'treasurer', and 'admin', although possibly more.</li>
</ul>
<h4>Technical ToDo List</h4>
(currently in progress)
<ul>
<li>The error-handling on the client side needs to be 'Angular-ized'.</li>
<li>A Test Plan is yet to be written.</li>
<li>Execution of the Test Plan has not yet been scheduled.</li>
</ul>

<h4>Database</h4>
MongoDB available via MongoLab.

<h4>Server</h4>
Currently running on a Heroku servelet.

<h4>Security</h4>
1.  Passwords are hashed (bcrypt) and stored to the database, along with the member's other details.
2.  SSL
3.  JWT is used to ensure the ongoing security of a login. The JWT is stored in a secure cookie client-side.



