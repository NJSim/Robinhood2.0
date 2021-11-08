from datetime import timezone
from sqlalchemy.orm import relationship
from .db import db

class assetToWatchlist(db.Model):
    __tablename__ = 'assetToWatchlist'

    id = db.Column(db.Integer, primary_key=True)
    asset_id = db.Column(db.Integer, db.ForeignKey("assets.id"), nullable=False)
    watchlist_id = db.Column(db.Integer, db.ForeignKey("watchlist.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)

    asset = relationship("Asset")
    watchlist = relationship("Watchlist")
