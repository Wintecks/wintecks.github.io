from flask import Flask, jsonify, request
from flask_cors import CORS

import get

app = Flask(__name__)
CORS(app)

@app.route('/api/get/info-video', methods=['POST'])
def info_video():
    return jsonify(get.video_info(request.get_json()['url']))

@app.route('/api/download-video', methods=['POST'])
def download_video():
    return jsonify()

if __name__ == '__main__':
    app.run(debug=True, port=5000)