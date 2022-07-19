# Family Share

# Description
Family Share is an app where users can create a "Family" account to store share photos with their family.  Users can invite other users to upload new photos to the account.

# Tech Stack
Here's a brief high-level overview of the different technologies used to created Family Share
* This project used React.  React is a JavaScript library for building user interfaces.
* For styling and components it is built TailwindCss.
* For form validation it uses the package react-hook-form which makes applying validation logic to forms a breeze.
* For accessing data, authentication and file upload Supabase was used.
* For data storage PostgreSQL was used as a SQL database inside the Supabase project for storing data like albums, photos, profiles, comments, etc.

# Features
Here's a high-level overview of all the features in the application
* User Authentication
* Viewing all albums associated with Family account [Requires Authentication]
* Viewing all photos associated with a specific Album [Requires Authentication]
* Viewing a Photo along with it's details [Requires Authentication]
  * Comment on a Photo [Requires Authentication]
  * Edit photo details [Requires Authentication]
  * Favorite the photo [Requires Authentication]
* Create a new Album [Requires Authentication]
* Upload a photo to a specific Album [Requires Authentication]
* View all of your favorited Photos [Requires Authentication]
* Create a new post [Requires Authentication]
* Invite another user to the Family account [Requires Authentication and Admin Permission]
* Update other user's that belong to the same account Admin status [Requires Authentication and Admin Permission]

Here's a list features that are not implemented but are a work in progress
* Viewing a user's profile - which lists out the number of Photos uploaded created and number of comments made
* Support for a nested comment system
* Mobile version of the app
