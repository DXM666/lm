from flask import Flask,jsonify,make_response,url_for
import json

app = Flask(__name__)

@app.route('/')
def Login():
    resp = make_response(jsonify({'error': False}))
    # 跨域设置
    resp.headers['Access-Control-Allow-Origin'] = '*'
    print(url_for('login'))
    return resp

@app.route('/user/<name>')
def user(name):
    pass

@app.route('/test')
def test():
    print(url_for('user', name='letian'))
    return 'Hello'

if __name__ == '__main__':
    app.run()