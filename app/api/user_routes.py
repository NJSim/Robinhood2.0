from flask import Blueprint, jsonify
from flask_login import login_required, current_user, logout_user
from app.models import User, db



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

@user_routes.route('/delete')
@login_required
def delete_account():
    user = User.query.get(current_user.id)
    if user:
        db.session.delete(user)
        db.session.commit()
        logout_user()
        return  {'message': 'User deleted'}
    else:
        return {"Error": "User doesn't exist."}
