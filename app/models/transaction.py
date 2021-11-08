from sqlalchemy.orm import relationship
from .db import db

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    order_price = db.Column(db.Integer, nullable=False)
    buy = db.Column(db.Boolean, nullable=False)
    sell = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    user = relationship("User")
    asset = relationship("Asset")
