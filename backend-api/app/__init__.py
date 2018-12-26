from flask import Flask
from flask_httpauth import HTTPBasicAuth,HTTPTokenAuth
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
#创建app应用,__name__是python预定义变量，被设置为使用本模块.
app = Flask(__name__)
auth = HTTPTokenAuth(scheme='Bearer')
app.config['SECRET_KEY'] = 'secret key here'
serializer = Serializer(app.config['SECRET_KEY'], expires_in=3600*2)

from .login import login_api