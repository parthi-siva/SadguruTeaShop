# ReactJS + Flask (REST API) + Sqlite3

 This webapp helps track the different items "Sadguru's Amrit-Tulya - Tea Shop" have for sale.

### Features

This application has a form component which has name, price, quantity, description and option to upload photo to add new item to the inventory

I have used context API to share the states between the components

Once submitted it calls the backend Python Flask API to add the item to the sqlite3 database.

The added Item appers on the side of the form along with image as thumbnail

It has option to delete the item.

Also which when clicked on the item name it takes to the new page showing product with image and description

The Flask application uses SQLAlchemy to retrieve the content of the sqlite3 databases (I have used token based authentication for the APIs). ReactJS call the REST API and display it !

### Run the app

In one terminal

```
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
gunicorn --reload -b 0.0.0.0:8000 api:app
```

In another terminla

```
cd client
npm start
```
### Containerization

I containerized client along with backend.

```
docker-compose up --build
```

But I haven't tested it
