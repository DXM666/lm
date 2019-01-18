from flask import jsonify, make_response, request
from werkzeug.contrib.cache import SimpleCache
from .. import r, app
import requests
import json

cache = SimpleCache()


@app.route('/sidermenu')
def get_sidermenu():
    if cache.get('sidermenu'):
        resp = make_response(cache.get('sidermenu'))
    elif r.get('sidermenu'):
        resp = make_response(r.get('sidermenu'))
    else:
        f = requests.get('http://api.zhuishushenqi.com/ranking/gender')
        resp = make_response(f.text)
        cache.set('sidermenu', f.text)
        r.set('sidermenu',f.text)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/booklist/<bookid>')
def get_booklist(bookid):
    if cache.get('booklist_'+bookid) and json.loads(cache.get('booklist_'+bookid))['ranking']['id'] == bookid:
        resp = make_response(cache.get('booklist_'+bookid))
    elif r.get('booklist_'+bookid):
        resp = make_response(r.get('booklist_' + bookid))
    else:
        f = requests.get('http://api.zhuishushenqi.com/ranking/' + bookid)
        resp = make_response(f.text)
        cache.set('booklist_'+bookid, f.text)
        r.set('booklist_' + bookid, f.text)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/chapterlist/<chapterid>')
def get_chapterlist(chapterid):
    if cache.get('chapterlist_'+chapterid):
        resp = make_response(cache.get('chapterlist_'+chapterid))
    elif r.get('chapterlist_'+chapterid):
        resp = make_response(r.get('chapterlist_' + chapterid))
    else:
        f = requests.get('http://api.zhuishushenqi.com/mix-atoc/' + chapterid + '?view=chapters')
        resp = make_response(f.text)
        cache.set('chapterlist_'+chapterid,f.text)
        r.set('chapterlist_' + chapterid, f.text)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/chapterinfo')
def get_chapterinfo():
    print(request.args.get('chapterlink'))
    f = requests.get('http://chapter2.zhuishushenqi.com/chapter/' + request.args.get('chapterlink'))
    resp = make_response(f.text)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
