from flask import Flask
from flask_httpauth import HTTPBasicAuth,HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
import redis

#创建app应用,__name__是python预定义变量，被设置为使用本模块.
app = Flask(__name__)
auth = HTTPTokenAuth(scheme='Bearer')
app.config['SECRET_KEY'] = 'secret key here'
serializer = Serializer(app.config['SECRET_KEY'], expires_in=3600*2)
r = redis.Redis(host='localhost', port='6379', decode_responses=True, password="846373")

from .login import login_api
from .bookcontent import bookcontent_api
from .rank import rank_api