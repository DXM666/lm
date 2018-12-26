from flask import Flask,jsonify,make_response,url_for,request,g
from .. import app,serializer,auth


@auth.verify_token
def verify_token(token):
    try:
        data = serializer.loads(token)
    except:
        return False
    if 'username' in data:
        g.user = data['username']
        return True
    return False

@app.route('/',methods=['POST'])
def Login():
    g.token = serializer.dumps({'username': request.form.get('username'), 'password': request.form.get('password')})
    resp = make_response(jsonify({'status': True,'token': g.token.decode('utf8')}))
    # 跨域设置
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/main',methods=['POST','GET','OPTIONS'])
@auth.login_required
def test():
    resp = make_response(jsonify({'test':'success'}))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = 'authorization'
    return resp

