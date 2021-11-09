from .db import db
from sqlalchemy.orm import relationship
# from .assetsToWatchlists import assetsToWatchlists
class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(4), nullable=False, unique=True)

    transactions = relationship("Transaction")
    portfolios = db.relationship("Portfolio", back_populates="port_asset", lazy=False)

    # watchlists = relationship("Watchlist", secondary=assetsToWatchlists, back_populates="assets")
