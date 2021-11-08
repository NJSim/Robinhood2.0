from .db import db
from sqlalchemy.orm import relationship
from .user import User
from .portfolio import Portfolio
from .transaction import Transaction
watched_assets = db.Table(
   'watched_assets',
    db.Column("asset_id", db.Integer, db.ForeignKey("assets.id"), primary_key=True),
    db.Column("watchlist_id", db.Integer, db.ForeignKey("watchlists.id"), primary_key=True)
    )

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)
    watched_stocks = db.relationship('Asset', secondary=watched_assets, lazy="subquery", backref=db.backref('watched_assets', lazy=True))
    user = relationship("User")

class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(4), nullable=False, unique=True)

    transactions = relationship("Transaction")
    portfolios = relationship("Portfolio")
