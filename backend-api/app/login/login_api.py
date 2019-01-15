from flask import jsonify,make_response,request,g
from .. import app,serializer,auth,r



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
def login():
    g.token = serializer.dumps({'username': request.form.get('username'), 'password': request.form.get('password')})
    if r.get(('userInfo:%s:%s:id' % (request.form.get('username'),request.form.get('password')))):
        resp = make_response(jsonify({'status': True, 'token': g.token.decode('utf8')}))
        # 跨域设置
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    else:
        resp = make_response(jsonify({'status': False, 'token': g.token.decode('utf8')}))
        # 跨域设置
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    # r.set(('userInfo:%s:%s:id' % (request.form.get('username'),request.form.get('password'))),1)
    # resp = make_response(jsonify({'status': True,'token': g.token.decode('utf8')}))
    # # 跨域设置
    # resp.headers['Access-Control-Allow-Origin'] = '*'
    # return resp

@app.route('/main',methods=['POST','GET','OPTIONS'])
@auth.login_required
def main_content():
    resp = make_response(jsonify({'test':'success'}))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Headers'] = 'authorization'
    return resp



