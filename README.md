# Web-sovelluskehitys 2 TX00DZ38-3003


# Book Club Project

Course project for Web-sovelluskehitys 2 TX00DZ38-3003 at Metropolia UAS.

## Setup

Prerequisites:

- [Node](https://nodejs.org/en/)
- (database: [Postgres](https://www.postgresql.org/))

```bash
npm nodemon
npm run start
# For development 
```


## Usage
The file in scripts db.sql must be added to Postgresql database and superuser/credentials must be also created for the schemas and db.


### Routing

The API is structured as follows:

/api/'[subroot]'/subroutine

subroot can either be 'users', 'reviews' or 'books'

[API Documentation](https://documenter.getpostman.com/view/23898922/2s847HQtLf)
