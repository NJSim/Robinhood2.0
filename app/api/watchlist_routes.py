from sqlalchemy.orm.strategy_options import joinedload
from app.forms import WatchlistForm
from app.models import User, db, Watchlist, Asset, watched_assets
from flask_login import login_required
from flask import Blueprint, request
from operator import itemgetter
from sqlalchemy.orm import joinedload
from datetime import date, datetime, timedelta


watchlist_routes = Blueprint('watchlists', __name__)

today = datetime.now()


# get a users watchlists (read)
@watchlist_routes.route('/<int:id>')
@login_required
def user_watchlists(id):
    user = User.query.get(id)
    return {watchlist.id:watchlist.to_dict() for watchlist in Watchlist.query.filter(Watchlist.user_id==user.id).options(joinedload(Watchlist.watched_assets)).all()}


# add a watchlists (create)
@watchlist_routes.route('/add', methods=["POST"])
@login_required
def add_watchlists():
    print(request.json)
    name, user_id = itemgetter("name", "user_id")(request.json)
    user = User.query.get(user_id)
    form = WatchlistForm()

    if(form.validate_on_submit):
        watchlist = Watchlist(
            name = form.data["name"],
            user_id = form.data["user_id"],
            created_at=today,
            updated_at=today
        )
        db.session.add(watchlist)
        db.session.commit()
        return watchlist.to_dict()
    else:
        return None


# edit watchlists (update)
@watchlist_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_watchlists(id):
    watchlist = Watchlist.query.get(id)

    form = WatchlistForm()
    if(form.validate_on_submit):
        watchlist.name = form.data["name"]
        db.session.commit()
        return "Edit Success!"
    else:
        return None


# delete watchlist (destroy)
@watchlist_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_watchlists(id):
    print("HEY OVER HERE",id)
    # user = User.query.get(watchlist.user_id)
    watchlist = Watchlist.query.get(id)
    print("WATCHLIST CHECK", watchlist)
    db.session.delete(watchlist)
    db.session.commit()

    return "Success"

#add assest watchlist
@watchlist_routes.route('/addAsset', methods=["POST"])
@login_required
def add_to_watchlist():
    watchlistId, symbol = itemgetter("watchlistId", "symbol")(request.json)
    watchlist = Watchlist.query.get(watchlistId)
    asset = Asset.query.get(symbol)
    watchlist.watched_assets.append(asset)
    db.session.commit()

    return "Success!"


#delete assest from a specfic watchlist
# name, user_id = itemgetter("name", "user_id")(request.json)
