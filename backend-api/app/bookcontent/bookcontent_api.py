from flask import jsonify, make_response
from .. import app


@app.route('/bookdetail', methods=['GET'])
def book_content():
    f = open('F:\scrapyDemo\douban.json',encoding='utf8')
    result = '['+f.read()[:-1]+']'
    resp = make_response(result)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp
