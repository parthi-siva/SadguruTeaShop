from api import app, db
from api.models import InventoryItem, InventorySchema
from flask import request, abort
import os
from functools import wraps
import random
import string

relpath = "/public/assets/images"
abspath = "/home/parthi/Documents/react/minimal-react-webpack-babel-setup"


def require_appkey(view_function):
    @wraps(view_function)
    def decorated_function(*args, **kwargs):
        key = app.config['SECRET_KEY']
        if request.headers.get('Authorization') and request.headers.get('Authorization') == key:
            return view_function(*args, **kwargs)
        else:
            abort(401)
    return decorated_function


@app.route('/AddItem', methods=['POST'])
@require_appkey
def additems():
    print((request.values))
    try:
        itemname = request.values['name']
        description = request.values['description']
        price = request.values['price']
        quantity = request.values['quantity']
        filename = request.values['filename']
        ftype = request.values['type']
        fileObj = request.files['file']
    except Exception:
        return {'msg': 'Missing Required keys', 'status': 400}

    letters = string.ascii_letters
    filename = ''.join(random.choice(letters) for i in range(5)) + filename
    filelocation = os.path.join(relpath, filename)

    try:
        new_item = InventoryItem(
            name=itemname,
            price=price,
            description=description,
            quantity=quantity,
            filename=filelocation,
            filetype=ftype)
        db.session.add(new_item)
        db.session.commit()
    except Exception:
        return {'msg': 'Error during database operations', 'status': 500}

    with open(abspath+filelocation, 'wb') as fptr:
        fptr.write(fileObj.read())

    newItem = InventorySchema()

    return newItem.jsonify(new_item)


@ app.route('/GetItems', methods=['GET'])
@ require_appkey
def getallitems():
    try:
        all_item = InventoryItem.query.all()
        allItem = InventorySchema(many=True)
        return allItem.jsonify(all_item)
    except Exception:
        return {'msg': 'Error occured', 'status': 500}


@ app.route('/GetItem', methods=['POST'])
@ require_appkey
def getitems():
    try:
        name = request.json['name']
        items = InventoryItem().query.filter_by(name=name).first()
        Item = InventorySchema()
        return Item.jsonify(items)
    except Exception:
        return {'msg': 'Error occured', 'status': 500}


@ app.route('/DeleteItems', methods=['POST'])
@ require_appkey
def deleteItem():
    try:
        name = request.json['name']
        items = InventoryItem().query.filter_by(name=name).first()
        if os.path.exists(items.filename):
            os.remove(items.filename)
        db.session.delete(items)
        db.session.commit()
        return {"msg": "deleted", "status": 200}
    except Exception:
        return {'msg': 'Error occured', 'status': 500}
