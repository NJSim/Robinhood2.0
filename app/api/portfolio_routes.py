from flask import Blueprint, json, jsonify, request
from sqlalchemy.orm.strategy_options import joinedload
from app.models import db, Portfolio, Transaction
from flask_login import login_required, current_user
from operator import itemgetter
from sqlalchemy.orm import joinedload
from datetime import date, datetime, timedelta
import pyEX

portfolio_routes = Blueprint('portfolios', __name__)

stockAPI = pyEX.Client(api_token='Tpk_3d1d43f8163d48718ee23f604dc69c83', version='sandbox')

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
# @login_required
def getPortfolio():
    portfolio = {}
    portfolio['positions'] = {}
    total_market_value = 0
    total_shares = 0;
    userId = current_user.id
    portfolioItems = Portfolio.query.filter(Portfolio.user_id==userId).options(joinedload(Portfolio.port_asset)).all()
    if portfolioItems:
        for item in portfolioItems:
            stock_price = stockAPI.quote(symbol=item.port_asset.symbol)['latestPrice']
            market_value = item.qty_owned * stock_price
            total_market_value += market_value
            total_shares += item.qty_owned
            portfolio['positions'][item.port_asset.symbol] = {
                "asset_id": item.asset_id,
                "total_shares": item.qty_owned,
                "market_value": market_value
            }
        portfolio['totalMarketValue'] = total_market_value
        if total_shares == 0:
            return "null"
        else:
            return portfolio
    else:
        return "null"
