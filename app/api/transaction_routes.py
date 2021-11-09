from flask import Blueprint, json, jsonify, request
from app.models import db, Transaction, User, Portfolio
from flask_login import login_required, current_user
from operator import itemgetter
from datetime import date, datetime, timedelta
from json import JSONEncoder

transaction_routes = Blueprint('transactions', __name__)

today = datetime.now()


@transaction_routes.route('/', methods=['POST'])
def executeTransaction():
    user_id, asset_id, shares, order_price, buy, sell = itemgetter('user_id', 'asset_id', 'shares', 'order_price', 'buy', 'sell')(request.json)
    user = User.query.get(current_user.id)
    if buy:
        total_price = float(order_price) * float(shares)
        if (total_price > user.buying_pwr):
            return {'errors':["Not enough buying power"]}, 401
        transaction = Transaction(
            asset_id=asset_id,
            user_id=user_id,
            shares=shares,
            order_price=order_price,
            buy=buy,
            sell=sell,
            created_at=today,
            updated_at=today
        )
        user.buying_pwr-= total_price
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
    if sell:
        port_instance = Portfolio.query.filter(Portfolio.user_id==user.id, Portfolio.asset_id==asset_id).first()
        if not port_instance:
            return {'errors':["You don't own any of these securities"]}, 401
        if float(port_instance.qty_owned) < float(shares):
            return {'errors':["You don't own enough securities"]}, 401
        total_price = float(order_price) * float(shares)
        transaction = Transaction(
            asset_id=asset_id,
            user_id=user_id,
            shares=shares,
            order_price=order_price,
            buy=buy,
            sell=sell,
            created_at=today,
            updated_at=today
        )
        user.buying_pwr+= total_price
        db.session.add(transaction)
        db.session.commit()
        return transaction.to_dict()
