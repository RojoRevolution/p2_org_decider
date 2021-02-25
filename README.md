# Yay or Nay

![picture](public/images/yayornayhomepage.png)

## Links

![GitHub Link](https://github.com/RojoRevolution/p2_org_decider)

![Deployed App on Heroku](https://p002-yay-or-nay.herokuapp.com/)


## Project Description

This was a group project for a Full-Stack Web Development Bootcamp offered through UT Austin. The goal of the project was to create a dashboard that users from the same organization could log into, create categories, add suggestions, then put suggestions up to a vote. 

As an example, lets say a company has a team lunch every Friday, you could create a category for "Friday Team Lunch" where all users could submit suggestions. Next Friday comes along, and user can then choose from submitted suggestions and put them up to a vote. The voting timeframe has settings until voting closes, at the end of the voting period the item with the most votes wins.

The main goal of this project was first and foremost to create a Full-stack web application, but most importantly, to become more familiar working with data from a DB. We also wanted to take advantage and get more experience with User Authentication, and grouping users by an organization. Using Sequelize and relational tables, we were successfully able to display only relevant information to users who share an Organization, and successfully able to display only relevant suggestions within their respective category.

The Scope of this project ended up being much larger than we had anticipated, and were unfortunately at unable to finish the voting functionality, but did gain valuable experience working with relational tables and using the CRUD methodology within a DB.

## Technologies Used

* bcryptjs
* dotenv
* ejs
* express
* express-session
* mysql2
* passport
* passport-local
* sequelize
* heroku

## Contributors

* ![David Rojo](https://github.com/RojoRevolution)
* ![Trevor Smith](https://github.com/trevorsmithbanjo)
* ![Stephen Price](https://github.com/stephenlprice)
* ![Richard Gabaree](https://github.com/richardgabaree)


## License

MIT

Copyright (c) 2021

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
