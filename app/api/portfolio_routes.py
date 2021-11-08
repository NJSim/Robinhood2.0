from flask import Blueprint, json, jsonify, request
from app.models import db, Portfolio, Transaction
from flask_login import login_required, current_user
from operator import itemgetter
from datetime import date, datetime, timedelta

portfolio_routes = Blueprint('portfolios', __name__)

today = datetime.now()


@portfolio_routes.route('/update', methods=['POST'])
def updatePortfolio():
    userId, transactionId  = itemgetter('userId', 'transactionId')(request.json)
    transaction = Transaction.query.get(transactionId)
    assetId = transaction.asset_id
    portfolio_instance = Portfolio.query.filter(Portfolio.asset_id==assetId, Portfolio.user_id==userId).first()
    if portfolio_instance:
        if transaction.buy:
            portfolio_instance.qty_owned = (portfolio_instance.qty_owned) + transaction.shares
            portfolio_instance.updated_at = today
            db.session.commit()
            db.session.expire_all()
            return "Successful"
        else:
            portfolio_instance.qty_owned = (portfolio_instance.qty_owned) - transaction.shares
            portfolio_instance.updated_at = today
            db.session.commit()
            db.session.expire_all()
            return "Successful"

    else:
        newPortinstance = Portfolio(
            user_id = userId,
            asset_id = assetId,
            qty_owned = transaction.shares,
            created_at = today,
            updated_at = today
        )
        db.session.add(newPortinstance)
        db.session.commit()
        db.session.expire_all()
        return "Successful"

@portfolio_routes.route('/')
@login_required
def getPortfolio():
    userId = current_user.id
    portfolioItems = Portfolio.query.filter(Portfolio.user_id==userId).all()
    if portfolioItems:
        pass
    else:
        return None
