from flask import Flask, jsonify, request
from flask_cors import CORS

import get

app = Flask(__name__)
CORS(app)

@app.route('/api/get/info-video', methods=['POST'])
def process_video():
<<<<<<< HEAD
=======

>>>>>>> 2f6afcb8c8bc49b71fc2fb6f5492c961728da93b
    return jsonify(get.video_info(request.get_json()['url']))

if __name__ == '__main__':
    app.run(debug=True, port=5000)