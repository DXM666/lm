from flask import jsonify, make_response
from .. import app,auth


@app.route('/bookdetail', methods=['GET','OPTIONS'])
@auth.login_required
def book_content():
    f = open('F:\scrapyDemo\douban.json',encoding='utf8')
    result = '['+f.read()[:-1]+']'
    resp = make_response(result)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = 'authorization'
    return resp
