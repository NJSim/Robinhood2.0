from app.models import db, Asset

def seed_assets():
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


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_assets():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.commit()
