from flask import Blueprint, json, jsonify, request
from app.models import db, Transaction
from flask_login import login_required
from operator import itemgetter
from datetime import date, datetime, timedelta
from json import JSONEncoder

transaction_routes = Blueprint('transactions', __name__)

today = datetime.now()


@transaction_routes.route('/', methods=['POST'])
def executeTransaction():
    user_id, asset_id, shares, order_price, buy, sell = itemgetter('user_id', 'asset_id', 'shares', 'order_price', 'buy', 'sell')(request.json)
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
    db.session.add(transaction)
    db.session.commit()
    return transaction.to_dict()
