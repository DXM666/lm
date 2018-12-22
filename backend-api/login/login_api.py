from flask import Flask,jsonify,make_response,url_for,request
import sys
sys.path.append(r'F:\lm\backend-api\app')
from app import app

@app.route('/',methods=['POST'])
def Login():
    resp = make_response(jsonify({'error': False}))
    # 跨域设置
    resp.headers['Access-Control-Allow-Origin'] = '*'
    print(request.form)
    return resp


