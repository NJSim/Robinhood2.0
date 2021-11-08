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
        symbol='VZ')
    asset8 = Asset(
        symbol='MSFT')
    asset9 = Asset(
        symbol='NRG')
    asset10 = Asset(
        symbol='GM')
    asset11 = Asset(
        symbol='BA')
    asset12 = Asset(
        symbol='CVX')
    asset13 = Asset(
        symbol='IBM')
    asset14 = Asset(
        symbol='HON')
    asset15 = Asset(
        symbol='JPM')
    asset16 = Asset(
        symbol='NKE')
    asset17 = Asset(
        symbol='KO')
    asset18 = Asset(
        symbol='INTC')
    asset19 = Asset(
        symbol='PG')
    asset20 = Asset(
        symbol='MCD')
    asset21 = Asset(
        symbol='WMT')
    asset22 = Asset(
        symbol='BABA')
    asset23 = Asset(
        symbol='JNJ')
    asset24 = Asset(
        symbol='CRM')
    asset25 = Asset(
        symbol='DOW')
    asset26 = Asset(
        symbol='DIS')
    asset27 = Asset(
        symbol='UNH')
    asset28 = Asset(
        symbol='AXP')
    asset29 = Asset(
        symbol='HD')
    asset30 = Asset(
        symbol='CAT')

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
    db.session.add(asset11)
    db.session.add(asset12)
    db.session.add(asset13)
    db.session.add(asset14)
    db.session.add(asset15)
    db.session.add(asset16)
    db.session.add(asset17)
    db.session.add(asset18)
    db.session.add(asset19)
    db.session.add(asset20)
    db.session.add(asset21)
    db.session.add(asset22)
    db.session.add(asset23)
    db.session.add(asset24)
    db.session.add(asset25)
    db.session.add(asset26)
    db.session.add(asset27)
    db.session.add(asset28)
    db.session.add(asset29)
    db.session.add(asset30)

    db.session.commit()

    watchlist1 = Watchlist(name="First List",user_id=1,created_at=today, updated_at=today )
    watchlist2 = Watchlist(name="First List",user_id=2,created_at=today, updated_at=today )

    db.session.add(watchlist1)
    db.session.add(watchlist2)

    db.session.commit()

    watchlist1.watched_assets.append(asset1)
    watchlist1.watched_assets.append(asset2)
    watchlist1.watched_assets.append(asset3)
    watchlist2.watched_assets.append(asset1)
    watchlist2.watched_assets.append(asset2)
    watchlist2.watched_assets.append(asset4)
    watchlist2.watched_assets.append(asset7)
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
