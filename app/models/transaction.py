from datetime import timezone
from sqlalchemy.orm import relationship
from .db import db

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    shares = db.Column(db.Integer, nullable=False)
    order_price = db.Column(db.Numeric(7,2), nullable=False)
    buy = db.Column(db.Boolean, nullable=False)
    sell = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'asset_id': self.asset_id,
            'user_id': self.user_id,
            'shares': self.shares,
            'order_price': float(self.order_price),
            'buy': self.buy,
            'sell': self.sell,
            'created_at' : self.created_at
        }

    user = relationship("User")
    asset = relationship("Asset")
