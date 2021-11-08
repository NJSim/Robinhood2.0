from app.models import db, Watchlist, Asset
from datetime import date

today = date.today()

# Adds a demo user, you can add other users here if you want
def seed_assetsAndWatchlists():
    asset1 = Asset(
        symbol='AAPL')
    asset2 = Asset(
        symbol='TSLA')
    asset3 = Asset(
        symbol='MMM')
    asset4 = Asset(
        symbol='AAP')
    asset5 = Asset(
        symbol='ADBE')
    asset6 = Asset(
        symbol='FDX')
    asset7 = Asset(
        symbol='STLA')
    asset8 = Asset(
        symbol='MSFT')
    asset9 = Asset(
        symbol='NRG')
    asset10 = Asset(
        symbol='GM')

    db.session.add(asset1)
    db.session.add(asset2)
    db.session.add(asset3)
    db.session.add(asset4)
    db.session.add(asset5)
    db.session.add(asset6)
    db.session.add(asset7)
    db.session.add(asset8)
    db.session.add(asset9)
    db.session.add(asset10)

    db.session.commit()

    watchlist1 = Watchlist(name="First List",user_id=1,created_at=today, updated_at=today )
    watchlist2 = Watchlist(name="First List",user_id=2,created_at=today, updated_at=today )

    db.session.add(watchlist1)
    db.session.add(watchlist2)

    db.session.commit()

    asset1.watched_assets.append(watchlist1)
    asset2.watched_assets.append(watchlist1)
    asset3.watched_assets.append(watchlist1)
    asset1.watched_assets.append(watchlist2)
    asset2.watched_assets.append(watchlist2)
    asset4.watched_assets.append(watchlist2)
    asset7.watched_assets.append(watchlist2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_assetsAndWatchlists():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE watched_assets RESTART IDENTITY CASCADE;')
    db.session.commit()
