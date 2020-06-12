from datetime import datetime
from api import db, ma


class InventoryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    price = db.Column(db.Integer)
    description = db.Column(db.String(140))
    quantity = db.Column(db.Integer)
    filename = db.Column(db.String(64))
    filetype = db.Column(db.String(64))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Item {}: {}>'.format(self.itemName, self.description)


class InventorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'price', 'quantity', 'description', 'filename')
