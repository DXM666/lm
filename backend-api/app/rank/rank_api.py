from flask import jsonify, make_response, request
from .. import r, app
import requests


@app.route('/sidermenu')
def get_sidermenu():
    f = requests.get('http://api.zhuishushenqi.com/ranking/gender')
    resp = make_response(f.text)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/booklist/<bookid>')
def get_booklist(bookid):
    f = requests.get('http://api.zhuishushenqi.com/ranking/' + bookid)
    resp = make_response(f.text)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/chapterlist/<chapterid>')
def get_chapterlist(chapterid):
    f = requests.get('http://api.zhuishushenqi.com/mix-atoc/' + chapterid + '?view=chapters')
    resp = make_response(f.text)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/chapterinfo')
def get_chapterinfo():
    print(request.args.get('chapterlink'))
    f = requests.get('http://chapter2.zhuishushenqi.com/chapter/' + request.args.get('chapterlink'))
    resp = make_response(f.text)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
