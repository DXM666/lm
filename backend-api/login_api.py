from flask import Flask,jsonify,make_response,url_for
import json

app = Flask(__name__)

@app.route('/')
def Login():
    resp = make_response(jsonify({'error': False}))
    # 跨域设置
    resp.headers['Access-Control-Allow-Origin'] = '*'
    print(url_for('Login',name='hello'))
    return resp


if __name__ == '__main__':
    app.run()