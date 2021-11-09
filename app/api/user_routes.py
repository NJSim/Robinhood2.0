from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Watchlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/watchlists')
@login_required
def user_watchlists(id):
    user = User.query.get(id)
    userWatchlists = Watchlist.query.filter(Watchlist.user_id==user.id).all()
    # print(userWatchlists[0])
    # return userWatchlists[0].to_dict()
    return {'watchlists': [list.to_dict() for list in userWatchlists ]}
