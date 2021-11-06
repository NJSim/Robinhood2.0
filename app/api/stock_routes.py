from flask import Blueprint, jsonify
from app.models import Asset, db
from flask_login import login_required
import pyEX
import finnhub
from datetime import date, datetime, timedelta

stock_routes = Blueprint('stocks', __name__)


stockAPI = pyEX.Client(api_token='Tpk_3d1d43f8163d48718ee23f604dc69c83', version='sandbox')
stockNewsApi = finnhub.Client(api_key='c60q7iaad3ifmvvnov3g')

today = date.today()
subWeek = timedelta(7)
lastWeek = today - subWeek
cDate = today.strftime("%Y-%m-%d")
lastWeek = lastWeek.strftime("%Y-%m-%d")

@stock_routes.route('/<int:id>')
@login_required
def getStock(id):
    sym=Asset.query.get(id)
    stock = stockAPI.quote(symbol=sym.symbol)
    stock_news = stockNewsApi.company_news(sym.symbol, _from=lastWeek, to=today)
    stock_news = stock_news[0:10]
    stock["news"] = stock_news
    return stock
