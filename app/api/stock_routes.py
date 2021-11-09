from flask import Blueprint, jsonify
from app.models import Asset, db, Portfolio
from flask_login import login_required, current_user
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
    stock_chart_1d = pyEX.chart(symbol=sym.symbol, timeframe="1d", date=None, exactDate=None, last=-1, closeOnly=False, byDay=False, simplify=False, interval=15, changeFromClose=False, displayPercent=False, sort="asc", includeToday=False, token="Tpk_3d1d43f8163d48718ee23f604dc69c83", version="sandbox", filter="", format="json")
    stock_chart_1m = pyEX.chart(symbol=sym.symbol, timeframe="1m", date=None, exactDate=None, last=-1, closeOnly=False, byDay=False, simplify=False, interval=1, changeFromClose=False, displayPercent=False, sort="asc", includeToday=False, token="Tpk_3d1d43f8163d48718ee23f604dc69c83", version="sandbox", filter="", format="json")
    stock_chart_1y = pyEX.chart(symbol=sym.symbol, timeframe="1y", date=None, exactDate=None, last=-1, closeOnly=False, byDay=False, simplify=False, interval=1, changeFromClose=False, displayPercent=False, sort="asc", includeToday=False, token="Tpk_3d1d43f8163d48718ee23f604dc69c83", version="sandbox", filter="", format="json")
    stock_news = stockNewsApi.company_news(sym.symbol, _from=lastWeek, to=today)
    stock_news = stock_news[0:10]
    stock["news"] = stock_news
    stock["chart_1d"] = stock_chart_1d
    stock["chart_1m"] = stock_chart_1m
    stock["chart_1y"] = stock_chart_1y
    port_instance = Portfolio.query.filter(Portfolio.user_id==current_user.id, Portfolio.asset_id==id).first()
    if port_instance:
        stock['shares_owned'] = port_instance.qty_owned
    else:
        stock['shares_owned'] = "null"
    return stock
