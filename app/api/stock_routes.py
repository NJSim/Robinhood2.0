from flask import Blueprint, jsonify
from flask_login import login_required
import pyEX

stock_routes = Blueprint('stocks', __name__)

stockAPI = pyEX.Client(api_token='Tpk_3d1d43f8163d48718ee23f604dc69c83', version='sandbox')

@stock_routes.route('/<int:id>')
@login_required
def getStock(id):
    sym='AAPL'
    stock = stockAPI.quote(symbol=sym)
    return stock
