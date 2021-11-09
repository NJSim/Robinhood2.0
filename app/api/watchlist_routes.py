from app.forms import WatchlistForm
from app.models import User, db, Watchlist
from flask_login import login_required
from flask import Blueprint


watchlist_routes = Blueprint('watchlists', __name__)



# get a users watchlist (read)
@watchlist_routes.route('/<int:id>')
@login_required
def user_watchlists(id):
    user = User.query.get(id)
    return {watchlist.id:watchlist.to_dict() for watchlist in Watchlist.query.filter(Watchlist.user_id==user.id).all()}


# add a watchlists (create)
@watchlist_routes.route('/<int:id>', methods=["POST"])
@login_required
def add_watchlists():
    user = User.query.get(watchlist.user_id)
    form = WatchlistForm()

    if(form.validate_on_submit):
        watchlist = Watchlist(
            name = form.data["name"],
            user_id = form.data["user_id"]
        )
        db.session.add(watchlist)
        db.session.commit()
        return user.to_dict()
    else:
        return None


# edit a watchlist (update)
@watchlist_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_watchlists(id):
    user = User.query.get(watchlist.user_id)
    watchlist = Watchlist.query.get(id)
    form = WatchlistForm()

    if(form.validate_on_submit):
        watchlist.name = form.data["name"]
        watchlist.user_id = form.data["user_id"]
        db.session.commit()
        return user.to_dict()
    else:
        return None


# delete a watchlist (destroy)
@watchlist_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_watchlists(id):
    user = User.query.get(watchlist.user_id)
    watchlist = Watchlist.query.get(id)
    db.session.delete(watchlist)
    db.session.commit

    return user.to_dict()
